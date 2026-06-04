import { useState, useEffect, useCallback } from 'react';
import { bookAPI, adminAPI, categoryAPI, authorAPI, publisherAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminTextarea, AdminSelect, StatusBadge,
  useConfirm, AdminPagination, useAdminToast,
} from './AdminComponents';

const STATUS_MAP = {
  ACTIVE: { label: 'Đang Bán', color: '#182522' },
  INACTIVE: { label: 'Ngừng Bán', color: '#4A3C31' },
  OUT_OF_STOCK: { label: 'Hết Hàng', color: '#632025' },
};

const EMPTY_FORM = {
  title: '', slug: '', description: '', isbn: '',
  price: '', discountPrice: '', stockQuantity: '',
  pages: '', language: 'vi', categoryId: '', publisherId: '',
  publishedDate: '', status: 'ACTIVE', authorIds: [],
};

function slugify(str) {
  return str.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function AdminBooks() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const { confirm, Dialog: ConfirmDialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await bookAPI.getAll({ keyword: keyword || undefined, page, size: 15, sortBy: 'id', sortDir: 'desc' });
      setBooks(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [keyword, page]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  useEffect(() => {
    Promise.all([
      categoryAPI.getAll({ size: 100 }),
      authorAPI.getAll({ size: 200 }),
      publisherAPI.getAll({ size: 100 }),
    ]).then(([c, a, p]) => {
      setCategories(c.data?.content || c.data || []);
      setAuthors(a.data?.content || a.data || []);
      setPublishers(p.data?.content || p.data || []);
    });
  }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true); };

  const openEdit = (book) => {
    setEditing(book);
    setForm({
      title: book.title || '',
      slug: book.slug || '',
      description: book.description || '',
      isbn: book.isbn || '',
      price: book.price || '',
      discountPrice: book.discountPrice || '',
      stockQuantity: book.stockQuantity || '',
      pages: book.pages || '',
      language: book.language || 'vi',
      categoryId: book.categoryId || '',
      publisherId: book.publisherId || '',
      publishedDate: book.publishedDate ? book.publishedDate.split('T')[0] : '',
      status: book.status || 'ACTIVE',
      authorIds: book.authorIds || [],
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        discountPrice: form.discountPrice ? parseFloat(form.discountPrice) : null,
        stockQuantity: parseInt(form.stockQuantity) || 0,
        pages: form.pages ? parseInt(form.pages) : null,
        categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        publisherId: form.publisherId ? parseInt(form.publisherId) : null,
        publishedDate: form.publishedDate ? new Date(form.publishedDate).toISOString() : null,
        authorIds: form.authorIds.map(Number),
      };
      if (editing) {
        await adminAPI.books.update(editing.id, payload);
        toast('Cập nhật sách thành công');
      } else {
        await adminAPI.books.create(payload);
        toast('Thêm thư tịch mới thành công');
      }
      setModalOpen(false);
      fetchBooks();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (book) => {
    const ok = await confirm(`Xác nhận tiêu hủy ấn bản "${book.title}"?`);
    if (!ok) return;
    try {
      await adminAPI.books.delete(book.id);
      toast('Đã tiêu hủy ấn bản');
      fetchBooks();
    } catch (e) { toast(e.message, 'error'); }
  };

  const toggleAuthor = (id) => {
    setForm(f => ({
      ...f,
      authorIds: f.authorIds.includes(id)
        ? f.authorIds.filter(a => a !== id)
        : [...f.authorIds, id],
    }));
  };

  const columns = [
    {
      key: 'id',
      label: 'MÃ',
      width: '60px',
      render: v => <span className="text-[#996515] font-mono text-xs">{v}</span>
    },
    {
      key: 'title',
      label: 'TÊN SÁCH',
      render: (v, row) => (
        <div>
          <p className="font-bold text-[#E8DCC4] text-sm font-serif tracking-wide">{v}</p>
          <p className="text-[11px] text-[#A89F91] font-mono mt-1">ISBN: {row.isbn || 'N/A'}</p>
        </div>
      )
    },
    {
      key: 'price',
      label: 'GIÁ TRỊ',
      render: (v, row) => (
        <div>
          <p className="text-[#B8860B] font-bold text-sm font-mono">
            {new Intl.NumberFormat('vi-VN').format(row.discountPrice || v)}đ
          </p>
          {row.discountPrice && (
            <p className="text-[11px] text-[#7A6A58] line-through font-mono">
              {new Intl.NumberFormat('vi-VN').format(v)}đ
            </p>
          )}
        </div>
      )
    },
    {
      key: 'stockQuantity',
      label: 'LƯU KHO',
      render: v => (
        <span className={`font-mono font-bold text-sm ${v === 0 ? 'text-[#D97777]' : v < 5 ? 'text-[#D4A017]' : 'text-[#8BA896]'}`}>
          {v ?? 0}
        </span>
      )
    },
    {
      key: 'status',
      label: 'TÌNH TRẠNG',
      render: v => <StatusBadge status={v} map={STATUS_MAP} />,
    },
    {
      key: '_actions',
      label: '',
      render: (_, row) => (
        <div className="flex gap-3 justify-end">
          <AdminBtn size="sm" variant="secondary" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" onClick={() => handleDelete(row)}>Xóa</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl text-[#E8DCC4]">
      <AdminPageHeader
        title="Quản Lý Thư Tịch"
        subtitle={`Hiện có ${books?.totalElements ?? 0} đầu sách trong kho`}
        action={
          <AdminBtn onClick={openCreate} className="bg-[#996515] hover:bg-[#B8860B] text-[#FDFBF7] transition-colors border border-[#B8860B]/30">
            + Bổ Sung Sách
          </AdminBtn>
        }
      />

      <div className="flex gap-3 mb-6">
        <AdminSearch
          value={keyword}
          onChange={v => { setKeyword(v); setPage(1); }}
          placeholder="Tra cứu theo tên, mã ISBN, slug..."
          className="bg-[#2A231D] border-[#4A3C31] text-[#E8DCC4] placeholder-[#8C7D6A] focus:border-[#996515]"
        />
      </div>

      <AdminTable
        columns={columns}
        data={books?.content}
        loading={loading}
        emptyMsg="Chưa có dữ liệu thư tịch"
        className="border-[#4A3C31]"
      />

      <AdminPagination data={books} page={page} onPageChange={setPage} />

      {/* Form Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Hiệu Đính Thông Tin' : 'Nhập Liệu Sách Mới'}
        width="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5 bg-[#1F1A17] p-6 rounded-[2px] border border-[#4A3C31]">
          <div className="grid grid-cols-2 gap-5">
            <FormField label="Tên Sách" required>
              <AdminInput
                value={form.title}
                onChange={v => setForm(f => ({ ...f, title: v, slug: f.slug || slugify(v) }))}
                placeholder="Tiêu đề đầy đủ"
              />
            </FormField>
            <FormField label="Slug" required>
              <AdminInput
                value={form.slug}
                onChange={v => setForm(f => ({ ...f, slug: v }))}
                placeholder="ten-sach-slug"
              />
            </FormField>
          </div>

          <FormField label="Mô Tả Nội Dung">
            <AdminTextarea
              value={form.description}
              onChange={v => setForm(f => ({ ...f, description: v }))}
              rows={3}
              placeholder="Tóm tắt hệ tư tưởng hoặc nội dung tác phẩm..."
            />
          </FormField>

          <div className="grid grid-cols-2 gap-5">
            <FormField label="Mã ISBN">
              <AdminInput value={form.isbn} onChange={v => setForm(f => ({ ...f, isbn: v }))} placeholder="Ví dụ: 978-..." />
            </FormField>
            <FormField label="Ngôn Ngữ">
              <AdminInput value={form.language} onChange={v => setForm(f => ({ ...f, language: v }))} placeholder="vi" />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <FormField label="Giá Niêm Yết (VNĐ)" required>
              <AdminInput type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="0" />
            </FormField>
            <FormField label="Giá Ưu Đãi">
              <AdminInput type="number" value={form.discountPrice} onChange={v => setForm(f => ({ ...f, discountPrice: v }))} placeholder="Bỏ trống nếu không giảm" />
            </FormField>
            <FormField label="Số Lượng Lưu Kho" required>
              <AdminInput type="number" value={form.stockQuantity} onChange={v => setForm(f => ({ ...f, stockQuantity: v }))} placeholder="0" />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <FormField label="Tổng Số Trang">
              <AdminInput type="number" value={form.pages} onChange={v => setForm(f => ({ ...f, pages: v }))} />
            </FormField>
            <FormField label="Ngày Xuất Bản">
              <AdminInput type="date" value={form.publishedDate} onChange={v => setForm(f => ({ ...f, publishedDate: v }))} />
            </FormField>
            <FormField label="Tình Trạng" required>
              <AdminSelect
                value={form.status}
                onChange={v => setForm(f => ({ ...f, status: v }))}
                options={[
                  { value: 'ACTIVE', label: 'Đang Bán' },
                  { value: 'INACTIVE', label: 'Ngừng Bán' },
                  { value: 'OUT_OF_STOCK', label: 'Hết Hàng' },
                ]}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField label="Phân Lược Danh Mục" required>
              <AdminSelect
                value={form.categoryId}
                onChange={v => setForm(f => ({ ...f, categoryId: v }))}
                placeholder="-- Chọn danh mục --"
                options={categories.map(c => ({ value: c.id, label: c.name }))}
              />
            </FormField>
            <FormField label="Đơn Vị Xuất Bản" required>
              <AdminSelect
                value={form.publisherId}
                onChange={v => setForm(f => ({ ...f, publisherId: v }))}
                placeholder="-- Chọn NXB --"
                options={publishers.map(p => ({ value: p.id, label: p.name }))}
              />
            </FormField>
          </div>

          <FormField label="Ghi Nhận Tác Giả (Có thể chọn nhiều)">
            {/* Box chứa danh sách tác giả mang sắc thái Gỗ sáng hơn một chút (bg-[#2A231D]) */}
            <div className="bg-[#2A231D] border border-[#4A3C31] rounded-[2px] p-4 max-h-40 overflow-y-auto shadow-inner scrollbar-thin scrollbar-thumb-[#4A3C31] scrollbar-track-[#1F1A17]">
              <div className="grid grid-cols-2 gap-2">
                {authors.map(a => (
                  <label key={a.id} className="flex items-center gap-3 py-1.5 px-2 hover:bg-[#3E3228] rounded-[2px] cursor-pointer group transition-colors">
                    <input
                      type="checkbox"
                      checked={form.authorIds.includes(a.id)}
                      onChange={() => toggleAuthor(a.id)}
                      className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-serif text-[#E8DCC4] group-hover:text-[#FDFBF7]">{a.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </FormField>

          <div className="flex justify-end gap-4 pt-4 border-t border-[#4A3C31]">
            <AdminBtn variant="secondary" onClick={() => setModalOpen(false)}>Hủy Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="bg-[#996515] hover:bg-[#B8860B] text-[#FDFBF7] border border-[#B8860B]/30">
              {submitting ? 'Đang Lưu...' : editing ? 'Lưu Hiệu Đính' : 'Đưa Vào Kho'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog />
      <Toasts />
    </div>
  );
}