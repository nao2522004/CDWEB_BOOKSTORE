package com.cdweb.bookstore.modules.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublisherDTO {
    private Long id;

    @NotBlank(message = "Tên nhà xuất bản không được để trống")
    private String name;

    private String description;
    private String website;
}