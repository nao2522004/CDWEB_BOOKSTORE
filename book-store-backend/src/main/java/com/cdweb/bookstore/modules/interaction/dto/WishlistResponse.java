package com.cdweb.bookstore.modules.interaction.dto;

import com.cdweb.bookstore.modules.interaction.model.Wishlist;

import java.math.BigDecimal;
import java.time.Instant;

public record WishlistResponse(
        Long wishlistId,
        Long bookId,
        String bookTitle,
        String bookSlug,
        String coverImageUrl,
        BigDecimal price,
        BigDecimal discountPrice,
        String categoryName,
        Instant addedAt
) {
    public static WishlistResponse from(Wishlist w) {
        var book = w.getBook();
        return new WishlistResponse(
                w.getId(),
                book.getId(),
                book.getTitle(),
                book.getSlug(),
                book.getCoverUrl(),
                book.getPrice(),
                book.getDiscountPrice(),
                book.getCategory() != null ? book.getCategory().getName() : null,
                w.getCreatedAt()
        );
    }
}
