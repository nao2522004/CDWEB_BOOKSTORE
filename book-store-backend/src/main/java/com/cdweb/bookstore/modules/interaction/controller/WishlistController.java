package com.cdweb.bookstore.modules.interaction.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.interaction.dto.WishlistResponse;
import com.cdweb.bookstore.modules.interaction.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/wishlists")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class WishlistController {

    private final WishlistService wishlistService;

    /**
     * Lấy danh sách wishlist của user đang đăng nhập — có phân trang và tìm kiếm.
     * Pattern giống BookController.getAll():
     *   GET /books?keyword=...&page=1&size=10&sortBy=id&sortDir=desc
     *   GET /wishlists?keyword=...&page=1&size=10&sortBy=createdAt&sortDir=desc
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<WishlistResponse>>> getMyWishlist(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ApiResponse.ok(
                wishlistService.getMyWishlist(extractUserId(jwt), keyword, page, size, sortBy, sortDir)
        );
    }

    /**
     * Thêm sách vào wishlist.
     * POST /wishlists/{bookId}
     */
    @PostMapping("/{bookId}")
    public ResponseEntity<ApiResponse<WishlistResponse>> addToWishlist(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ApiResponse.created(
                wishlistService.addToWishlist(extractUserId(jwt), bookId),
                "Đã thêm sách vào danh sách yêu thích."
        );
    }

    /**
     * Xóa sách khỏi wishlist theo bookId.
     * DELETE /wishlists/{bookId}
     */
    @DeleteMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Void>> removeFromWishlist(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        wishlistService.removeFromWishlist(extractUserId(jwt), bookId);
        return ApiResponse.ok(null, "Đã xóa sách khỏi danh sách yêu thích.");
    }

    /**
     * Toggle wishlist: thêm nếu chưa có, xóa nếu đã có.
     * POST /wishlists/{bookId}/toggle
     * Trả về:
     *   - WishlistResponse (added: true) khi thêm mới
     *   - { added: false } khi đã xóa
     */
    @PostMapping("/{bookId}/toggle")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleWishlist(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        WishlistResponse result = wishlistService.toggleWishlist(extractUserId(jwt), bookId);
        if (result != null) {
            return ApiResponse.ok(Map.of("added", true, "wishlist", result), "Đã thêm vào danh sách yêu thích.");
        } else {
            return ApiResponse.ok(Map.of("added", false), "Đã xóa khỏi danh sách yêu thích.");
        }
    }

    /**
     * Kiểm tra một sách cụ thể có trong wishlist không.
     * GET /wishlists/{bookId}/check
     */
    @GetMapping("/{bookId}/check")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> checkWishlist(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        boolean inWishlist = wishlistService.isInWishlist(extractUserId(jwt), bookId);
        return ApiResponse.ok(Map.of("inWishlist", inWishlist));
    }

    /**
     * Đếm tổng số sách trong wishlist.
     * GET /wishlists/count
     */
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> countMyWishlist(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(wishlistService.countMyWishlist(extractUserId(jwt)));
    }

    // ────────────────────────────────────────────
    // Helper: trích xuất userId từ JWT (giống CommentController, ReviewController)
    // ────────────────────────────────────────────
    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) return number.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
