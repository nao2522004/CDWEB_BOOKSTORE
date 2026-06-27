package com.cdweb.bookstore.modules.product.dto;

import com.cdweb.bookstore.modules.product.model.Book;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    
    private Long id;

    @NotBlank(message = "Tên sách không được để trống")
    private String title;

    @NotBlank(message = "Slug không được để trống")
    private String slug;

    private String description;
    private String isbn;

    @NotNull(message = "Giá bán không được để trống")
    @Min(value = 0, message = "Giá bán phải lớn hơn hoặc bằng 0")
    private BigDecimal price;

    @Min(value = 0, message = "Giá khuyến mãi phải lớn hơn hoặc bằng 0")
    private BigDecimal discountPrice;

    @NotNull(message = "Số lượng kho không được để trống")
    @Min(value = 0, message = "Số lượng kho phải lớn hơn hoặc bằng 0")
    private Integer stockQuantity;

    @Min(value = 1, message = "Số trang phải lớn hơn 0")
    private Integer pages;

    private String language;

    @NotNull(message = "Danh mục không được để trống")
    private Long categoryId;

    @NotNull(message = "Nhà xuất bản không được để trống")
    private Long publisherId;
    private Instant publishedDate;
    private Book.Status status;
    private Boolean isDeleted;
    private String coverImageUrl;
    private String coverUrl;
    private List<Long> authorIds;
    private List<AuthorDTO> authors;
    private PublisherDTO publisher;
    private List<CategoryDTO> categories;
}