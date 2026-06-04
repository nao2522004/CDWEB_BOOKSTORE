import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminTable, AdminSelect, StatusBadge,
  AdminPagination, useAdminToast, AdminModal, FormField,
} from './AdminComponents';

const ORDER_STATUS_MAP = {
  PENDING:    { label: 'Chờ Xác Nhận', color: '#D97706' },
  CONFIRMED:  { label: 'Đã Xác Nhận',  color: '#3B82F6' },
  PROCESSING: { label: 'Đang Xử Lý',   color: '#8B5CF6' },
  SHIPPED:    { label: 'Đang Giao',     color: '#06B6D4' },
  DELIVERED:  { label: 'Đã Giao',       color: '#10B981' },
  CANCELLED:  { label: 'Đã Huỷ',       color: '#EF4444' },
  RETURNED:   { label: 'Trả Hàng',     color: '#F97316' },
};
const PAYMENT_STATUS_MAP = {
  UNPAID:   { label: 'Chưa TT',   color: '#D97706' },
  PAID:     { label: 'Đã TT',     color: '#10B981' },
  REFUNDED: { label: 'Hoàn Tiền', color: '#8B5CF6' },
};

// State machine transitions
const NEXT_STATUSES = {
  PENDING:    ['CONFIRMED', 'CANCELLED'],
  CONFIRMED:  ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['SHIPPED', 'CANCELLED'],
  SHIPPED:    ['DELIVERED', 'RETURNED'],
  DELIVERED:  [],
  CANCELLED:  [],
  RETURNED:   [],
};
const NEXT_PAYMENT = {
  UNPAID:   ['PAID'],
  PAID:     ['REFUNDED'],
  REFUNDED: [],
};

const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
const fmtDate = (d) => d ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(d)) : '—';

// ─── Orders List ──────────────────────────────────────────────────────────────
export default function AdminOrders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const { add: toast, Toasts } = useAdminToast();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: 20 };
      if (statusFilter) params.status = statusFilter;
      const res = await adminAPI.orders.getAll(params);
      setOrders(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [statusFilter, page]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const columns = [
    { key: 'id', label: '#', width: '50px', render: v => <span className="font-mono text-[#C9922A] font-bold">{v}</span> },
    {
      key: 'recipientName',
      label: 'Khách Hàng',
      render: (v, row) => (
        <div>
          <p className="font-bold text-[#D4C4A8] text-xs">{v}</p>
          <p className="text-[10px] text-[#6B5A3E] font-mono">{row.recipientPhone}</p>
        </div>
      )
    },
    {
      key: 'totalAmount',
      label: 'Tổng Tiền',
      render: v => <span className="font-mono font-bold text-[#C9922A] text-xs">{fmt(v)}</span>
    },
    {
      key: 'status',
      label: 'Đơn Hàng',
      render: v => <StatusBadge status={v} map={ORDER_STATUS_MAP} />,
    },
    {
      key: 'paymentStatus',
      label: 'Thanh Toán',
      render: v => <StatusBadge status={v} map={PAYMENT_STATUS_MAP} />,
    },
    { key: 'createdAt', label: 'Ngày Tạo', render: v => <span className="text-[10px] text-[#6B5A3E] font-mono">{fmtDate(v)}</span> },
    {
      key: '_actions',
      label: '',
      render: (_, row) => (
        <Link to={`/admin/orders/${row.id}`}>
          <AdminBtn size="sm" variant="secondary">Chi Tiết</AdminBtn>
        </Link>
      )
    }
  ];

  return (
    <div className="max-w-6xl">
      <AdminPageHeader
        title="Quản Lý Đơn Hàng"
        subtitle={`${orders?.totalElements ?? 0} đơn hàng`}
      />

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="w-48">
          <AdminSelect
            value={statusFilter}
            onChange={v => { setStatusFilter(v); setPage(1); }}
            placeholder="Tất cả trạng thái"
            options={Object.entries(ORDER_STATUS_MAP).map(([v, c]) => ({ value: v, label: c.label }))}
          />
        </div>
      </div>

      <AdminTable columns={columns} data={orders?.content} loading={loading} emptyMsg="Chưa có đơn hàng nào" />
      <AdminPagination data={orders} page={page} onPageChange={setPage} />
      <Toasts />
    </div>
  );
}

// ─── Order Detail ─────────────────────────────────────────────────────────────
export function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { add: toast, Toasts } = useAdminToast();

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminAPI.orders.getById(id);
      setOrder(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [id]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      const res = await adminAPI.orders.updateStatus(id, status);
      setOrder(res.data);
      toast('Cập nhật trạng thái thành công');
    } catch (e) { toast(e.message, 'error'); }
    finally { setUpdating(false); }
  };

  const updatePayment = async (paymentStatus) => {
    setUpdating(true);
    try {
      const res = await adminAPI.orders.updatePayment(id, paymentStatus);
      setOrder(res.data);
      toast('Cập nhật thanh toán thành công');
    } catch (e) { toast(e.message, 'error'); }
    finally { setUpdating(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#2A1F14] border-t-[#C9922A] rounded-full animate-spin" /></div>;
  if (!order) return <p className="text-center py-20 text-[#6B5A3E] font-serif italic">Không tìm thấy đơn hàng</p>;

  const nextStatuses = NEXT_STATUSES[order.status] || [];
  const nextPayments = NEXT_PAYMENT[order.paymentStatus] || [];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <AdminBtn variant="ghost" size="sm" onClick={() => navigate('/admin/orders')}>← Quay lại</AdminBtn>
        <h1 className="text-lg font-bold text-[#FAF5EC]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Đơn Hàng #{order.id}
        </h1>
        <StatusBadge status={order.status} map={ORDER_STATUS_MAP} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Items + Address */}
        <div className="lg:col-span-2 space-y-5">
          {/* Order Items */}
          <div className="bg-[#140D05] border border-[#2A1F14] p-5">
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-[#C9922A] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              📚 Danh Sách Sản Phẩm
            </h2>
            <div className="space-y-3">
              {order.items?.map(item => (
                <div key={item.bookId} className="flex items-center justify-between py-2 border-b border-[#2A1F14] last:border-0">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#D4C4A8]">{item.bookTitleSnapshot}</p>
                    <p className="text-[10px] text-[#6B5A3E] font-mono mt-0.5">
                      {item.quantity} × {fmt(item.unitPrice)}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#C9922A]">{fmt(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-[#140D05] border border-[#2A1F14] p-5">
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-[#C9922A] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
              📍 Địa Chỉ Giao Hàng
            </h2>
            <p className="text-xs font-bold text-[#D4C4A8]">{order.recipientName}</p>
            <p className="text-xs text-[#8A7355] font-mono mt-0.5">{order.recipientPhone}</p>
            <p className="text-xs text-[#8A7355] mt-1 font-serif">{order.shippingAddress}</p>
            {order.note && (
              <p className="text-xs text-[#6B5A3E] italic mt-2 border-t border-[#2A1F14] pt-2">Ghi chú: {order.note}</p>
            )}
          </div>
        </div>

        {/* Right: Financials + Actions */}
        <div className="space-y-5">
          {/* Summary */}
          <div className="bg-[#140D05] border border-[#2A1F14] p-5">
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-[#C9922A] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              💰 Tài Chính
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B5A3E]">Tạm tính</span>
                <span className="font-mono text-[#D4C4A8]">{fmt(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#6B5A3E]">Giảm giá{order.couponCode ? ` (${order.couponCode})` : ''}</span>
                  <span className="font-mono text-emerald-400">-{fmt(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#6B5A3E]">Phí ship</span>
                <span className="font-mono text-[#D4C4A8]">{order.shippingFee > 0 ? fmt(order.shippingFee) : 'Miễn phí'}</span>
              </div>
              <div className="flex justify-between border-t border-[#2A1F14] pt-2 mt-2 font-bold">
                <span className="text-[#D4C4A8]">Tổng cộng</span>
                <span className="font-mono text-[#C9922A]">{fmt(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[#6B5A3E]">Thanh toán</span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={order.paymentStatus} map={PAYMENT_STATUS_MAP} />
                  <span className="text-[10px] text-[#6B5A3E]">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Actions */}
          <div className="bg-[#140D05] border border-[#2A1F14] p-5">
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-[#C9922A] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              ⚙️ Cập Nhật Trạng Thái
            </h2>

            {nextStatuses.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[10px] text-[#6B5A3E] mb-2">Chuyển sang:</p>
                {nextStatuses.map(s => (
                  <AdminBtn
                    key={s}
                    variant={s === 'CANCELLED' || s === 'RETURNED' ? 'danger' : 'primary'}
                    size="sm"
                    disabled={updating}
                    onClick={() => updateStatus(s)}
                    className="w-full justify-center"
                  >
                    {ORDER_STATUS_MAP[s]?.label}
                  </AdminBtn>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-[#6B5A3E] italic">Đơn hàng đã kết thúc</p>
            )}

            {nextPayments.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#2A1F14] space-y-2">
                <p className="text-[10px] text-[#6B5A3E] mb-2">Thanh toán:</p>
                {nextPayments.map(s => (
                  <AdminBtn
                    key={s}
                    variant={s === 'REFUNDED' ? 'danger' : 'primary'}
                    size="sm"
                    disabled={updating}
                    onClick={() => updatePayment(s)}
                    className="w-full justify-center"
                  >
                    {PAYMENT_STATUS_MAP[s]?.label}
                  </AdminBtn>
                ))}
              </div>
            )}
          </div>

          <p className="text-[10px] text-[#6B5A3E] font-mono">
            Tạo lúc: {fmtDate(order.createdAt)}
          </p>
        </div>
      </div>
      <Toasts />
    </div>
  );
}
