import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ErrorMsg, Spinner } from '../components/common';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from || '/';
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAF3E3] selection:bg-[#E6CE9A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#C4B293_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-xl text-[#8B6508] transition-transform duration-500 hover:rotate-180 mb-4">
            ❖
          </Link>
          <span className="text-[#8B6508] text-[10px] tracking-[0.35em] uppercase font-bold block mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
            EX LIBRIS BIBLIOTHECA
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#140E0A] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            Khảo Nhập Độc Giả
          </h1>
          <p className="text-stone-500 text-xs font-serif italic mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Chào mừng bạn trở lại với không gian học thuật
          </p>
        </div>

        <div className="bg-[#FAF3E3] border border-[#C4B498] shadow-[0_15px_50px_rgba(38,28,18,0.1)] p-8 relative">
          <div className="absolute inset-2 border border-[#8B6508]/10 pointer-events-none" />

          {successMessage && !error && (
            <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-wider text-center font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#2C2114] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                autoFocus
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-transparent border-b-2 border-[#2C2114]/30 focus:border-[#8B6508] pb-1.5 text-sm focus:outline-none placeholder-[#A8967E]/60 font-serif italic text-[#140E0A] transition-colors"
                placeholder="reader@bibliotheca.edu"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#2C2114] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                Mật tự mật mã
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-transparent border-b-2 border-[#2C2114]/30 focus:border-[#8B6508] pb-1.5 text-sm focus:outline-none placeholder-[#A8967E]/60 font-serif text-[#140E0A] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && <ErrorMsg message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B6508] hover:bg-[#A67B1E] text-white font-bold py-3.5 px-4 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs shadow-md hover:shadow-lg rounded-[1px]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {loading ? <><Spinner size="sm" /> Đang thông quan...</> : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#C4B498]/50" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>hoặc</span>
              <div className="flex-1 h-px bg-[#C4B498]/50" />
            </div>
            <a
              href="http://localhost:8080/oauth2/authorization/google"
              className="group w-full border border-[#C4B498] hover:border-[#8B6508] bg-white hover:bg-[#FFFEF9] text-[#2C2114] font-bold py-3 px-4 transition-all duration-300 flex items-center justify-center gap-3 text-[11px] rounded-[1px] shadow-sm hover:shadow-md"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="tracking-[0.15em]">Tiếp tục với Google</span>
            </a>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-[#C4B498]/40">
            <p className="text-xs font-serif text-stone-500">
              Chưa thiết lập quy bạ?{' '}
              <Link to="/register" className="text-[#8B6508] font-bold hover:text-[#A67B1E] underline underline-offset-4 uppercase tracking-wider ml-1 text-[11px]" style={{ fontFamily: "'Cinzel', serif" }}>
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Mật khẩu xác nhận không trùng khớp'); return; }
    if (form.password.length < 6) { setError('Mật tự phải bao gồm tối thiểu 6 ký tự'); return; }
    setLoading(true);
    setError('');
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/login', { state: { message: 'Quy bạ thành công! Vui lòng đăng nhập.' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAF3E3] selection:bg-[#E6CE9A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#C4B293_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-xl text-[#8B6508] transition-transform duration-500 hover:rotate-180 mb-4">
            ❖
          </Link>
          <span className="text-[#8B6508] text-[10px] tracking-[0.35em] uppercase font-bold block mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
            EX LIBRIS BIBLIOTHECA
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#140E0A] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            Thiết Lập Quy Bạ
          </h1>
          <p className="text-stone-500 text-xs font-serif italic mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Gia nhập học sảnh để lưu giữ hành trình khai mở tư tưởng
          </p>
        </div>

        <div className="bg-[#FAF3E3] border border-[#C4B498] shadow-[0_15px_50px_rgba(38,28,18,0.1)] p-8 relative">
          <div className="absolute inset-2 border border-[#8B6508]/10 pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: 'name', label: 'Danh tính học giả', type: 'text', placeholder: 'Nguyễn Văn A' },
              { key: 'email', label: 'Địa chỉ Email', type: 'email', placeholder: 'reader@bibliotheca.edu' },
              { key: 'password', label: 'Thiết lập mật từ', type: 'password', placeholder: '••••••••' },
              { key: 'confirmPassword', label: 'Xác nhận mật từ', type: 'password', placeholder: '••••••••' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2C2114] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  required
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full bg-transparent border-b-2 border-[#2C2114]/30 focus:border-[#8B6508] pb-1.5 text-sm focus:outline-none placeholder-[#A8967E]/60 font-serif text-[#140E0A] transition-colors"
                  placeholder={f.placeholder}
                />
              </div>
            ))}

            {error && <ErrorMsg message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B6508] hover:bg-[#A67B1E] text-white font-bold py-3.5 px-4 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs shadow-md hover:shadow-lg rounded-[1px] mt-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {loading ? <><Spinner size="sm" /> Đang ghi danh...</> : 'Tạo tài khoản'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#C4B498]/40">
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#C4B498]/50" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>hoặc</span>
              <div className="flex-1 h-px bg-[#C4B498]/50" />
            </div>
            <a
              href="http://localhost:8080/oauth2/authorization/google"
              className="group w-full border border-[#C4B498] hover:border-[#8B6508] bg-white hover:bg-[#FFFEF9] text-[#2C2114] font-bold py-3 px-4 transition-all duration-300 flex items-center justify-center gap-3 text-[11px] rounded-[1px] shadow-sm hover:shadow-md mb-4"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="tracking-[0.15em]">Tiếp tục với Google</span>
            </a>
            <p className="text-xs font-serif text-stone-500 text-center">
              Đã có chương mục độc giả?{' '}
              <Link to="/login" className="text-[#8B6508] font-bold hover:text-[#A67B1E] underline underline-offset-4 uppercase tracking-wider ml-1 text-[11px]" style={{ fontFamily: "'Cinzel', serif" }}>
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OAuth2CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const authError = searchParams.get('error');

    if (token) {
      loginWithToken(token)
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch(err => {
          setError(err.message || 'Không thể đồng bộ thông tin tài khoản.');
        });
    } else if (authError) {
      setError(authError === 'user_not_found' ? 'Không tìm thấy tài khoản người dùng.' : 'Xác thực Google thất bại.');
    } else {
      setError('Tham số xác thực không hợp lệ.');
    }
  }, [searchParams, loginWithToken, navigate]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAF3E3] selection:bg-[#E6CE9A]">
      <div className="w-full max-w-md bg-[#FAF3E3] border border-[#C4B498] shadow-[0_15px_50px_rgba(38,28,18,0.1)] p-8 text-center relative">
        <div className="absolute inset-2 border border-[#8B6508]/10 pointer-events-none" />

        {error ? (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-red-600" style={{ fontFamily: "'Playfair Display', serif" }}>
              Xác Thực Thất Bại
            </h2>
            <ErrorMsg message={error} />
            <Link
              to="/login"
              className="inline-block bg-[#8B6508] hover:bg-[#A67B1E] text-white font-bold py-2.5 px-6 transition-all duration-300 uppercase tracking-widest text-[10px] rounded-[1px]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Quay lại Đăng nhập
            </Link>
          </div>
        ) : (
          <div className="space-y-6 py-6">
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#8B6508] font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
              Đang xác thực tài khoản Google...
            </p>
            <p className="text-stone-500 text-xs font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Hệ thống đang thiết lập phiên đăng nhập của bạn.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}