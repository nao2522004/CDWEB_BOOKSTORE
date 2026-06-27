package com.cdweb.bookstore.modules.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDTO {
    private Long id;

    @NotBlank(message = "Tên tác giả không được để trống")
    private String name;

    private String bio;
    private String avatarUrl;
}