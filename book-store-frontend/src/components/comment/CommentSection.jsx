import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { commentAPI } from '../../api';
import { Spinner, Empty, ErrorMsg } from '../common';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

export default function CommentSection({ bookId, onCountChange }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [commentCount, setCommentCount] = useState(0);

  // Lấy dữ liệu comment ban đầu và số lượng
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      setError('');
      try {
        const [commentsRes, countRes] = await Promise.all([
          commentAPI.getByBook(bookId, { page: 1, size: 10 }),
          commentAPI.countByBook(bookId)
        ]);
        
        setComments(commentsRes.data.content || []);
        const total = countRes.data || 0;
        setCommentCount(total);
        if (onCountChange) onCountChange(total);
        
        setPage(1);
        const hasNext = commentsRes.data.hasNext ?? (commentsRes.data.page < commentsRes.data.totalPages);
        setHasMore(hasNext);
      } catch (err) {
        setError(err.message || 'Không thể nạp danh sách bình luận.');
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [bookId]);

  // Tải thêm trang tiếp theo
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const res = await commentAPI.getByBook(bookId, { page: nextPage, size: 10 });
      const newComments = res.data.content || [];
      setComments(prev => [...prev, ...newComments]);
      setPage(nextPage);
      const hasNext = res.data.hasNext ?? (res.data.page < res.data.totalPages);
      setHasMore(hasNext);
    } catch (err) {
      setError(err.message || 'Lỗi khi tải thêm bình luận.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleCommentCreateSuccess = (newComment) => {
    // Thêm comment cha mới vào đầu danh sách
    setComments(prev => [newComment, ...prev]);
    const nextCount = commentCount + 1;
    setCommentCount(nextCount);
    if (onCountChange) onCountChange(nextCount);
  };

  const handleReplyCreateSuccess = (newReply) => {
    // Chèn reply mới vào comment cha
    setComments(prev => prev.map(c => {
      if (c.id === newReply.parentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply]
        };
      }
      return c;
    }));
    const nextCount = commentCount + 1;
    setCommentCount(nextCount);
    if (onCountChange) onCountChange(nextCount);
  };

  const handleCommentUpdate = (updatedComment) => {
    setComments(prev => prev.map(c => {
      // Nếu là comment gốc
      if (c.id === updatedComment.id) {
        return { ...c, content: updatedComment.content };
      }
      // Nếu là reply con
      if (c.replies && c.replies.length > 0) {
        return {
          ...c,
          replies: c.replies.map(r => r.id === updatedComment.id ? { ...r, content: updatedComment.content } : r)
        };
      }
      return c;
    }));
  };

  const handleCommentDelete = (commentId, parentId) => {
    setComments(prev => prev.map(c => {
      // 1. Nếu comment gốc bị xóa
      if (c.id === commentId) {
        if (c.replies && c.replies.length > 0) {
          // Soft delete cha vì có replies
          return {
            ...c,
            isDeleted: true,
            content: 'Bình luận đã bị xóa',
            userName: 'Người dùng ẩn danh',
            userId: null
          };
        } else {
          // Xóa hẳn cha vì không có replies
          return null;
        }
      }

      // 2. Nếu reply con bị xóa
      if (parentId && c.id === parentId) {
        const updatedReplies = c.replies.filter(r => r.id !== commentId);
        // Nếu cha cũng đã bị soft-delete và nay không còn reply nào nữa, ẩn luôn cha
        if (c.isDeleted && updatedReplies.length === 0) {
          return null;
        }
        return {
          ...c,
          replies: updatedReplies
        };
      }
      return c;
    }).filter(Boolean));

    const nextCount = Math.max(0, commentCount - 1);
    setCommentCount(nextCount);
    if (onCountChange) onCountChange(nextCount);
  };

  return (
    <div className="space-y-8 text-[#2C2114]">
      {/* Box nhập luận đàm (nếu đã login) */}
      {user ? (
        <div className="border border-[#D4C4A8]/60 bg-[#F3EFE6]/40 p-6 space-y-4 rounded-[1px]">
          <h3 
            className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114]" 
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Để lại bút tích luận đàm
          </h3>
          <CommentForm
            bookId={bookId}
            onSubmitSuccess={handleCommentCreateSuccess}
            placeholder="Luận bàn về giá trị tác phẩm hoặc câu chuyện của bạn tại đây..."
          />
        </div>
      ) : (
        <div 
          className="border border-[#D4C4A8]/50 bg-[#F3EFE6]/20 p-6 text-center rounded-[1px] font-serif italic text-stone-500 text-sm"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Hãy{' '}
          <Link to="/login" className="text-[#8B6508] font-bold not-italic hover:underline uppercase tracking-wider text-xs px-1 font-sans">
            Đăng nhập
          </Link>{' '}
          để ghi lại bút tích luận đàm của bạn về thư tịch này.
        </div>
      )}

      {error && <ErrorMsg message={error} />}

      {/* Danh sách bình luận */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : comments.length === 0 ? (
        <div className="py-6">
          <Empty icon="❖" message="Tác phẩm này hiện chưa có học giả nào để lại lời luận bàn." />
        </div>
      ) : (
        <div className="divide-y divide-[#D4C4A8]/30 space-y-6">
          {comments.map(c => (
            <CommentItem
              key={c.id}
              comment={c}
              currentUser={user}
              bookId={bookId}
              onCommentUpdate={handleCommentUpdate}
              onCommentDelete={handleCommentDelete}
              onReplyCreate={handleReplyCreateSuccess}
            />
          ))}
        </div>
      )}

      {/* Nút load more */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="h-10 px-6 border border-[#D4C4A8] text-xs font-bold uppercase tracking-widest text-[#2C2114] hover:bg-[#2C2114] hover:text-[#FAF5EC] transition-all duration-300 rounded-[1px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {loadingMore ? 'Đang nạp...' : 'Xem thêm luận đàm'}
          </button>
        </div>
      )}
    </div>
  );
}
