package com.cdweb.bookstore.modules.payment.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.model.Order;
import com.cdweb.bookstore.modules.order.repository.OrderRepository;
import com.cdweb.bookstore.modules.payment.dto.ZaloPayInitResponse;
import com.cdweb.bookstore.modules.payment.model.ZaloPayTransaction;
import com.cdweb.bookstore.modules.payment.repository.ZaloPayTransactionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * Xử lý nghiệp vụ thanh toán ZaloPay:
 * 1. Khởi tạo giao dịch (initPayment)
 * 2. Xử lý callback từ ZaloPay (handleCallback)
 * 3. Truy vấn trạng thái thủ công (queryStatus)
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ZaloPayPaymentService {

    private final ZaloPayApiService zaloPayApiService;
    private final ZaloPayTransactionRepository transactionRepository;
    private final OrderRepository orderRepository;
    private final ObjectMapper objectMapper;

    // ─── 1. Khởi tạo giao dịch ───────────────────────────────────────────────

    /**
     * Tạo giao dịch ZaloPay cho đơn hàng.
     * Chỉ áp dụng cho đơn có paymentMethod = ZALOPAY.
     *
     * @param orderId ID đơn hàng
     * @param userId  ID user (để xác thực quyền sở hữu)
     * @return ZaloPayInitResponse chứa orderUrl để redirect user
     */
    @Transactional
    public ZaloPayInitResponse initPayment(Long orderId, Long userId) {
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng #" + orderId + " không tồn tại"));

        // Kiểm tra quyền sở hữu
        if (!order.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Đơn hàng #" + orderId + " không tồn tại");
        }

        // Chỉ thanh toán được đơn PENDING + ZALOPAY
        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new RuntimeException("Đơn hàng không ở trạng thái chờ thanh toán");
        }
        if (order.getPaymentMethod() != Order.PaymentMethod.ZALOPAY) {
            throw new RuntimeException("Đơn hàng không sử dụng phương thức thanh toán ZaloPay");
        }
        if (order.getPaymentStatus() == Order.PaymentStatus.PAID) {
            throw new RuntimeException("Đơn hàng đã được thanh toán");
        }

        long amount = order.getTotalAmount().longValue();
        String appTransId = zaloPayApiService.buildAppTransId(orderId);
        String appUser = "user_" + userId;
        String description = "Thanh toan don hang #" + orderId;

        // Gọi ZaloPay API
        Map<String, Object> zpResponse = zaloPayApiService.createOrder(
                appTransId, appUser, amount, description, orderId);

        int returnCode = (Integer) zpResponse.getOrDefault("return_code", 0);
        if (returnCode != 1) {
            String msg = (String) zpResponse.getOrDefault("return_message", "Lỗi không xác định");
            log.error("ZaloPay tạo đơn thất bại [orderId={}]: {} ", orderId, msg);
            throw new RuntimeException("ZaloPay: " + msg);
        }

        String orderUrl = (String) zpResponse.get("order_url");

        // Lưu transaction vào DB
        ZaloPayTransaction txn = ZaloPayTransaction.builder()
                .appTransId(appTransId)
                .order(order)
                .amount(amount)
                .orderUrl(orderUrl)
                .status(ZaloPayTransaction.TransactionStatus.PENDING)
                .build();
        transactionRepository.save(txn);

        log.info("ZaloPay: tạo giao dịch thành công [orderId={}, appTransId={}]", orderId, appTransId);
        return new ZaloPayInitResponse(orderId, appTransId, orderUrl, amount);
    }

    // ─── 2. Xử lý callback từ ZaloPay ────────────────────────────────────────

    /**
     * ZaloPay gọi endpoint này khi user thanh toán xong (hoặc thất bại).
     * ZaloPay yêu cầu server phải trả về {"return_code": 1} để xác nhận đã nhận.
     *
     * @param data raw JSON string trong field "data" của ZaloPay callback request
     * @param mac  chữ ký ZaloPay gửi kèm để xác thực
     * @return true = xử lý thành công, false = lỗi MAC hoặc không tìm thấy giao
     *         dịch
     */
    @Transactional
    public boolean handleCallback(String data, String mac) {
        // 1. Xác thực MAC
        if (!zaloPayApiService.verifyCallback(data, mac)) {
            log.warn("ZaloPay callback: MAC không hợp lệ");
            return false;
        }

        try {
            // 2. Parse JSON data
            Map<?, ?> dataMap = objectMapper.readValue(data, Map.class);
            String appTransId = (String) dataMap.get("app_trans_id");
            long zpTransId = Long.parseLong(dataMap.get("zp_trans_id").toString());

            // 3. Tìm transaction trong DB
            ZaloPayTransaction txn = transactionRepository.findByAppTransId(appTransId)
                    .orElse(null);
            if (txn == null) {
                log.warn("ZaloPay callback: không tìm thấy appTransId={}", appTransId);
                return false;
            }

            // 4. Tránh xử lý trùng
            if (txn.getStatus() == ZaloPayTransaction.TransactionStatus.SUCCESS) {
                log.info("ZaloPay callback: giao dịch {} đã xử lý trước đó", appTransId);
                return true;
            }

            // 5. Cập nhật transaction
            txn.setStatus(ZaloPayTransaction.TransactionStatus.SUCCESS);
            txn.setZpTransId(String.valueOf(zpTransId));
            txn.setZpReturnCode(1);
            transactionRepository.save(txn);

            // 6. Cập nhật trạng thái thanh toán đơn hàng
            Order order = txn.getOrder();
            order.setPaymentStatus(Order.PaymentStatus.PAID);
            orderRepository.save(order);

            log.info("ZaloPay: thanh toán thành công [orderId={}, zpTransId={}]",
                    order.getId(), zpTransId);
            return true;

        } catch (Exception e) {
            log.error("ZaloPay callback: lỗi xử lý data", e);
            return false;
        }
    }

    // ─── 3. Truy vấn trạng thái thủ công ─────────────────────────────────────

    /**
     * User/Admin chủ động kiểm tra kết quả thanh toán (dùng khi không nhận được
     * callback).
     *
     * @param orderId ID đơn hàng
     * @param userId  ID user (để xác thực quyền)
     * @return ZaloPayTransaction đã được cập nhật trạng thái
     */
    @Transactional
    public ZaloPayTransaction queryAndSync(Long orderId, Long userId) {
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng #" + orderId + " không tồn tại"));

        if (!order.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Đơn hàng #" + orderId + " không tồn tại");
        }

        ZaloPayTransaction txn = transactionRepository
                .findTopByOrderIdOrderByCreatedAtDesc(orderId)
                .orElseThrow(() -> new RuntimeException(
                        "Chưa có giao dịch ZaloPay cho đơn hàng #" + orderId));

        // Đã xử lý xong thì không cần query nữa
        if (txn.getStatus() == ZaloPayTransaction.TransactionStatus.SUCCESS) {
            return txn;
        }

        Map<String, Object> result = zaloPayApiService.queryOrder(txn.getAppTransId());
        int returnCode = (Integer) result.getOrDefault("return_code", 0);

        if (returnCode == 1) {
            // Thanh toán thành công
            txn.setStatus(ZaloPayTransaction.TransactionStatus.SUCCESS);
            txn.setZpReturnCode(returnCode);
            transactionRepository.save(txn);

            order.setPaymentStatus(Order.PaymentStatus.PAID);
            orderRepository.save(order);

        } else if (returnCode == -49) {
            // Giao dịch đang chờ / chưa thanh toán
            txn.setZpReturnCode(returnCode);
            transactionRepository.save(txn);
        } else {
            // Thất bại / hết hạn
            txn.setStatus(ZaloPayTransaction.TransactionStatus.FAILED);
            txn.setZpReturnCode(returnCode);
            transactionRepository.save(txn);
        }

        return txn;
    }
}
