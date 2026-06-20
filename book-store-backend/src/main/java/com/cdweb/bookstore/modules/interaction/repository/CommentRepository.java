package com.cdweb.bookstore.modules.interaction.repository;

import com.cdweb.bookstore.modules.interaction.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Lấy top-level comments (không có parent) theo sách
    // Điều kiện: comment gốc chưa bị xóa HOẶC đã bị xóa nhưng vẫn có ít nhất một reply con chưa bị xóa.
    @Query("SELECT c FROM Comment c WHERE c.book.id = :bookId AND c.parent IS NULL AND " +
           "(c.isDeleted = false OR EXISTS (SELECT 1 FROM Comment r WHERE r.parent.id = c.id AND r.isDeleted = false))")
    Page<Comment> findTopLevelComments(@Param("bookId") Long bookId, Pageable pageable);

    // Lấy tất cả replies chưa bị xóa của một danh sách comment cha (để tránh N+1 query)
    @Query("SELECT c FROM Comment c WHERE c.parent.id IN :parentIds AND c.isDeleted = false ORDER BY c.createdAt ASC")
    List<Comment> findRepliesByParentIds(@Param("parentIds") List<Long> parentIds);

    // Đếm tổng số comment chưa bị xóa của một cuốn sách (cả comment gốc và reply)
    long countByBookIdAndIsDeletedFalse(Long bookId);

    // Tìm comment chưa bị xóa theo id
    Optional<Comment> findByIdAndIsDeletedFalse(Long id);

    // Tìm comment chưa bị xóa theo id và userId (để xác nhận chủ sở hữu)
    Optional<Comment> findByIdAndUserIdAndIsDeletedFalse(Long id, Long userId);
}
