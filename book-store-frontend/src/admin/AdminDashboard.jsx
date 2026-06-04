import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI, bookAPI, categoryAPI } from '../api';

const StatCard = ({ icon, label, value, sub, to, color = '#C9922A' }) => (
  <Link
    to={to}
    className="bg-[#140D05] border border-[#2A1F14] p-6 hover:border-[#C9922A]/40 transition-all duration-200 group relative overflow-hidden"
  >
    <div
      className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 transition-opacity group-hover:opacity-10"
      style={{ background: color, transform: 'translate(30%, -30%)' }}
    />
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p
          className="text-[10px] uppercase tracking-widest font-bold mb-1"
          style={{ color, fontFamily: "'Cinzel', serif" }}
        >
          {label}
        </p>
        <p className="text-3xl font-bold text-[#FAF5EC] font-mono">{value ?? '—'}</p>
        {sub && (
          <p className="text-[11px] text-[#6B5A3E] mt-1 font-serif italic">{sub}</p>
        )}
      </div>
      <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{icon}</span>
    </div>
  </Link>
);

const QuickLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-4 bg-[#1A1108] border border-[#2A1F14] hover:border-[#C9922A]/40 hover:bg-[#C9922A]/5 transition-all group"
  >
    <span className="text-lg">{icon}</span>
    <span
      className="text-xs uppercase tracking-wider font-bold text-[#8A7355] group-hover:text-[#C9922A] transition-colors"
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      {label}
    </span>
    <span className="ml-auto text-[#3A2A18] group-hover:text-[#C9922A] text-xs">›</span>
  </Link>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: null, books: null, coupons: null });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    Promise.allSettled([
      adminAPI.orders.getAll({ size: 5 }),
      bookAPI.getAll({ size: 1 }),
      adminAPI.coupons.getAll(),
    ]).then(([ordersRes, booksRes, couponsRes]) => {
      if (ordersRes.status === 'fulfilled') {
        setStats(s => ({
          ...s,
          orders: ordersRes.value.data?.totalElements ?? ordersRes.value.data?.content?.length ?? 0,
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
    });
  }, []);

  const ORDER_STATUS_LABELS = {
    PENDING: 'Chờ xác nhận', CONFIRMED: 'Đã xác nhận', PROCESSING: 'Đang xử lý',
    SHIPPED: 'Đang giao', DELIVERED: 'Đã giao', CANCELLED: 'Đã huỷ', RETURNED: 'Trả hàng',
  };
  const ORDER_STATUS_COLORS = {
    PENDING: '#D97706', CONFIRMED: '#3B82F6', PROCESSING: '#8B5CF6',
    SHIPPED: '#06B6D4', DELIVERED: '#10B981', CANCELLED: '#EF4444', RETURNED: '#F97316',
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold text-[#FAF5EC] tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Bảng Điều Hành
        </h1>
        <p className="text-xs text-[#6B5A3E] font-serif italic mt-1">
          Trung tâm quản trị hệ thống Bibliotheca
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon="📋" label="Tổng Đơn Hàng" value={stats.orders} sub="Toàn bộ hệ thống" to="/admin/orders" />
        <StatCard icon="📚" label="Đầu Sách" value={stats.books} sub="Trong kho thư viện" to="/admin/books" color="#6B9B6B" />
        <StatCard icon="🎫" label="Coupon Hiệu Lực" value={stats.coupons} sub="Đang kích hoạt" to="/admin/coupons" color="#9B6B9B" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[#140D05] border border-[#2A1F14]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A1F14]">
            <h2
              className="text-xs uppercase tracking-widest font-bold text-[#C9922A]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Đơn Hàng Gần Đây
            </h2>
            <Link
              to="/admin/orders"
              className="text-[10px] uppercase tracking-wider text-[#6B5A3E] hover:text-[#C9922A] transition-colors"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="divide-y divide-[#2A1F14]">
            {recentOrders.length === 0 ? (
              <p className="px-5 py-8 text-center text-xs text-[#6B5A3E] font-serif italic">
                Chưa có đơn hàng nào
              </p>
            ) : recentOrders.map(order => (
              <Link
                key={order.id}
                to={`/admin/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-[#1A1108] transition-colors group"
              >
                <div>
                  <p
                    className="text-xs font-bold text-[#D4C4A8] group-hover:text-[#C9922A] transition-colors"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    #{order.id} — {order.recipientName}
                  </p>
                  <p className="text-[10px] text-[#6B5A3E] font-mono mt-0.5">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : ''}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <span
                    className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[1px]"
                    style={{
                      color: ORDER_STATUS_COLORS[order.status] || '#8A7355',
                      background: (ORDER_STATUS_COLORS[order.status] || '#8A7355') + '20',
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {ORDER_STATUS_LABELS[order.status] || order.status}
                  </span>
                  <p className="text-xs font-bold text-[#C9922A] mt-1 font-mono">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h2
            className="text-xs uppercase tracking-widest font-bold text-[#C9922A] px-1"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Thao Tác Nhanh
          </h2>
          <QuickLink to="/admin/books" icon="📚" label="Thêm sách mới" />
          <QuickLink to="/admin/coupons" icon="🎫" label="Tạo coupon" />
          <QuickLink to="/admin/categories" icon="🗂️" label="Thêm danh mục" />
          <QuickLink to="/admin/authors" icon="✍️" label="Thêm tác giả" />
          <QuickLink to="/admin/publishers" icon="🏛️" label="Thêm NXB" />
          <QuickLink to="/admin/orders" icon="📋" label="Xem đơn hàng PENDING" />
        </div>
      </div>
    </div>
  );
}
