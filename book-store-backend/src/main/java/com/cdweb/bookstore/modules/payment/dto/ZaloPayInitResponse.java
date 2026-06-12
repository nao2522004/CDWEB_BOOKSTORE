package com.cdweb.bookstore.modules.payment.dto;

public record ZaloPayInitResponse(
        Long orderId,
        String appTransId,
        String orderUrl,
        long amount) {
}
