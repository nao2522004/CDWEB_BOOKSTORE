import { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminTextarea, AdminSelect, StatusBadge,
  useConfirm, useAdminToast,
} from './AdminComponents';

const STATUS_MAP = {
  ACTIVE:   { label: 'Hiệu Lực',  color: '#10B981' },
  INACTIVE: { label: 'Vô Hiệu',   color: '#6B7280' },
  EXPIRED:  { label: 'Hết Hạn',   color: '#EF4444' },
};

const TYPE_LABELS = { PERCENTAGE: 'Phần Trăm (%)', FIXED_AMOUNT: 'Cố Định (VNĐ)' };

const EMPTY_FORM = {
  code: '', type: 'PERCENTAGE', value: '',
  minOrderAmount: '', maxDiscountAmount: '',
  usageLimit: '', startDate: '', endDate: '', status: 'ACTIVE',
};

const fmt = (n) => new Intl.NumberFormat('vi-VN').format(n);
const isoToDate = (iso) => iso ? iso.split('T')[0] : '';
const dateToIso = (d) => d ? new Date(d).toISOString() : null;

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, Dialog: ConfirmDialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminAPI.coupons.getAll();
      setCoupons(res.data || []);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const filtered = coupons.filter(c =>
    !keyword || c.code.toLowerCase().includes(keyword.toLowerCase())
  );

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (coupon) => {
    setEditing(coupon);
    setForm({
      code: coupon.code || '',
      type: coupon.type || 'PERCENTAGE',
      value: coupon.value || '',
      minOrderAmount: coupon.minOrderAmount || '',
      maxDiscountAmount: coupon.maxDiscountAmount || '',
      usageLimit: coupon.usageLimit || '',
      startDate: isoToDate(coupon.startDate),
      endDate: isoToDate(coupon.endDate),
      status: coupon.status || 'ACTIVE',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        code: form.code.toUpperCase(),
        value: parseFloat(form.value),
        minOrderAmount: form.minOrderAmount ? parseFloat(form.minOrderAmount) : null,
        maxDiscountAmount: form.maxDiscountAmount ? parseFloat(form.maxDiscountAmount) : null,
        usageLimit: form.usageLimit ? parseInt(form.usageLimit) : null,
        startDate: dateToIso(form.startDate),
        endDate: dateToIso(form.endDate),
      };
      if (editing) {
        await adminAPI.coupons.update(editing.id, payload);
        toast('Cập nhật coupon thành công');
      } else {
        await adminAPI.coupons.create(payload);
        toast('Tạo coupon thành công');
      }
      setModalOpen(false);
      fetchCoupons();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (coupon) => {
    if (coupon.usedCount > 0) {
      toast(`Không thể xoá — coupon đã được dùng ${coupon.usedCount} lần. Hãy đặt trạng thái INACTIVE.`, 'error');
      return;
    }
    const ok = await confirm(`Xác nhận xoá coupon "${coupon.code}"?`);
    if (!ok) return;
    try {
      await adminAPI.coupons.delete(coupon.id);
      toast('Đã xoá coupon');
      fetchCoupons();
    } catch (e) { toast(e.message, 'error'); }
  };

  const handleDeactivate = async (coupon) => {
    try {
      const payload = {
        code: coupon.code, type: coupon.type, value: coupon.value,
        minOrderAmount: coupon.minOrderAmount, maxDiscountAmount: coupon.maxDiscountAmount,
        usageLimit: coupon.usageLimit, startDate: coupon.startDate, endDate: coupon.endDate,
        status: 'INACTIVE',
      };
      await adminAPI.coupons.update(coupon.id, payload);
      toast('Đã vô hiệu hoá coupon');
      fetchCoupons();
    } catch (e) { toast(e.message, 'error'); }
  };

  const columns = [
    {
      key: 'code',
      label: 'Mã Coupon',
      render: (v, row) => (
        <div>
          <p className="font-bold text-[#C9922A] font-mono tracking-widest text-xs">{v}</p>
          <p className="text-[10px] text-[#6B5A3E] mt-0.5">{TYPE_LABELS[row.type]}</p>
        </div>
      )
    },
    {
      key: 'value',
      label: 'Giá Trị',
      render: (v, row) => (
        <span className="font-mono font-bold text-xs text-[#D4C4A8]">
          {row.type === 'PERCENTAGE' ? `${v}%` : `${fmt(v)}đ`}
        </span>
      )
    },
    {
      key: 'usedCount',
      label: 'Đã Dùng',
      render: (v, row) => (
        <span className="font-mono text-xs text-[#8A7355]">
          {v ?? 0}{row.usageLimit ? `/${row.usageLimit}` : ''}
        </span>
      )
    },
    {
      key: 'endDate',
      label: 'Hết Hạn',
      render: v => v ? (
        <span className={`text-xs font-mono ${new Date(v) < new Date() ? 'text-red-500' : 'text-[#6B5A3E]'}`}>
          {new Date(v).toLocaleDateString('vi-VN')}
        </span>
      ) : <span className="text-[#6B5A3E] text-xs">Không giới hạn</span>
    },
    {
      key: 'status',
      label: 'Trạng Thái',
      render: v => <StatusBadge status={v} map={STATUS_MAP} />,
    },
    {
      key: '_actions',
      label: '',
      render: (_, row) => (
        <div className="flex gap-2 justify-end">
          <AdminBtn size="sm" variant="secondary" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          {row.status === 'ACTIVE' && row.usedCount > 0 ? (
            <AdminBtn size="sm" variant="danger" onClick={() => handleDeactivate(row)}>Vô Hiệu</AdminBtn>
          ) : (
            <AdminBtn size="sm" variant="danger" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-5xl">
      <AdminPageHeader
        title="Quản Lý Coupon"
        subtitle={`${coupons.length} mã giảm giá`}
        action={<AdminBtn onClick={openCreate}>+ Tạo Coupon</AdminBtn>}
      />

      <div className="mb-4">
        <AdminSearch value={keyword} onChange={setKeyword} placeholder="Tìm theo mã coupon..." />
      </div>

      <AdminTable columns={columns} data={filtered} loading={loading} emptyMsg="Chưa có coupon nào" />

      {/* Form Modal */}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Chỉnh Sửa Coupon' : 'Tạo Coupon Mới'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Mã Coupon" required>
              <AdminInput
                value={form.code}
                onChange={v => setForm(f => ({ ...f, code: v.toUpperCase() }))}
                placeholder="SUMMER10"
                disabled={!!editing}
              />
            </FormField>
            <FormField label="Loại Giảm" required>
              <AdminSelect
                value={form.type}
                onChange={v => setForm(f => ({ ...f, type: v }))}
                options={[
                  { value: 'PERCENTAGE', label: 'Phần Trăm (%)' },
                  { value: 'FIXED_AMOUNT', label: 'Cố Định (VNĐ)' },
                ]}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField label={form.type === 'PERCENTAGE' ? 'Giá Trị (%)' : 'Số Tiền (VNĐ)'} required>
              <AdminInput type="number" value={form.value} onChange={v => setForm(f => ({ ...f, value: v }))} placeholder={form.type === 'PERCENTAGE' ? '10' : '50000'} />
            </FormField>
            <FormField label="Đơn Tối Thiểu" hint="Không bắt buộc">
              <AdminInput type="number" value={form.minOrderAmount} onChange={v => setForm(f => ({ ...f, minOrderAmount: v }))} placeholder="200000" />
            </FormField>
            <FormField label="Giảm Tối Đa" hint="Cho loại %">
              <AdminInput type="number" value={form.maxDiscountAmount} onChange={v => setForm(f => ({ ...f, maxDiscountAmount: v }))} placeholder="100000" />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Giới Hạn Lượt" hint="Không bắt buộc">
              <AdminInput type="number" value={form.usageLimit} onChange={v => setForm(f => ({ ...f, usageLimit: v }))} placeholder="100" />
            </FormField>
            <FormField label="Ngày Bắt Đầu">
              <AdminInput type="date" value={form.startDate} onChange={v => setForm(f => ({ ...f, startDate: v }))} />
            </FormField>
            <FormField label="Ngày Hết Hạn">
              <AdminInput type="date" value={form.endDate} onChange={v => setForm(f => ({ ...f, endDate: v }))} />
            </FormField>
          </div>

          <FormField label="Trạng Thái" required>
            <AdminSelect
              value={form.status}
              onChange={v => setForm(f => ({ ...f, status: v }))}
              options={[
                { value: 'ACTIVE', label: 'Hiệu Lực' },
                { value: 'INACTIVE', label: 'Vô Hiệu' },
                { value: 'EXPIRED', label: 'Hết Hạn' },
              ]}
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <AdminBtn variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting}>
              {submitting ? 'Đang lưu...' : editing ? 'Cập Nhật' : 'Tạo Coupon'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog />
      <Toasts />
    </div>
  );
}
