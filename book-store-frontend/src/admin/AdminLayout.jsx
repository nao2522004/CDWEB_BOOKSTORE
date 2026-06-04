import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Tổng Quan', icon: '◈', end: true },
  { to: '/admin/books', label: 'Quản Lý Sách', icon: '📚' },
  { to: '/admin/orders', label: 'Quản Lý Đơn Hàng', icon: '📋' },
  { to: '/admin/coupons', label: 'Quản Lý Coupon', icon: '🎫' },
  { to: '/admin/categories', label: 'Danh Mục', icon: '🗂️' },
  { to: '/admin/authors', label: 'Tác Giả', icon: '✍️' },
  { to: '/admin/publishers', label: 'Nhà Xuất Bản', icon: '🏛️' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#2A1F14]">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-[#C9922A] text-lg transition-transform duration-500 group-hover:rotate-180">❖</span>
          {!collapsed && (
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#C9922A]"
                style={{ fontFamily: "'Cinzel', serif" }}>
                Bibliotheca
              </p>
              <p className="text-[9px] text-[#6B5A3E] uppercase tracking-wider mt-0.5"
                style={{ fontFamily: "'Cinzel', serif" }}>
                Biện Giám Admin
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 relative group ${
                isActive
                  ? 'text-[#C9922A] bg-[#C9922A]/10 border-r-2 border-[#C9922A]'
                  : 'text-[#8A7355] hover:text-[#C9922A] hover:bg-[#C9922A]/5'
              }`
            }
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-[#2A1F14] p-4">
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-xs font-bold text-[#C9922A] flex-shrink-0"
              style={{ fontFamily: "'Cinzel', serif" }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#D4C4A8] truncate">{user?.name}</p>
              <p className="text-[10px] text-[#6B5A3E] truncate font-mono">{user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full text-left text-[10px] uppercase tracking-widest font-bold text-[#6B5A3E] hover:text-red-400 transition-colors px-1 py-1 flex items-center gap-2`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span>⏻</span>
          {!collapsed && <span>Đăng Xuất</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0F0A06] text-[#D4C4A8] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col flex-shrink-0 bg-[#140D05] border-r border-[#2A1F14] transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-10 bg-[#2A1F14] border border-[#3A2A18] text-[#6B5A3E] hover:text-[#C9922A] text-xs flex items-center justify-center transition-colors z-10"
          style={{ left: collapsed ? '3.75rem' : '14.75rem' }}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#140D05] border-r border-[#2A1F14] flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-[#140D05] border-b border-[#2A1F14] px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <button
            className="md:hidden text-[#6B5A3E] hover:text-[#C9922A] text-xl"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#6B5A3E]"
            style={{ fontFamily: "'Cinzel', serif" }}>
            <Link to="/" className="hover:text-[#C9922A] transition-colors">Thư Viện</Link>
            <span>›</span>
            <span className="text-[#C9922A]">Biện Giám</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Link
              to="/"
              className="text-[10px] uppercase tracking-wider text-[#6B5A3E] hover:text-[#C9922A] transition-colors border border-[#2A1F14] hover:border-[#C9922A]/30 px-3 py-1.5 rounded-[1px]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ← Về Trang Chủ
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
