import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bookAPI, categoryAPI } from '../api';
import BookCard from '../components/book/BookCard';
import { Pagination, Empty } from '../components/common';
import { BookCardSkeletonGrid } from '../components/book/BookCardSkeleton';

const SORT_OPTIONS = [
  { value: 'createdAt,desc', label: 'Tác Phẩm Mới' },
  { value: 'price,asc', label: 'Giá Ngân Tăng Dần' },
  { value: 'price,desc', label: 'Giá Ngân Giảm Dần' },
  { value: 'title,asc', label: 'Thứ Tự A-Z' },
];

const PRICE_PRESETS = [
  { label: 'Tất cả', min: 0, max: 1000000 },
  { label: 'Dưới 50.000₫', min: 0, max: 50000 },
  { label: '50.000 – 150.000₫', min: 50000, max: 150000 },
  { label: '150.000 – 300.000₫', min: 150000, max: 300000 },
  { label: 'Trên 300.000₫', min: 300000, max: 1000000 },
];

const MAX_PRICE = 1000000;

function formatVND(val) {
  if (val >= 1000000) return '1.000.000₫+';
  return val.toLocaleString('vi-VN') + '₫';
}

// ─── Sidebar tách ra ngoài để tránh unmount khi BooksPage re-render ───────────
function Sidebar({
  keyword, setKeyword,
  inputMin, setInputMin,
  inputMax, setInputMax,
  filters,
  isPriceFiltered,
  isPriceDirty,
  applyPriceFilter,
  resetPrice,
  applyPreset,
  categories,
  setCategory,
}) {
  return (
    <div className="space-y-8">
      {/* Tìm kiếm */}
      <div className="relative">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#2C2114] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
          Khảo Tìm Văn Bản
        </label>
        <div className="relative border-b-2 border-[#2C2114]/30 focus-within:border-[#8B6508] pb-1 transition-colors">
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Tên kinh điển, triết gia..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder-[#A8967E]/60 font-serif italic text-[#140E0A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          />
          <span className="absolute right-1 bottom-1 text-[#A8967E] text-xs">✦</span>
        </div>
      </div>

      {/* Khoảng giá */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#2C2114]" style={{ fontFamily: "'Cinzel', serif" }}>
            <span className="text-[#8B6508]">◈</span> Khoảng Giá
          </label>
          {isPriceFiltered && (
            <button
              onClick={resetPrice}
              className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-stone-400 hover:text-[#8B6508] font-bold transition-colors"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span className="text-xs leading-none">✕</span> Đặt lại
            </button>
          )}
        </div>

        {/* Ô nhập Từ / Đến */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>Từ</span>
            <div className={`flex items-center border rounded-sm px-2.5 py-2 bg-white/60 transition-colors ${
              filters.minPrice > 0 ? 'border-[#8B6508]/60' : 'border-[#D4C4A8] focus-within:border-[#8B6508]/40'
            }`}>
              <input
                type="text"
                inputMode="numeric"
                value={inputMin}
                onChange={e => setInputMin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="0"
                className="w-full bg-transparent text-[11px] font-bold text-[#2C2114] focus:outline-none min-w-0"
                style={{ fontFamily: "'Cinzel', serif" }}
              />
              <span className="text-[10px] text-[#8B6508] font-bold ml-1 flex-shrink-0">₫</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>Đến</span>
            <div className={`flex items-center border rounded-sm px-2.5 py-2 bg-white/60 transition-colors ${
              filters.maxPrice < MAX_PRICE ? 'border-[#8B6508]/60' : 'border-[#D4C4A8] focus-within:border-[#8B6508]/40'
            }`}>
              <input
                type="text"
                inputMode="numeric"
                value={inputMax}
                onChange={e => setInputMax(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="1000000"
                className="w-full bg-transparent text-[11px] font-bold text-[#2C2114] focus:outline-none min-w-0"
                style={{ fontFamily: "'Cinzel', serif" }}
              />
              <span className="text-[10px] text-[#8B6508] font-bold ml-1 flex-shrink-0">₫</span>
            </div>
          </div>
        </div>

        {/* Preset nhanh */}
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {PRICE_PRESETS.slice(1).map((p, i) => {
            const active = filters.minPrice === p.min && filters.maxPrice === p.max;
            return (
              <button
                key={i}
                onClick={() => applyPreset(p)}
                className={`relative text-[9px] px-2 py-2 rounded-sm font-bold tracking-wide transition-all text-left leading-tight ${
                  active
                    ? 'bg-[#8B6508] text-white shadow-md'
                    : 'bg-[#F3EFE6] border border-[#D4C4A8] text-stone-600 hover:border-[#8B6508]/50 hover:bg-[#EDE6D6] hover:text-[#8B6508]'
                }`}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {active && <span className="absolute top-1 right-1.5 text-[8px] text-white/80">✓</span>}
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Danh mục */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#2C2114] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
          Hệ Thống Tư Tưởng
        </label>
        <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
          <button
            onClick={() => setCategory('')}
            className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider font-bold transition-all ${!filters.categoryId
              ? 'bg-[#8B6508] text-white rounded-[1px] shadow-sm'
              : 'text-stone-600 hover:bg-[#F3EFE6] hover:text-[#8B6508]'
            }`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ❖ Toàn Bộ Khảo Cứu
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${filters.categoryId == cat.id
                ? 'bg-[#8B6508] text-white rounded-[1px] shadow-sm'
                : 'text-stone-600 hover:bg-[#F3EFE6] hover:text-[#8B6508]'
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span className={filters.categoryId == cat.id ? 'text-[#FAF5EC]' : 'text-[#8B6508]/40'}>✦</span>
              <span className="truncate">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BooksPage ─────────────────────────────────────────────────────────────────
export default function BooksPage() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    categoryId: searchParams.get('categoryId') || '',
    sort: 'createdAt,desc',
    page: 1,
    size: 12,
    minPrice: 0,
    maxPrice: MAX_PRICE,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Draft string inputs — empty = no constraint
  const [inputMin, setInputMin] = useState('');
  const [inputMax, setInputMax] = useState('');

  useEffect(() => {
    categoryAPI.getAll({ size: 50 }).then(r => setCategories(r.data?.content || r.data || [])).catch(() => {});
  }, []);

  const fetchBooks = useCallback(async (f) => {
    setLoading(true);
    try {
      const [sortBy, sortDir] = (f.sort || 'createdAt,desc').split(',');
      const params = { page: f.page, size: f.size, sortBy, sortDir };
      if (f.keyword) params.keyword = f.keyword;
      if (f.categoryId) params.categoryId = f.categoryId;
      if (f.minPrice > 0) params.minPrice = f.minPrice;
      if (f.maxPrice < MAX_PRICE) params.maxPrice = f.maxPrice;
      const res = await bookAPI.getAll(params);
      setBooks(res.data);
    } catch (_) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(filters); }, [filters, fetchBooks]);

  useEffect(() => {
    const kw = searchParams.get('keyword');
    const cat = searchParams.get('categoryId');
    if (kw !== undefined || cat !== undefined) {
      setFilters(f => ({ ...f, keyword: kw || '', categoryId: cat || '', page: 1 }));
    }
  }, [searchParams]);

  // Handlers
  const setKeyword = (val) => setFilters(f => ({ ...f, keyword: val, page: 1 }));
  const setCategory = (val) => setFilters(f => ({ ...f, categoryId: val, page: 1 }));
  const setSort = (val) => setFilters(f => ({ ...f, sort: val, page: 1 }));

  // Commit giá khi nhấn Áp Dụng
  const applyPriceFilter = () => {
    const min = Math.max(0, Number(inputMin) || 0);
    const max = Math.min(MAX_PRICE, Number(inputMax) || MAX_PRICE);
    setInputMin(String(min));
    setInputMax(String(max));
    setFilters(f => ({ ...f, minPrice: min, maxPrice: max, page: 1 }));
  };

  // Reset giá
  const resetPrice = () => {
    setInputMin('');
    setInputMax('');
    setFilters(f => ({ ...f, minPrice: 0, maxPrice: MAX_PRICE, page: 1 }));
  };

  // Preset áp dụng ngay
  const applyPreset = (preset) => {
    setInputMin(String(preset.min));
    setInputMax(String(preset.max));
    setFilters(f => ({ ...f, minPrice: preset.min, maxPrice: preset.max, page: 1 }));
  };

  const isPriceFiltered = filters.minPrice > 0 || filters.maxPrice < MAX_PRICE;

  const sidebarProps = {
    keyword: filters.keyword,
    setKeyword,
    inputMin, setInputMin,
    inputMax, setInputMax,
    filters,
    isPriceFiltered,
    applyPriceFilter,
    resetPrice,
    applyPreset,
    categories,
    setCategory,
  };

  return (
    <div className="bg-[#FAF5EC] min-h-screen text-[#2C2114] selection:bg-[#E6CE9A]/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4C4A8] pb-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#140E0A] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              {filters.keyword ? `Kết Quả Khảo Tìm: "${filters.keyword}"` : 'Thư Mục Toàn Bản'}
            </h1>
            <p className="text-stone-500 text-xs font-serif italic mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Nơi lưu trữ những tư tưởng vượt thời gian
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 self-end sm:self-center w-full sm:w-auto">
            {isPriceFiltered && (
              <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold text-[#8B6508] bg-[#8B6508]/10 border border-[#8B6508]/30 px-2 py-1 rounded-[1px]"
                style={{ fontFamily: "'Cinzel', serif" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B6508] animate-pulse inline-block" />
                Lọc giá: {formatVND(filters.minPrice)} – {formatVND(filters.maxPrice)}
              </div>
            )}
            <div className="relative border border-[#D4C4A8] bg-[#FAF5EC] rounded-[1px] px-3 py-2 flex items-center shadow-sm">
              <select
                value={filters.sort}
                onChange={e => setSort(e.target.value)}
                className="bg-transparent text-xs uppercase tracking-wider font-bold pr-6 focus:outline-none appearance-none text-[#2C2114] cursor-pointer"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-[#FAF5EC] text-[#2C2114]">{o.label}</option>)}
              </select>
              <span className="absolute right-3 pointer-events-none text-[9px] text-[#8B6508]">▼</span>
            </div>

            <button
              className="md:hidden border-2 border-[#8B6508] text-[#8B6508] bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-[1px] transition-colors active:bg-[#8B6508]/10"
              style={{ fontFamily: "'Cinzel', serif" }}
              onClick={() => setSidebarOpen(true)}
            >
              Bộ Lọc{isPriceFiltered ? ' ●' : ''}
            </button>
          </div>
        </div>

        <div className="flex gap-10 lg:gap-12">
          {/* Sidebar desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 sticky top-28 shadow-sm relative">
              <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />
              <Sidebar {...sidebarProps} />
            </div>
          </div>

          {/* Sidebar mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-[#140E0A]/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-[#FAF5EC] border-r border-[#D4C4A8] p-6 overflow-y-auto z-10">
                <div className="absolute inset-2 border border-[#8B6508]/10 pointer-events-none" />
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#2C2114]" style={{ fontFamily: "'Cinzel', serif" }}>
                    Tiêu Chí Tầm Thư
                  </h3>
                  <button onClick={() => setSidebarOpen(false)} className="text-stone-500 text-2xl hover:text-[#8B6508]">&times;</button>
                </div>
                <div className="relative z-10">
                  <Sidebar {...sidebarProps} />
                </div>
              </div>
            </div>
          )}

          {/* Danh sách sách */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <BookCardSkeletonGrid count={filters.size} />
            ) : books?.content?.length === 0 ? (
              <div className="bg-[#FAF5EC] border border-[#D4C4A8] py-16 px-4 text-center shadow-sm relative">
                <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />
                <Empty icon="❖" message="Không tìm thấy văn bản nào tương thích với điều kiện khảo cứu." />
              </div>
            ) : (
              <>
                {books && (
                  <p className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    <span>Tầm nguyên được</span>
                    <span className="text-[#8B6508] font-extrabold text-sm">{books.totalElements}</span>
                    <span>Tác phẩm tôn vinh</span>
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
                  {books?.content?.map(book => <BookCard key={book.id} book={book} />)}
                </div>
                <div className="mt-12 pt-6 border-t border-[#D4C4A8]/40">
                  <Pagination
                    data={books}
                    onPageChange={p => setFilters(f => ({ ...f, page: p }))}
                    currentPage={filters.page}
                  />
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}