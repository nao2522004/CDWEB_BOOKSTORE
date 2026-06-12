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
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col overflow-hidden">
        {}
        <div className="px-5 h-[73px] flex items-center border-b border-[#D4C4A8]/60 bg-[#FAF5EC] flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 group w-full">
            <span className="text-[#8B6508] text-base transition-transform duration-700 group-hover:rotate-180 bg-[#8B6508]/5 w-9 h-9 flex items-center justify-center rounded-lg border border-[#8B6508]/20 shadow-sm flex-shrink-0">
              ❖
            </span>
            {!collapsed && (
              <div className="min-w-0 flex flex-col justify-center select-none">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#140E0A] leading-none mb-1"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                  Bibliotheca
                </p>
                <p className="text-[8px] font-bold text-[#A8967E] uppercase tracking-widest leading-none"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                  Biện Giám Admin
                </p>
              </div>
            )}
          </Link>
        </div>

        {}
        <nav className="p-3 space-y-1.5 overflow-y-auto flex-1">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-3 text-[11px] font-bold uppercase tracking-wider transition-all duration-150 rounded-lg group relative ${isActive
                  ? 'text-[#8B6508] bg-[#8B6508]/10 font-extrabold'
                  : 'text-stone-500 hover:text-[#8B6508] hover:bg-[#8B6508]/5'
                }`
              }
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {}
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#8B6508] rounded-r-md" />
                  )}
                  {}
                  <span className="text-sm w-5 h-5 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110 leading-none antialiased">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="truncate pt-[1px] leading-tight">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {}
      <div className="border-t border-[#D4C4A8]/60 p-3 bg-[#FAF5EC]">
        {!collapsed && (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-[#F5EFE2] border border-[#D4C4A8]/40 mb-2">
            <div className="w-8 h-8 border border-[#8B6508]/30 bg-[#FAF5EC] flex items-center justify-center text-xs font-bold text-[#8B6508] flex-shrink-0 rounded-md shadow-sm"
              style={{ fontFamily: "'Cinzel', serif" }}>
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <p className="text-[11px] font-bold text-[#140E0A] truncate leading-tight">{user?.name || 'Admin User'}</p>
              <p className="text-[9px] text-stone-400 truncate font-mono leading-none mt-1">{user?.email || 'admin@library.com'}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full text-left text-[9px] uppercase tracking-widest font-bold text-stone-500 hover:text-red-700 hover:bg-red-50/60 transition-all duration-150 p-2 flex items-center gap-2.5 rounded-lg ${collapsed ? 'justify-center' : ''}`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className="text-xs w-5 h-5 flex items-center justify-center flex-shrink-0 leading-none">⏻</span>
          {!collapsed && <span className="pt-[2px]">Đăng Xuất</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F3EFE6] text-[#2C2114] antialiased overflow-hidden selection:bg-[#8B6508]/10">

      {}
      <aside
        className={`hidden md:flex flex-col flex-shrink-0 bg-[#FAF5EC] border-r border-[#D4C4A8]/80 transition-all duration-300 ease-in-out relative ${collapsed ? 'w-20' : 'w-64'
          }`}
      >
        <SidebarContent />

        {}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-[#FAF5EC] border border-[#D4C4A8] text-[#8B6508] text-xs flex items-center justify-center transition-all duration-200 z-20 shadow-sm rounded-full hover:bg-[#8B6508] hover:text-[#FAF5EC]"
        >
          {collapsed ? '›' : '‹'}
        </button>
      </aside>

      {}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-[#2C2114]/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#FAF5EC] border-r border-[#D4C4A8] flex flex-col shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {}
      <div className="flex-1 flex flex-col overflow-hidden">

        {}
        <header className="bg-[#FAF5EC] border-b border-[#D4C4A8]/60 px-6 h-[73px] flex items-center justify-between flex-shrink-0">
          <button
            className="md:hidden text-stone-500 hover:text-[#8B6508] p-1"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          {}
          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-bold text-stone-400"
            style={{ fontFamily: "'Cinzel', serif" }}>
            <Link to="/" className="hover:text-[#8B6508] transition-colors">Thư Viện</Link>
            <span className="text-[#D4C4A8] text-[8px]">/</span>
            <span className="text-[#8B6508] font-black">Biện Giám</span>
          </div>

          {}
          <div className="flex items-center ml-auto">
            <Link
              to="/"
              className="text-[10px] font-bold uppercase tracking-wider text-stone-600 hover:text-[#FAF5EC] hover:bg-[#8B6508] transition-all duration-200 border border-[#D4C4A8] px-3.5 py-2 rounded-lg bg-[#FAF5EC] shadow-xs"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ← Về Trang Chủ
            </Link>
          </div>
        </header>

        {}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F3EFE6]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}