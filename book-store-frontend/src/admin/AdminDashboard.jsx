import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../api';

const StatCard = ({ icon, label, value, sub, to, color = '#8B6508', isCurrency = false }) => (
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
        <p className="text-2xl sm:text-3xl font-bold text-[#140E0A] font-mono tracking-tight break-all">
          {value !== null ? (isCurrency ? fmt(value) : new Intl.NumberFormat('vi-VN').format(value)) : '—'}
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
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      adminAPI.dashboard.getStatistics(),
      adminAPI.orders.getAll({ size: 5, page: 1 }),
    ]).then(([statsRes, ordersRes]) => {
      if (statsRes.status === 'fulfilled' && statsRes.value.data) {
        setStats(statsRes.value.data);
      }
      if (ordersRes.status === 'fulfilled') {
        setRecentOrders(ordersRes.value.data?.content?.slice(0, 5) || []);
      }
      setLoading(false);
    });
  }, []);

  // Prepare chart metrics
  const monthlyRevenueData = stats?.monthlyRevenue 
    ? [...stats.monthlyRevenue].reverse() 
    : [];

  const maxRevenue = monthlyRevenueData.length > 0 
    ? Math.max(...monthlyRevenueData.map(d => d.revenue), 1) 
    : 1;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-2xl shadow-xs border border-stone-200/60 my-4 space-y-6">
      {/* Title */}
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="💰" label="Doanh thu thực tế" value={stats?.totalRevenue ?? 0} sub="Tổng doanh thu đơn hàng đã giao" to="/admin/orders" color="#059669" isCurrency={true} />
        <StatCard icon="📜" label="Quy mô Đơn Hàng" value={stats?.totalOrders ?? 0} sub="Toàn bộ lịch sử giao dịch" to="/admin/orders" color="#8B6508" />
        <StatCard icon="📚" label="Sản lượng đầu sách" value={stats?.totalBooks ?? 0} sub="Tổng mục lưu kho thư viện" to="/admin/books" color="#4A7C59" />
        <StatCard icon="👥" label="Khách hàng đăng ký" value={stats?.totalUsers ?? 0} sub="Quy mô thành viên thư quán" to="/admin/orders" color="#2563EB" />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Monthly Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-xl p-5 shadow-2xs relative">
          <div className="absolute inset-1 border border-stone-50 rounded-lg pointer-events-none" />
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#8B6508] mb-6 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
            <span>📈</span> Xu hướng doanh thu (6 tháng gần nhất)
          </h2>

          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
              <span className="text-[11px] text-stone-400 font-serif italic">Đang tải biểu đồ...</span>
            </div>
          ) : monthlyRevenueData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-xs text-stone-400 font-serif italic">
              Chưa có dữ liệu thống kê doanh thu theo tháng
            </div>
          ) : (
            <div className="w-full">
              {/* Custom SVG Bar Chart */}
              <svg viewBox="0 0 500 240" className="w-full overflow-visible">
                {/* Horizontal Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = 20 + (1 - ratio) * 160;
                  return (
                    <g key={idx}>
                      <line x1="40" y1={y} x2="480" y2={y} stroke="#F5F5F0" strokeWidth="1" />
                      <text x="35" y={y + 3} fill="#A8A29E" fontSize="8" textAnchor="end" fontFamily="monospace">
                        {ratio === 0 ? '0' : (ratio === 1 ? fmt(maxRevenue) : fmt(maxRevenue * ratio))}
                      </text>
                    </g>
                  );
                })}

                {/* Bars */}
                {monthlyRevenueData.map((d, idx) => {
                  const barCount = monthlyRevenueData.length;
                  const spacing = 440 / barCount;
                  const x = 50 + idx * spacing;
                  const barHeight = (d.revenue / maxRevenue) * 160;
                  const y = 180 - barHeight;
                  const barWidth = Math.min(30, spacing - 15);

                  return (
                    <g key={idx} className="group/bar cursor-pointer">
                      {/* Bar Fill */}
                      <rect
                        x={x - barWidth / 2}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill="url(#barGradient)"
                        rx="4"
                        className="transition-all duration-300 hover:fill-[#8B6508]"
                      />
                      {/* Month Text */}
                      <text
                        x={x}
                        y="198"
                        fill="#57534E"
                        fontSize="9"
                        textAnchor="middle"
                        className="font-serif italic"
                      >
                        {d.month}
                      </text>
                      
                      {/* Tooltip Hover value */}
                      <rect
                        x={x - 45}
                        y={y - 25}
                        width="90"
                        height="20"
                        fill="#140E0A"
                        rx="4"
                        className="opacity-0 group-hover/bar:opacity-90 transition-opacity pointer-events-none"
                      />
                      <text
                        x={x}
                        y={y - 12}
                        fill="#FFFFFF"
                        fontSize="7"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none"
                      >
                        {fmt(d.revenue)} ({d.orderCount} ĐH)
                      </text>
                    </g>
                  );
                })}

                {/* Gradients */}
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B6508" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4C4A8" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>

        {/* Order Status Summary */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-2xs relative">
          <div className="absolute inset-1 border border-stone-50 rounded-lg pointer-events-none" />
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#8B6508] mb-4 flex items-center gap-1.5"
              style={{ fontFamily: "'Cinzel', serif" }}>
            <span>📊</span> Trạng thái giao dịch
          </h2>

          <div className="space-y-3">
            {loading ? (
              <div className="py-12 flex justify-center">
                <div className="w-5 h-5 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
              </div>
            ) : !stats || Object.keys(stats.orderStatusCounts || {}).length === 0 ? (
              <p className="text-center text-xs text-stone-400 font-serif italic py-8">Chưa có giao dịch phát sinh</p>
            ) : (
              Object.entries(stats.orderStatusCounts).map(([status, count]) => {
                const total = stats.totalOrders || 1;
                const percent = ((count / total) * 100).toFixed(0);
                const color = ORDER_STATUS_COLORS[status] || '#8B6508';

                return (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="font-semibold text-stone-700 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />
                        {ORDER_STATUS_LABELS[status] || status}
                      </span>
                      <span className="font-mono text-stone-500 font-bold">{count} ({percent}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percent}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
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

        {/* Top Selling Books */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-2xs relative">
          <div className="absolute inset-1 border border-stone-50 rounded-lg pointer-events-none" />
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#8B6508] mb-4 flex items-center gap-1.5"
              style={{ fontFamily: "'Cinzel', serif" }}>
            <span>🏆</span> Ấn bản bán chạy nhất
          </h2>

          <div className="space-y-4">
            {loading ? (
              <div className="py-12 flex justify-center">
                <div className="w-5 h-5 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
              </div>
            ) : !stats || stats.topSellingBooks.length === 0 ? (
              <p className="text-center text-xs text-stone-400 font-serif italic py-8">Chưa ghi nhận sản lượng tiêu thụ sách</p>
            ) : (
              stats.topSellingBooks.map((book, idx) => (
                <div key={book.bookId} className="flex items-center gap-3 group">
                  <div className="w-8 h-10 bg-stone-100 rounded border border-stone-200 overflow-hidden flex-shrink-0 shadow-3xs">
                    {book.coverUrl ? (
                      <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400 font-serif">📖</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-stone-800 truncate font-sans group-hover:text-[#8B6508] transition-colors">{idx + 1}. {book.title}</p>
                    <p className="text-[10px] text-stone-400 font-mono">Đã bán: <span className="font-bold text-stone-600 font-sans">{book.totalSoldQuantity} cuốn</span></p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}