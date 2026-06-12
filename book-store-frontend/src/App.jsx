import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Spinner, LoadingPage, ErrorBoundary } from './components/common';

const HomePage = lazy(() => import('./pages/HomePage'));
const BooksPage = lazy(() => import('./pages/BooksPage'));
const BookDetailPage = lazy(() => import('./pages/BookDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/AuthPages').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/AuthPages').then(m => ({ default: m.RegisterPage })));
const OAuth2CallbackPage = lazy(() => import('./pages/AuthPages').then(m => ({ default: m.OAuth2CallbackPage })));
const ForgotPasswordPage = lazy(() => import('./pages/AuthPages').then(m => ({ default: m.ForgotPasswordPage })));
const OrdersPage = lazy(() => import('./pages/OrderPages').then(m => ({ default: m.OrdersPage })));
const OrderDetailPage = lazy(() => import('./pages/OrderPages').then(m => ({ default: m.OrderDetailPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ZaloPayReturnPage = lazy(() => import('./pages/ZaloPayReturnPage'));

const AdminRoute = lazy(() => import('./admin/AdminRoute'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminBooks = lazy(() => import('./admin/AdminBooks'));
const AdminOrders = lazy(() => import('./admin/AdminOrders').then(m => ({ default: m.default })));
const AdminOrderDetail = lazy(() => import('./admin/AdminOrders').then(m => ({ default: m.AdminOrderDetail })));
const AdminCoupons = lazy(() => import('./admin/AdminCoupons'));
const AdminCategories = lazy(() => import('./admin/AdminCatalog').then(m => ({ default: m.AdminCategories })));
const AdminAuthors = lazy(() => import('./admin/AdminCatalog').then(m => ({ default: m.AdminAuthors })));
const AdminPublishers = lazy(() => import('./admin/AdminCatalog').then(m => ({ default: m.AdminPublishers })));

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              {}
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/payment/zalopay/return" element={<ZaloPayReturnPage />} />
              <Route path="/auth/callback" element={<OAuth2CallbackPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {}
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
              <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              {}
              <Route path="*" element={
                <div className="text-center py-20">
                  <p className="text-5xl mb-4">404</p>
                  <p className="text-gray-500">Trang không tìm thấy</p>
                </div>
              } />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

function AdminApp() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen bg-[#0F0A06]">
          <Spinner size="lg" />
        </div>
      }>
        <Routes>
          <Route element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetail />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="authors" element={<AdminAuthors />} />
            <Route path="publishers" element={<AdminPublishers />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {}
            <Route path="/admin/*" element={<AdminApp />} />
            {}
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
