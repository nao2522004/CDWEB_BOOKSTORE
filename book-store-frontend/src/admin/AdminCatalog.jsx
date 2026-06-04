import { useState, useEffect, useCallback } from 'react';
import { categoryAPI, authorAPI, publisherAPI, adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminTextarea, AdminSelect,
  useConfirm, useAdminToast, AdminPagination,
} from './AdminComponents';

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const EMPTY_CAT = { name: '', slug: '', description: '', parentId: '' };

function slugify(str) {
  return str.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

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
    { key: 'id', label: 'ID', width: '50px' },
    {
      key: 'name',
      label: 'Tên Danh Mục',
      render: (v, row) => (
        <div>
          <p className="font-bold text-[#D4C4A8] text-xs">{v}</p>
          <p className="text-[10px] text-[#6B5A3E] font-mono">{row.slug}</p>
        </div>
      )
    },
    {
      key: 'parentId',
      label: 'Danh Mục Cha',
      render: v => v ? <span className="text-xs text-[#8A7355]">{categoryMap[v] || `#${v}`}</span> : <span className="text-[10px] text-[#4A3A28] italic">Gốc</span>
    },
    { key: 'description', label: 'Mô Tả', render: v => <span className="text-xs text-[#6B5A3E] truncate max-w-xs block">{v || '—'}</span> },
    {
      key: '_actions', label: '',
      render: (_, row) => (
        <div className="flex gap-2 justify-end">
          <AdminBtn size="sm" variant="secondary" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title="Quản Lý Danh Mục"
        subtitle={`${paginatedData?.totalElements ?? categories.length} danh mục`}
        action={<AdminBtn onClick={openCreate}>+ Thêm Danh Mục</AdminBtn>}
      />
      <div className="mb-4">
        <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tìm danh mục..." />
      </div>
      <AdminTable columns={columns} data={paginatedData?.content} loading={loading} emptyMsg="Chưa có danh mục" />
      <AdminPagination data={paginatedData} page={page} onPageChange={setPage} />

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Tên Danh Mục" required>
            <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v, slug: f.slug || slugify(v) }))} placeholder="Triết Học Cổ Đại" />
          </FormField>
          <FormField label="Slug" required>
            <AdminInput value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v }))} placeholder="triet-hoc-co-dai" />
          </FormField>
          <FormField label="Mô Tả">
            <AdminTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Mô tả danh mục..." />
          </FormField>
          <FormField label="Danh Mục Cha" hint="Để trống nếu là danh mục gốc">
            <AdminSelect
              value={form.parentId}
              onChange={v => setForm(f => ({ ...f, parentId: v }))}
              placeholder="Không có (gốc)"
              options={categories.filter(c => c.id !== editing?.id).map(c => ({ value: c.id, label: c.name }))}
            />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <AdminBtn variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting}>{submitting ? 'Đang lưu...' : editing ? 'Cập Nhật' : 'Tạo Mới'}</AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}

// ─── AUTHORS ──────────────────────────────────────────────────────────────────
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
        toast('Cập nhật tác giả thành công');
      } else {
        await adminAPI.authors.create(form);
        toast('Tạo tác giả thành công');
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
    { key: 'id', label: 'ID', width: '50px' },
    {
      key: 'name',
      label: 'Tên Tác Giả',
      render: (v, row) => (
        <div className="flex items-center gap-3">
          {row.avatarUrl ? (
            <img src={row.avatarUrl} alt={v} className="w-8 h-8 rounded-full object-cover border border-[#2A1F14] flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#2A1F14] flex items-center justify-center text-xs font-bold text-[#C9922A] flex-shrink-0">
              {v?.charAt(0)}
            </div>
          )}
          <span className="font-bold text-[#D4C4A8] text-xs">{v}</span>
        </div>
      )
    },
    { key: 'bio', label: 'Tiểu Sử', render: v => <span className="text-xs text-[#6B5A3E] truncate max-w-xs block">{v ? v.slice(0, 80) + (v.length > 80 ? '...' : '') : '—'}</span> },
    {
      key: '_actions', label: '',
      render: (_, row) => (
        <div className="flex gap-2 justify-end">
          <AdminBtn size="sm" variant="secondary" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title="Quản Lý Tác Giả"
        subtitle={`${authors?.totalElements ?? 0} tác giả`}
        action={<AdminBtn onClick={openCreate}>+ Thêm Tác Giả</AdminBtn>}
      />
      <div className="mb-4">
        <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tìm tác giả..." />
      </div>
      <AdminTable columns={columns} data={authors?.content} loading={loading} emptyMsg="Chưa có tác giả" />
      <AdminPagination data={authors} page={page} onPageChange={setPage} />

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa Tác Giả' : 'Thêm Tác Giả'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Tên Tác Giả" required>
            <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Immanuel Kant" />
          </FormField>
          <FormField label="Ảnh Đại Diện (URL)">
            <AdminInput value={form.avatarUrl} onChange={v => setForm(f => ({ ...f, avatarUrl: v }))} placeholder="https://..." />
          </FormField>
          <FormField label="Tiểu Sử">
            <AdminTextarea value={form.bio} onChange={v => setForm(f => ({ ...f, bio: v }))} rows={4} placeholder="Tiểu sử tác giả..." />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <AdminBtn variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting}>{submitting ? 'Đang lưu...' : editing ? 'Cập Nhật' : 'Tạo Mới'}</AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}

// ─── PUBLISHERS ───────────────────────────────────────────────────────────────
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
    { key: 'id', label: 'ID', width: '50px' },
    {
      key: 'name',
      label: 'Tên NXB',
      render: (v, row) => (
        <div>
          <p className="font-bold text-[#D4C4A8] text-xs">{v}</p>
          {row.website && <a href={row.website} target="_blank" rel="noreferrer" className="text-[10px] text-[#C9922A] hover:underline font-mono mt-0.5 block">{row.website}</a>}
        </div>
      )
    },
    { key: 'description', label: 'Mô Tả', render: v => <span className="text-xs text-[#6B5A3E] truncate max-w-xs block">{v ? v.slice(0, 80) + (v.length > 80 ? '...' : '') : '—'}</span> },
    {
      key: '_actions', label: '',
      render: (_, row) => (
        <div className="flex gap-2 justify-end">
          <AdminBtn size="sm" variant="secondary" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title="Quản Lý Nhà Xuất Bản"
        subtitle={`${publishers?.totalElements ?? 0} nhà xuất bản`}
        action={<AdminBtn onClick={openCreate}>+ Thêm NXB</AdminBtn>}
      />
      <div className="mb-4">
        <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tìm nhà xuất bản..." />
      </div>
      <AdminTable columns={columns} data={publishers?.content} loading={loading} emptyMsg="Chưa có nhà xuất bản" />
      <AdminPagination data={publishers} page={page} onPageChange={setPage} />

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa NXB' : 'Thêm NXB'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Tên Nhà Xuất Bản" required>
            <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="NXB Tri Thức" />
          </FormField>
          <FormField label="Website">
            <AdminInput value={form.website} onChange={v => setForm(f => ({ ...f, website: v }))} placeholder="https://nxb.vn" />
          </FormField>
          <FormField label="Mô Tả">
            <AdminTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Giới thiệu nhà xuất bản..." />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <AdminBtn variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting}>{submitting ? 'Đang lưu...' : editing ? 'Cập Nhật' : 'Tạo Mới'}</AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}
