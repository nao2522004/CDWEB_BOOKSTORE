package com.cdweb.bookstore.modules.payment.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.payment.dto.ZaloPayInitResponse;
import com.cdweb.bookstore.modules.payment.model.ZaloPayTransaction;
import com.cdweb.bookstore.modules.payment.service.ZaloPayPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment/zalopay")
@RequiredArgsConstructor
@Slf4j
// @formatter:off
public class ZaloPayController {

    private final ZaloPayPaymentService paymentService;

    

    @PostMapping("/init/{orderId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ZaloPayInitResponse>> initPayment(
            @PathVariable Long orderId,
            @AuthenticationPrincipal Jwt jwt) {

        ZaloPayInitResponse response = paymentService.initPayment(orderId, extractUserId(jwt));
        return ApiResponse.ok(response, "Khởi tạo thanh toán ZaloPay thành công");
    }

    

    @PostMapping("/callback")
    public ResponseEntity<Map<String, Object>> handleCallback(
            @RequestBody Map<String, Object> body) {

        String data = (String) body.get("data");
        String mac  = (String) body.get("mac");

        log.info("ZaloPay callback nhận được [data_length={}]",
                data != null ? data.length() : 0);

        boolean success = paymentService.handleCallback(data, mac);

        if (success) {
            return ResponseEntity.ok(Map.of(
                    "return_code",    1,
                    "return_message", "success"));
        } else {
            
            return ResponseEntity.ok(Map.of(
                    "return_code",    0,
                    "return_message", "Xử lý callback thất bại"));
        }
    }

    

    @GetMapping("/status/{orderId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ZaloPayTransaction>> queryStatus(
            @PathVariable Long orderId,
            @AuthenticationPrincipal Jwt jwt) {

        ZaloPayTransaction txn = paymentService.queryAndSync(orderId, extractUserId(jwt));
        return ApiResponse.ok(txn, "Truy vấn trạng thái thành công");
    }

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number n) return n.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
