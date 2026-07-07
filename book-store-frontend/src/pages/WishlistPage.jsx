import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { wishlistAPI } from "../api";
import { PLACEHOLDER_BOOK, formatPrice, getDiscountPercent } from "../utils";

/* ─── Philosophers for the virtual shelf sidebar ─── */
const SHELF_ITEMS = [
  { label: "PLATO", height: 68, color: "#2C2114" },
  { label: "NIETZSCHE", height: 62, color: "#8B6508" },
  { label: "LOCKE", height: 75, color: "#000000" },
  { label: "KANT", height: 50, color: "#4A3728" },
  { label: "SPINOZA", height: 68, color: "#E3C16F" },
];

/* ─── Rotating quotes sidebar ─── */
const QUOTES = [
  { text: "Cuộc sống không được phản tỉnh thì không đáng sống.", author: "SOCRATES" },
  { text: "Sách là tấm gương phản chiếu linh hồn của nhân loại.", author: "VIRGINIA WOOLF" },
  { text: "Đọc sách là trò chuyện với những tâm trí vĩ đại nhất.", author: "DESCARTES" },
  { text: "Tri thức là sức mạnh duy nhất không ai có thể cướp đi.", author: "FRANCIS BACON" },
];

/* ─────────────────────────── WishlistCard ─────────────────────────── */
function WishlistCard({ book, onRemove, onAddToCart }) {
  const [removing, setRemoving] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const discount = getDiscountPercent(book);

  const handleRemove = async () => {
    setRemoving(true);
    await onRemove(book.bookId);
  };

  const handleAddToCart = async () => {
    try {
      await onAddToCart(book);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1800);
    } catch (err) {
      // Error handled by parent onAddToCart callback
    }
  };

  return (
    <div
      className={`group relative bg-white border border-stone-200/80 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(44,33,20,0.1)] ${removing ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
      style={{ transition: removing ? "opacity 0.35s, transform 0.35s" : "all 0.3s" }}
    >
      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-all duration-200"
        title="Xoá khỏi Wishlist"
      >
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-[#8B6508] text-[#FAF5EC] text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1">
          -{discount}%
        </div>
      )}

      {/* Book image */}
      <Link to={`/books/${book.bookSlug || book.bookId}`} className="block overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          <img
            src={book.coverImageUrl || PLACEHOLDER_BOOK}
            alt={book.bookTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            onError={(e) => { e.target.src = PLACEHOLDER_BOOK; }}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        {book.categoryName && (
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5"
            style={{ color: "#8B6508", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {book.categoryName}
          </p>
        )}

        <Link to={`/books/${book.bookSlug || book.bookId}`}>
          <h3
            className="font-bold text-[#140E0A] text-lg leading-snug mb-1.5 hover:text-[#8B6508] transition-colors line-clamp-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {book.bookTitle}
          </h3>
        </Link>

        {book.addedAt && (
          <p
            className="text-xs text-stone-400 italic mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Đã thêm {new Date(book.addedAt).toLocaleDateString("vi-VN")}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-[#140E0A] font-bold text-lg">
            {formatPrice(book.discountPrice || book.price)}
          </span>
          {discount > 0 && (
            <span className="text-stone-400 text-sm line-through">
              {formatPrice(book.price)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className={`w-full relative h-11 font-black text-[11px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 ${addedToCart
            ? "bg-[#8B6508] text-[#FAF5EC]"
            : "bg-[#000000] text-[#FAF5EC] hover:bg-[#8B6508]"
            }`}
        >
          {addedToCart ? "✓ Đã Thêm" : "Thêm vào giỏ hàng"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── Sidebar ─────────────────────────── */
function Sidebar({ quoteIndex }) {
  const quote = QUOTES[quoteIndex % QUOTES.length];

  return (
    <div className="space-y-6">
      {/* Virtual Shelf */}
      <div className="bg-white border border-stone-200/70 p-6 shadow-sm">
        <p
          className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-5 text-center"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          TỦ CỔ THƯ VIRTUAL
        </p>
        <div className="flex items-end justify-center gap-1.5 h-28 mb-4 border-b border-stone-200 pb-2">
          {SHELF_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div
                className="w-8 rounded-[1px] relative overflow-hidden cursor-pointer hover:brightness-110 transition-all shadow-sm"
                style={{ height: item.height, backgroundColor: item.color }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white/80 tracking-widest"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full h-10 border border-[#2C2114] text-[#2C2114] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#2C2114] hover:text-[#FAF5EC] transition-all duration-200">
          Organize Shelf
        </button>
      </div>

      {/* Quote */}
      <div className="bg-[#F5EDD8]/40 border border-stone-200/70 p-6">
        <p
          className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B6508] mb-4"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          LỜI NGƯỜI ĐI TRƯỚC
        </p>
        <blockquote
          className="text-base text-[#2C2114] italic leading-relaxed mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          "{quote.text}"
        </blockquote>
        <p
          className="text-[11px] font-black uppercase tracking-[0.25em] text-stone-500 text-right"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          — {quote.author}
        </p>
      </div>

      {/* Explore more */}
      <div className="bg-white border border-stone-200/70 p-6 shadow-sm">
        <p
          className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-4"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          KHÁM PHÁ THÊM
        </p>
        <div className="space-y-3">
          {["Triết học", "Văn học cổ điển", "Tư tưởng phương Đông", "Lịch sử"].map((cat) => (
            <Link
              key={cat}
              to={`/books?category=${encodeURIComponent(cat)}`}
              className="flex items-center justify-between group/link py-2 border-b border-stone-100 last:border-0"
            >
              <span
                className="text-[13px] text-[#2C2114] group-hover/link:text-[#8B6508] transition-colors"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {cat}
              </span>
              <svg
                className="w-3.5 h-3.5 text-stone-300 group-hover/link:text-[#8B6508] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Empty State ─────────────────────────── */
function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-stone-200/60 shadow-sm rounded-sm">
      <div className="w-20 h-20 border border-stone-200 rounded-full flex items-center justify-center mb-6">
        <svg className="w-9 h-9 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <p
        className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8B6508] mb-2"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        Danh Sách Trống
      </p>
      <h2
        className="text-2xl font-bold text-[#140E0A] mb-3"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Chưa có sách yêu thích
      </h2>
      <p
        className="text-base text-stone-400 italic max-w-sm leading-relaxed mb-8"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Khám phá tàng thư và lưu lại những cuốn sách chạm đến tâm hồn bạn.
      </p>
      <Link
        to="/books"
        className="relative h-12 px-10 bg-[#2C2114] text-[#FAF5EC] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center hover:bg-[#8B6508] transition-all duration-300"
      >
        Khám Phá Tàng Thư ❖
      </Link>
    </div>
  );
}

/* ─────────────────────────── Main Page ─────────────────────────── */
export default function WishlistPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Search + pagination state
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const { addItem } = useCart();
  const { refresh: refreshWishlistContext } = useWishlist();

  // Debounce search input → keyword state
  useEffect(() => {
    const t = setTimeout(() => {
      setKeyword(inputValue);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [inputValue]);

  const loadWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await wishlistAPI.getAll({
        keyword: keyword || undefined,
        page,
        size: 12,
        sortBy: "createdAt",
        sortDir: "desc",
      });
      const pageData = res?.data ?? {};
      setBooks(pageData.content ?? []);
      setTotalPages(pageData.totalPages ?? 1);
      setTotalElements(pageData.totalElements ?? 0);
    } catch {
      setError("Không thể tải danh sách yêu thích. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [keyword, page]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  useEffect(() => {
    const interval = setInterval(() => setQuoteIndex((i) => i + 1), 6000);
    return () => clearInterval(interval);
  }, []);

  const handleRemove = async (bookId) => {
    try {
      await wishlistAPI.remove(bookId);
      setTimeout(() => {
        setBooks((prev) => prev.filter((b) => b.bookId !== bookId));
        setTotalElements((prev) => Math.max(0, prev - 1));
        refreshWishlistContext();
      }, 380);
    } catch {
      alert("Không thể xoá. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "#FAF5EC" }}>
      {/* ── Hero Banner ── */}
      <div
        className="relative border border-stone-200/80 mx-4 mt-8 mb-12 md:mx-12 lg:mx-24 p-12 text-center"
        style={{ backgroundColor: "#F5EDD8" }}
      >
        {/* Corner ornaments */}
        {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
          (pos) => (
            <span key={pos} className={`absolute ${pos} w-3 h-3 border-stone-400/40 select-none`} />
          )
        )}

        <p
          className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-3"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          ✦ EX LIBRIS BIBLIOTHECA ✦
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#140E0A] leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Danh Sách Yêu Thích{" "}
          {totalElements > 0 && (
            <em className="italic text-[#8B6508] font-normal font-serif">
              ({totalElements})
            </em>
          )}
        </h1>
        <p
          className="text-sm md:text-base text-stone-500 italic max-w-2xl mx-auto leading-relaxed mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          "Nơi lưu giữ những hệ tư tưởng vĩ đại làm thay đổi sâu sắc toàn bộ dòng chảy lịch sử và nền văn minh nhân loại qua muôn vàn thế kỷ thịnh suy."
        </p>

        {/* Search Input Box */}
        <div className="max-w-xl mx-auto relative flex items-center border border-stone-300 bg-transparent px-4 py-2.5">
          <svg className="w-4 h-4 text-stone-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            id="wishlist-search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Khảo cứu tác phẩm, tác giả hoặc hệ tư tưởng..."
            className="w-full bg-transparent text-sm text-[#140E0A] placeholder-stone-400/80 focus:outline-none italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
          <button
            onClick={() => { setKeyword(inputValue); setPage(1); }}
            className="text-[10px] font-black tracking-widest text-stone-600 uppercase border-l border-stone-300 pl-4 ml-2 whitespace-nowrap hover:text-[#8B6508]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            TRA CỨU
          </button>
        </div>
      </div>

      {/* ── Main Layout Split ── */}
      <div className="px-4 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 items-start">

          {/* Left Side: Wishlist Content (8 columns out of 11) */}
          <div className="lg:col-span-8 min-w-0">
            {/* Header row */}
            <div className="flex items-baseline justify-between mb-8 border-b border-stone-200/80 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-[#8B6508] font-black text-base"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  I.
                </span>
                <h2
                  className="text-xl font-bold text-[#140E0A] tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  My Wishlist
                </h2>
                {!loading && books.length > 0 && (
                  <span className="text-xs font-bold text-stone-400">
                    ({books.length}{totalPages > 1 ? ` / ${totalElements}` : ""})
                  </span>
                )}
              </div>
              <Link
                to="/books"
                className="flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#2C2114] hover:text-[#8B6508] transition-colors"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Xem Tất Cả
                <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* States Content */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-stone-200/70 animate-pulse">
                    <div className="aspect-[3/4] bg-stone-100" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-stone-100 rounded w-1/3" />
                      <div className="h-5 bg-stone-100 rounded w-3/4" />
                      <div className="h-3 bg-stone-100 rounded w-1/2" />
                      <div className="h-10 bg-stone-100 rounded mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <button
                  onClick={loadWishlist}
                  className="text-[11px] font-black uppercase tracking-widest text-[#8B6508] border-b border-current"
                >
                  Thử Lại
                </button>
              </div>
            ) : books.length === 0 ? (
              <EmptyWishlist />
            ) : (
              <>
                {/* Đã sửa từ sm:grid-cols-2 thành md:grid-cols-3 và xl:grid-cols-3 để card nhỏ lại gọn gàng */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <WishlistCard
                      key={book.wishlistId}
                      book={book}
                      onRemove={handleRemove}
                      onAddToCart={async (b) => {
                        if (!b.bookId) {
                          alert("Không tìm thấy ID sách.");
                          return;
                        }
                        try {
                          await addItem(b.bookId, 1);
                        } catch (err) {
                          alert(err?.message || "Không thể thêm vào giỏ hàng. Vui lòng thử lại.");
                          throw err;
                        }
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="px-4 py-2 border border-stone-300 text-sm font-bold text-[#2C2114] hover:border-[#8B6508] hover:text-[#8B6508] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      ← Trước
                    </button>
                    <span
                      className="px-4 py-2 text-sm text-stone-500"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {page} / {totalPages}
                    </span>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                      className="px-4 py-2 border border-stone-300 text-sm font-bold text-[#2C2114] hover:border-[#8B6508] hover:text-[#8B6508] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Sau →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Side: Sidebar (3 columns out of 11) */}
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar quoteIndex={quoteIndex} />
          </div>

        </div>
      </div>

      {/* Footer Copyright Sign */}
      <div className="mt-24 text-center border-t border-stone-200/60 pt-8">
        <div className="flex justify-center gap-1 text-stone-300 text-xs mb-4">✦ ✦ ✦</div>
        <p className="text-[10px] tracking-[0.15em] text-stone-400 font-bold uppercase">
          © 2024 BIBLIOTHECA PUBLISHING HOUSE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}