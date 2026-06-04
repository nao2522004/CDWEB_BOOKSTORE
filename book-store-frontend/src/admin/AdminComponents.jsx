// ─── Shared Admin UI Components ──────────────────────────────────────────────

import { useState } from 'react';

// Reusable admin page header
export function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#2A1F14]">
      <div>
        <h1
          className="text-xl font-bold text-[#FAF5EC] tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[#6B5A3E] font-serif italic mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

// Admin primary button
export function AdminBtn({ onClick, children, variant = 'primary', size = 'md', disabled, type = 'button', className = '' }) {
  const base = 'inline-flex items-center gap-2 font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none disabled:opacity-40 rounded-[1px]';
  const sizes = { sm: 'px-3 py-1.5 text-[10px]', md: 'px-4 py-2 text-xs', lg: 'px-6 py-3 text-xs' };
  const variants = {
    primary: 'bg-[#C9922A] hover:bg-[#D4A840] text-[#0F0A06]',
    secondary: 'bg-transparent border border-[#3A2A18] hover:border-[#C9922A]/50 text-[#8A7355] hover:text-[#C9922A]',
    danger: 'bg-transparent border border-red-900/40 hover:border-red-700/60 text-red-600 hover:text-red-400',
    ghost: 'bg-transparent hover:bg-[#C9922A]/10 text-[#8A7355] hover:text-[#C9922A]',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      {children}
    </button>
  );
}

// Search bar
export function AdminSearch({ value, onChange, placeholder = 'Tìm kiếm...' }) {
  return (
    <div className="relative flex-1 max-w-sm">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A3E] text-xs">🔍</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1A1108] border border-[#2A1F14] rounded-[1px] pl-8 pr-4 py-2 text-sm text-[#D4C4A8] placeholder-[#4A3A28] focus:outline-none focus:border-[#C9922A]/50 transition-colors"
      />
    </div>
  );
}

// Data table
export function AdminTable({ columns, data, loading, emptyMsg = 'Không có dữ liệu' }) {
  if (loading) {
    return (
      <div className="bg-[#140D05] border border-[#2A1F14] p-12 flex justify-center">
        <div className="w-8 h-8 border-2 border-[#2A1F14] border-t-[#C9922A] rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-[#140D05] border border-[#2A1F14] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2A1F14] bg-[#1A1108]">
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left uppercase tracking-widest font-bold text-[#6B5A3E]"
                  style={{ fontFamily: "'Cinzel', serif", width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(!data || data.length === 0) ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-[#6B5A3E] font-serif italic">
                  {emptyMsg}
                </td>
              </tr>
            ) : data.map((row, i) => (
              <tr key={row.id ?? i} className="border-b border-[#2A1F14]/50 hover:bg-[#1A1108] transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-[#D4C4A8]">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Modal
export function AdminModal({ open, onClose, title, children, width = 'max-w-xl' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-[#140D05] border border-[#3A2A18] shadow-2xl w-full ${width} max-h-[90vh] overflow-y-auto`}>
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#C9922A]/30 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#C9922A]/30 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#C9922A]/30 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#C9922A]/30 pointer-events-none" />

        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A1F14]">
          <h2
            className="text-sm font-bold uppercase tracking-widest text-[#C9922A]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B5A3E] hover:text-red-400 text-lg transition-colors focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Form field
export function FormField({ label, error, required, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label
        className="block text-[10px] uppercase tracking-widest font-bold text-[#8A7355]"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {label} {required && <span className="text-[#C9922A]">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-[#4A3A28] font-serif italic">{hint}</p>}
      {error && <p className="text-[10px] text-red-500 font-serif italic">{error}</p>}
    </div>
  );
}

// Input
export function AdminInput({ value, onChange, type = 'text', placeholder, disabled, className = '', ...props }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full bg-[#1A1108] border border-[#2A1F14] rounded-[1px] px-3 py-2 text-sm text-[#D4C4A8] placeholder-[#4A3A28] focus:outline-none focus:border-[#C9922A]/50 transition-colors disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

// Textarea
export function AdminTextarea({ value, onChange, rows = 3, placeholder, ...props }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-[#1A1108] border border-[#2A1F14] rounded-[1px] px-3 py-2 text-sm text-[#D4C4A8] placeholder-[#4A3A28] focus:outline-none focus:border-[#C9922A]/50 transition-colors resize-none"
      {...props}
    />
  );
}

// Select
export function AdminSelect({ value, onChange, options, placeholder, disabled }) {
  return (
    <select
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className="w-full bg-[#1A1108] border border-[#2A1F14] rounded-[1px] px-3 py-2 text-sm text-[#D4C4A8] focus:outline-none focus:border-[#C9922A]/50 transition-colors disabled:opacity-50 appearance-none cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="bg-[#140D05]">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// Status Badge
export function StatusBadge({ status, map }) {
  const config = map[status] || { label: status, color: '#8A7355' };
  return (
    <span
      className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[1px]"
      style={{
        color: config.color,
        background: config.color + '20',
        fontFamily: "'Cinzel', serif",
      }}
    >
      {config.label}
    </span>
  );
}

// Confirm Delete Dialog
export function useConfirm() {
  const [state, setState] = useState({ open: false, message: '', onConfirm: null });

  const confirm = (message) => new Promise(resolve => {
    setState({ open: true, message, onConfirm: resolve });
  });

  const Dialog = () => !state.open ? null : (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={() => { setState(s => ({ ...s, open: false })); state.onConfirm?.(false); }} />
      <div className="relative bg-[#140D05] border border-red-900/40 p-6 max-w-sm w-full shadow-2xl">
        <p className="text-sm text-[#D4C4A8] font-serif mb-6 text-center leading-relaxed">{state.message}</p>
        <div className="flex gap-3 justify-center">
          <AdminBtn
            variant="secondary"
            onClick={() => { setState(s => ({ ...s, open: false })); state.onConfirm?.(false); }}
          >
            Huỷ
          </AdminBtn>
          <AdminBtn
            variant="danger"
            onClick={() => { setState(s => ({ ...s, open: false })); state.onConfirm?.(true); }}
          >
            Xác Nhận Xoá
          </AdminBtn>
        </div>
      </div>
    </div>
  );

  return { confirm, Dialog };
}

// Pagination
export function AdminPagination({ data, page, onPageChange }) {
  if (!data || data.totalPages <= 1) return null;
  const { totalPages, hasNext, hasPrevious } = data;
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  const btnBase = 'h-8 px-2.5 text-xs font-bold border transition-all focus:outline-none rounded-[1px] disabled:opacity-30';

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      <button
        disabled={!hasPrevious}
        onClick={() => onPageChange(page - 1)}
        className={`${btnBase} border-[#2A1F14] text-[#6B5A3E] hover:border-[#C9922A]/40 hover:text-[#C9922A]`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        ←
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${btnBase} ${p === page ? 'bg-[#C9922A] border-[#C9922A] text-[#0F0A06]' : 'border-[#2A1F14] text-[#6B5A3E] hover:border-[#C9922A]/40 hover:text-[#C9922A]'}`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {p}
        </button>
      ))}
      <button
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className={`${btnBase} border-[#2A1F14] text-[#6B5A3E] hover:border-[#C9922A]/40 hover:text-[#C9922A]`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        →
      </button>
    </div>
  );
}

// Toast notification
export function useAdminToast() {
  const [toasts, setToasts] = useState([]);
  const add = (message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };
  const Toasts = () => (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`px-4 py-3 text-xs font-bold border shadow-lg flex items-center gap-2 rounded-[1px] bg-[#140D05] animate-slide-in ${
            t.type === 'error' ? 'border-red-800/60 text-red-400' : 'border-emerald-800/60 text-emerald-400'
          }`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span>{t.type === 'error' ? '✕' : '✓'}</span>
          <span className="font-serif font-normal normal-case tracking-normal text-[#D4C4A8]">{t.message}</span>
        </div>
      ))}
    </div>
  );
  return { add, Toasts };
}
