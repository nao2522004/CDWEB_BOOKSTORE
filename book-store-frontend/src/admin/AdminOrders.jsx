import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminTable, AdminSelect, StatusBadge,
  AdminPagination, useAdminToast,
} from './AdminComponents';

const ORDER_STATUS_MAP = {
  PENDING: { label: 'Chờ Xác Nhận', colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  CONFIRMED: { label: 'Đã Xác Nhận', colorClass: 'bg-blue-100 text-blue-800 border-blue-200' },
  PROCESSING: { label: 'Đang Xử Lý', colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  SHIPPED: { label: 'Đang Giao', colorClass: 'bg-purple-100 text-purple-800 border-purple-200' },
  DELIVERED: { label: 'Đã Giao', colorClass: 'bg-green-100 text-green-800 border-green-200' },
  CANCELLED: { label: 'Đã Huỷ Đơn', colorClass: 'bg-red-100 text-red-700 border-red-200' },
  RETURNED: { label: 'Trả Hàng', colorClass: 'bg-orange-100 text-orange-800 border-orange-200' },
};

const PAYMENT_STATUS_MAP = {
  UNPAID: { label: 'Chưa Thanh Toán', colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  PAID: { label: 'Đã Thanh Toán', colorClass: 'bg-green-100 text-green-800 border-green-200' },
  REFUNDED: { label: 'Hoàn Tiền', colorClass: 'bg-purple-100 text-purple-800 border-purple-200' },
};

const NEXT_STATUSES = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED', 'RETURNED'],
  DELIVERED: [], CANCELLED: [], RETURNED: [],
};

const NEXT_PAYMENT = {
  UNPAID: ['PAID'], PAID: ['REFUNDED'], REFUNDED: [],
};

const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
const fmtDate = (d) => d ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(d)) : '—';

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
    {
      key: 'id', label: 'MÃ ĐƠN', width: '80px',
      render: v => <span className="font-mono text-[#8B6508] font-bold text-xs bg-[#8B6508]/5 px-2 py-0.5 rounded border border-[#8B6508]/10 shadow-3xs">#{v}</span>
    },
    {
      key: 'recipientName',
      label: 'ĐỐI TÁC KHÁCH HÀNG',
      render: (v, row) => (
        <div className="py-0.5">
          <p className="font-bold text-[#140E0A] text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>{v}</p>
          <p className="text-[10px] text-stone-400 font-mono mt-0.5 tracking-wide">{row.recipientPhone}</p>
        </div>
      )
    },
    {
      key: 'totalAmount',
      label: 'GIÁ TRỊ ĐƠN',
      render: v => <span className="font-mono font-bold text-[#8B6508] text-xs bg-stone-50 px-2 py-1 rounded border border-stone-100">{fmt(v)}</span>
    },
    {
      key: 'status', label: 'VẬN CHUYỂN',
      render: v => <StatusBadge status={v} map={ORDER_STATUS_MAP} />,
    },
    {
      key: 'paymentStatus', label: 'DÒNG TIỀN',
      render: v => <StatusBadge status={v} map={PAYMENT_STATUS_MAP} />,
    },
    {
      key: 'createdAt', label: 'THỜI ĐIỂM ĐẶT',
      render: v => <span className="text-[11px] text-stone-500 font-mono">{fmtDate(v)}</span>
    },
    {
      key: '_actions', label: 'QUẢN TRỊ',
      render: (_, row) => (
        <Link to={`/admin/orders/${row.id}`}>
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-50 border-stone-300">
            Chi Tiết
          </AdminBtn>
        </Link>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-xs border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Sổ Cái Đơn Hàng"
        subtitle={`Quản lý toàn bộ hệ thống lưu chuyển gồm ${orders?.totalElements ?? 0} giao dịch`}
      />

      <div className="flex gap-3 mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-3xs flex-wrap items-center">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider pl-1">Lọc theo trạng thái vận hành:</span>
        <div className="w-56">
          <AdminSelect
            value={statusFilter}
            onChange={v => { setStatusFilter(v); setPage(1); }}
            placeholder="Tất cả trạng thái"
            options={Object.entries(ORDER_STATUS_MAP).map(([v, c]) => ({ value: v, label: c.label }))}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-3xs overflow-hidden">
        <AdminTable columns={columns} data={orders?.content} loading={loading} emptyMsg="Hệ thống chưa ghi nhận đơn hàng nào phù hợp" />
      </div>

      <div className="mt-4">
        <AdminPagination data={orders} page={page} onPageChange={setPage} />
      </div>
      <Toasts />
    </div>
  );
}

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
      toast('Cập nhật trạng thái đơn hàng thành công');
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); setUpdating(false); }
  };

  const updatePayment = async (paymentStatus) => {
    setUpdating(true);
    try {
      const res = await adminAPI.orders.updatePayment(id, paymentStatus);
      setOrder(res.data);
      toast('Cập nhật trạng thái dòng tiền thành công');
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); setUpdating(false); }
  };

  if (loading) return (
    <div className="flex justify-center py-32 bg-[#FCFAF6] rounded-xl border border-stone-200/60 max-w-4xl mx-auto my-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
        <span className="text-xs text-stone-400 font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Đang đối chiếu chứng từ...</span>
      </div>
    </div>
  );

  if (!order) return (
    <div className="text-center py-20 bg-[#FCFAF6] rounded-xl border border-stone-200/60 max-w-4xl mx-auto my-4">
      <p className="text-stone-400 font-serif italic text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Chứng từ hoặc đơn hàng không tồn tại trên hệ thống dữ liệu
      </p>
      <AdminBtn variant="secondary" size="sm" className="mt-4" onClick={() => navigate('/admin/orders')}>Quay lại danh sách</AdminBtn>
    </div>
  );

  const nextStatuses = NEXT_STATUSES[order.status] || [];
  const nextPayments = NEXT_PAYMENT[order.paymentStatus] || [];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-xs border border-stone-200/60 my-4">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#D4C4A8]/40 pb-4">
        <div className="flex items-center gap-3">
          <AdminBtn variant="ghost" size="sm" className="hover:bg-stone-200/60 text-stone-600" onClick={() => navigate('/admin/orders')}>
            ← Danh sách
          </AdminBtn>
          <h1 className="text-xl font-bold text-[#140E0A] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Chi Tiết Đơn Hàng <span className="font-mono text-[#8B6508]">#{order.id}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <StatusBadge status={order.status} map={ORDER_STATUS_MAP} />
          <StatusBadge status={order.paymentStatus} map={PAYMENT_STATUS_MAP} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="lg:col-span-2 space-y-5">
          {}
          <div className="bg-white border border-stone-200/80 p-5 relative rounded-lg shadow-2xs">
            <div className="absolute inset-1 border border-stone-100 rounded-md pointer-events-none" />
            <h2 className="text-[11px] uppercase tracking-wider font-bold text-[#8B6508] mb-4 pb-2 border-b border-stone-100 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <span>📚</span> DANH MỤC ẤN PHẨM CUNG CẤP
            </h2>
            <div className="space-y-4">
              {order.items?.map(item => (
                <div key={item.bookId} className="flex items-start justify-between py-1 border-b border-stone-100 last:border-0 last:pb-0">
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-bold text-[#140E0A] leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.bookTitleSnapshot}
                    </p>
                    <p className="text-[11px] text-stone-400 font-mono mt-1 bg-stone-50 inline-block px-1.5 py-0.5 rounded">
                      SL: {item.quantity} × {fmt(item.unitPrice)}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#140E0A] pt-0.5">
                    {fmt(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="bg-white border border-stone-200/80 p-5 relative rounded-lg shadow-2xs">
            <div className="absolute inset-1 border border-stone-100 rounded-md pointer-events-none" />
            <h2 className="text-[11px] uppercase tracking-wider font-bold text-[#8B6508] mb-3 pb-1.5 border-b border-stone-100 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <span>📍</span> THÔNG TIN ĐỊA CHỈ GIAO NHẬN
            </h2>
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#140E0A]" style={{ fontFamily: "'Cinzel', serif" }}>
                {order.recipientName}
              </p>
              <p className="text-xs text-stone-500 font-mono bg-stone-50 inline-block px-1.5 py-0.5 rounded border border-stone-100 mt-1">{order.recipientPhone}</p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed bg-stone-50/40 p-2.5 rounded border border-stone-100/60 font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {order.shippingAddress}
              </p>
            </div>
            {order.note && (
              <div className="mt-3 bg-amber-50/40 border border-amber-100/70 p-2.5 rounded">
                <p className="text-xs text-amber-800 italic font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <span className="font-sans font-bold not-italic text-[10px] text-amber-700 uppercase tracking-wide block mb-0.5">Bản ghi chú hệ thống:</span>
                  "{order.note}"
                </p>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="space-y-5">
          {}
          <div className="bg-[#FAF7F2] border border-[#D4C4A8]/80 p-5 relative rounded-lg shadow-2xs">
            <div className="absolute inset-1 border border-[#8B6508]/5 rounded-md pointer-events-none" />
            <h2 className="text-[11px] uppercase tracking-wider font-bold text-[#8B6508] mb-4 pb-2 border-b border-[#D4C4A8]/40 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <span>💰</span> HÓA ĐƠN ĐỐI SOÁT
            </h2>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Tổng giá trị hàng</span>
                <span className="font-mono text-stone-800 font-medium">{fmt(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 flex flex-col">
                    <span>Chiết khấu mã</span>
                    {order.couponCode && <span className="text-[10px] text-[#8B6508] font-mono font-bold">[{order.couponCode}]</span>}
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">-{fmt(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Phí vận chuyển</span>
                <span className="font-mono text-stone-800 font-medium">{order.shippingFee > 0 ? fmt(order.shippingFee) : 'Miễn phí'}</span>
              </div>

              <div className="flex justify-between items-baseline border-t border-[#D4C4A8]/60 pt-2.5 mt-2 font-bold">
                <span className="text-[#140E0A] text-xs uppercase tracking-wide">Thực thu (Tổng)</span>
                <span className="font-mono text-base text-[#8B6508]">{fmt(order.totalAmount)}</span>
              </div>

              <div className="flex flex-col gap-1 border-t border-dashed border-[#D4C4A8]/40 pt-2.5 mt-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-400">Phương thức:</span>
                  <span className="text-stone-600 font-medium font-mono uppercase text-[10px] bg-stone-200/60 px-1 py-0.2 rounded">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="bg-white border border-stone-200/80 p-5 relative rounded-lg shadow-2xs">
            <div className="absolute inset-1 border border-stone-100 rounded-md pointer-events-none" />
            <h2 className="text-[11px] uppercase tracking-wider font-bold text-[#8B6508] mb-4 pb-2 border-b border-stone-100 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <span>⚙️</span> ĐIỀU HÀNH ĐƠN HÀNG
            </h2>

            {}
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-2">Quy trình xử lý đơn:</p>
              {nextStatuses.length > 0 ? (
                <div className="space-y-2">
                  {nextStatuses.map(s => (
                    <AdminBtn
                      key={s}
                      variant={s === 'CANCELLED' || s === 'RETURNED' ? 'danger' : 'primary'}
                      size="sm"
                      disabled={updating}
                      onClick={() => updateStatus(s)}
                      className="w-full justify-center shadow-3xs font-medium text-xs py-1.5"
                    >
                      Chuyển: {ORDER_STATUS_MAP[s]?.label}
                    </AdminBtn>
                  ))}
                </div>
              ) : (
                <div className="bg-stone-50 p-2.5 rounded text-center border border-dashed border-stone-200">
                  <p className="text-xs text-stone-400 font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Vòng đời hoàn tất hoặc đơn đã huỷ
                  </p>
                </div>
              )}
            </div>

            {}
            {nextPayments.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-2">Đối soát dòng tiền:</p>
                <div className="space-y-2">
                  {nextPayments.map(s => (
                    <AdminBtn
                      key={s}
                      variant={s === 'REFUNDED' ? 'danger' : 'primary'}
                      size="sm"
                      disabled={updating}
                      onClick={() => updatePayment(s)}
                      className="w-full justify-center border-amber-600/30 text-amber-900 bg-amber-50 hover:bg-amber-100 font-medium text-xs py-1.5"
                    >
                      Xác nhận: {PAYMENT_STATUS_MAP[s]?.label}
                    </AdminBtn>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-[10px] text-stone-400 font-mono text-right pr-1">
            Khởi tạo hệ thống: {fmtDate(order.createdAt)}
          </p>
        </div>
      </div>
      <Toasts />
    </div>
  );
}