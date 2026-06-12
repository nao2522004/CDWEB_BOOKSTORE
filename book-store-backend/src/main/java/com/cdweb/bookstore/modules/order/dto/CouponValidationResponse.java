package com.cdweb.bookstore.modules.order.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CouponValidationResponse(
        @JsonProperty("isValid") boolean isValid,
        String couponCode,
        String couponType,
        BigDecimal discountAmount,
        String errorMessage) {
    public static CouponValidationResponse valid(String code, String type, BigDecimal discountAmount) {
        return new CouponValidationResponse(true, code, type, discountAmount, null);
    }

    public static CouponValidationResponse invalid(String code, String reason) {
        return new CouponValidationResponse(false, code, null, BigDecimal.ZERO, reason);
    }
}