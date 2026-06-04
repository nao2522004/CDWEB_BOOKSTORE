import { useState, useEffect, useCallback } from 'react';
import { categoryAPI, authorAPI, publisherAPI, adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminTextarea, AdminSelect,
  useConfirm, useAdminToast, AdminPagination,
} from './AdminComponents';

function slugify(str) {
  return str.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

//  CATEGORIES 
const EMPTY_CAT = { name: '', slug: '', description: '', parentId: '' };

export function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_CAT);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, Dialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const [allRes, pagedRes] = await Promise.all([
        categoryAPI.getAll({ size: 200 }),
        categoryAPI.getAll({ keyword: keyword || undefined, page, size: 15 }),
      ]);
      setCategories(allRes.data?.content || allRes.data || []);
      setPaginatedData(pagedRes.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [keyword, page]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_CAT); setModalOpen(true); };
  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name || '', slug: cat.slug || '', description: cat.description || '', parentId: cat.parentId || '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, parentId: form.parentId ? parseInt(form.parentId) : null };
      if (editing) {
        await adminAPI.categories.update(editing.id, payload);
        toast('Cập nhật danh mục thành công');
      } else {
        await adminAPI.categories.create(payload);
        toast('Tạo danh mục thành công');
      }
      setModalOpen(false);
      fetchCategories();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (cat) => {
    const ok = await confirm(`Xoá danh mục "${cat.name}"? Không thể xoá nếu còn sách hoặc danh mục con.`);
    if (!ok) return;
    try {
      await adminAPI.categories.delete(cat.id);
      toast('Đã xoá danh mục');
      fetchCategories();
    } catch (e) { toast(e.message, 'error'); }
  };

  const categoryMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '70px',
      render: v => <span className="font-mono text-[#8B6508] font-bold text-xs bg-[#8B6508]/10 px-2 py-0.5 rounded">{v}</span>
    },
    {
      key: 'name', label: 'TÊN DANH MỤC',
      render: (v, row) => (
        <div className="py-0.5">
          <p className="font-bold text-[#140E0A] text-sm font-serif tracking-wide hover:text-[#8B6508] transition-colors">{v}</p>
          <p className="text-[11px] text-stone-400 font-mono mt-0.5">{row.slug}</p>
        </div>
      )
    },
    {
      key: 'parentId', label: 'DANH MỤC CHA',
      render: v => v
        ? <span className="text-xs text-stone-600 font-medium bg-stone-100 px-2 py-0.5 rounded">{categoryMap[v] || `#${v}`}</span>
        : <span className="text-[11px] text-stone-400 italic bg-stone-50 px-2 py-0.5 rounded border border-dashed border-stone-200">Danh mục gốc</span>
    },
    {
      key: 'description',
      label: 'MÔ TẢ',
      render: v => <span className="text-xs text-stone-500 truncate max-w-xs block" title={v}>{v || '—'}</span>
    },
    {
      key: '_actions', label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-90 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Danh Mục"
        subtitle={`Hiện có ${paginatedData?.totalElements ?? categories.length} phân loại thư tịch`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Thêm Danh Mục
          </AdminBtn>
        }
      />

      <div className="mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="max-w-md">
          <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tìm danh mục phân loại..." />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={paginatedData?.content} loading={loading} emptyMsg="Chưa có danh mục nào được khởi tạo" />
      </div>

      <div className="mt-4 flex justify-end">
        <AdminPagination data={paginatedData} page={page} onPageChange={setPage} />
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Hiệu Đính Danh Mục' : 'Tạo Phân Loại Thư Tịch mới'} width="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-3 rounded-lg border border-[#D4C4A8]/30">
            <FormField label="Tên Danh Mục" required>
              <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v, slug: f.slug || slugify(v) }))} placeholder="Ví dụ: Triết Học Cổ Đại" />
            </FormField>
            <FormField label="Slug đường dẫn" required>
              <AdminInput value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v }))} placeholder="triet-hoc-co-dai" className="font-mono text-xs bg-stone-50" />
            </FormField>
          </div>

          <FormField label="Thuộc Danh Mục Cha" hint="Để trống nếu đây là phân loại cấp cao nhất">
            <AdminSelect
              value={form.parentId}
              onChange={v => setForm(f => ({ ...f, parentId: v }))}
              placeholder="Không có (Danh mục gốc)"
              options={categories.filter(c => c.id !== editing?.id).map(c => ({ value: c.id, label: c.name }))}
            />
          </FormField>

          <FormField label="Mô Tả Định Hướng">
            <AdminTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} rows={3} placeholder="Tóm tắt định hướng nội dung của danh mục này..." />
          </FormField>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Huỷ Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-5">
              {submitting ? 'Đang lưu...' : editing ? 'Cập Nhật' : 'Tạo Mới'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}

//  AUTHORS 
const EMPTY_AUTHOR = { name: '', bio: '', avatarUrl: '' };

export function AdminAuthors() {
  const [authors, setAuthors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_AUTHOR);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, Dialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authorAPI.getAll({ keyword: keyword || undefined, page, size: 15, sortBy: 'id', sortDir: 'desc' });
      setAuthors(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [keyword, page]);

  useEffect(() => { fetchAuthors(); }, [fetchAuthors]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_AUTHOR); setModalOpen(true); };
  const openEdit = (a) => { setEditing(a); setForm({ name: a.name || '', bio: a.bio || '', avatarUrl: a.avatarUrl || '' }); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await adminAPI.authors.update(editing.id, form);
        toast('Cập nhật văn sĩ thành công');
      } else {
        await adminAPI.authors.create(form);
        toast('Thêm tác giả thành công');
      }
      setModalOpen(false);
      fetchAuthors();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (author) => {
    const ok = await confirm(`Xoá tác giả "${author.name}"? Không thể xoá nếu còn sách liên kết.`);
    if (!ok) return;
    try {
      await adminAPI.authors.delete(author.id);
      toast('Đã xoá tác giả');
      fetchAuthors();
    } catch (e) { toast(e.message, 'error'); }
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '70px',
      render: v => <span className="font-mono text-[#8B6508] font-bold text-xs bg-[#8B6508]/10 px-2 py-0.5 rounded">{v}</span>
    },
    {
      key: 'name', label: 'TÁC GIẢ',
      render: (v, row) => (
        <div className="flex items-center gap-3.5 py-1">
          {row.avatarUrl ? (
            <img src={row.avatarUrl} alt={v} className="w-9 h-9 rounded-full object-cover border border-[#D4C4A8]/60 shadow-xs flex-shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#FAF5EC] border border-[#D4C4A8]/60 flex items-center justify-center text-sm font-bold text-[#8B6508] shadow-inner flex-shrink-0"
              style={{ fontFamily: "'Cinzel', serif" }}>
              {v?.charAt(0)}
            </div>
          )}
          <span className="font-bold text-[#140E0A] text-sm font-serif tracking-wide hover:text-[#8B6508] transition-colors">{v}</span>
        </div>
      )
    },
    {
      key: 'bio',
      label: 'TIỂU SỬ / TÓM TẮT',
      render: v => <span className="text-xs text-stone-500 line-clamp-2 max-w-sm block whitespace-normal" title={v}>{v || 'Chưa cập nhật tiểu sử'}</span>
    },
    {
      key: '_actions', label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-90 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Tác Giả"
        subtitle={`Hệ thống lưu trữ dữ liệu thông tin về ${authors?.totalElements ?? 0} văn sĩ / dịch giả`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Đăng Ký Tác Giả
          </AdminBtn>
        }
      />

      <div className="mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="max-w-md">
          <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tra cứu danh tính văn sĩ..." />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={authors?.content} loading={loading} emptyMsg="Chưa ghi nhận dữ liệu về tác giả nào" />
      </div>

      <div className="mt-4 flex justify-end">
        <AdminPagination data={authors} page={page} onPageChange={setPage} />
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Hiệu Đính Tiểu Sử' : 'Khai Hồ Sơ Tác Giả Mới'} width="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <div className="sm:col-span-2 space-y-4">
              <FormField label="Tên Tác Giả / Bút Danh" required>
                <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ví dụ: Thạch Lam" />
              </FormField>
              <FormField label="Ảnh Đại Diện (URL)">
                <AdminInput value={form.avatarUrl} onChange={v => setForm(f => ({ ...f, avatarUrl: v }))} placeholder="https://link-anh.com/avatar.jpg" className="text-xs" />
              </FormField>
            </div>
            {/* Khung xem trước Avatar thu nhỏ */}
            <div className="flex flex-col items-center justify-center p-3 bg-[#FAF8F5] border border-stone-200 rounded-lg h-full min-h-[110px]">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2">Xem Trước</span>
              {form.avatarUrl ? (
                <img src={form.avatarUrl} alt="Preview" className="w-14 h-14 rounded-full object-cover border border-[#8B6508]/30 shadow-xs" onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Error" }} />
              ) : (
                <div className="w-14 h-14 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-xs text-stone-400 font-serif">N/A</div>
              )}
            </div>
          </div>

          <FormField label="Hành Trạng / Tiểu Sử">
            <AdminTextarea value={form.bio} onChange={v => setForm(f => ({ ...f, bio: v }))} rows={5} placeholder="Tóm lược cuộc đời, sự nghiệp văn học hoặc các giải thưởng danh giá của tác giả..." />
          </FormField>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Hủy Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-5">
              {submitting ? 'Đang lưu...' : editing ? 'Lưu Hiệu Đính' : 'Thêm Vào Hồ Sơ'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}

//  PUBLISHERS 
const EMPTY_PUB = { name: '', description: '', website: '' };

export function AdminPublishers() {
  const [publishers, setPublishers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PUB);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, Dialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchPublishers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await publisherAPI.getAll({ keyword: keyword || undefined, page, size: 15, sortBy: 'id', sortDir: 'desc' });
      setPublishers(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [keyword, page]);

  useEffect(() => { fetchPublishers(); }, [fetchPublishers]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_PUB); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p); setForm({ name: p.name || '', description: p.description || '', website: p.website || '' }); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await adminAPI.publishers.update(editing.id, form);
        toast('Cập nhật NXB thành công');
      } else {
        await adminAPI.publishers.create(form);
        toast('Tạo NXB thành công');
      }
      setModalOpen(false);
      fetchPublishers();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (pub) => {
    const ok = await confirm(`Xoá NXB "${pub.name}"? Không thể xoá nếu còn sách liên kết.`);
    if (!ok) return;
    try {
      await adminAPI.publishers.delete(pub.id);
      toast('Đã xoá nhà xuất bản');
      fetchPublishers();
    } catch (e) { toast(e.message, 'error'); }
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '70px',
      render: v => <span className="font-mono text-[#8B6508] font-bold text-xs bg-[#8B6508]/10 px-2 py-0.5 rounded">{v}</span>
    },
    {
      key: 'name', label: 'NHÀ XUẤT BẢN',
      render: (v, row) => (
        <div className="py-0.5">
          <p className="font-bold text-[#140E0A] text-sm font-serif tracking-wide hover:text-[#8B6508] transition-colors">{v}</p>
          {row.website && (
            <a href={row.website} target="_blank" rel="noreferrer"
              className="text-[11px] text-[#8B6508] hover:text-[#6a4e05] hover:underline font-mono mt-0.5 inline-flex items-center gap-1">
              <span>↗</span> {row.website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
      )
    },
    {
      key: 'description',
      label: 'THÔNG TIN THÊM',
      render: v => <span className="text-xs text-stone-500 truncate max-w-xs block" title={v}>{v || '—'}</span>
    },
    {
      key: '_actions', label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-90 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Nhà Xuất Bản"
        subtitle={`Đối tác phân phối liên kết từ ${publishers?.totalElements ?? 0} đơn vị xuất bản`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Thêm Nhà Xuất Bản
          </AdminBtn>
        }
      />

      <div className="mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="max-w-md">
          <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tìm đối tác xuất bản..." />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={publishers?.content} loading={loading} emptyMsg="Chưa ghi nhận thông tin nhà xuất bản nào" />
      </div>

      <div className="mt-4 flex justify-end">
        <AdminPagination data={publishers} page={page} onPageChange={setPage} />
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Hiệu Đính NXB' : 'Đăng Ký Nhà Xuất Bản Mới'} width="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid grid-cols-1 gap-4 bg-[#FAF8F5] p-3 rounded-lg border border-[#D4C4A8]/30">
            <FormField label="Tên Nhà Xuất Bản" required>
              <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ví dụ: Nhà Xuất Bản Hội Nhà Văn" />
            </FormField>
            <FormField label="Trang Web Chính Thức (Website)">
              <AdminInput value={form.website} onChange={v => setForm(f => ({ ...f, website: v }))} placeholder="https://nxbhoinhavan.vn" className="font-mono text-xs" />
            </FormField>
          </div>

          <FormField label="Giới Thiệu / Ghi Chú">
            <AdminTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} rows={4} placeholder="Địa chỉ, thông tin liên hệ hoặc chính sách chiết khấu phát hành của đối tác..." />
          </FormField>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Hủy Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-5">
              {submitting ? 'Đang lưu...' : editing ? 'Lưu Thay Đổi' : 'Đăng Ký Đơn Vị'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}