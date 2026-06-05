package com.cdweb.bookstore.modules.payment.dto;

/**
 * Response trả về client khi tạo thanh toán ZaloPay thành công.
 */
public record ZaloPayInitResponse(
        Long orderId,
        String appTransId,
        String orderUrl,
        long amount) {
}
