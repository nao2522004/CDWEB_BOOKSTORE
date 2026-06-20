import { useState } from 'react';
import { commentAPI } from '../../api';
import { formatDate } from '../../utils';
import CommentForm from './CommentForm';

export default function CommentItem({
  comment,
  currentUser,
  bookId,
  onCommentUpdate,
  onCommentDelete,
  onReplyCreate
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isAdmin = currentUser?.roles?.includes('ADMIN') || currentUser?.roles?.includes('ROLE_ADMIN');
  const isOwner = currentUser && currentUser.id === comment.userId;
  const canEdit = isOwner && !comment.isDeleted;
  const canDelete = currentUser && (isOwner || isAdmin) && !comment.isDeleted;
  const canReply = comment.parentId === null && !comment.isDeleted; // Chỉ comment gốc chưa bị xóa mới được reply

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn gỡ bỏ lời luận bàn này không?')) return;
    setDeleting(true);
    try {
      await commentAPI.delete(comment.id);
      if (onCommentDelete) {
        onCommentDelete(comment.id, comment.parentId);
      }
    } catch (err) {
      alert(err.message || 'Lỗi khi xóa bình luận.');
    } finally {
      setDeleting(false);
    }
  };

  const handleEditSuccess = (updatedComment) => {
    setIsEditing(false);
    if (onCommentUpdate) {
      onCommentUpdate(updatedComment);
    }
  };

  const handleReplySuccess = (newReply) => {
    setIsReplying(false);
    if (onReplyCreate) {
      onReplyCreate(newReply);
    }
  };

  return (
    <div className="group pt-5 first:pt-0">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div 
          className={`w-8 h-8 rounded-[1px] border border-[#8B6508]/60 bg-[#F3EFE6] flex items-center justify-center text-xs font-bold text-[#2C2114] select-none shrink-0 ${comment.isDeleted ? 'opacity-50' : ''}`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {comment.isDeleted ? '?' : comment.userName?.charAt(0).toUpperCase()}
        </div>

        {/* Comment Content Area */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <span 
              className={`font-bold text-xs uppercase tracking-wide ${comment.isDeleted ? 'text-stone-400 italic font-medium' : 'text-[#2C2114]'}`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {comment.userName}
            </span>
            {isAdmin && !comment.isDeleted && comment.userId === comment.userId && (
              <span className="text-[8px] uppercase tracking-widest bg-[#8B6508]/10 border border-[#8B6508]/30 text-[#8B6508] px-1 font-bold">Admin</span>
            )}
            <span 
              className="text-[9px] tracking-wider text-[#A8967E] uppercase font-bold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ❖ {formatDate(comment.createdAt)}
            </span>
          </div>

          {isEditing ? (
            <div className="mt-2">
              <CommentForm
                bookId={bookId}
                parentId={comment.id}
                initialValue={comment.content}
                onSubmitSuccess={handleEditSuccess}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <>
              <p 
                className={`text-stone-700 font-serif text-sm md:text-base text-justify leading-relaxed whitespace-pre-wrap ${comment.isDeleted ? 'italic text-stone-400/80 font-serif' : ''}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {comment.content}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-2 select-none" style={{ fontFamily: "'Cinzel', serif" }}>
                {canReply && (
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        alert('Vui lòng đăng nhập để phản hồi bình luận.');
                        return;
                      }
                      setIsReplying(!isReplying);
                    }}
                    className="text-[10px] uppercase font-extrabold text-[#A8967E] hover:text-[#8B6508] transition-colors"
                  >
                    Trả lời
                  </button>
                )}
                {canEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-[10px] uppercase font-extrabold text-[#A8967E] hover:text-[#8B6508] transition-colors"
                  >
                    Sửa
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-[10px] uppercase font-extrabold text-[#A8967E] hover:text-red-700 transition-colors disabled:opacity-50"
                  >
                    {deleting ? 'Đang gỡ...' : 'Gỡ bỏ'}
                  </button>
                )}
              </div>
            </>
          )}

          {/* Inline Reply Form */}
          {isReplying && (
            <div className="mt-4 border-l-2 border-[#8B6508]/30 pl-4 py-1">
              <CommentForm
                bookId={bookId}
                parentId={comment.id}
                onSubmitSuccess={handleReplySuccess}
                onCancel={() => setIsReplying(false)}
                placeholder={`Đang phản hồi luận đàm của ${comment.userName}...`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies (Only rendered for top-level comments) */}
      {comment.parentId === null && comment.replies && comment.replies.length > 0 && (
        <div className="pl-8 md:pl-11 border-l border-[#D4C4A8]/30 mt-4 space-y-5">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              bookId={bookId}
              onCommentUpdate={onCommentUpdate}
              onCommentDelete={onCommentDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
