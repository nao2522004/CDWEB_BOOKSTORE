package com.cdweb.bookstore.modules.interaction.repository;

import com.cdweb.bookstore.modules.interaction.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByBookIdOrderByCreatedAtDesc(Long bookId, Pageable pageable);

    boolean existsByUserIdAndBookId(Long userId, Long bookId);

    Optional<Review> findByIdAndUserId(Long reviewId, Long userId);
}
