package com.cdweb.bookstore.modules.interaction.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.interaction.dto.CommentRequest;
import com.cdweb.bookstore.modules.interaction.dto.CommentResponse;
import com.cdweb.bookstore.modules.interaction.model.Comment;
import com.cdweb.bookstore.modules.interaction.repository.CommentRepository;
import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BookRepository    bookRepository;
    private final UserRepository    userRepository;

    /**
     * Lấy danh sách comments phân trang của một cuốn sách (chỉ top-level comments)
     * kèm theo các replies được nạp bằng Batch Fetching.
     */
    @Transactional(readOnly = true)
    public Page<CommentResponse> getByBook(Long bookId, int page, int size) {
        int pageIndex = Math.max(0, page - 1);
        Page<Comment> topLevels = commentRepository.findTopLevelComments(bookId, PageRequest.of(pageIndex, size));

        if (topLevels.isEmpty()) {
            return topLevels.map(c -> CommentResponse.from(c, Collections.emptyList()));
        }

        // Tối ưu N+1 Query: Lấy toàn bộ replies của tất cả comments cha trong trang hiện tại chỉ với 1 query
        List<Long> parentIds = topLevels.stream().map(Comment::getId).toList();
        List<Comment> allReplies = commentRepository.findRepliesByParentIds(parentIds);

        // Nhóm các replies theo parentId
        Map<Long, List<CommentResponse>> repliesMap = allReplies.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getParent().getId(),
                        Collectors.mapping(r -> CommentResponse.from(r, null), Collectors.toList())
                ));

        // Ánh xạ comments cha kèm theo danh sách replies tương ứng
        return topLevels.map(c -> CommentResponse.from(c, repliesMap.getOrDefault(c.getId(), Collections.emptyList())));
    }

    /**
     * Tạo một comment mới hoặc reply cho comment cha
     */
    @Transactional
    public CommentResponse create(Long userId, CommentRequest request) {
        if (request.bookId() == null) {
            throw new IllegalArgumentException("Book ID không được để trống");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + request.bookId()));

        Comment parent = null;
        if (request.parentId() != null) {
            parent = commentRepository.findByIdAndIsDeletedFalse(request.parentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Bình luận cha không tồn tại hoặc đã bị xóa"));

            // Validate parent comment
            if (!parent.getBook().getId().equals(request.bookId())) {
                throw new IllegalArgumentException("Bình luận cha không thuộc cùng tác phẩm");
            }
            if (parent.getParent() != null) {
                throw new IllegalArgumentException("Hệ thống chỉ hỗ trợ phản hồi bình luận lồng nhau tối đa 1 cấp");
            }
        }

        Comment comment = Comment.builder()
                .book(book)
                .user(user)
                .parent(parent)
                .content(request.content())
                .build();

        Comment saved = commentRepository.save(comment);
        return CommentResponse.from(saved, Collections.emptyList());
    }

    /**
     * Chỉnh sửa nội dung comment (Chỉ chủ sở hữu được sửa)
     */
    @Transactional
    public CommentResponse update(Long userId, Long commentId, String content) {
        Comment comment = commentRepository.findByIdAndUserIdAndIsDeletedFalse(commentId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bình luận hoặc bạn không có quyền chỉnh sửa"));

        comment.setContent(content);
        Comment saved = commentRepository.save(comment);
        return CommentResponse.from(saved, Collections.emptyList());
    }

    /**
     * Xóa bình luận (Chủ sở hữu hoặc Admin được xóa)
     */
    @Transactional
    public void delete(Long userId, Long commentId, boolean isAdmin) {
        Comment comment = commentRepository.findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Bình luận không tồn tại hoặc đã bị xóa"));

        if (!comment.getUser().getId().equals(userId) && !isAdmin) {
            throw new AccessDeniedException("Bạn không có quyền xóa bình luận này");
        }

        // Soft delete
        comment.setDeleted(true);
        commentRepository.save(comment);
    }

    /**
     * Đếm số bình luận chưa bị xóa của một sách
     */
    @Transactional(readOnly = true)
    public long countByBook(Long bookId) {
        return commentRepository.countByBookIdAndIsDeletedFalse(bookId);
    }
}
