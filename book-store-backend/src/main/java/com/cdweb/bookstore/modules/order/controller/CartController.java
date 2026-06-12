package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.order.dto.AddToCartRequest;
import com.cdweb.bookstore.modules.order.dto.CartResponse;
import com.cdweb.bookstore.modules.order.dto.UpdateCartItemRequest;
import com.cdweb.bookstore.modules.order.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
// @formatter:off
public class CartController {

    private final CartService cartService;

    

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(cartService.getCart(extractUserId(jwt)));
    }

    

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addItem(
            @Valid @RequestBody AddToCartRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        CartResponse cart = cartService.addItem(extractUserId(jwt), request);
        return ApiResponse.ok(cart, "Thêm sách vào giỏ hàng thành công");
    }

    

    @PutMapping("/items/{bookId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateItem(
            @PathVariable Long bookId,
            @Valid @RequestBody UpdateCartItemRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        CartResponse cart = cartService.updateItem(extractUserId(jwt), bookId, request);
        return ApiResponse.ok(cart, "Cập nhật giỏ hàng thành công");
    }

    

    @DeleteMapping("/items/{bookId}")
    public ResponseEntity<ApiResponse<CartResponse>> removeItem(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt) {
        CartResponse cart = cartService.removeItem(extractUserId(jwt), bookId);
        return ApiResponse.ok(cart, "Xóa sản phẩm khỏi giỏ hàng thành công");
    }

    

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(
            @AuthenticationPrincipal Jwt jwt) {
        cartService.clearCart(extractUserId(jwt));
        return ApiResponse.ok(null, "Đã xóa toàn bộ giỏ hàng");
    }

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) return number.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}