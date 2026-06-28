package com.cdweb.bookstore.modules.interaction.repository;

import com.cdweb.bookstore.modules.interaction.model.Wishlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    /**
     * Tìm kiếm wishlist của user với phân trang.
     * Hỗ trợ tìm kiếm theo tên sách (keyword).
     * Tương tự BookRepository.searchBooks()
     */
    @Query("""
            SELECT w FROM Wishlist w
            JOIN FETCH w.book b
            WHERE w.user.id = :userId
              AND (:keyword IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')))
            ORDER BY w.createdAt DESC
            """)
    Page<Wishlist> searchWishlists(
            @Param("userId") Long userId,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    /** Kiểm tra sách đã có trong wishlist chưa */
    boolean existsByUserIdAndBookId(Long userId, Long bookId);

    /** Xóa theo userId + bookId (toggle wishlist) */
    Optional<Wishlist> findByUserIdAndBookId(Long userId, Long bookId);

    /** Đếm tổng số sách trong wishlist của user */
    long countByUserId(Long userId);
}
