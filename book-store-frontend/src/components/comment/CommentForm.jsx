import { useState } from 'react';
import { commentAPI } from '../../api';
import { ErrorMsg } from '../common';

export default function CommentForm({
  bookId,
  parentId = null,
  initialValue = '',
  onSubmitSuccess,
  onCancel,
  placeholder = 'Viết lời luận đàm của bạn tại đây...'
}) {
  const [content, setContent] = useState(initialValue);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(false);
    setError('');
    setSubmitting(true);

    try {
      let data;
      if (initialValue) {
        // Mode chỉnh sửa
        data = await commentAPI.update(parentId, content);
      } else {
        // Mode tạo mới
        data = await commentAPI.create({
          bookId,
          parentId,
          content: content.trim()
        });
      }
      setContent('');
      if (onSubmitSuccess) {
        onSubmitSuccess(data.data);
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={parentId ? 3 : 4}
        className="w-full bg-transparent border border-[#D4C4A8] rounded-[1px] p-4 text-sm focus:outline-none focus:border-[#8B6508] placeholder-[#A8967E]/60 font-serif italic text-[#140E0A] resize-none transition-colors"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        disabled={submitting}
      />
      {error && <ErrorMsg message={error} />}
      <div className="flex gap-2.5 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#D4C4A8]/80 text-[#2C2114]/80 hover:text-[#2C2114] text-xs font-bold uppercase tracking-widest transition-colors rounded-[1px]"
            style={{ fontFamily: "'Cinzel', serif" }}
            disabled={submitting}
          >
            Hủy bỏ
          </button>
        )}
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="bg-[#2C2114] hover:bg-[#8B6508] text-[#FAF5EC] px-5 py-2 uppercase tracking-widest text-xs font-bold transition-colors disabled:opacity-40 rounded-[1px]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {submitting ? 'Đang gửi...' : initialValue ? 'Cập nhật' : parentId ? 'Phản hồi' : 'Ký danh gửi ngôn'}
        </button>
      </div>
    </form>
  );
}
