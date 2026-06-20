package com.cdweb.bookstore.modules.interaction.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CommentRequest(
    Long bookId,

    Long parentId,          // null nếu là bình luận gốc

    @NotBlank(message = "Nội dung bình luận không được để trống")
    @Size(max = 2000, message = "Nội dung bình luận tối đa 2000 ký tự")
    String content
) {}
