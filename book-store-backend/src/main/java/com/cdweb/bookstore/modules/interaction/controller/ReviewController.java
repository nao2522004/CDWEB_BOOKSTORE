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

    

    @GetMapping("/book/{bookId}")
    public ResponseEntity<ApiResponse<Page<ReviewDTO>>> getByBook(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.ok(reviewService.getByBook(bookId, page, size));
    }

    

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ReviewDTO>> create(
            @RequestBody ReviewDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.created(
                reviewService.create(extractUserId(jwt), dto),
                "Đăng tải đánh giá thành công");
    }

    

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

    

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        reviewService.delete(extractUserId(jwt), id);
        return ApiResponse.ok(null, "Xóa đánh giá thành công");
    }

    

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) return number.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
