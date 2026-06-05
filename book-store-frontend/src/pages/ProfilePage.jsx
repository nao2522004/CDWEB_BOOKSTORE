import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI, addressAPI, orderAPI } from '../api';
import { ErrorMsg, Spinner } from '../components/common';
import { formatPrice, formatDate, getOrderStatusColor, getOrderStatusLabel } from '../utils';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'addresses', or 'orders'

  // Profile/Password States
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwError, setPwError] = useState('');

  // Address States
  const [addresses, setAddresses] = useState([]);
  const [addrLoading, setAddrLoading] = useState(false);
  const [addrError, setAddrError] = useState('');
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [editingAddrId, setEditingAddrId] = useState(null);
  const [newAddr, setNewAddr] = useState({
    fullName: '', phone: '', street: '', province: '', district: '', ward: '',
    isDefault: false
  });
  const [addrErrors, setAddrErrors] = useState({});

  // Order States
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [ordersPage, setOrdersPage] = useState(1);
  const ordersPerPage = 5;


  useEffect(() => {
    if (activeTab === 'addresses') {
      fetchAddresses();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchAddresses = async () => {
    setAddrLoading(true);
    setAddrError('');
    try {
      const res = await addressAPI.getAll();
      setAddresses(res.data || []);
    } catch (err) {
      setAddrError(err.message || 'Không thể tải danh sách địa chỉ');
    } finally {
      setAddrLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const res = await orderAPI.getMyOrders();
      setOrders(res.data || []);
    } catch (err) {
      setOrdersError(err.message || 'Không thể tải danh sách đơn hàng');
    } finally {
      setOrdersLoading(false);
    }
  };


  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setPwError('Mật mã tân lập không trùng khớp');
      return;
    }
    setPwLoading(true);
    setPwError('');
    setPwSuccess('');
    try {
      await authAPI.changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setPwSuccess('Cải biến mật mã thành công!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPwError(err.message);
    } finally {
      setPwLoading(false);
    }
  };

  const PHONE_REGEX = /^(0[35789])[0-9]{7,8}$/;
  const validateAddrField = (key, value) => {
    if (!value?.trim()) return 'Không được để trống';
    if (key === 'phone' && !PHONE_REGEX.test(value))
      return 'Số điện thoại không hợp lệ (9-10 số, đầu 03/05/07/08/09)';
    return '';
  };

  const handleAddrChange = (key, value) => {
    setNewAddr(a => ({ ...a, [key]: value }));
    setAddrErrors(e => ({ ...e, [key]: validateAddrField(key, value) }));
  };

  const handleAddOrUpdateAddress = async (e) => {
    e.preventDefault();
    // Validate all fields
    const errors = {};
    Object.keys(newAddr).forEach(key => {
      if (key !== 'isDefault') {
        const errMsg = validateAddrField(key, newAddr[key]);
        if (errMsg) errors[key] = errMsg;
      }
    });

    if (Object.keys(errors).length > 0) {
      setAddrErrors(errors);
      return;
    }

    setAddrLoading(true);
    try {
      const payload = { ...newAddr, isDefault: !!newAddr.isDefault };
      if (editingAddrId) {
        await addressAPI.update(editingAddrId, payload);
      } else {
        await addressAPI.create(payload);
      }
      setShowNewAddr(false);
      setEditingAddrId(null);
      setNewAddr({ fullName: '', phone: '', street: '', province: '', district: '', ward: '', isDefault: false });
      setAddrErrors({});
      await fetchAddresses();
    } catch (err) {
      setAddrError(err.message);
    } finally {
      setAddrLoading(false);
    }
  };

  const handleEditClick = (addr) => {
    setNewAddr({
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      isDefault: addr.isDefault
    });
    setEditingAddrId(addr.id);
    setShowNewAddr(true);
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa địa sở này?')) return;
    setAddrLoading(true);
    try {
      await addressAPI.delete(id);
      await fetchAddresses();
    } catch (err) {
      setAddrError(err.message);
    } finally {
      setAddrLoading(false);
    }
  };

  const handleSetDefault = async (id) => {
    setAddrLoading(true);
    try {
      await addressAPI.setDefault(id);
      await fetchAddresses();
    } catch (err) {
      setAddrError(err.message);
    } finally {
      setAddrLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF5EC] min-h-screen text-[#2C2114] selection:bg-[#E6CE9A]/50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#140E0A] tracking-wide border-b border-[#D4C4A8] pb-5 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Thông Quan Kiến Danh
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ── Sidebar Điều Hướng ── */}
          <div className="md:col-span-1 space-y-2">
            <button
              onClick={() => { setActiveTab('profile'); setShowNewAddr(false); }}
              className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-extrabold transition-all border ${activeTab === 'profile'
                ? 'bg-[#2C2114] text-[#FAF5EC] border-[#2C2114]'
                : 'bg-transparent text-[#2C2114] border-[#D4C4A8] hover:bg-[#8B6508]/5'
                }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              👤 Hồ Sơ & Mật Mã
            </button>
            <button
              onClick={() => { setActiveTab('addresses'); setShowNewAddr(false); }}
              className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-extrabold transition-all border ${activeTab === 'addresses'
                ? 'bg-[#2C2114] text-[#FAF5EC] border-[#2C2114]'
                : 'bg-transparent text-[#2C2114] border-[#D4C4A8] hover:bg-[#8B6508]/5'
                }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              📍 Sổ Địa Sở (Địa Chỉ)
            </button>
            <button
              onClick={() => { setActiveTab('orders'); setShowNewAddr(false); }}
              className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-extrabold transition-all border ${activeTab === 'orders'
                ? 'bg-[#2C2114] text-[#FAF5EC] border-[#2C2114]'
                : 'bg-transparent text-[#2C2114] border-[#D4C4A8] hover:bg-[#8B6508]/5'
                }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              📦 Đơn Hàng Của Tôi
            </button>
          </div>

          {/* ── Nội Dung Tab ── */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Thông tin tài khoản */}
                <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
                  <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />

                  <div className="flex items-center gap-5 mb-6 relative z-10">
                    <div
                      className="w-16 h-16 bg-[#2C2114] rounded-full flex items-center justify-center text-[#FAF5EC] text-xl font-bold border-2 border-[#8B6508]/40 shadow-inner"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-lg text-[#140E0A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {user?.name}
                      </h2>
                      <p className="text-xs font-mono text-stone-400 mt-0.5">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="border border-[#D4C4A8]/40 bg-[#FAF5EC] p-3 rounded-[1px]">
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#8B6508] mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                        Danh Tính
                      </p>
                      <p className="text-sm font-bold text-[#2C2114] truncate">{user?.name}</p>
                    </div>
                    <div className="border border-[#D4C4A8]/40 bg-[#FAF5EC] p-3 rounded-[1px]">
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#8B6508] mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                        Liên Kết Ngữ (Email)
                      </p>
                      <p className="text-sm font-bold text-[#2C2114] truncate font-mono">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Đổi mật khẩu */}
                <div className="bg-[#FAF5EC] border-2 border-[#2C2114]/80 p-6 shadow-md relative">
                  <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />

                  <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#140E0A] mb-5 border-b border-[#D4C4A8] pb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    🔒 Cải Biến Mật Mã
                  </h2>

                  <form onSubmit={handleChangePassword} className="space-y-4 relative z-10">
                    {[
                      { key: 'currentPassword', label: 'Cựu mật mã hiện thời' },
                      { key: 'newPassword', label: 'Tân mật mã thiết lập' },
                      { key: 'confirmPassword', label: 'Xác minh tân mật mã' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1.5" style={{ fontFamily: "'Cinzel', serif" }}>
                          {f.label}
                        </label>
                        <input
                          type="password"
                          required
                          value={form[f.key]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full bg-[#FAF5EC] border border-[#D4C4A8] rounded-[1px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B6508] text-[#140E0A] transition-colors"
                        />
                      </div>
                    ))}

                    {pwError && <div className="pt-2"><ErrorMsg message={pwError} /></div>}

                    {pwSuccess && (
                      <div className="bg-emerald-50 border border-emerald-700/30 text-emerald-950 px-4 py-3 rounded-[1px] text-xs font-bold uppercase tracking-widest text-center" style={{ fontFamily: "'Cinzel', serif" }}>
                        ✓ {pwSuccess}
                      </div>
                    )}

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={pwLoading}
                        className="w-full h-12 bg-[#8B6508] hover:bg-[#A67B1E] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-[1px] transition-all shadow-sm disabled:opacity-40"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {pwLoading ? 'Đang Lục Soát Cập Nhật...' : 'Xác Bản Cải Biến ❖'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
                  <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />

                  <div className="flex justify-between items-center mb-6 relative z-10 border-b border-[#D4C4A8] pb-4">
                    <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114]" style={{ fontFamily: "'Cinzel', serif" }}>
                      📍 Danh Sách Địa Sở Thụ Thư
                    </h2>
                    {!showNewAddr && (
                      <button
                        onClick={() => {
                          setEditingAddrId(null);
                          setNewAddr({ fullName: '', phone: '', street: '', province: '', district: '', ward: '', isDefault: false });
                          setShowNewAddr(true);
                        }}
                        className="text-xs uppercase tracking-wider font-extrabold text-[#8B6508] hover:text-[#A67B1E]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        + Thêm Địa Sở Mới
                      </button>
                    )}
                  </div>

                  {addrError && <div className="mb-4"><ErrorMsg message={addrError} /></div>}

                  {addrLoading && !showNewAddr && (
                    <div className="flex justify-center py-10">
                      <Spinner />
                    </div>
                  )}

                  {!showNewAddr && !addrLoading && addresses.length === 0 && (
                    <p className="text-center font-serif italic text-stone-500 py-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Bạn chưa thiết lập địa sở giao hàng nào.
                    </p>
                  )}

                  {showNewAddr ? (
                    /* Form thêm/sửa địa chỉ */
                    <form onSubmit={handleAddOrUpdateAddress} className="grid grid-cols-2 gap-4 relative z-10">
                      <h3 className="col-span-2 text-xs uppercase tracking-wider font-bold text-[#8B6508] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                        {editingAddrId ? '✍️ Cập Nhật Địa Sở' : '📍 Thiết Lập Địa Sở Mới'}
                      </h3>
                      {[
                        { key: 'fullName', label: 'Danh tính thụ nhân', col: 2 },
                        { key: 'phone', label: 'Liên lạc minh số', col: 1 },
                        { key: 'province', label: 'Tỉnh / Thành phố', col: 1 },
                        { key: 'district', label: 'Quận / Huyện', col: 1 },
                        { key: 'ward', label: 'Phường / Xã', col: 1 },
                        { key: 'street', label: 'Chi tiết lộ trình địa sở (Số nhà, tên đường)', col: 2 },
                      ].map(f => (
                        <div key={f.key} className={f.col === 2 ? 'col-span-2' : ''}>
                          <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                            {f.label}
                          </label>
                          <input
                            required
                            value={newAddr[f.key]}
                            onChange={e => handleAddrChange(f.key, e.target.value)}
                            className={`w-full bg-[#FAF5EC] border rounded-[1px] px-3 py-2 text-sm focus:outline-none text-[#140E0A] transition-colors ${addrErrors[f.key]
                              ? 'border-red-400 focus:border-red-600'
                              : 'border-[#D4C4A8] focus:border-[#8B6508]'
                              }`}
                          />
                          {addrErrors[f.key] && (
                            <p className="text-red-600 text-[10px] font-serif italic mt-1">{addrErrors[f.key]}</p>
                          )}
                        </div>
                      ))}

                      <div className="col-span-2 flex items-center gap-2 py-1 relative z-10">
                        <input
                          type="checkbox"
                          id="isDefaultCheckbox"
                          checked={newAddr.isDefault || false}
                          onChange={e => setNewAddr(a => ({ ...a, isDefault: e.target.checked }))}
                          className="accent-[#8B6508] cursor-pointer"
                        />
                        <label
                          htmlFor="isDefaultCheckbox"
                          className="text-xs font-serif italic text-stone-600 cursor-pointer select-none"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          Đặt địa sở này làm định ước mặc định
                        </label>
                      </div>

                      <div className="col-span-2 flex gap-4 pt-3">
                        <button
                          type="submit"
                          className="relative h-10 bg-transparent text-[#2C2114] border border-[#2C2114] font-bold text-xs uppercase tracking-[0.15em] px-6 rounded-[1px] overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:bg-[#2C2114] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-250 before:ease-out hover:text-[#FAF5EC] flex items-center justify-center z-10 focus:outline-none"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          <span className="relative z-20">Lưu Thư Địa Sở</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShowNewAddr(false); setEditingAddrId(null); }}
                          className="h-10 text-stone-400 hover:text-red-800 text-xs font-bold uppercase tracking-[0.15em] px-6 border border-[#D4C4A8] hover:border-red-800/20 rounded-[1px] transition-all bg-transparent focus:outline-none"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          Bãi Miễn
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Danh sách địa chỉ */
                    <div className="space-y-4 relative z-10">
                      {addresses.map(addr => (
                        <div
                          key={addr.id}
                          className={`p-4 rounded-[1px] border relative group ${addr.isDefault
                            ? 'border-[#8B6508] bg-[#8B6508]/5 shadow-sm'
                            : 'border-[#D4C4A8]/60 bg-transparent hover:border-[#8B6508]/40'
                            }`}
                        >
                          <div className="text-xs sm:text-sm flex justify-between items-start">
                            <div>
                              <p className="font-bold text-[#2C2114] uppercase tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
                                {addr.fullName} <span className="text-[#A8967E] font-mono tracking-normal px-1">·</span> {addr.phone}
                              </p>
                              <p className="text-stone-600 font-serif mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                {addr.street}, {addr.ward}, {addr.district}, {addr.province}
                              </p>
                              {addr.isDefault && (
                                <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold text-[#8B6508] bg-[#8B6508]/10 px-1.5 py-0.5 mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                                  Mặc Định
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              {!addr.isDefault && (
                                <button
                                  onClick={() => handleSetDefault(addr.id)}
                                  className="text-[10px] uppercase tracking-wider font-bold text-stone-500 hover:text-[#8B6508]"
                                  style={{ fontFamily: "'Cinzel', serif" }}
                                >
                                  Đặt Mặc Định
                                </button>
                              )}
                              <button
                                onClick={() => handleEditClick(addr)}
                                className="text-[10px] uppercase tracking-wider font-bold text-stone-500 hover:text-[#8B6508]"
                                style={{ fontFamily: "'Cinzel', serif" }}
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="text-[10px] uppercase tracking-wider font-bold text-stone-500 hover:text-red-700"
                                style={{ fontFamily: "'Cinzel', serif" }}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
                  <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />

                  <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114] mb-6 relative z-10 border-b border-[#D4C4A8] pb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                    📦 Lịch Sử Đơn Hàng Của Tôi
                  </h2>

                  {ordersError && <div className="mb-4"><ErrorMsg message={ordersError} /></div>}

                  {ordersLoading && (
                    <div className="flex justify-center py-10">
                      <Spinner />
                    </div>
                  )}

                  {!ordersLoading && orders.length === 0 && (
                    <div className="text-center py-10 relative z-10">
                      <p className="font-serif italic text-stone-500 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Bạn chưa có đơn đặt hàng nào trong hệ thống.
                      </p>
                      <Link
                        to="/books"
                        className="inline-block bg-[#8B6508] hover:bg-[#A67B1E] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-[1px] transition-all"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        Tới Tàng Thư Sách
                      </Link>
                    </div>
                  )}

                  {!ordersLoading && orders.length > 0 && (() => {
                    const totalPages = Math.ceil(orders.length / ordersPerPage);
                    const paginatedOrders = orders.slice((ordersPage - 1) * ordersPerPage, ordersPage * ordersPerPage);
                    return (
                      <>
                        <div className="space-y-4 relative z-10">
                          {paginatedOrders.map(order => (
                            <Link
                              key={order.id}
                              to={`/orders/${order.id}`}
                              className="block bg-[#FAF5EC]/30 border border-[#D4C4A8]/60 p-4 rounded-[1px] hover:border-[#8B6508]/60 hover:shadow-xs transition-all"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <p className="font-bold text-xs text-[#2C2114] uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                                    Đơn hàng #{order.id}
                                  </p>
                                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">{formatDate(order.createdAt)}</p>
                                </div>
                                <span className={`text-[9px] uppercase tracking-widest font-extrabold px-2 py-1 rounded-[1px] border ${getOrderStatusColor(order.status)}`} style={{ fontFamily: "'Cinzel', serif" }}>
                                  {getOrderStatusLabel(order.status)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-[#D4C4A8]/10 text-xs">
                                <span className="font-serif italic text-stone-500" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                  {order.items?.length || 0} mục văn phẩm
                                </span>
                                <span className="font-bold text-[#8B6508]" style={{ fontFamily: "'Cinzel', serif" }}>
                                  {formatPrice(order.totalAmount)}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        {totalPages > 1 && (
                          <div className="mt-6 flex justify-center gap-2 relative z-10">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                              <button
                                key={pageNum}
                                onClick={() => setOrdersPage(pageNum)}
                                className={`px-2.5 py-1 border rounded-[1px] text-[10px] font-mono font-bold transition-all ${ordersPage === pageNum
                                  ? 'bg-[#2C2114] text-[#FAF5EC] border-[#2C2114]'
                                  : 'border-[#D4C4A8] hover:bg-[#8B6508]/5 text-[#2C2114]'
                                  }`}
                              >
                                {pageNum}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}