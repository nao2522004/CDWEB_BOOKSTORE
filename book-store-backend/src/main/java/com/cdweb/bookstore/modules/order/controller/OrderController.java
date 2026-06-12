package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.order.dto.CheckoutRequest;
import com.cdweb.bookstore.modules.order.dto.OrderResponse;
import com.cdweb.bookstore.modules.order.service.CheckoutService;
import com.cdweb.bookstore.modules.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
// @formatter:off
public class OrderController {

    private final CheckoutService checkoutService;
    private final OrderService    orderService;

    
    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<OrderResponse>> checkout(
            @Valid @RequestBody CheckoutRequest request,
            @AuthenticationPrincipal Jwt jwt) {

        OrderResponse order = checkoutService.checkout(extractUserId(jwt), request);
        return ApiResponse.created(order, "Đặt hàng thành công! Mã đơn: #" + order.id());
    }

    
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getMyOrders(
            @AuthenticationPrincipal Jwt jwt) {

        return ApiResponse.ok(orderService.getOrdersByUser(extractUserId(jwt)));
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderDetail(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {

        return ApiResponse.ok(orderService.getOrderDetail(id, extractUserId(jwt)));
    }

    
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {

        return ApiResponse.ok(
                orderService.cancelOrder(id, extractUserId(jwt)),
                "Hủy đơn hàng thành công");
    }

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number n) return n.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}