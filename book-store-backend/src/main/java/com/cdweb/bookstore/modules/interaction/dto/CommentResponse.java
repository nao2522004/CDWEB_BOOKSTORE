package com.cdweb.bookstore.modules.interaction.dto;

import com.cdweb.bookstore.modules.interaction.model.Comment;
import java.time.Instant;
import java.util.List;

public record CommentResponse(
    Long id,
    Long bookId,
    Long userId,
    String userName,
    String userAvatarUrl,
    Long parentId,
    String content,
    boolean isDeleted,
    Instant createdAt,
    Instant updatedAt,
    List<CommentResponse> replies   // chỉ điền khi load top-level
) {
    public static CommentResponse from(Comment c, List<CommentResponse> replies) {
        if (c.isDeleted()) {
            return new CommentResponse(
                c.getId(),
                c.getBook().getId(),
                null,
                "Người dùng ẩn danh",
                null,
                c.getParent() != null ? c.getParent().getId() : null,
                "Bình luận đã bị xóa",
                true,
                c.getCreatedAt(),
                c.getUpdatedAt(),
                replies
            );
        }

        return new CommentResponse(
            c.getId(),
            c.getBook().getId(),
            c.getUser().getId(),
            c.getUser().getName(),
            c.getUser().getAvatarUrl(),
            c.getParent() != null ? c.getParent().getId() : null,
            c.getContent(),
            false,
            c.getCreatedAt(),
            c.getUpdatedAt(),
            replies
        );
    }
}
