import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI, bookAPI } from '../api';

const StatCard = ({ icon, label, value, sub, to, color = '#8B6508' }) => (
  <Link
    to={to}
    className="bg-white border border-stone-200/80 p-5 hover:border-[#8B6508]/40 hover:shadow-md transition-all duration-300 group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-[#FCFAF6]/40"
  >
    <div
      className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.07]"
      style={{ background: color, transform: 'translate(20%, -20%)' }}
    />
    <div className="absolute inset-1 border border-[#8B6508]/0 group-hover:border-[#8B6508]/5 pointer-events-none transition-all rounded-lg" />
    <div className="flex items-start justify-between relative z-10">
      <div className="space-y-1">
        <p
          className="text-[10px] uppercase tracking-widest font-bold font-sans"
          style={{ color }}
        >
          {label}
        </p>
        <p className="text-3xl font-bold text-[#140E0A] font-mono tracking-tight">
          {value !== null ? new Intl.NumberFormat('vi-VN').format(value) : '—'}
        </p>
        {sub && (
          <p className="text-[11px] text-stone-400 font-serif italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {sub}
          </p>
        )}
      </div>
      <span className="text-xl p-2 bg-stone-50 rounded-lg border border-stone-100 opacity-70 group-hover:opacity-100 group-hover:bg-white transition-all shadow-3xs">{icon}</span>
    </div>
  </Link>
);

const QuickLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3.5 bg-white border border-stone-200/80 rounded-xl hover:border-[#8B6508]/40 hover:bg-[#8B6508]/5 transition-all duration-200 group shadow-3xs"
  >
    <span className="text-base p-1.5 bg-stone-50 rounded-lg group-hover:bg-white border border-stone-100 group-hover:border-[#8B6508]/10 transition-colors shadow-3xs">{icon}</span>
    <span
      className="text-xs uppercase tracking-wider font-bold text-stone-600 group-hover:text-[#8B6508] transition-colors font-sans"
    >
      {label}
    </span>
    <span className="ml-auto text-stone-300 group-hover:text-[#8B6508] text-sm font-serif transition-transform group-hover:translate-x-0.5">→</span>
  </Link>
);

const ORDER_STATUS_LABELS = {
  PENDING: 'Chờ xác nhận', CONFIRMED: 'Đã xác nhận', PROCESSING: 'Đang xử lý',
  SHIPPED: 'Đang giao', DELIVERED: 'Đã giao', CANCELLED: 'Đã huỷ đơn',
  RETURNED: 'Trả hàng',
};

const ORDER_STATUS_COLORS = {
  PENDING: '#D97706', CONFIRMED: '#2563EB', PROCESSING: '#7C3AED',
  SHIPPED: '#0891B2', DELIVERED: '#059669', CANCELLED: '#DC2626',
  RETURNED: '#EA580C',
};

const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: null, books: null, coupons: null });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      adminAPI.orders.getAll({ size: 5, page: 1 }),
      bookAPI.getAll({ size: 1 }),
      adminAPI.coupons.getAll(),
    ]).then(([ordersRes, booksRes, couponsRes]) => {
      if (ordersRes.status === 'fulfilled') {
        setStats(s => ({
          ...s,
          orders: ordersRes.value.data?.totalElements ?? 0,
        }));
        setRecentOrders(ordersRes.value.data?.content?.slice(0, 5) || []);
      }
      if (booksRes.status === 'fulfilled') {
        setStats(s => ({ ...s, books: booksRes.value.data?.totalElements ?? 0 }));
      }
      if (couponsRes.status === 'fulfilled') {
        const active = couponsRes.value.data?.filter(c => c.status === 'ACTIVE').length ?? 0;
        setStats(s => ({ ...s, coupons: active }));
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-2xl shadow-xs border border-stone-200/60 my-4 space-y-6">
      {}
      <div className="border-b border-[#D4C4A8]/40 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1
            className="text-2xl font-bold text-[#140E0A] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bản Tin Quản Trị
          </h1>
          <p className="text-xs text-stone-400 font-serif italic mt-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Báo cáo tổng quan tiến trình lưu thông hệ thống thư viện thư quán
          </p>
        </div>
        <div className="text-[11px] text-stone-400 font-mono bg-white px-2.5 py-1 rounded-md border border-stone-200/60 self-start sm:self-auto shadow-3xs">
          Hệ thống trực tuyến
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon="📜" label="Quy mô Đơn Hàng" value={stats.orders} sub="Toàn bộ lịch sử giao dịch" to="/admin/orders" color="#8B6508" />
        <StatCard icon="📚" label="Sản lượng đầu sách" value={stats.books} sub="Tổng mục lưu kho thư viện" to="/admin/books" color="#4A7C59" />
        <StatCard icon="🎟️" label="Chiến dịch Coupon" value={stats.coupons} sub="Mã giảm giá đang kích hoạt" to="/admin/coupons" color="#92400E" />
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {}
        <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-xl overflow-hidden relative shadow-2xs">
          <div className="absolute inset-1 border border-stone-50 rounded-lg pointer-events-none" />

          <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-100 bg-[#FAF9F5]">
            <h2
              className="text-xs uppercase tracking-wider font-bold text-[#8B6508] flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span>⏱️</span> Biên bản giao dịch gần đây
            </h2>
            <Link
              to="/admin/orders"
              className="text-[10px] uppercase font-bold tracking-wider text-stone-400 hover:text-[#8B6508] transition-colors bg-white px-2 py-1 rounded border border-stone-200/60 shadow-3xs"
            >
              Xem toàn bộ →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-2">
                <div className="w-6 h-6 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
                <span className="text-[11px] text-stone-400 font-serif italic">Đang truy vấn dữ liệu luồng...</span>
              </div>
            ) : recentOrders.length === 0 ? (
              <p className="px-5 py-12 text-center text-xs text-stone-400 font-serif italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Hệ thống chưa ghi nhận phát sinh giao dịch mới
              </p>
            ) : (
              recentOrders.map(order => (
                <Link
                  key={order.id}
                  to={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-[#FCFAF6] transition-colors group"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#140E0A] group-hover:text-[#8B6508] transition-colors font-sans flex items-center gap-1.5">
                      <span className="font-mono text-[#8B6508]/80 bg-[#8B6508]/5 px-1 py-0.2 rounded border border-[#8B6508]/10 text-[11px]">#{order.id}</span>
                      <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-stone-800">{order.recipientName}</span>
                    </p>
                    <p className="text-[10px] text-stone-400 font-mono pl-0.5">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 ml-4 space-y-1">
                    <span
                      className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border font-sans"
                      style={{
                        color: ORDER_STATUS_COLORS[order.status] || '#8B6508',
                        background: (ORDER_STATUS_COLORS[order.status] || '#8B6508') + '0a',
                        borderColor: (ORDER_STATUS_COLORS[order.status] || '#8B6508') + '25',
                      }}
                    >
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </span>
                    <p className="text-xs font-bold text-[#8B6508] font-mono">
                      {fmt(order.totalAmount)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {}
        <div className="space-y-3">
          <h2
            className="text-xs uppercase tracking-wider font-bold text-[#8B6508] px-1 flex items-center gap-1.5"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span>⚡</span> Lối tắt nghiệp vụ
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            <QuickLink to="/admin/books" icon="📖" label="Đăng ký Sách mới" />
            <QuickLink to="/admin/coupons" icon="🎫" label="Phát hành Mã giảm giá" />
            <QuickLink to="/admin/categories" icon="🗂️" label="Quản lý Danh mục" />
            <QuickLink to="/admin/authors" icon="✍️" label="Hồ sơ Tác giả" />
            <QuickLink to="/admin/publishers" icon="🏛️" label="Hệ thống Nhà xuất bản" />
            <QuickLink to="/admin/orders" icon="📋" label="Hàng đợi Chờ xác nhận" />
          </div>
        </div>

      </div>
    </div>
  );
}