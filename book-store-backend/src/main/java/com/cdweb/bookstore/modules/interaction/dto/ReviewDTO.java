package com.cdweb.bookstore.modules.interaction.dto;

import com.cdweb.bookstore.modules.interaction.model.Review;
import lombok.*;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private Long id;
    private Long userId;
    private String userName;
    private Long bookId;
    private Instant createdAt;

    private Integer rating;
    private String comment;

    public static ReviewDTO from(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .userId(review.getUser().getId())
                .userName(review.getUser().getName())
                .bookId(review.getBook().getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
