package com.cdweb.bookstore.modules.payment.service;

import com.cdweb.bookstore.config.ZaloPayProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

/**
 * Service giao tiếp trực tiếp với ZaloPay API.
 * Chứa: HMAC helper, tạo đơn, truy vấn đơn, xác thực callback.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ZaloPayApiService {

    private final ZaloPayProperties zaloPayProperties;
    private final RestTemplate restTemplate;

    // ─── HMAC-SHA256 ─────────────────────────────────────────────────────────

    /**
     * Tính HMAC-SHA256 với key và data cho trước.
     */
    public String hmacSha256(String key, String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(
                    key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKey);
            byte[] bytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi tính HMAC-SHA256", e);
        }
    }

    // ─── Tạo app_trans_id ────────────────────────────────────────────────────

    /**
     * Sinh app_trans_id duy nhất theo format: yymmdd_orderId_timestamp
     * Bắt buộc dùng múi giờ GMT+7 (Asia/Ho_Chi_Minh).
     */
    public String buildAppTransId(Long orderId) {
        String date = ZonedDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"))
                .format(DateTimeFormatter.ofPattern("yyMMdd"));
        return date + "_" + orderId + "_" + System.currentTimeMillis();
    }

    // ─── Tạo đơn hàng ZaloPay ────────────────────────────────────────────────

    /**
     * Gọi ZaloPay /v2/create để lấy order_url.
     *
     * @param appTransId  mã giao dịch (đã sinh trước)
     * @param appUser     user id của người đặt hàng
     * @param amount      số tiền (VNĐ)
     * @param description mô tả đơn hàng
     * @param orderId     ID đơn hàng trong hệ thống (để embed vào callback)
     * @return Map chứa các field trả về từ ZaloPay
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> createOrder(String appTransId, String appUser,
            long amount, String description, Long orderId) {
        try {
            int appId = zaloPayProperties.getAppId();
            long appTime = System.currentTimeMillis();

            // embed_data chứa orderId để server nhận lại khi ZaloPay callback, và redirecturl để ZaloPay chuyển hướng khách hàng về sau khi thanh toán thành công
            String redirectUrl = zaloPayProperties.getClientUrl() + "/payment/zalopay/return";
            String embedData = "{\"orderId\":" + orderId + ",\"redirecturl\":\"" + redirectUrl + "\"}";
            String item = "[]";

            // Chuỗi ký: app_id|app_trans_id|app_user|amount|app_time|embed_data|item
            String hmacInput = appId + "|" + appTransId + "|" + appUser + "|"
                    + amount + "|" + appTime + "|" + embedData + "|" + item;
            String mac = hmacSha256(zaloPayProperties.getMacKey(), hmacInput);

            // Body gửi dưới dạng form-encoded (ZaloPay yêu cầu)
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("app_id", String.valueOf(appId));
            body.add("app_user", appUser);
            body.add("app_trans_id", appTransId);
            body.add("app_time", String.valueOf(appTime));
            body.add("expire_duration_seconds", "900");
            body.add("amount", String.valueOf(amount));
            body.add("description", description);
            body.add("embed_data", embedData);
            body.add("item", item);
            body.add("mac", mac);

            // Thêm callback URL nếu có server URL cấu hình
            if (zaloPayProperties.getServerUrl() != null) {
                String callbackUrl = zaloPayProperties.getServerUrl() + "/payment/zalopay/callback";
                body.add("callback_url", callbackUrl);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    zaloPayProperties.getCreateOrderUrl(), request, Map.class);

            return response.getBody() != null ? response.getBody() : new HashMap<>();

        } catch (Exception e) {
            log.error("Lỗi tạo đơn ZaloPay: {}", e.getMessage(), e);
            throw new RuntimeException("Không thể kết nối ZaloPay: " + e.getMessage());
        }
    }

    // ─── Truy vấn trạng thái đơn ─────────────────────────────────────────────

    /**
     * Gọi ZaloPay /v2/query để kiểm tra trạng thái thanh toán.
     * Dùng khi cần chủ động kiểm tra (polling) thay vì chờ callback.
     *
     * @return Map chứa return_code (1 = thành công)
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> queryOrder(String appTransId) {
        try {
            int appId = zaloPayProperties.getAppId();

            // MAC cho query: app_id|app_trans_id|mac_key
            String hmacInput = appId + "|" + appTransId + "|" + zaloPayProperties.getMacKey();
            String mac = hmacSha256(zaloPayProperties.getMacKey(), hmacInput);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("app_id", String.valueOf(appId));
            body.add("app_trans_id", appTransId);
            body.add("mac", mac);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    zaloPayProperties.getQueryOrderUrl(), request, Map.class);

            return response.getBody() != null ? response.getBody() : new HashMap<>();

        } catch (Exception e) {
            log.error("Lỗi query đơn ZaloPay {}: {}", appTransId, e.getMessage(), e);
            throw new RuntimeException("Không thể truy vấn trạng thái ZaloPay: " + e.getMessage());
        }
    }

    // ─── Xác thực callback ────────────────────────────────────────────────────

    /**
     * Xác thực MAC trong ZaloPay callback để chống giả mạo.
     * MAC callback: HMAC-SHA256(mac_key, data)
     *
     * @param data dữ liệu gốc ZaloPay gửi về (field "data" trong request body)
     * @param mac  chữ ký ZaloPay gửi về (field "mac" trong request body)
     * @return true nếu hợp lệ
     */
    public boolean verifyCallback(String data, String mac) {
        String expectedMac = hmacSha256(zaloPayProperties.getMacKey(), data);
        return expectedMac.equalsIgnoreCase(mac);
    }
}
