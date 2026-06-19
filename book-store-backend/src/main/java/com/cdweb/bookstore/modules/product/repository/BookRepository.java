package com.cdweb.bookstore.modules.product.repository;

import com.cdweb.bookstore.modules.product.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findBySlug(String slug);

    boolean existsByIsbn(String isbn);

    boolean existsBySlug(String slug);

    @Query("SELECT b FROM Book b WHERE " +
            "(b.isDeleted IS NULL OR b.isDeleted = false) AND " +
            "(:categoryId IS NULL OR b.category.id = :categoryId) AND " +
            "(:keyword IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.isbn) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.slug) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Book> searchBooks(@Param("keyword") String keyword, @Param("categoryId") Long categoryId, Pageable pageable);

    @Modifying
    @Query("UPDATE Book b SET b.stockQuantity = b.stockQuantity - :qty " +
            "WHERE b.id = :id AND b.stockQuantity >= :qty")
    int decreaseStock(@Param("id") Long id, @Param("qty") int qty);

    @Modifying
    @Query("UPDATE Book b SET b.stockQuantity = b.stockQuantity + :qty WHERE b.id = :id")
    void increaseStock(@Param("id") Long id, @Param("qty") int qty);

    @Query(value = "SELECT oi.book_id as bookId, b.title as title, b.cover_url as coverUrl, " +
                   "SUM(oi.quantity) as totalSoldQuantity " +
                   "FROM order_items oi " +
                   "JOIN books b ON oi.book_id = b.id " +
                   "JOIN orders o ON oi.order_id = o.id " +
                   "WHERE o.status = 'DELIVERED' " +
                   "GROUP BY oi.book_id, b.title, b.cover_url " +
                   "ORDER BY totalSoldQuantity DESC LIMIT 5", nativeQuery = true)
    java.util.List<com.cdweb.bookstore.modules.order.dto.TopBookProjection> getTopSellingBooks();
}