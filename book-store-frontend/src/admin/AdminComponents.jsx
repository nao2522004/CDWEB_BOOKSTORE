import { useState } from 'react';

/* 
   ADMIN PAGE HEADER
    */
export function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6 pb-5 border-b border-[#D4C4A8]/40">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-[#140E0A] tracking-wide"
          style={{ fontFamily: "'Cinzel', serif" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-stone-500 mt-1.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

/* 
    ADMIN BUTTON 
    */
export function AdminBtn({ onClick, children, variant = 'primary', size = 'md', disabled, type = 'button', className = '' }) {
  const base = 'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#8B6508] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-sm';

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-4 py-2 text-[11px]',
    lg: 'px-6 py-2.5 text-xs'
  };

  const variants = {
    primary: 'bg-[#8B6508] hover:bg-[#705206] text-[#FAF5EC] shadow-[0_2px_4px_rgba(139,101,8,0.15)]',
    secondary: 'bg-[#FAF5EC] border border-[#D4C4A8] hover:bg-[#F5EFE2] text-stone-700',
    danger: 'bg-red-700 hover:bg-red-800 text-white shadow-[0_2px_4px_rgba(185,28,28,0.15)]',
    ghost: 'bg-transparent shadow-none hover:bg-[#8B6508]/5 text-stone-600',
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

/* 
   ADMIN SEARCHBAR 
    */
export function AdminSearch({ value, onChange, placeholder = 'Tìm kiếm...', className = '' }) {
  return (
    <div className="relative flex-1 max-w-sm">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#FAF5EC] border border-[#D4C4A8]/80 rounded-lg pl-9 pr-4 py-2 text-sm text-[#2C2114] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8B6508]/20 focus:border-[#8B6508] transition-all ${className}`}
      />
    </div>
  );
}

/* 
    ADMIN TABLE 
    */
export function AdminTable({ columns, data, loading, emptyMsg = 'Không có dữ liệu' }) {
  if (loading) {
    return (
      <div className="bg-[#FAF5EC] border border-[#D4C4A8]/60 rounded-xl p-12 flex justify-center items-center shadow-xs">
        <div className="w-7 h-7 border-2 border-[#D4C4A8]/40 border-t-[#8B6508] rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-[#FAF5EC] border border-[#D4C4A8]/60 rounded-xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#F5EFE2] border-b border-[#D4C4A8]/60 text-stone-600 text-[10px] font-bold uppercase tracking-wider"
            style={{ fontFamily: "'Cinzel', serif" }}>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-6 py-3.5"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D4C4A8]/30">
            {(!data || data.length === 0) ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-stone-400 font-medium">
                  {emptyMsg}
                </td>
              </tr>
            ) : data.map((row, i) => (
              <tr key={row.id ?? i} className="hover:bg-[#8B6508]/2 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-3.5 text-stone-700 whitespace-nowrap text-xs font-medium">
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

/* 
    ADMIN MODAL 
    */
export function AdminModal({ open, onClose, title, children, width = 'max-w-xl' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="absolute inset-0 bg-[#2C2114]/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className={`relative bg-[#FAF5EC] border border-[#D4C4A8]/60 shadow-xl w-full ${width} max-h-[90vh] flex flex-col rounded-xl overflow-hidden transform transition-all`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4C4A8]/40 bg-[#F5EFE2]">
          <h2 className="text-sm font-black text-[#140E0A] uppercase tracking-wider"
            style={{ fontFamily: "'Cinzel', serif" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-[#8B6508] hover:bg-[#8B6508]/5 rounded-lg p-1.5 transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

/* 
    FORM COMPONENTS (Field, Input, Textarea, Select)
    */
export function FormField({ label, error, required, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide"
        style={{ fontFamily: "'Cinzel', serif" }}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-stone-400 font-medium">{hint}</p>}
      {error && <p className="text-[11px] text-red-600 font-bold">{error}</p>}
    </div>
  );
}

const inputClasses = "w-full bg-[#FAF5EC] border border-[#D4C4A8]/80 rounded-lg px-3 py-2 text-sm text-[#2C2114] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8B6508]/20 focus:border-[#8B6508] transition-all disabled:opacity-40 disabled:bg-stone-100";

export function AdminInput({ value, onChange, type = 'text', placeholder, disabled, className = '', ...props }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`${inputClasses} ${className}`}
      {...props}
    />
  );
}

export function AdminTextarea({ value, onChange, rows = 3, placeholder, className = '', ...props }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className={`${inputClasses} resize-y ${className}`}
      {...props}
    />
  );
}

export function AdminSelect({ value, onChange, options, placeholder, disabled, className = '' }) {
  return (
    <select
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className={`${inputClasses} cursor-pointer pr-8 ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/* 
   STATUS BADGE 
    */
export function StatusBadge({ status, map }) {
  const config = map[status] || { label: status, colorClass: 'bg-stone-100 text-stone-700 border-stone-200' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.colorClass}`}>
      {config.label}
    </span>
  );
}

/* 
   USE CONFIRM 
    */
export function useConfirm() {
  const [state, setState] = useState({ open: false, message: '', onConfirm: null });

  const confirm = (message) => new Promise(resolve => {
    setState({ open: true, message, onConfirm: resolve });
  });

  const Dialog = () => !state.open ? null : (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-[#2C2114]/40 backdrop-blur-xs"
        onClick={() => { setState(s => ({ ...s, open: false })); state.onConfirm?.(false); }} />
      <div className="relative bg-[#FAF5EC] border border-[#D4C4A8]/60 rounded-xl shadow-xl p-6 max-w-sm w-full transform transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-sm font-black text-[#140E0A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Xác nhận</h3>
          <p className="text-xs text-stone-500 font-medium leading-relaxed mb-6">
            {state.message}
          </p>
          <div className="flex gap-3 w-full justify-center">
            <AdminBtn
              variant="secondary"
              className="w-full"
              onClick={() => { setState(s => ({ ...s, open: false })); state.onConfirm?.(false); }}
            >
              Huỷ
            </AdminBtn>
            <AdminBtn
              variant="danger"
              className="w-full"
              onClick={() => { setState(s => ({ ...s, open: false })); state.onConfirm?.(true); }}
            >
              Xác Nhận
            </AdminBtn>
          </div>
        </div>
      </div>
    </div>
  );

  return { confirm, Dialog };
}

/* 
  ADMIN PAGINATION 
    */
export function AdminPagination({ data, page, onPageChange }) {
  if (!data || data.totalPages <= 1) return null;
  const { totalPages, hasNext, hasPrevious } = data;
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  const btnBase = 'h-8 w-8 inline-flex items-center justify-center text-xs font-bold border rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-[#8B6508] disabled:opacity-30 disabled:cursor-not-allowed';

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      <button
        disabled={!hasPrevious}
        onClick={() => onPageChange(page - 1)}
        className={`${btnBase} border-[#D4C4A8] bg-[#FAF5EC] text-stone-600 hover:bg-[#F5EFE2]`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${btnBase} ${p === page
            ? 'bg-[#8B6508] border-[#8B6508] text-[#FAF5EC]'
            : 'border-[#D4C4A8] bg-[#FAF5EC] text-stone-700 hover:bg-[#F5EFE2]'}`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className={`${btnBase} border-[#D4C4A8] bg-[#FAF5EC] text-stone-600 hover:bg-[#F5EFE2]`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

/* 
   ADMIN TOAST 
    */
export function useAdminToast() {
  const [toasts, setToasts] = useState([]);
  const add = (message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  const Toasts = () => (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`px-4 py-3 text-xs font-bold border-l-4 shadow-md rounded-r-lg flex items-start gap-3 bg-[#FAF5EC] border-[#D4C4A8] animate-slide-in ${t.type === 'error' ? 'border-red-600 text-stone-800' : 'border-[#8B6508] text-stone-800'
            }`}
        >
          {t.type === 'error' ? (
            <svg className="w-4 h-4 text-red-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ) : (
            <svg className="w-4 h-4 text-[#8B6508] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          <span className="leading-relaxed font-sans font-medium text-stone-700">{t.message}</span>
        </div>
      ))}
    </div>
  );
  return { add, Toasts };
}