import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { paymentAPI } from '../api';
import { Spinner } from '../components/common';

/**
 * /payment/zalopay/return
 *
 * ZaloPay redirect về đây sau khi user thanh toán (thành công hoặc huỷ).
 * Query params ZaloPay trả về: status, apptransid, amount, checksum, ...
 *   status=1 → thành công
 *   status=2 → thất bại / huỷ
 */
export default function ZaloPayReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ZaloPay truyền orderId qua embedData → ta nhúng orderId vào apptransid
  // apptransid có dạng: YYMMDD_<orderId>_<timestamp>
  const appTransId = searchParams.get('apptransid') || '';
  const statusParam = searchParams.get('status');   // "1" = ok, "2" = fail
  const isPaid = statusParam === '1';

  // Trích orderId từ apptransid: YYMMDD_<orderId>_...
  const orderId = (() => {
    const parts = appTransId.split('_');
    // Format: YYMMDD_orderId_timestamp — orderId là phần thứ 2
    if (parts.length >= 2) return parts[1];
    return null;
  })();

  const [syncing, setSyncing] = useState(true);
  const [syncResult, setSyncResult] = useState(null); // ZaloPayTransaction từ backend
  const [syncError, setSyncError] = useState('');
  const pollRef = useRef(null);
  const MAX_POLLS = 6;
  const pollCountRef = useRef(0);

  useEffect(() => {
    if (!orderId) {
      setSyncing(false);
      setSyncError('Không tìm thấy mã đơn hàng trong tham số URL.');
      return;
    }

    const poll = async () => {
      try {
        const res = await paymentAPI.zaloPayStatus(orderId);
        const txn = res?.data;
        setSyncResult(txn);

        if (txn?.status === 'SUCCESS' || txn?.status === 'FAILED') {
          clearInterval(pollRef.current);
          setSyncing(false);
        } else {
          pollCountRef.current += 1;
          if (pollCountRef.current >= MAX_POLLS) {
            clearInterval(pollRef.current);
            setSyncing(false);
          }
        }
      } catch (err) {
        pollCountRef.current += 1;
        if (pollCountRef.current >= MAX_POLLS) {
          clearInterval(pollRef.current);
          setSyncing(false);
          setSyncError('Không thể xác minh trạng thái thanh toán. Vui lòng kiểm tra lại đơn hàng.');
        }
      }
    };

    // Gọi ngay lập tức rồi poll mỗi 2s
    poll();
    pollRef.current = setInterval(poll, 2000);

    return () => clearInterval(pollRef.current);
  }, [orderId]);

  // Tự động chuyển hướng sau 6 giây nếu có orderId
  useEffect(() => {
    if (!syncing && orderId) {
      const t = setTimeout(() => {
        navigate(`/orders/${orderId}`, { replace: true });
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [syncing, orderId, navigate]);

  /*  Render helpers  */

  const finalStatus = syncResult?.status ?? (isPaid ? 'SUCCESS' : 'FAILED');
  const isSuccess = finalStatus === 'SUCCESS';

  return (
    <div className="bg-[#FAF5EC] min-h-screen flex items-center justify-center px-4 py-20"
      style={{ fontFamily: "'Cinzel', serif" }}>

      <div className="w-full max-w-md text-center">

        {/* Card */}
        <div className="bg-[#FAF5EC] border-2 border-[#2C2114]/70 p-10 shadow-xl relative">
          <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />

          {syncing ? (
            /*  Đang xác minh  */
            <div className="space-y-6">
              <div className="flex justify-center">
                <Spinner size="lg" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8B6508] font-extrabold">
                Đang Xác Minh Giao Dịch
              </p>
              <p className="text-xs text-stone-500 font-serif italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Hệ thống đang đồng bộ trạng thái với ZaloPay...
              </p>
            </div>

          ) : isSuccess ? (
            /*  Thành công  */
            <div className="space-y-5">
              {/* Icon thành công */}
              <div className="flex justify-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30" />
                  <div className="relative w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-600/40 flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-700 font-extrabold mb-1">
                  Thanh Toán Thành Công
                </p>
                <h1 className="text-2xl font-bold text-[#140E0A] tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Giao Dịch Hoàn Tất
                </h1>
              </div>

              <p className="text-xs text-stone-500 font-serif italic leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Khoản ngân đã được ZaloPay xác nhận thành công.<br />
                Đơn hàng của quý khách đang được xử lý.
              </p>

              {syncResult?.zpTransId && (
                <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-[1px] px-4 py-2.5 text-[10px] font-mono text-emerald-800">
                  Mã GD: {syncResult.zpTransId}
                </div>
              )}

              <div className="pt-2 space-y-3">
                {orderId && (
                  <Link
                    to={`/orders/${orderId}`}
                    replace
                    className="block w-full relative h-11 bg-transparent text-[#2C2114] border border-[#2C2114] font-bold text-[10px] uppercase tracking-[0.2em] rounded-[1px] overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:bg-[#2C2114] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-250 before:ease-out hover:text-[#FAF5EC] flex items-center justify-center"
                  >
                    <span className="relative z-10">Xem Chi Tiết Đơn Hàng ❖</span>
                  </Link>
                )}
                <p className="text-[9px] text-stone-400 font-serif italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Tự động chuyển hướng sau vài giây...
                </p>
              </div>
            </div>

          ) : (
            /*  Thất bại / Huỷ  */
            <div className="space-y-5">
              {/* Icon thất bại */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-300/50 flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-red-600 font-extrabold mb-1">
                  Thanh Toán Thất Bại
                </p>
                <h1 className="text-2xl font-bold text-[#140E0A] tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Giao Dịch Bị Từ Chối
                </h1>
              </div>

              <p className="text-xs text-stone-500 font-serif italic leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {syncError || 'Giao dịch không hoàn tất. Quý khách có thể thử lại hoặc chọn phương thức thanh toán khác.'}
              </p>

              <div className="pt-2 space-y-3">
                {orderId && (
                  <Link
                    to={`/orders/${orderId}`}
                    replace
                    className="block w-full relative h-11 bg-transparent text-[#2C2114] border border-[#2C2114] font-bold text-[10px] uppercase tracking-[0.2em] rounded-[1px] overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:bg-[#2C2114] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-250 before:ease-out hover:text-[#FAF5EC] flex items-center justify-center"
                  >
                    <span className="relative z-10">Xem Đơn Hàng & Thử Lại</span>
                  </Link>
                )}
                <Link
                  to="/books"
                  className="block text-xs uppercase tracking-widest font-extrabold text-[#8B6508] hover:text-[#A67B1E] transition-colors"
                >
                  ← Quay Về Tàng Thư
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ZaloPay badge */}
        <div className="mt-6 flex items-center justify-center gap-2 opacity-50">
          <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
            <span className="text-white text-[8px] font-black">Z</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-stone-400">
            ZaloPay Secure Checkout
          </span>
        </div>
      </div>
    </div>
  );
}
