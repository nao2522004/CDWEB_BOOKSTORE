package com.cdweb.bookstore.modules.interaction.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.interaction.dto.ReviewDTO;
import com.cdweb.bookstore.modules.interaction.model.Review;
import com.cdweb.bookstore.modules.interaction.repository.ReviewRepository;
import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookRepository   bookRepository;
    private final UserRepository   userRepository;

    /**
     * GET /reviews/book/{bookId}?page=1&size=10
     * Lấy danh sách đánh giá của một cuốn sách, phân trang.
     */
    @Transactional(readOnly = true)
    public Page<ReviewDTO> getByBook(Long bookId, int page, int size) {
        int pageIndex = Math.max(0, page - 1);
        return reviewRepository
                .findByBookIdOrderByCreatedAtDesc(bookId, PageRequest.of(pageIndex, size))
                .map(ReviewDTO::from);
    }

    /**
     * POST /reviews
     * Tạo mới đánh giá. Mỗi user chỉ được review một cuốn sách một lần.
     */
    @Transactional
    public ReviewDTO create(Long userId, ReviewDTO dto) {
        if (reviewRepository.existsByUserIdAndBookId(userId, dto.getBookId())) {
            throw new RuntimeException("Bạn đã đánh giá cuốn sách này rồi.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));
        Book book = bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + dto.getBookId()));

        Review review = Review.builder()
                .user(user)
                .book(book)
                .rating(dto.getRating())
                .comment(dto.getComment())
                .build();

        return ReviewDTO.from(reviewRepository.save(review));
    }

    /**
     * PUT /reviews/{id}
     * Cập nhật nội dung đánh giá (chỉ chủ sở hữu mới được sửa).
     */
    @Transactional
    public ReviewDTO update(Long userId, Long reviewId, ReviewDTO dto) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy đánh giá hoặc bạn không có quyền chỉnh sửa"));

        if (dto.getRating() != null)  review.setRating(dto.getRating());
        if (dto.getComment() != null) review.setComment(dto.getComment());

        return ReviewDTO.from(reviewRepository.save(review));
    }

    /**
     * DELETE /reviews/{id}
     * Xóa đánh giá (chỉ chủ sở hữu mới được xóa).
     */
    @Transactional
    public void delete(Long userId, Long reviewId) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy đánh giá hoặc bạn không có quyền xóa"));
        reviewRepository.delete(review);
    }
}
