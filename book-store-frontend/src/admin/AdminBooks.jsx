import { useState, useEffect, useCallback } from 'react';
import { bookAPI, adminAPI, categoryAPI, authorAPI, publisherAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminTextarea, AdminSelect, StatusBadge,
  useConfirm, AdminPagination, useAdminToast,
} from './AdminComponents';
import ImageUploader from '../components/common/ImageUploader';

const STATUS_MAP = {
  ACTIVE: { label: 'Đang Bán', colorClass: 'bg-green-100 text-green-800 border-green-200' },
  INACTIVE: { label: 'Ngừng Bán', colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  OUT_OF_STOCK: { label: 'Hết Hàng', colorClass: 'bg-red-100 text-red-700 border-red-200' },
};

const EMPTY_FORM = {
  title: '', slug: '', description: '', isbn: '',
  price: '', discountPrice: '', stockQuantity: '',
  pages: '', language: 'vi', categoryId: '', publisherId: '',
  publishedDate: '', status: 'ACTIVE', authorIds: [],
  coverUrl: '',
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
      categoryAPI.getAllList(),
      authorAPI.getAllList(),
      publisherAPI.getAllList(),
    ]).then(([c, a, p]) => {
      setCategories(c.data || []);
      setAuthors(a.data || []);
      setPublishers(p.data || []);
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
      coverUrl: book.coverImageUrl || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const priceNum = parseFloat(form.price);
    const discountNum = form.discountPrice ? parseFloat(form.discountPrice) : null;
    const stockNum = parseInt(form.stockQuantity);

    if (isNaN(priceNum) || priceNum < 0) {
      toast('Giá bán phải lớn hơn hoặc bằng 0', 'error');
      return;
    }
    if (discountNum !== null && (isNaN(discountNum) || discountNum < 0)) {
      toast('Giá khuyến mãi phải lớn hơn hoặc bằng 0', 'error');
      return;
    }
    if (discountNum !== null && discountNum > priceNum) {
      toast('Giá khuyến mãi không được lớn hơn giá bán gốc', 'error');
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      toast('Số lượng kho phải lớn hơn hoặc bằng 0', 'error');
      return;
    }
    if (!form.categoryId) {
      toast('Vui lòng chọn danh mục', 'error');
      return;
    }
    if (!form.publisherId) {
      toast('Vui lòng chọn nhà xuất bản', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        price: priceNum,
        discountPrice: discountNum,
        stockQuantity: stockNum,
        pages: form.pages ? parseInt(form.pages) : null,
        categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        publisherId: form.publisherId ? parseInt(form.publisherId) : null,
        publishedDate: form.publishedDate ? new Date(form.publishedDate).toISOString() : null,
        authorIds: form.authorIds.map(Number),
        coverUrl: form.coverUrl || null,
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
    const ok = await confirm(`Xác nhận xoá ấn bản "${book.title}"?`);
    if (!ok) return;
    try {
      await adminAPI.books.delete(book.id);
      toast('Đã xoá ấn bản');
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
      width: '70px',
      render: v => <span className="text-[#8B6508] font-mono text-xs font-bold tracking-wider bg-[#8B6508]/10 px-2 py-1 rounded">{v}</span>
    },
    {
      key: 'title',
      label: 'TÊN SÁCH / ẤN BẢN',
      render: (v, row) => (
        <div className="flex items-center gap-3 py-1">
          {row.coverImageUrl ? (
            <img
              src={row.coverImageUrl}
              alt={v}
              className="w-10 h-14 object-cover rounded shadow-sm border border-stone-200/60 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-14 bg-stone-100 flex items-center justify-center rounded border border-dashed border-stone-300 text-stone-400 flex-shrink-0">
              <span className="text-[10px] font-serif">N/A</span>
            </div>
          )}
          <div className="max-w-md">
            <p className="font-bold text-[#140E0A] text-base leading-tight hover:text-[#8B6508] transition-colors duration-200"
              style={{ fontFamily: "'Playfair Display', serif" }}>{v}</p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-stone-500 font-mono">
              <span className="bg-stone-100 px-1.5 py-0.5 rounded">ISBN: {row.isbn || 'N/A'}</span>
              {row.language && <span className="uppercase border-l border-stone-300 pl-3">{row.language}</span>}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'price',
      label: 'GIÁ BÁN',
      render: (v, row) => (
        <div className="py-1">
          <p className="text-[#8B6508] font-bold text-sm font-mono tracking-wide bg-[#FAF5EC] px-2 py-0.5 rounded inline-block">
            {new Intl.NumberFormat('vi-VN').format(row.discountPrice || v)}đ
          </p>
          {row.discountPrice && (
            <p className="text-[11px] text-stone-400 line-through font-mono mt-0.5 pl-2">
              {new Intl.NumberFormat('vi-VN').format(v)}đ
            </p>
          )}
        </div>
      )
    },
    {
      key: 'stockQuantity',
      label: 'KHO',
      render: v => {
        const isOutOfStock = (v ?? 0) === 0;
        const isLowStock = (v ?? 0) < 5;
        const badgeClass = isOutOfStock
          ? 'bg-red-50 text-red-600 border border-red-200'
          : isLowStock
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-100';
        return (
          <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-full ${badgeClass}`}>
            {v ?? 0} quyển
          </span>
        )
      }
    },
    {
      key: 'status',
      label: 'TÌNH TRẠNG',
      render: v => <StatusBadge status={v} map={STATUS_MAP} />,
    },
    {
      key: '_actions',
      label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-80 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Thư Tịch"
        subtitle={`Hiện có ${books?.totalElements ?? 0} đầu sách trong hệ thống lưu kho`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Bổ Sung Sách Mới
          </AdminBtn>
        }
      />

      {}
      <div className="flex gap-3 mb-6 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="w-full max-w-md">
          <AdminSearch
            value={keyword}
            onChange={v => { setKeyword(v); setPage(1); }}
            placeholder="Tra cứu nhanh theo tên, mã ISBN, slug..."
          />
        </div>
      </div>

      {}
      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={books?.content} loading={loading} emptyMsg="Chưa có dữ liệu thư tịch" />
      </div>

      <div className="mt-4 flex justify-end">
        <AdminPagination data={books} page={page} onPageChange={setPage} />
      </div>

      {}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Hiệu Đính Thông Tin Thư Tịch' : 'Khai Báo Ấn Bản Mới'}
        width="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar py-2">

          {}
          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#D4C4A8]/40 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-[#8B6508] uppercase border-b border-[#D4C4A8]/30 pb-1.5 font-serif">Thông tin cơ bản</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 flex justify-center md:justify-start">
                <FormField label="Ảnh Bìa Sách">
                  <ImageUploader
                    value={form.coverUrl}
                    onChange={url => setForm(f => ({ ...f, coverUrl: url }))}
                    disabled={submitting}
                  />
                </FormField>
              </div>
              <div className="md:col-span-2 space-y-4">
                <FormField label="Tên Sách" required>
                  <AdminInput
                    value={form.title}
                    onChange={v => setForm(f => ({ ...f, title: v, slug: f.slug || slugify(v) }))}
                    placeholder="Ví dụ: Số Đỏ (Ấn bản kỷ niệm)"
                  />
                </FormField>
                <FormField label="Slug đường dẫn (Tự động)" required>
                  <AdminInput
                    value={form.slug}
                    onChange={v => setForm(f => ({ ...f, slug: v }))}
                    placeholder="so-do-an-ban-ky-niem"
                    className="font-mono text-xs bg-stone-50 text-stone-600"
                  />
                </FormField>
              </div>
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase border-b border-stone-100 pb-1.5">Định danh & Ngôn ngữ</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Mã ISBN">
                  <AdminInput value={form.isbn} onChange={v => setForm(f => ({ ...f, isbn: v }))} placeholder="978-3-16..." className="font-mono" />
                </FormField>
                <FormField label="Ngôn Ngữ">
                  <AdminInput value={form.language} onChange={v => setForm(f => ({ ...f, language: v }))} placeholder="vi" />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Số Trang">
                  <AdminInput type="number" value={form.pages} onChange={v => setForm(f => ({ ...f, pages: v }))} placeholder="0" />
                </FormField>
                <FormField label="Ngày Xuất Bản">
                  <AdminInput type="date" value={form.publishedDate} onChange={v => setForm(f => ({ ...f, publishedDate: v }))} />
                </FormField>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase border-b border-stone-100 pb-1.5">Thương mại & Kho</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Giá Niêm Yết (đ)" required>
                  <AdminInput type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="0" className="font-mono" />
                </FormField>
                <FormField label="Giá Ưu Đãi (đ)">
                  <AdminInput type="number" value={form.discountPrice} onChange={v => setForm(f => ({ ...f, discountPrice: v }))} placeholder="Bỏ trống nếu không giảm" className="font-mono text-emerald-700" />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Số Lượng Kho" required>
                  <AdminInput type="number" value={form.stockQuantity} onChange={v => setForm(f => ({ ...f, stockQuantity: v }))} placeholder="0" className="font-mono font-bold" />
                </FormField>
                <FormField label="Tình Trạng Trạng Thái" required>
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
            </div>
          </div>

          {}
          <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase border-b border-stone-100 pb-1.5">Phân loại & Tác quyền</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Danh Mục" required>
                <AdminSelect
                  value={form.categoryId}
                  onChange={v => setForm(f => ({ ...f, categoryId: v }))}
                  placeholder="-- Chọn danh mục sách --"
                  options={categories.map(c => ({ value: c.id, label: c.name }))}
                />
              </FormField>
              <FormField label="Nhà Xuất Bản" required>
                <AdminSelect
                  value={form.publisherId}
                  onChange={v => setForm(f => ({ ...f, publisherId: v }))}
                  placeholder="-- Chọn nhà xuất bản --"
                  options={publishers.map(p => ({ value: p.id, label: p.name }))}
                />
              </FormField>
            </div>

            <FormField label="Tác Giả / Dịch Giả (Có thể chọn đồng tác giả)">
              <div className="bg-[#FAF6EE] border border-[#D4C4A8]/60 rounded-lg p-3 max-h-40 overflow-y-auto shadow-inner">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {authors.map(a => {
                    const isChecked = form.authorIds.includes(a.id);
                    return (
                      <label key={a.id} className={`flex items-center gap-2.5 py-2 px-3 rounded-md cursor-pointer group transition-all border ${isChecked ? 'bg-white border-[#8B6508]/40 shadow-xs' : 'border-transparent hover:bg-white/60'}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAuthor(a.id)}
                          className="accent-[#8B6508] w-4 h-4 cursor-pointer rounded-sm"
                        />
                        <span className={`text-sm font-serif transition-colors leading-none ${isChecked ? 'text-[#8B6508] font-bold' : 'text-[#2C2114] group-hover:text-[#8B6508]'}`}
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {a.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </FormField>
          </div>

          <FormField label="Mô Tả Nội Dung / Tóm Tắt Tác Phẩm">
            <AdminTextarea
              value={form.description}
              onChange={v => setForm(f => ({ ...f, description: v }))}
              rows={4}
              placeholder="Nhập phần tóm tắt cốt truyện hoặc giới thiệu nội dung nổi bật của sách..."
            />
          </FormField>

          {}
          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Hủy Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-6">
              {submitting ? 'Đang Lưu...' : editing ? 'Cập Nhật Hiệu Đính' : 'Thêm Vào Kho Thư Tịch'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog />
      <Toasts />
    </div>
  );
}