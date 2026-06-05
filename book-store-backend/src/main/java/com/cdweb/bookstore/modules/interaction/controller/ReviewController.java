package com.cdweb.bookstore.modules.interaction.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.interaction.dto.ReviewDTO;
import com.cdweb.bookstore.modules.interaction.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    /**
     * GET /reviews/book/{bookId}?page=1&size=10
     * Public — không cần đăng nhập.
     * Frontend: reviewAPI.getByBook(bookId, { page, size })
     */
    @GetMapping("/book/{bookId}")
    public ResponseEntity<ApiResponse<Page<ReviewDTO>>> getByBook(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.ok(reviewService.getByBook(bookId, page, size));
    }

    /**
     * POST /reviews
     * Yêu cầu đăng nhập.
     * Frontend: reviewAPI.create({ bookId, rating, comment })
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ReviewDTO>> create(
            @RequestBody ReviewDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.created(
                reviewService.create(extractUserId(jwt), dto),
                "Đăng tải đánh giá thành công");
    }

    /**
     * PUT /reviews/{id}
     * Chỉ chủ sở hữu mới được sửa.
     * Frontend: reviewAPI.update(id, { rating, comment })
     */
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ReviewDTO>> update(
            @PathVariable Long id,
            @RequestBody ReviewDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(
                reviewService.update(extractUserId(jwt), id, dto),
                "Cập nhật đánh giá thành công");
    }

    /**
     * DELETE /reviews/{id}
     * Chỉ chủ sở hữu mới được xóa.
     * Frontend: reviewAPI.delete(id)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        reviewService.delete(extractUserId(jwt), id);
        return ApiResponse.ok(null, "Xóa đánh giá thành công");
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) return number.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
