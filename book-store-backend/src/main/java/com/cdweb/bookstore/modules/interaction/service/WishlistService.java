package com.cdweb.bookstore.modules.interaction.service;

import com.cdweb.bookstore.common.exception.ResourceAlreadyExistsException;
import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.interaction.dto.WishlistResponse;
import com.cdweb.bookstore.modules.interaction.model.Wishlist;
import com.cdweb.bookstore.modules.interaction.repository.WishlistRepository;
import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository     userRepository;
    private final BookRepository     bookRepository;

    /**
     * Lấy danh sách wishlist của user hiện tại — có phân trang và tìm kiếm.
     * Pattern giống BookService.getAllBooks(keyword, categoryId, page, size, sortBy, sortDir).
     */
    @Transactional(readOnly = true)
    public Page<WishlistResponse> getMyWishlist(
            Long userId,
            String keyword,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        int pageIndex = Math.max(0, page - 1);
        Pageable pageable = PageRequest.of(pageIndex, size, sort);

        // keyword null/blank → truyền null để query bỏ qua điều kiện LIKE
        String kw = (keyword == null || keyword.isBlank()) ? null : keyword.trim();

        return wishlistRepository.searchWishlists(userId, kw, pageable)
                .map(WishlistResponse::from);
    }

    /**
     * Thêm sách vào wishlist.
     * Ném ResourceAlreadyExistsException nếu đã tồn tại.
     */
    @Transactional
    public WishlistResponse addToWishlist(Long userId, Long bookId) {
        if (wishlistRepository.existsByUserIdAndBookId(userId, bookId)) {
            throw new ResourceAlreadyExistsException("Sách này đã có trong danh sách yêu thích.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + bookId));

        Wishlist wishlist = Wishlist.builder()
                .user(user)
                .book(book)
                .build();

        return WishlistResponse.from(wishlistRepository.save(wishlist));
    }

    /**
     * Xóa sách khỏi wishlist theo bookId.
     * Ném ResourceNotFoundException nếu sách chưa có trong wishlist.
     */
    @Transactional
    public void removeFromWishlist(Long userId, Long bookId) {
        Wishlist wishlist = wishlistRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Sách không có trong danh sách yêu thích."));
        wishlistRepository.delete(wishlist);
    }

    /**
     * Toggle: nếu đã có thì xóa, chưa có thì thêm.
     * Trả về WishlistResponse khi thêm mới, null khi xóa.
     */
    @Transactional
    public WishlistResponse toggleWishlist(Long userId, Long bookId) {
        return wishlistRepository.findByUserIdAndBookId(userId, bookId)
                .map(existing -> {
                    wishlistRepository.delete(existing);
                    return (WishlistResponse) null;
                })
                .orElseGet(() -> addToWishlist(userId, bookId));
    }

    /**
     * Kiểm tra sách có trong wishlist của user không.
     */
    @Transactional(readOnly = true)
    public boolean isInWishlist(Long userId, Long bookId) {
        return wishlistRepository.existsByUserIdAndBookId(userId, bookId);
    }

    /**
     * Đếm tổng số sách trong wishlist.
     */
    @Transactional(readOnly = true)
    public long countMyWishlist(Long userId) {
        return wishlistRepository.countByUserId(userId);
    }
}
