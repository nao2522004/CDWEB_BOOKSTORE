import { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminSelect, StatusBadge,
  useConfirm, useAdminToast,
} from './AdminComponents';

const STATUS_MAP = {
  ACTIVE: { label: 'Hiệu Lực', colorClass: 'bg-green-100 text-green-800 border-green-200' },
  INACTIVE: { label: 'Vô Hiệu', colorClass: 'bg-gray-100 text-gray-700 border-gray-200' },
  EXPIRED: { label: 'Hết Hạn', colorClass: 'bg-red-100 text-red-700 border-red-200' },
};

const TYPE_LABELS = { PERCENTAGE: 'Chiết khấu (%)', FIXED_AMOUNT: 'Khấu trừ thẳng (Đ)' };

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
        startDate: form.startDate ? dateToIso(form.startDate) : null,
        endDate: form.endDate ? dateToIso(form.endDate) : null,
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
      toast(`Không thể xoá — coupon đã dùng ${coupon.usedCount} lần. Hãy đặt trạng thái INACTIVE.`, 'error');
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
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        minOrderAmount: coupon.minOrderAmount ?? null,
        maxDiscountAmount: coupon.maxDiscountAmount ?? null,
        usageLimit: coupon.usageLimit ?? null,
        startDate: coupon.startDate ?? null,
        endDate: coupon.endDate ?? null,
        status: 'INACTIVE',
      };
      await adminAPI.coupons.update(coupon.id, payload);
      toast('Đã vô hiệu hoá coupon');
      fetchCoupons();
    } catch (e) { toast(e.message, 'error'); }
  };

  const columns = [
    {
      key: 'code', label: 'MÃ ƯU ĐÃI',
      render: (v, row) => (
        <div className="py-0.5">
          <p className="font-bold text-[#8B6508] font-mono tracking-widest text-sm bg-[#8B6508]/5 border border-[#8B6508]/20 px-2 py-0.5 rounded inline-block shadow-2xs">{v}</p>
          <p className="text-[11px] text-stone-400 mt-1 font-medium">{TYPE_LABELS[row.type]}</p>
        </div>
      )
    },
    {
      key: 'value', label: 'MỨC GIẢM',
      render: (v, row) => (
        <span className="font-mono font-bold text-sm text-[#140E0A] bg-stone-100/80 px-2 py-1 rounded border border-stone-200/40">
          {row.type === 'PERCENTAGE' ? `${v}%` : `${fmt(v)}đ`}
        </span>
      )
    },
    {
      key: 'usedCount', label: 'SẢN LƯỢNG SỬ DỤNG',
      render: (v, row) => (
        <div className="text-xs">
          <span className="font-mono font-bold text-[#140E0A]">{v ?? 0}</span>
          {row.usageLimit ? (
            <span className="text-stone-400 font-mono text-[11px]"> / {row.usageLimit} <span className="text-[10px] text-stone-400 font-sans block mt-0.5">lượt tối đa</span></span>
          ) : (
            <span className="text-stone-400 font-sans text-[10px] block mt-0.5">Vô hạn lượt</span>
          )}
        </div>
      )
    },
    {
      key: 'endDate', label: 'HẠN SỬ DỤNG',
      render: v => v ? (
        <div className="font-mono text-xs">
          <span className={new Date(v) < new Date() ? 'text-red-600 bg-red-50 font-bold px-1.5 py-0.5 rounded' : 'text-stone-600'}>
            {new Date(v).toLocaleDateString('vi-VN')}
          </span>
        </div>
      ) : <span className="text-stone-400 italic text-xs bg-stone-50 px-2 py-0.5 rounded border border-dashed border-stone-200">Vĩnh viễn</span>
    },
    {
      key: 'status', label: 'TRẠNG THÁI',
      render: v => <StatusBadge status={v} map={STATUS_MAP} />,
    },
    {
      key: '_actions', label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-90 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          {row.status === 'ACTIVE' && row.usedCount > 0 ? (
            <AdminBtn size="sm" variant="danger" className="hover:bg-red-50 text-amber-700 border-amber-200" onClick={() => handleDeactivate(row)}>Vô Hiệu</AdminBtn>
          ) : (
            <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Mã Ưu Đãi (Coupon)"
        subtitle={`Hệ thống đang phát hành ${coupons.length} chiến dịch giảm giá công khai`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Khởi Tạo Coupon
          </AdminBtn>
        }
      />

      <div className="mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="max-w-md">
          <AdminSearch value={keyword} onChange={setKeyword} placeholder="Tra cứu theo mã Coupon ký tự..." />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={filtered} loading={loading} emptyMsg="Chưa ghi nhận mã coupon giảm giá nào" />
      </div>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Cấu Hình Lại Mã Ưu Đãi' : 'Khởi Tạo Mã Ưu Đãi Mới'}
        width="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          {/* Section 1: Thông tin cơ bản */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-3 rounded-lg border border-[#D4C4A8]/30">
            <FormField label="Mã Ưu Đãi (Mã viết hoa)" required>
              <AdminInput
                value={form.code}
                onChange={v => setForm(f => ({ ...f, code: v.toUpperCase() }))}
                placeholder="Ví dụ: BOOKWORM10"
                disabled={!!editing}
                className="font-mono tracking-widest font-bold text-sm"
              />
            </FormField>
            <FormField label="Phương Thức Khấu Trừ" required>
              <AdminSelect
                value={form.type}
                onChange={v => setForm(f => ({ ...f, type: v, value: '' }))}
                options={[
                  { value: 'PERCENTAGE', label: 'Chiết khấu Phần Trăm (%)' },
                  { value: 'FIXED_AMOUNT', label: 'Khấu trừ Tiền Mặt (VNĐ)' },
                ]}
              />
            </FormField>
          </div>

          {/* Section 2: Định lượng giá trị chiết khấu */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label={form.type === 'PERCENTAGE' ? 'Mức Chiết Khấu (%)' : 'Số Tiền Giảm (VNĐ)'} required>
              <div className="relative">
                <AdminInput type="number" value={form.value} onChange={v => setForm(f => ({ ...f, value: v }))} placeholder={form.type === 'PERCENTAGE' ? '10' : '50000'} />
                <span className="absolute right-3 top-2.5 text-xs font-bold text-stone-400 pointer-events-none font-mono">
                  {form.type === 'PERCENTAGE' ? '%' : 'đ'}
                </span>
              </div>
            </FormField>

            <FormField label="Đơn Tối Thiểu Được Áp Dụng" hint="Nhập 0 nếu không giới hạn">
              <div className="relative">
                <AdminInput type="number" value={form.minOrderAmount} onChange={v => setForm(f => ({ ...f, minOrderAmount: v }))} placeholder="200000" />
                <span className="absolute right-3 top-2.5 text-xs text-stone-400 pointer-events-none font-mono">đ</span>
              </div>
            </FormField>

            <FormField
              label="Mức Giảm Tối Đa"
              hint={form.type === 'PERCENTAGE' ? "Giới hạn trần giảm" : "Bị khóa cho loại trừ thẳng"}
            >
              <div className="relative">
                <AdminInput
                  type="number"
                  value={form.maxDiscountAmount}
                  onChange={v => setForm(f => ({ ...f, maxDiscountAmount: v }))}
                  placeholder="100000"
                  disabled={form.type === 'FIXED_AMOUNT'}
                  className={form.type === 'FIXED_AMOUNT' ? 'bg-stone-100/50 text-stone-400 cursor-not-allowed' : ''}
                />
                <span className="absolute right-3 top-2.5 text-xs text-stone-400 pointer-events-none font-mono">đ</span>
              </div>
            </FormField>
          </div>

          {/* Section 3: Giới hạn hành chính */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-stone-200/60 py-4">
            <FormField label="Giới Hạn Tổng Lượt Dùng" hint="Để trống nếu vô hạn">
              <AdminInput type="number" value={form.usageLimit} onChange={v => setForm(f => ({ ...f, usageLimit: v }))} placeholder="100" />
            </FormField>

            <FormField label="Ngày Bắt Đầu Hiệu Lực">
              <AdminInput type="date" value={form.startDate} onChange={v => setForm(f => ({ ...f, startDate: v }))} className="text-xs" />
            </FormField>

            <FormField label="Ngày Hết Hạn">
              <AdminInput type="date" value={form.endDate} onChange={v => setForm(f => ({ ...f, endDate: v }))} className="text-xs" />
            </FormField>
          </div>

          <FormField label="Trạng Thái Vận Hành" required>
            <AdminSelect
              value={form.status}
              onChange={v => setForm(f => ({ ...f, status: v }))}
              options={[
                { value: 'ACTIVE', label: 'Hiệu Lực (Kích hoạt chạy chiến dịch ngay)' },
                { value: 'INACTIVE', label: 'Vô Hiệu (Tạm đóng mã)' },
                { value: 'EXPIRED', label: 'Hết Hạn (Buộc dừng chiến dịch)' },
              ]}
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Huỷ Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-5">
              {submitting ? 'Đang lưu...' : editing ? 'Lưu Thay Đổi' : 'Phát Hành Mã'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog />
      <Toasts />
    </div>
  );
}