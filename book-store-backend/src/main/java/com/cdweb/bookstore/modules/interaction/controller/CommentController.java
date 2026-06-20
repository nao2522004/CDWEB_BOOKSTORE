package com.cdweb.bookstore.modules.interaction.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.interaction.dto.CommentRequest;
import com.cdweb.bookstore.modules.interaction.dto.CommentResponse;
import com.cdweb.bookstore.modules.interaction.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    /**
     * Lấy danh sách comments của một cuốn sách (phân trang, cho phép truy cập vãng lai)
     */
    @GetMapping("/book/{bookId}")
    public ResponseEntity<ApiResponse<Page<CommentResponse>>> getByBook(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.ok(commentService.getByBook(bookId, page, size));
    }

    /**
     * Tạo comment mới hoặc reply (yêu cầu đăng nhập)
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CommentResponse>> create(
            @Valid @RequestBody CommentRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.created(
                commentService.create(extractUserId(jwt), request),
                "Bình luận của bạn đã được đăng tải thành công."
        );
    }

    /**
     * Sửa bình luận (yêu cầu đăng nhập, chỉ chủ sở hữu được sửa)
     */
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CommentResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest request, // chỉ cần truyền trường content, có thể sử dụng lại CommentRequest
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(
                commentService.update(extractUserId(jwt), id, request.content()),
                "Cập nhật bình luận thành công."
        );
    }

    /**
     * Xóa bình luận (yêu cầu đăng nhập, chủ sở hữu hoặc admin được xóa)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        boolean isAdmin = false;
        List<String> roles = jwt.getClaimAsStringList("roles");
        if (roles != null && (roles.contains("ADMIN") || roles.contains("ROLE_ADMIN"))) {
            isAdmin = true;
        }

        commentService.delete(extractUserId(jwt), id, isAdmin);
        return ApiResponse.ok(null, "Xóa bình luận thành công.");
    }

    /**
     * Đếm tổng số bình luận hoạt động của một cuốn sách (public)
     */
    @GetMapping("/book/{bookId}/count")
    public ResponseEntity<ApiResponse<Long>> countByBook(@PathVariable Long bookId) {
        return ApiResponse.ok(commentService.countByBook(bookId));
    }

    /**
     * Hàm helper trích xuất userId từ JWT Token
     */
    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) {
            return number.longValue();
        }
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
