Project Path: book-store-frontend

Source Tree:

```txt
book-store-frontend
├── README.md
├── WORKFLOW_BIBLIOTHECA.md
├── code2prompt.exe
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── App.jsx
│   ├── admin
│   │   ├── AdminBooks.jsx
│   │   ├── AdminCatalog.jsx
│   │   ├── AdminComponents.jsx
│   │   ├── AdminCoupons.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminOrders.jsx
│   │   └── AdminRoute.jsx
│   ├── api
│   │   └── index.js
│   ├── components
│   │   ├── book
│   │   │   ├── BookCard.jsx
│   │   │   └── BookCardSkeleton.jsx
│   │   ├── comment
│   │   │   ├── CommentForm.jsx
│   │   │   ├── CommentItem.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   └── index.js
│   │   ├── common
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ImageUploader.jsx
│   │   │   └── index.jsx
│   │   └── layout
│   │       ├── Footer.jsx
│   │       └── Navbar.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks
│   │   └── index.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── AuthPages.jsx
│   │   ├── BookDetailPage.jsx
│   │   ├── BooksPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── OrderPages.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── WishlistPage.jsx
│   │   └── ZaloPayReturnPage.jsx
│   └── utils
│       ├── cloudinary.js
│       └── index.js
├── tailwind.config.js
└── vite.config.js

```

`README.md`:

```md
# 📚 BookStore Frontend

Website thương mại điện tử bán sách - React + Tailwind CSS

## Cấu trúc dự án

```
src/
├── api/           # Tất cả API calls (async/await)
├── context/       # AuthContext, CartContext (React Context)
├── hooks/         # useAsync, usePagination, useToast
├── components/
│   ├── layout/    # Navbar, Footer
│   ├── common/    # Toast, Spinner, Pagination, Modal, ...
│   └── book/      # BookCard
├── pages/
│   ├── HomePage.jsx
│   ├── BooksPage.jsx       # Danh sách + bộ lọc
│   ├── BookDetailPage.jsx  # Chi tiết + reviews
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx    # Địa chỉ + coupon + đặt hàng
│   ├── OrderPages.jsx      # Danh sách + chi tiết đơn hàng
│   ├── AuthPages.jsx       # Login + Register
│   └── ProfilePage.jsx
└── utils/         # formatPrice, formatDate, constants
```

## Cài đặt & Chạy

```bash
# Cài dependencies
npm install

# Chạy dev server (port 3000)
npm run dev

# Build production
npm run build
```

## Yêu cầu

- Node.js >= 18
- Backend đang chạy tại `http://localhost:8080`

## Tính năng

- ✅ Async/await toàn bộ API calls
- ✅ Responsive (mobile-first với Tailwind)
- ✅ Authentication (JWT Bearer Token)
- ✅ Giỏ hàng real-time
- ✅ Tìm kiếm & lọc sách
- ✅ Đặt hàng + coupon
- ✅ Quản lý địa chỉ giao hàng
- ✅ Đánh giá sách
- ✅ Theo dõi đơn hàng
- ✅ Protected routes
- ✅ Loading states & error handling

## Cấu hình API

Mặc định kết nối `http://localhost:8080`. Để thay đổi, sửa `BASE_URL` trong `src/api/index.js`.

```

`WORKFLOW_BIBLIOTHECA.md`:

```md
# 📋 BIBLIOTHECA — LUỒNG CÔNG VIỆC DỰ ÁN (WORKFLOW / TO-DO LIST)

> **Dự án:** Bibliotheca Bookstore — Web bán sách cổ điển  
> **Stack:** ReactJS (Vite + Tailwind) · Java Spring Boot 3.x · MySQL  
> **Ngày lập:** 2026-06-02  
> **Trạng thái:** Giao diện cơ bản hoàn thiện — đang sửa lỗi tích hợp API & bổ sung tính năng

---

## 🔴 PHẦN A: DANH SÁCH CÁC VIỆC CẦN LÀM MỚI

---

### A1. XÁC THỰC & BẢO MẬT

---

- [ ] **Implement Silent Token Refresh (Auto Refresh Access Token)**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Access Token hết hạn sau 15 phút. Cần dùng Axios interceptor (hoặc custom `request` wrapper) để bắt lỗi `401`, tự động gọi `POST /auth/refresh` (dùng HttpOnly cookie `refreshToken`), lấy Access Token mới, lưu vào `localStorage`, rồi retry request gốc. Nếu refresh cũng thất bại → logout hoàn toàn. Hiện tại `src/api/index.js` dùng `fetch` thuần nên cần refactor hoặc bọc thêm logic này.

---

### A2. TRANG ADMIN

---

- [ ] **Tạo Layout Admin & Route Guard cho ROLE_ADMIN**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Navbar đã có link `/admin` nhưng route này trả 404. Cần tạo `AdminLayout.jsx` với sidebar riêng, và `AdminRoute` guard kiểm tra `user.roles?.includes('ROLE_ADMIN')`. Đặt tất cả sub-route admin dưới prefix `/admin/*`.

- [ ] **Trang Admin: Quản lý Sách (CRUD)**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Gọi các endpoint `POST /admin/books`, `PUT /admin/books/{id}`, `DELETE /admin/books/{id}`. Form cần có: title, slug, description, isbn, price, discountPrice, stockQuantity, pages, language, categoryId, publisherId, publishedDate, status (`ACTIVE`/`INACTIVE`/`OUT_OF_STOCK`), authorIds (multi-select). Hiển thị bảng danh sách với phân trang, tìm kiếm.

- [ ] **Trang Admin: Quản lý Đơn hàng**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Gọi `GET /admin/orders` (có filter theo `status`). Chi tiết đơn dùng `GET /admin/orders/{id}`. Cập nhật trạng thái qua `PATCH /admin/orders/{id}/status` — cần hiển thị đúng state machine: `PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED`. Cập nhật thanh toán qua `PATCH /admin/orders/{id}/payment`.

- [ ] **Trang Admin: Quản lý Coupon (CRUD)**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Gọi các endpoint `/admin/coupons`. Form tạo/sửa coupon gồm: code (uppercase), type (`PERCENTAGE`/`FIXED_AMOUNT`), value, minOrderAmount, maxDiscountAmount, usageLimit, startDate, endDate, status. Lưu ý: coupon đã dùng (`usedCount > 0`) không xóa được — chỉ cho phép chuyển sang `INACTIVE`.

- [ ] **Trang Admin: Quản lý Danh mục, Tác giả, NXB (CRUD)**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Dùng các endpoint `/admin/categories`, `/admin/authors`, `/admin/publishers`. Danh mục hỗ trợ phân cấp cha-con (trường `parentId`). Khi xóa: không được xóa nếu còn sách liên kết hoặc còn danh mục con — cần xử lý thông báo lỗi thân thiện.

---

### A3. TÍNH NĂNG NGƯỜI DÙNG

---

- [ ] **Thêm trường Phương thức thanh toán vào CheckoutPage**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Backend yêu cầu `paymentMethod` bắt buộc khi gọi `POST /orders/checkout`. Cần thêm UI chọn: `COD` (Thu tiền khi nhận), `BANKING`, `MOMO`, `ZALOPAY`, `VNPAY`. Mặc định chọn `COD`. Lưu ý: các phương thức online chưa tích hợp cổng thanh toán thực tế — có thể hiển thị thông báo "sắp ra mắt".

- [ ] **Tính năng Wishlist (Danh sách yêu thích)**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Backend đã có bảng `wishlists` và API đầy đủ. Cần thêm nút trái tim trên `BookCard` và `BookDetailPage`. Tạo `wishlistAPI` trong `src/api/index.js`. Tạo trang `/profile/wishlist` liệt kê sách đã yêu thích. Dùng `WishlistContext` hoặc lưu state trong ProfilePage.

- [ ] **Tính năng Thông báo (Notifications)**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Backend có bảng `notifications` với type `ORDER`, `PROMOTION`, `SYSTEM`, `REVIEW`. Thêm icon chuông vào Navbar với badge số thông báo chưa đọc. Tạo dropdown hoặc trang `/notifications` hiển thị danh sách. Gọi API đánh dấu đã đọc khi click.

- [ ] **Quản lý Địa chỉ trong ProfilePage**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Hiện ProfilePage chỉ có đổi mật khẩu. Cần thêm tab/section "Địa chỉ của tôi" với CRUD đầy đủ. Dùng các API `/addresses` đã có trong `src/api/index.js`. Cho phép đặt địa chỉ mặc định (`PATCH /addresses/{id}/default`). Lưu ý: không cho xóa địa chỉ đang là default.

- [ ] **Lọc đơn hàng theo trạng thái trong OrdersPage**
  - **Độ ưu tiên:** Thấp
  - **Mô tả & Lưu ý kỹ thuật:** API `GET /orders` hỗ trợ query param `status`. Thêm tabs hoặc select filter: Tất cả / Chờ xác nhận / Đang giao / Đã giao / Đã huỷ.

- [ ] **Ghi nhận lịch sử xem sách**
  - **Độ ưu tiên:** Thấp
  - **Mô tả & Lưu ý kỹ thuật:** Khi user đã đăng nhập vào `BookDetailPage`, gọi API ghi nhận vào `view_histories`. Không block UI nếu call này thất bại (fire-and-forget). Có thể hiển thị "Đã xem gần đây" trong ProfilePage sau.

---

## 🟠 PHẦN B: DANH SÁCH CÁC VIỆC CẦN SỬA ĐỔI / TỐI ƯU

---

### B1. LỖI NGHIÊM TRỌNG — SẼ CRASH (Sửa ngay)

---

- [ ] **Sửa `authAPI.me()` đang gọi sai endpoint**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** `src/api/index.js` đang gọi `request("GET", "/books")` thay vì lấy thông tin user. Backend không có endpoint `/auth/me`. Giải pháp: decode JWT trực tiếp ở client để lấy `userId`, `email`, `roles` từ payload (dùng thư viện `jwt-decode` hoặc decode thủ công base64). Cập nhật `AuthContext` để parse token thay vì gọi API.

- [ ] **Sửa `orderAPI.create()` gọi sai endpoint**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** `src/api/index.js` dùng `POST /orders` nhưng backend cần `POST /orders/checkout`. Sửa lại path. Đồng thời kiểm tra request body — cần thêm `paymentMethod` (bắt buộc).

- [ ] **Sửa `orderAPI.cancel()` dùng sai HTTP method**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Đang dùng `PUT /orders/{id}/cancel`, cần đổi sang `PATCH /orders/{id}/cancel`.

- [ ] **Sửa `addressAPI.setDefault()` dùng sai HTTP method**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Đang dùng `PUT /addresses/{id}/default`, cần đổi sang `PATCH /addresses/{id}/default`.

- [ ] **Sửa `couponAPI.validate()` — sai endpoint và thiếu param**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** 2 vấn đề: (1) Endpoint sai `/coupons/validate` → đổi thành `/coupons/preview`. (2) API yêu cầu cả `code` lẫn `subtotal` (tổng tiền giỏ hàng hiện tại). Cập nhật `couponAPI.validate(code, subtotal)` và truyền `totalPrice` từ CartContext vào `CheckoutPage` khi gọi.

- [ ] **Sửa `bookAPI.search()` — endpoint không tồn tại**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** `BooksPage.jsx` gọi `/books/search` khi có keyword nhưng backend không có route này. Cần dùng `GET /books` với query param `keyword` cho cả hai trường hợp. Xóa hàm `search` khỏi `bookAPI`, thay vào đó truyền `keyword` vào `bookAPI.getAll(params)`.

---

### B2. LỖI DỮ LIỆU — FIELD MAPPING SAI

---

- [ ] **Sửa mapping field địa chỉ (Address)**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Backend trả `fullName`, `street`, `province` nhưng frontend dùng `recipientName`, `address`, `city`. Cần cập nhật toàn bộ: `CheckoutPage.jsx` (form thêm địa chỉ, hiển thị danh sách), `OrderDetailPage` (hiển thị địa chỉ đơn hàng). Mapping đúng: `fullName`↔`recipientName`, `street`↔`address`, `province`↔`city`.

- [ ] **Sửa mapping field OrderResponse**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** `OrderDetailPage` dùng `order.subtotalAmount` và `order.discountAmount` nhưng backend trả `subtotal` và `discountAmount`. Sửa lại các tham chiếu trong `OrderPages.jsx`.

- [ ] **Sửa mapping field CartResponse**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Backend trả `bookCoverUrl` và `unitPrice` (không phải `coverImageUrl` và `price`). Kiểm tra `CartContext` và `CartPage.jsx`. Cần đảm bảo `totalPrice` trong CartContext tính đúng từ `item.unitPrice * item.quantity`.

- [ ] **Sửa hiển thị `publishedYear` trong BookDetailPage**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Backend lưu `publishedDate` (datetime string), không có `publishedYear`. Trong `BookDetailPage.jsx` cần đổi `book.publishedYear` thành `new Date(book.publishedDate).getFullYear()`. Thêm guard nếu `publishedDate` là null.

- [ ] **Sửa hiển thị `discountPercent` trong BookCard và BookDetailPage**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Backend không có trường `discountPercent`. Cần tính ở phía client: `Math.round((1 - book.discountPrice / book.price) * 100)`. Tạo helper `getDiscountPercent(book)` trong `src/utils/index.js` để tái sử dụng.

---

### B3. LỖI LOGIC PHÂN TRANG (Page chưa được fix đúng số hay sao ớ)

---

- [ ] **Sửa lệch số trang do `one-indexed-parameters`**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Backend cấu hình `spring.data.web.pageable.one-indexed-parameters=true` — page bắt đầu từ **1**, không phải **0**. Toàn bộ frontend đang gửi `page: 0` cho trang đầu, gây lệch dữ liệu. Cần sửa: (1) `usePagination` hook trong `src/hooks/index.js` — đổi `page: 0` thành `page: 1` và tăng +1 khi gửi request. (2) `Pagination` component — điều chỉnh lại logic hiển thị số trang cho khớp. (3) Kiểm tra `PageResponse`: backend trả `hasNext`/`hasPrevious` thay vì `last`/`first` — sửa trong component `Pagination`.

- [ ] **Sửa format params sort**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Frontend gửi `sort: "createdAt,desc"` (Spring MVC default) nhưng backend nhận `sortBy` và `sortDir` riêng biệt. Sửa `BooksPage.jsx` — split giá trị sort thành 2 params khi gọi API: `{ sortBy: "createdAt", sortDir: "desc" }`.

---

### B4. TỐI ƯU CODE & CẤU TRÚC

---

- [ ] **Refactor `src/api/index.js` — Thêm interceptor xử lý 401**
  - **Độ ưu tiên:** Cao
  - **Mô tả & Lưu ý kỹ thuật:** Hiện tại dùng `fetch` thuần, không có cơ chế retry. Cân nhắc chuyển sang `axios` để dễ dùng interceptor, hoặc bọc hàm `request()` hiện tại với logic: nếu nhận 401 và chưa retry → gọi `/auth/refresh` → cập nhật token → retry request gốc. Thêm cờ `isRetrying` để tránh vòng lặp vô hạn.

- [ ] **Bổ sung trạng thái đơn hàng còn thiếu trong `utils/index.js`**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Backend có thêm `PROCESSING` và `RETURNED` trong enum `OrderStatus` nhưng `getOrderStatusLabel()` và `getOrderStatusColor()` chưa có. Bổ sung cả nhãn hiển thị lẫn màu sắc (gợi ý: `PROCESSING` → màu indigo, `RETURNED` → màu orange).

- [ ] **Tách `adminAPI` riêng trong `src/api/index.js`**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Tạo object `adminAPI` tập hợp tất cả các call đến `/admin/*` (books, categories, authors, publishers, orders, coupons) để dễ quản lý và phân biệt với API public.

- [ ] **Thêm Error Boundary cho các page chính**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Khi API lỗi mà không bắt được, React crash toàn màn hình trắng. Bọc các `<Route>` chính trong `<ErrorBoundary>` để hiển thị UI lỗi thân thiện thay vì crash.

- [ ] **Tối ưu `useAsync` và `usePagination` hooks**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** `useAsync` hiện không có cơ chế cancel (cleanup) khi component unmount → có thể gây lỗi "setState on unmounted component". Thêm `AbortController` vào `fetch` calls hoặc dùng flag `isMounted`.

- [ ] **Thêm loading skeleton thay vì chỉ dùng Spinner**
  - **Độ ưu tiên:** Thấp
  - **Mô tả & Lưu ý kỹ thuật:** UX tốt hơn khi hiển thị skeleton card (placeholder có hình dạng nội dung) thay vì spinner giữa màn hình. Tạo `BookCardSkeleton.jsx` dùng Tailwind `animate-pulse`.

- [ ] **Lazy loading các trang (Code Splitting)**
  - **Độ ưu tiên:** Thấp
  - **Mô tả & Lưu ý kỹ thuật:** Dùng `React.lazy()` + `Suspense` cho các page (đặc biệt AdminPages) để giảm bundle size ban đầu. Thêm fallback `<LoadingPage />` trong `Suspense`.

---

### B5. BẢO MẬT & KIỂM TRA

---

- [ ] **Kiểm tra và vá lỗ hổng API public write (Books/Categories/Authors/Publishers)**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Theo spec, các endpoint `POST/PUT/DELETE /books`, `/categories`, `/authors`, `/publishers` (không có prefix `/admin`) đang được cấu hình `permitAll` — ai cũng có thể gọi. Frontend không nên gọi các endpoint này; chỉ dùng các endpoint `/admin/*` đã được bảo vệ. Cần yêu cầu backend team sửa `SecurityConfig` đồng thời.

- [ ] **Validate form phía client cho CheckoutPage**
  - **Độ ưu tiên:** Trung bình
  - **Mô tả & Lưu ý kỹ thuật:** Thêm validate số điện thoại theo regex VN `^(0[3|5|7|8|9])+([0-9]{8})$` khi thêm địa chỉ mới. Kiểm tra giỏ hàng không rỗng trước khi cho phép vào trang checkout. Hiển thị lỗi rõ ràng từng field.

---

## 📊 TỔNG KẾT ƯU TIÊN

| Mức độ        | Số lượng | Ghi chú                                  |
| ------------- | -------- | ---------------------------------------- |
| 🔴 Cao        | 14       | Cần giải quyết trước khi demo/production |
| 🟠 Trung bình | 10       | Hoàn thiện trong sprint tiếp theo        |
| 🟡 Thấp       | 4        | Nice-to-have, làm sau khi ổn định        |

---

> **Gợi ý thứ tự Sprint:**
>
> **Sprint 1 (Sửa lỗi cốt lõi):** Toàn bộ mục B1 + B2 + B3 → hệ thống hoạt động đúng  
> **Sprint 2 (Admin & Checkout):** A2 (Admin Layout + Sách + Đơn hàng) + A3 (Phương thức thanh toán)  
> **Sprint 3 (Tính năng người dùng):** A3 (Wishlist, Notifications, Quản lý địa chỉ) + B4 (Refactor)  
> **Sprint 4 (Hoàn thiện):** Admin Coupon/Category/Author/NXB + B5 + các việc độ ưu tiên Thấp

```

`index.html`:

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BookStore - Cửa hàng sách trực tuyến</title>
    <meta name="description" content="Mua sách trực tuyến uy tín, giá tốt, giao hàng toàn quốc" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

`package-lock.json`:

```json
{
  "name": "bookstore-frontend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "bookstore-frontend",
      "version": "1.0.0",
      "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-router-dom": "^6.27.0"
      },
      "devDependencies": {
        "@types/react": "^18.3.11",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.2",
        "autoprefixer": "^10.4.20",
        "postcss": "^8.4.47",
        "tailwindcss": "^3.4.14",
        "vite": "^5.4.9"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-compilation-targets": "^7.29.7",
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helpers": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.7.tgz",
      "integrity": "sha512-DkXD5OJQaAQIdZ1bt3UZdEnHAn9Imd3IVBdX03UFe+ony9Ojw5pzr9YVKGDY1jt+Gcn/FnGkNf8r+Vj5NOJWtQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz",
      "integrity": "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz",
      "integrity": "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.29.7.tgz",
      "integrity": "sha512-G7sHYigPY17oO5SYWnfD/0MTBwVR781S/JI643e/JhUYgVgWE/61SoW3NH9KWUKyKq5LVh3npif99Wkt6j86Jw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz",
      "integrity": "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz",
      "integrity": "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.7.tgz",
      "integrity": "sha512-hnORnjP/1P/zFEndoeX+n+t1RwWRJiJpM/jO7FW32Kn9r5+sJB2JWOdYo4L6k78j15eCwY3Gm/7364B1EMwtNg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.7"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.29.7.tgz",
      "integrity": "sha512-TL0hMc9xzy86VD31nUiwzd5otRAcyEPcsegCxolO0PvcXuH1v0kECe/UIznYFihpkvU5wg/jk4v0TTEFfm53fw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.29.7.tgz",
      "integrity": "sha512-06IyK09H3wi4cGbhDBwp5gUGo0IKtnYa8tyTiephirPCK6fbobVGiXMMI5zLQ4aKEYP3wZ3ArU44o+8KMrSG/Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.7.tgz",
      "integrity": "sha512-EhlfNQtZ+NK22w5BM61ciuiq1m58ed33Wr1Xan//ZRTy6hgjnwyCffRYwzsGXdASJSUJ1guZILsErh1eQcl+zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.7.tgz",
      "integrity": "sha512-4zBIxpPzowiZpusoFkyGVwakdRJUyuH5PxQ/PrqghfdFWWasvnCdPfQXHrenDai+gyLARulZjZowCOj6fjT4pA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.21.5.tgz",
      "integrity": "sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz",
      "integrity": "sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz",
      "integrity": "sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz",
      "integrity": "sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.21.5.tgz",
      "integrity": "sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.21.5.tgz",
      "integrity": "sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.21.5.tgz",
      "integrity": "sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.21.5.tgz",
      "integrity": "sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.21.5.tgz",
      "integrity": "sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.21.5.tgz",
      "integrity": "sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.21.5.tgz",
      "integrity": "sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.21.5.tgz",
      "integrity": "sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.21.5.tgz",
      "integrity": "sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.21.5.tgz",
      "integrity": "sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.21.5.tgz",
      "integrity": "sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.21.5.tgz",
      "integrity": "sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.21.5.tgz",
      "integrity": "sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.21.5.tgz",
      "integrity": "sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.21.5.tgz",
      "integrity": "sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.21.5.tgz",
      "integrity": "sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.21.5.tgz",
      "integrity": "sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.21.5.tgz",
      "integrity": "sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.21.5.tgz",
      "integrity": "sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@remix-run/router": {
      "version": "1.23.3",
      "resolved": "https://registry.npmjs.org/@remix-run/router/-/router-1.23.3.tgz",
      "integrity": "sha512-4An71tdz9X8+3sI4Qqqd2LWd9vS39J7sqd9EU4Scw7TJE/qB10Flv/UuqbPVgfQV9XoK8Np6jNquZitnZq5i+Q==",
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.27",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz",
      "integrity": "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.61.0.tgz",
      "integrity": "sha512-dnxczajOqt0gesZlN5pGQ1s1imQVrsmCw5G2Ci4oM+0WvNz3pyRnlWrT7McoZIb8VlFwCawdmbWRmxRn7HI+VQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.61.0.tgz",
      "integrity": "sha512-Bp3JpGP00Vu3f238ivRrjf7z3xSzVPXqCmaJYA9t2c+c8vKYvOzmXF7LkkeUalTEGd6cZcSWe+PFIP3Vy48fRg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.61.0.tgz",
      "integrity": "sha512-zaYIpr670mUmmZ1tVzUFplbQbG7h3Gugx3L5FoqhsC2m/YnLlR1a7zVLmXNPy+iY1tFPEbNG+HHBXZGyId0G5w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.61.0.tgz",
      "integrity": "sha512-+P49fvkv2dSoeevUW+lgZ/I2JHSsJCK1Lyjj7Cu6E4UHG4tS9XIefzIjo5qhgELjAclnen1rLzK2PMKJdo+Dyg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.61.0.tgz",
      "integrity": "sha512-l3FAAOyKJXH2ea6KNFN+MMgC/rnE94YGLXs2ehYqDcCoHt1DpvgWX75BhUJxN38XojP7Ul+4H8PRn7EdyqSDrw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.61.0.tgz",
      "integrity": "sha512-VokPN3TSctKj65cyCNPaUh4vMFA8awxOot/0sp+4J7ZlNRKQEhXhawqPwajoi8H5ZFt61i0ugZJuTKXBjGJ17Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.61.0.tgz",
      "integrity": "sha512-DxH0P3wxm+Yzs/p3zrk9dw1rURu8p0Nv5+MRK/L7OtnLNg5rLZraSBFZ8iUXOd9f2BlhJyEpIZUH/emjq4UJ4g==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.61.0.tgz",
      "integrity": "sha512-T6ZvMNe84kAz6TBWHC7hGAoEtzP1LWYw/AqayGWEF6uISt3Abk/st06LqRD9THd7Xz3NxzurUpzAuEAUbZf+nw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.61.0.tgz",
      "integrity": "sha512-q/4hzvQkDs8b4jIBab1pnLiiM0ayTZsN2amBFPDzuyZxjEd4wDwx0UJFYM3cOZzSf5Kw8fnWSprJzIBMkcR44Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.61.0.tgz",
      "integrity": "sha512-vvYWX3akdEAY6km+9wAqFDnk6pQsbJKVnj7xawcvs/+fdlYBGp+U+Qq/lLfpIxYIZvZLHMAKD9HLdacSx/r3dw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.61.0.tgz",
      "integrity": "sha512-DePa5cqOxDP/Zp0VOXpeWaGew5iIv5DXp9NYbzkX5PFQyWVX9184WCTh3hvr/7lhXo8ZVlbFLkz8+o/q1dU6gA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.61.0.tgz",
      "integrity": "sha512-LV8aWMB8UChglMCEzs7RkN0GsH29RJaLLqwm9fCIjlqwxQTiWAqNcc7wjBkH31hV0PU/yVxGYvrYsgfea2qw6g==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.61.0.tgz",
      "integrity": "sha512-QoNSnwQtaeNu5grdBbsL0tt1uyl5EnS8DA8Mr3nluMXbhdQNyhN+G4tBax7VCdxLKj8YJ0/4OO9Ho84jMnJtKA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.61.0.tgz",
      "integrity": "sha512-/zZp5MKapIIApE8trN8qLGNSiRN9TUoaUZ1cmVu4XnVdd5LQLOXTtyi+vtfUbNnT3iyjzpPqYeKXmvJ+gJGYWw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.61.0.tgz",
      "integrity": "sha512-RbrzcD3aJ1k3UbtMRRBNwojdVVyXjuVAFTfn/xPa6EEl6GE9Sm/akPgFTb9aAC9pMKGJ6CtWxaGrqWcabH+ySg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.61.0.tgz",
      "integrity": "sha512-ZF+onDsBso8PJf1XaG9lB+O9RnBpKGnY6OrzC4CSHrtC1jb6jWLTKK4bRqdoCXHd22gyr2hiYmEAm8Wns/BOCw==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.61.0.tgz",
      "integrity": "sha512-Atk0aSIk5Zx2Wuh9dgRQgLP0Koc8hOeYpbWryMXyk8G8/HmPkwPPkMqIIDhrXHHYqfUzSJA/I7IWSBv8xSmRBA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.61.0.tgz",
      "integrity": "sha512-0uMOcf3eZ5K+K4cYHkdxShFMPlPXCOdfDFEFn9dNYAEEd2cVvmOfH7zFgRVoDgmtQ1m9k5q7qfrHzyMAubKYUA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.61.0.tgz",
      "integrity": "sha512-mvFtE4A/t/7hRJ7X8Ozmu8FsIkAUat2nzl12pgU337BRmq87AQUJztwHz2Zv5/tjo9/C95E66CK03SI/ToEDJw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.61.0.tgz",
      "integrity": "sha512-z9b9+aTxvt8n2rNltMPvyaUfB8NJ+CVyOrGK/MdIKHx7B+lXmZpm/XbRsU7Rpf3fRqJ2uS6mBJiJveCtq8LHDg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.61.0.tgz",
      "integrity": "sha512-jXaXFqKMehsOc+g8R6oo33RRC6w07G9jDBxAE5eAKX7mOcCbZloYIPNhfG9Wl+P9O9IWHFO4OJgPi1Ml2qkt7w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.61.0.tgz",
      "integrity": "sha512-OXNWVFocS2IA4+QplhTZZ2a+8hPZR7T8KuozsNmJKK8y7cp83StHvGksfHzPG3wczWTczyWHVQuqeiTUbjiyBg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.61.0.tgz",
      "integrity": "sha512-AlAbNtBO637LxSldqV43z0FfXoGfl2TW1DgAg/bs7aQswFbDewz2SJm3BUhiGfbOVtW571xbc9p+REdxhyN/Eg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.61.0.tgz",
      "integrity": "sha512-QRSrQXyJ1M4tjNXdR0/G/IgV6lzfQQJYBjlWIEYkY2Xs86DRl/iEpQ4blMDjJxSl7n19eDKKXMg0AmuBVYy8pQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.61.0.tgz",
      "integrity": "sha512-tkuFxhvKO/HlGd0VsINF6vHSYH8AF8W0TcNxKDK6JZmrehngFj78pToc8iemtnvwilDjs2G/qSzYFhe9U8q+fw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/prop-types": {
      "version": "15.7.15",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.15.tgz",
      "integrity": "sha512-F6bEyamV9jKGAFBEmlQnesRPGOQqS2+Uwi0Em15xenOxHaf2hv6L8YCVn3rPdPJOiJfPiCnLIRyvwVaqMY3MIw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/react": {
      "version": "18.3.29",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.29.tgz",
      "integrity": "sha512-ch0qJdr2JY0r04NXSprbK6TXOgnaJ1Tz23fm5W+z0/CBah6BSBc3n96h7K9GOtwh0HrilNWHIBzE1Ko4Dcw/Wg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/prop-types": "*",
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "18.3.7",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.3.7.tgz",
      "integrity": "sha512-MEe3UeoENYVFXzoXEWsvcpg6ZvlrFNlOQ7EOsvhI3CfAXwzPfO8Qwuxd40nepsYKqyyVQnTdEfv68q91yLcKrQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^18.0.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.7.0.tgz",
      "integrity": "sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.27",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.17.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.5.0",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.0.tgz",
      "integrity": "sha512-FMhOoZV4+qR6aTUALKX2rEqGG+oyATvwBt9IIzVR5rMa2HRWPkxf+P+PAJLD1I/H5/II+HuZcBJYEFBpq39ong==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.2",
        "caniuse-lite": "^1.0.30001787",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.33",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.33.tgz",
      "integrity": "sha512-bA6+tcSLpz2tIEdDXZPpPTIuxBcC4+w6SieaYyfigIa4h8GlFxbA17v22Vx3JUtuZQj9SgOsnbK+aTBzyDyEuw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.2",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001793",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001793.tgz",
      "integrity": "sha512-iwSsYWaCOoh26cV8NwNRViHlrfUvYsHDfRVcbtmw0Kg6PJIZZXwMkj1442FYLBGkeUf1juAsU3DTfxW579mrPA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.364",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.364.tgz",
      "integrity": "sha512-G/dYE3+AYhyHwzTwg8UbnXf7zqMERYh7l2jJ3QujhFsH8agSYwtnGAR2aZ7f0AakIKJXd5En/Hre4igIUrdlYw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz",
      "integrity": "sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.21.5",
        "@esbuild/android-arm": "0.21.5",
        "@esbuild/android-arm64": "0.21.5",
        "@esbuild/android-x64": "0.21.5",
        "@esbuild/darwin-arm64": "0.21.5",
        "@esbuild/darwin-x64": "0.21.5",
        "@esbuild/freebsd-arm64": "0.21.5",
        "@esbuild/freebsd-x64": "0.21.5",
        "@esbuild/linux-arm": "0.21.5",
        "@esbuild/linux-arm64": "0.21.5",
        "@esbuild/linux-ia32": "0.21.5",
        "@esbuild/linux-loong64": "0.21.5",
        "@esbuild/linux-mips64el": "0.21.5",
        "@esbuild/linux-ppc64": "0.21.5",
        "@esbuild/linux-riscv64": "0.21.5",
        "@esbuild/linux-s390x": "0.21.5",
        "@esbuild/linux-x64": "0.21.5",
        "@esbuild/netbsd-x64": "0.21.5",
        "@esbuild/openbsd-x64": "0.21.5",
        "@esbuild/sunos-x64": "0.21.5",
        "@esbuild/win32-arm64": "0.21.5",
        "@esbuild/win32-ia32": "0.21.5",
        "@esbuild/win32-x64": "0.21.5"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.20.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.1.tgz",
      "integrity": "sha512-GGToxJ/w1x32s/D2EKND7kTil4n8OVk/9mycTc4VDza13lOvpUZTGX3mFSCtV9ksdGBVzvsyAVLM6mHFThxXxw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.2",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.2.tgz",
      "integrity": "sha512-evOr8xfXKxE6qSR0hSXL2r3sd7ALj8+7jQEUvPYcm5sgZFdJ+AYzT6yNmJenvIYQBgIGwfwz08sL8zoL7yq2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.12",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.12.tgz",
      "integrity": "sha512-ZB9RH/39qpq5Vu6Y+NmUaFhQR6pp+M2Xt76XBnEwDaGcVAqhlvxrl3B2bKS5D3NH3QR76v3aSrKaF/Kiy7lEtQ==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.46",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.46.tgz",
      "integrity": "sha512-GYVXHE2KnrzAfsAjl4uP++evGFCrAU1jta4ubEjIG7YWt/64Gqv66a30yKwWczVjA6j3bM4nBwH7Pk1JmDHaxQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.15",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.15.tgz",
      "integrity": "sha512-FfR8sjd4em2T6fb3I2MwAJU7HWVMr9zba+enmQeeWFfCbm+UOC/0X4DS8XtpUTMwWMGbjKYP7xjfNekzyGmB3A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.12",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.2.tgz",
      "integrity": "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz",
      "integrity": "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "6.30.4",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-6.30.4.tgz",
      "integrity": "sha512-SVUsDe+DybHM/WmYKIVYhZh1o5Dcuf16yM6WjG02Q9XVFMZIJyHYhwrr6bFBXZkVP6z69kNkMyBCujt8FaFLJA==",
      "license": "MIT",
      "dependencies": {
        "@remix-run/router": "1.23.3"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8"
      }
    },
    "node_modules/react-router-dom": {
      "version": "6.30.4",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-6.30.4.tgz",
      "integrity": "sha512-q4HvNl+mmDdkS0g+MqiBZNteQJCuimWoOyHMy4T/RQLAn9Z29+E91QXRaxOujeMl2HTzRSS0KFPd7lxX3PjV0Q==",
      "license": "MIT",
      "dependencies": {
        "@remix-run/router": "1.23.3",
        "react-router": "6.30.4"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8",
        "react-dom": ">=16.8"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.61.0",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.61.0.tgz",
      "integrity": "sha512-T9mWdbWfQtp0B5lv/HX+wrhYsmXRlcWnXXmJbXqKJhlRaoS6KMhq0gpyzW4UJfclcxrEdLnTgjT2NjruLONu0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.9"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.61.0",
        "@rollup/rollup-android-arm64": "4.61.0",
        "@rollup/rollup-darwin-arm64": "4.61.0",
        "@rollup/rollup-darwin-x64": "4.61.0",
        "@rollup/rollup-freebsd-arm64": "4.61.0",
        "@rollup/rollup-freebsd-x64": "4.61.0",
        "@rollup/rollup-linux-arm-gnueabihf": "4.61.0",
        "@rollup/rollup-linux-arm-musleabihf": "4.61.0",
        "@rollup/rollup-linux-arm64-gnu": "4.61.0",
        "@rollup/rollup-linux-arm64-musl": "4.61.0",
        "@rollup/rollup-linux-loong64-gnu": "4.61.0",
        "@rollup/rollup-linux-loong64-musl": "4.61.0",
        "@rollup/rollup-linux-ppc64-gnu": "4.61.0",
        "@rollup/rollup-linux-ppc64-musl": "4.61.0",
        "@rollup/rollup-linux-riscv64-gnu": "4.61.0",
        "@rollup/rollup-linux-riscv64-musl": "4.61.0",
        "@rollup/rollup-linux-s390x-gnu": "4.61.0",
        "@rollup/rollup-linux-x64-gnu": "4.61.0",
        "@rollup/rollup-linux-x64-musl": "4.61.0",
        "@rollup/rollup-openbsd-x64": "4.61.0",
        "@rollup/rollup-openharmony-arm64": "4.61.0",
        "@rollup/rollup-win32-arm64-msvc": "4.61.0",
        "@rollup/rollup-win32-ia32-msvc": "4.61.0",
        "@rollup/rollup-win32-x64-gnu": "4.61.0",
        "@rollup/rollup-win32-x64-msvc": "4.61.0",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.19",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.19.tgz",
      "integrity": "sha512-3ofp+LL8E+pK/JuPLPggVAIaEuhvIz4qNcf3nA1Xn2o/7fb7s/TYpHhwGDv1ZU3PkBluUVaF8PyCHcm48cKLWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "5.4.21",
      "resolved": "https://registry.npmjs.org/vite/-/vite-5.4.21.tgz",
      "integrity": "sha512-o5a9xKjbtuhY6Bi5S3+HvbRERmouabWbyUcpXXUA1u+GNUKoROi9byOJ8M0nHbHYHkYICiMlqxkg1KkYmm25Sw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.21.3",
        "postcss": "^8.4.43",
        "rollup": "^4.20.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || >=20.0.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    }
  }
}

```

`package.json`:

```json
{
  "name": "bookstore-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.27.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vite": "^5.4.9"
  }
}

```

`postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

`src\App.jsx`:

```jsx
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
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
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
              { }
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/payment/zalopay/return" element={<ZaloPayReturnPage />} />
              <Route path="/auth/callback" element={<OAuth2CallbackPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/profile/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
              { }
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
              <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              { }
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
            { }
            <Route path="/admin/*" element={<AdminApp />} />
            { }
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

```

`src\admin\AdminBooks.jsx`:

```jsx
import { useState, useEffect, useCallback } from 'react';
import { bookAPI, adminAPI, categoryAPI, authorAPI, publisherAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminTextarea, AdminSelect, StatusBadge,
  useConfirm, AdminPagination, useAdminToast,
} from './AdminComponents';
import ImageUploader from '../components/common/ImageUploader';

const STATUS_MAP = {
  ACTIVE: { label: 'Đang Bán', colorClass: 'bg-green-100 text-green-800 border-green-200' },
  INACTIVE: { label: 'Ngừng Bán', colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  OUT_OF_STOCK: { label: 'Hết Hàng', colorClass: 'bg-red-100 text-red-700 border-red-200' },
};

const EMPTY_FORM = {
  title: '', slug: '', description: '', isbn: '',
  price: '', discountPrice: '', stockQuantity: '',
  pages: '', language: 'vi', categoryId: '', publisherId: '',
  publishedDate: '', status: 'ACTIVE', authorIds: [],
  coverUrl: '',
};

function slugify(str) {
  return str.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function AdminBooks() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const { confirm, Dialog: ConfirmDialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await bookAPI.getAll({ keyword: keyword || undefined, page, size: 15, sortBy: 'id', sortDir: 'desc' });
      setBooks(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [keyword, page]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  useEffect(() => {
    Promise.all([
      categoryAPI.getAllList(),
      authorAPI.getAllList(),
      publisherAPI.getAllList(),
    ]).then(([c, a, p]) => {
      setCategories(c.data || []);
      setAuthors(a.data || []);
      setPublishers(p.data || []);
    });
  }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true); };

  const openEdit = (book) => {
    setEditing(book);
    setForm({
      title: book.title || '',
      slug: book.slug || '',
      description: book.description || '',
      isbn: book.isbn || '',
      price: book.price || '',
      discountPrice: book.discountPrice || '',
      stockQuantity: book.stockQuantity || '',
      pages: book.pages || '',
      language: book.language || 'vi',
      categoryId: book.categoryId || '',
      publisherId: book.publisherId || '',
      publishedDate: book.publishedDate ? book.publishedDate.split('T')[0] : '',
      status: book.status || 'ACTIVE',
      authorIds: book.authorIds || [],
      coverUrl: book.coverImageUrl || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const priceNum = parseFloat(form.price);
    const discountNum = form.discountPrice ? parseFloat(form.discountPrice) : null;
    const stockNum = parseInt(form.stockQuantity);

    if (isNaN(priceNum) || priceNum < 0) {
      toast('Giá bán phải lớn hơn hoặc bằng 0', 'error');
      return;
    }
    if (discountNum !== null && (isNaN(discountNum) || discountNum < 0)) {
      toast('Giá khuyến mãi phải lớn hơn hoặc bằng 0', 'error');
      return;
    }
    if (discountNum !== null && discountNum > priceNum) {
      toast('Giá khuyến mãi không được lớn hơn giá bán gốc', 'error');
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      toast('Số lượng kho phải lớn hơn hoặc bằng 0', 'error');
      return;
    }
    if (!form.categoryId) {
      toast('Vui lòng chọn danh mục', 'error');
      return;
    }
    if (!form.publisherId) {
      toast('Vui lòng chọn nhà xuất bản', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        price: priceNum,
        discountPrice: discountNum,
        stockQuantity: stockNum,
        pages: form.pages ? parseInt(form.pages) : null,
        categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        publisherId: form.publisherId ? parseInt(form.publisherId) : null,
        publishedDate: form.publishedDate ? new Date(form.publishedDate).toISOString() : null,
        authorIds: form.authorIds.map(Number),
        coverUrl: form.coverUrl || null,
      };
      if (editing) {
        await adminAPI.books.update(editing.id, payload);
        toast('Cập nhật sách thành công');
      } else {
        await adminAPI.books.create(payload);
        toast('Thêm thư tịch mới thành công');
      }
      setModalOpen(false);
      fetchBooks();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (book) => {
    const ok = await confirm(`Xác nhận xoá ấn bản "${book.title}"?`);
    if (!ok) return;
    try {
      await adminAPI.books.delete(book.id);
      toast('Đã xoá ấn bản');
      fetchBooks();
    } catch (e) { toast(e.message, 'error'); }
  };

  const toggleAuthor = (id) => {
    setForm(f => ({
      ...f,
      authorIds: f.authorIds.includes(id)
        ? f.authorIds.filter(a => a !== id)
        : [...f.authorIds, id],
    }));
  };

  const columns = [
    {
      key: 'id',
      label: 'MÃ',
      width: '70px',
      render: v => <span className="text-[#8B6508] font-mono text-xs font-bold tracking-wider bg-[#8B6508]/10 px-2 py-1 rounded">{v}</span>
    },
    {
      key: 'title',
      label: 'TÊN SÁCH / ẤN BẢN',
      render: (v, row) => (
        <div className="flex items-center gap-3 py-1">
          {row.coverImageUrl ? (
            <img
              src={row.coverImageUrl}
              alt={v}
              className="w-10 h-14 object-cover rounded shadow-sm border border-stone-200/60 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-14 bg-stone-100 flex items-center justify-center rounded border border-dashed border-stone-300 text-stone-400 flex-shrink-0">
              <span className="text-[10px] font-serif">N/A</span>
            </div>
          )}
          <div className="max-w-md">
            <p className="font-bold text-[#140E0A] text-base leading-tight hover:text-[#8B6508] transition-colors duration-200"
              style={{ fontFamily: "'Playfair Display', serif" }}>{v}</p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-stone-500 font-mono">
              <span className="bg-stone-100 px-1.5 py-0.5 rounded">ISBN: {row.isbn || 'N/A'}</span>
              {row.language && <span className="uppercase border-l border-stone-300 pl-3">{row.language}</span>}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'price',
      label: 'GIÁ BÁN',
      render: (v, row) => (
        <div className="py-1">
          <p className="text-[#8B6508] font-bold text-sm font-mono tracking-wide bg-[#FAF5EC] px-2 py-0.5 rounded inline-block">
            {new Intl.NumberFormat('vi-VN').format(row.discountPrice || v)}đ
          </p>
          {row.discountPrice && (
            <p className="text-[11px] text-stone-400 line-through font-mono mt-0.5 pl-2">
              {new Intl.NumberFormat('vi-VN').format(v)}đ
            </p>
          )}
        </div>
      )
    },
    {
      key: 'stockQuantity',
      label: 'KHO',
      render: v => {
        const isOutOfStock = (v ?? 0) === 0;
        const isLowStock = (v ?? 0) < 5;
        const badgeClass = isOutOfStock
          ? 'bg-red-50 text-red-600 border border-red-200'
          : isLowStock
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-100';
        return (
          <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-full ${badgeClass}`}>
            {v ?? 0} quyển
          </span>
        )
      }
    },
    {
      key: 'status',
      label: 'TÌNH TRẠNG',
      render: v => <StatusBadge status={v} map={STATUS_MAP} />,
    },
    {
      key: '_actions',
      label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-80 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Thư Tịch"
        subtitle={`Hiện có ${books?.totalElements ?? 0} đầu sách trong hệ thống lưu kho`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Bổ Sung Sách Mới
          </AdminBtn>
        }
      />

      {}
      <div className="flex gap-3 mb-6 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="w-full max-w-md">
          <AdminSearch
            value={keyword}
            onChange={v => { setKeyword(v); setPage(1); }}
            placeholder="Tra cứu nhanh theo tên, mã ISBN, slug..."
          />
        </div>
      </div>

      {}
      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={books?.content} loading={loading} emptyMsg="Chưa có dữ liệu thư tịch" />
      </div>

      <div className="mt-4 flex justify-end">
        <AdminPagination data={books} page={page} onPageChange={setPage} />
      </div>

      {}
      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Hiệu Đính Thông Tin Thư Tịch' : 'Khai Báo Ấn Bản Mới'}
        width="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar py-2">

          {}
          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#D4C4A8]/40 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-[#8B6508] uppercase border-b border-[#D4C4A8]/30 pb-1.5 font-serif">Thông tin cơ bản</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 flex justify-center md:justify-start">
                <FormField label="Ảnh Bìa Sách">
                  <ImageUploader
                    value={form.coverUrl}
                    onChange={url => setForm(f => ({ ...f, coverUrl: url }))}
                    disabled={submitting}
                  />
                </FormField>
              </div>
              <div className="md:col-span-2 space-y-4">
                <FormField label="Tên Sách" required>
                  <AdminInput
                    value={form.title}
                    onChange={v => setForm(f => ({ ...f, title: v, slug: f.slug || slugify(v) }))}
                    placeholder="Ví dụ: Số Đỏ (Ấn bản kỷ niệm)"
                  />
                </FormField>
                <FormField label="Slug đường dẫn (Tự động)" required>
                  <AdminInput
                    value={form.slug}
                    onChange={v => setForm(f => ({ ...f, slug: v }))}
                    placeholder="so-do-an-ban-ky-niem"
                    className="font-mono text-xs bg-stone-50 text-stone-600"
                  />
                </FormField>
              </div>
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase border-b border-stone-100 pb-1.5">Định danh & Ngôn ngữ</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Mã ISBN">
                  <AdminInput value={form.isbn} onChange={v => setForm(f => ({ ...f, isbn: v }))} placeholder="978-3-16..." className="font-mono" />
                </FormField>
                <FormField label="Ngôn Ngữ">
                  <AdminInput value={form.language} onChange={v => setForm(f => ({ ...f, language: v }))} placeholder="vi" />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Số Trang">
                  <AdminInput type="number" value={form.pages} onChange={v => setForm(f => ({ ...f, pages: v }))} placeholder="0" />
                </FormField>
                <FormField label="Ngày Xuất Bản">
                  <AdminInput type="date" value={form.publishedDate} onChange={v => setForm(f => ({ ...f, publishedDate: v }))} />
                </FormField>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase border-b border-stone-100 pb-1.5">Thương mại & Kho</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Giá Niêm Yết (đ)" required>
                  <AdminInput type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="0" className="font-mono" />
                </FormField>
                <FormField label="Giá Ưu Đãi (đ)">
                  <AdminInput type="number" value={form.discountPrice} onChange={v => setForm(f => ({ ...f, discountPrice: v }))} placeholder="Bỏ trống nếu không giảm" className="font-mono text-emerald-700" />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Số Lượng Kho" required>
                  <AdminInput type="number" value={form.stockQuantity} onChange={v => setForm(f => ({ ...f, stockQuantity: v }))} placeholder="0" className="font-mono font-bold" />
                </FormField>
                <FormField label="Tình Trạng Trạng Thái" required>
                  <AdminSelect
                    value={form.status}
                    onChange={v => setForm(f => ({ ...f, status: v }))}
                    options={[
                      { value: 'ACTIVE', label: 'Đang Bán' },
                      { value: 'INACTIVE', label: 'Ngừng Bán' },
                      { value: 'OUT_OF_STOCK', label: 'Hết Hàng' },
                    ]}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {}
          <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase border-b border-stone-100 pb-1.5">Phân loại & Tác quyền</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Danh Mục" required>
                <AdminSelect
                  value={form.categoryId}
                  onChange={v => setForm(f => ({ ...f, categoryId: v }))}
                  placeholder="-- Chọn danh mục sách --"
                  options={categories.map(c => ({ value: c.id, label: c.name }))}
                />
              </FormField>
              <FormField label="Nhà Xuất Bản" required>
                <AdminSelect
                  value={form.publisherId}
                  onChange={v => setForm(f => ({ ...f, publisherId: v }))}
                  placeholder="-- Chọn nhà xuất bản --"
                  options={publishers.map(p => ({ value: p.id, label: p.name }))}
                />
              </FormField>
            </div>

            <FormField label="Tác Giả / Dịch Giả (Có thể chọn đồng tác giả)">
              <div className="bg-[#FAF6EE] border border-[#D4C4A8]/60 rounded-lg p-3 max-h-40 overflow-y-auto shadow-inner">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {authors.map(a => {
                    const isChecked = form.authorIds.includes(a.id);
                    return (
                      <label key={a.id} className={`flex items-center gap-2.5 py-2 px-3 rounded-md cursor-pointer group transition-all border ${isChecked ? 'bg-white border-[#8B6508]/40 shadow-xs' : 'border-transparent hover:bg-white/60'}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAuthor(a.id)}
                          className="accent-[#8B6508] w-4 h-4 cursor-pointer rounded-sm"
                        />
                        <span className={`text-sm font-serif transition-colors leading-none ${isChecked ? 'text-[#8B6508] font-bold' : 'text-[#2C2114] group-hover:text-[#8B6508]'}`}
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {a.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </FormField>
          </div>

          <FormField label="Mô Tả Nội Dung / Tóm Tắt Tác Phẩm">
            <AdminTextarea
              value={form.description}
              onChange={v => setForm(f => ({ ...f, description: v }))}
              rows={4}
              placeholder="Nhập phần tóm tắt cốt truyện hoặc giới thiệu nội dung nổi bật của sách..."
            />
          </FormField>

          {}
          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Hủy Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-6">
              {submitting ? 'Đang Lưu...' : editing ? 'Cập Nhật Hiệu Đính' : 'Thêm Vào Kho Thư Tịch'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog />
      <Toasts />
    </div>
  );
}
```

`src\admin\AdminCatalog.jsx`:

```jsx
import { useState, useEffect, useCallback } from 'react';
import { categoryAPI, authorAPI, publisherAPI, adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminTextarea, AdminSelect,
  useConfirm, useAdminToast, AdminPagination,
} from './AdminComponents';

function slugify(str) {
  return str.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

const EMPTY_CAT = { name: '', slug: '', description: '', parentId: '' };

export function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_CAT);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, Dialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const [allRes, pagedRes] = await Promise.all([
        categoryAPI.getAll({ size: 200 }),
        categoryAPI.getAll({ keyword: keyword || undefined, page, size: 15 }),
      ]);
      setCategories(allRes.data?.content || allRes.data || []);
      setPaginatedData(pagedRes.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [keyword, page]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_CAT); setModalOpen(true); };
  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name || '', slug: cat.slug || '', description: cat.description || '', parentId: cat.parentId || '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, parentId: form.parentId ? parseInt(form.parentId) : null };
      if (editing) {
        await adminAPI.categories.update(editing.id, payload);
        toast('Cập nhật danh mục thành công');
      } else {
        await adminAPI.categories.create(payload);
        toast('Tạo danh mục thành công');
      }
      setModalOpen(false);
      fetchCategories();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (cat) => {
    const ok = await confirm(`Xoá danh mục "${cat.name}"? Không thể xoá nếu còn sách hoặc danh mục con.`);
    if (!ok) return;
    try {
      await adminAPI.categories.delete(cat.id);
      toast('Đã xoá danh mục');
      fetchCategories();
    } catch (e) { toast(e.message, 'error'); }
  };

  const categoryMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '70px',
      render: v => <span className="font-mono text-[#8B6508] font-bold text-xs bg-[#8B6508]/10 px-2 py-0.5 rounded">{v}</span>
    },
    {
      key: 'name', label: 'TÊN DANH MỤC',
      render: (v, row) => (
        <div className="py-0.5">
          <p className="font-bold text-[#140E0A] text-sm font-serif tracking-wide hover:text-[#8B6508] transition-colors">{v}</p>
          <p className="text-[11px] text-stone-400 font-mono mt-0.5">{row.slug}</p>
        </div>
      )
    },
    {
      key: 'parentId', label: 'DANH MỤC CHA',
      render: v => v
        ? <span className="text-xs text-stone-600 font-medium bg-stone-100 px-2 py-0.5 rounded">{categoryMap[v] || `#${v}`}</span>
        : <span className="text-[11px] text-stone-400 italic bg-stone-50 px-2 py-0.5 rounded border border-dashed border-stone-200">Danh mục gốc</span>
    },
    {
      key: 'description',
      label: 'MÔ TẢ',
      render: v => <span className="text-xs text-stone-500 truncate max-w-xs block" title={v}>{v || '—'}</span>
    },
    {
      key: '_actions', label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-90 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Danh Mục"
        subtitle={`Hiện có ${paginatedData?.totalElements ?? categories.length} phân loại thư tịch`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Thêm Danh Mục
          </AdminBtn>
        }
      />

      <div className="mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="max-w-md">
          <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tìm danh mục phân loại..." />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={paginatedData?.content} loading={loading} emptyMsg="Chưa có danh mục nào được khởi tạo" />
      </div>

      <div className="mt-4 flex justify-end">
        <AdminPagination data={paginatedData} page={page} onPageChange={setPage} />
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Hiệu Đính Danh Mục' : 'Tạo Phân Loại Thư Tịch mới'} width="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-3 rounded-lg border border-[#D4C4A8]/30">
            <FormField label="Tên Danh Mục" required>
              <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v, slug: f.slug || slugify(v) }))} placeholder="Ví dụ: Triết Học Cổ Đại" />
            </FormField>
            <FormField label="Slug đường dẫn" required>
              <AdminInput value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v }))} placeholder="triet-hoc-co-dai" className="font-mono text-xs bg-stone-50" />
            </FormField>
          </div>

          <FormField label="Thuộc Danh Mục Cha" hint="Để trống nếu đây là phân loại cấp cao nhất">
            <AdminSelect
              value={form.parentId}
              onChange={v => setForm(f => ({ ...f, parentId: v }))}
              placeholder="Không có (Danh mục gốc)"
              options={categories.filter(c => c.id !== editing?.id).map(c => ({ value: c.id, label: c.name }))}
            />
          </FormField>

          <FormField label="Mô Tả Định Hướng">
            <AdminTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} rows={3} placeholder="Tóm tắt định hướng nội dung của danh mục này..." />
          </FormField>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Huỷ Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-5">
              {submitting ? 'Đang lưu...' : editing ? 'Cập Nhật' : 'Tạo Mới'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}

const EMPTY_AUTHOR = { name: '', bio: '', avatarUrl: '' };

export function AdminAuthors() {
  const [authors, setAuthors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_AUTHOR);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, Dialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authorAPI.getAll({ keyword: keyword || undefined, page, size: 15, sortBy: 'id', sortDir: 'desc' });
      setAuthors(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [keyword, page]);

  useEffect(() => { fetchAuthors(); }, [fetchAuthors]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_AUTHOR); setModalOpen(true); };
  const openEdit = (a) => { setEditing(a); setForm({ name: a.name || '', bio: a.bio || '', avatarUrl: a.avatarUrl || '' }); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await adminAPI.authors.update(editing.id, form);
        toast('Cập nhật văn sĩ thành công');
      } else {
        await adminAPI.authors.create(form);
        toast('Thêm tác giả thành công');
      }
      setModalOpen(false);
      fetchAuthors();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (author) => {
    const ok = await confirm(`Xoá tác giả "${author.name}"? Không thể xoá nếu còn sách liên kết.`);
    if (!ok) return;
    try {
      await adminAPI.authors.delete(author.id);
      toast('Đã xoá tác giả');
      fetchAuthors();
    } catch (e) { toast(e.message, 'error'); }
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '70px',
      render: v => <span className="font-mono text-[#8B6508] font-bold text-xs bg-[#8B6508]/10 px-2 py-0.5 rounded">{v}</span>
    },
    {
      key: 'name', label: 'TÁC GIẢ',
      render: (v, row) => (
        <div className="flex items-center gap-3.5 py-1">
          {row.avatarUrl ? (
            <img src={row.avatarUrl} alt={v} className="w-9 h-9 rounded-full object-cover border border-[#D4C4A8]/60 shadow-xs flex-shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#FAF5EC] border border-[#D4C4A8]/60 flex items-center justify-center text-sm font-bold text-[#8B6508] shadow-inner flex-shrink-0"
              style={{ fontFamily: "'Cinzel', serif" }}>
              {v?.charAt(0)}
            </div>
          )}
          <span className="font-bold text-[#140E0A] text-sm font-serif tracking-wide hover:text-[#8B6508] transition-colors">{v}</span>
        </div>
      )
    },
    {
      key: 'bio',
      label: 'TIỂU SỬ / TÓM TẮT',
      render: v => <span className="text-xs text-stone-500 line-clamp-2 max-w-sm block whitespace-normal" title={v}>{v || 'Chưa cập nhật tiểu sử'}</span>
    },
    {
      key: '_actions', label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-90 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Tác Giả"
        subtitle={`Hệ thống lưu trữ dữ liệu thông tin về ${authors?.totalElements ?? 0} văn sĩ / dịch giả`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Đăng Ký Tác Giả
          </AdminBtn>
        }
      />

      <div className="mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="max-w-md">
          <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tra cứu danh tính văn sĩ..." />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={authors?.content} loading={loading} emptyMsg="Chưa ghi nhận dữ liệu về tác giả nào" />
      </div>

      <div className="mt-4 flex justify-end">
        <AdminPagination data={authors} page={page} onPageChange={setPage} />
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Hiệu Đính Tiểu Sử' : 'Khai Hồ Sơ Tác Giả Mới'} width="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <div className="sm:col-span-2 space-y-4">
              <FormField label="Tên Tác Giả / Bút Danh" required>
                <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ví dụ: Thạch Lam" />
              </FormField>
              <FormField label="Ảnh Đại Diện (URL)">
                <AdminInput value={form.avatarUrl} onChange={v => setForm(f => ({ ...f, avatarUrl: v }))} placeholder="https://link-anh.com/avatar.jpg" className="text-xs" />
              </FormField>
            </div>
            {}
            <div className="flex flex-col items-center justify-center p-3 bg-[#FAF8F5] border border-stone-200 rounded-lg h-full min-h-[110px]">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2">Xem Trước</span>
              {form.avatarUrl ? (
                <img src={form.avatarUrl} alt="Preview" className="w-14 h-14 rounded-full object-cover border border-[#8B6508]/30 shadow-xs" onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Error" }} />
              ) : (
                <div className="w-14 h-14 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-xs text-stone-400 font-serif">N/A</div>
              )}
            </div>
          </div>

          <FormField label="Hành Trạng / Tiểu Sử">
            <AdminTextarea value={form.bio} onChange={v => setForm(f => ({ ...f, bio: v }))} rows={5} placeholder="Tóm lược cuộc đời, sự nghiệp văn học hoặc các giải thưởng danh giá của tác giả..." />
          </FormField>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Hủy Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-5">
              {submitting ? 'Đang lưu...' : editing ? 'Lưu Hiệu Đính' : 'Thêm Vào Hồ Sơ'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}

const EMPTY_PUB = { name: '', description: '', website: '' };

export function AdminPublishers() {
  const [publishers, setPublishers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PUB);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, Dialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchPublishers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await publisherAPI.getAll({ keyword: keyword || undefined, page, size: 15, sortBy: 'id', sortDir: 'desc' });
      setPublishers(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [keyword, page]);

  useEffect(() => { fetchPublishers(); }, [fetchPublishers]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_PUB); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p); setForm({ name: p.name || '', description: p.description || '', website: p.website || '' }); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await adminAPI.publishers.update(editing.id, form);
        toast('Cập nhật NXB thành công');
      } else {
        await adminAPI.publishers.create(form);
        toast('Tạo NXB thành công');
      }
      setModalOpen(false);
      fetchPublishers();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (pub) => {
    const ok = await confirm(`Xoá NXB "${pub.name}"? Không thể xoá nếu còn sách liên kết.`);
    if (!ok) return;
    try {
      await adminAPI.publishers.delete(pub.id);
      toast('Đã xoá nhà xuất bản');
      fetchPublishers();
    } catch (e) { toast(e.message, 'error'); }
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '70px',
      render: v => <span className="font-mono text-[#8B6508] font-bold text-xs bg-[#8B6508]/10 px-2 py-0.5 rounded">{v}</span>
    },
    {
      key: 'name', label: 'NHÀ XUẤT BẢN',
      render: (v, row) => (
        <div className="py-0.5">
          <p className="font-bold text-[#140E0A] text-sm font-serif tracking-wide hover:text-[#8B6508] transition-colors">{v}</p>
          {row.website && (
            <a href={row.website} target="_blank" rel="noreferrer"
              className="text-[11px] text-[#8B6508] hover:text-[#6a4e05] hover:underline font-mono mt-0.5 inline-flex items-center gap-1">
              <span>↗</span> {row.website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
      )
    },
    {
      key: 'description',
      label: 'THÔNG TIN THÊM',
      render: v => <span className="text-xs text-stone-500 truncate max-w-xs block" title={v}>{v || '—'}</span>
    },
    {
      key: '_actions', label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-90 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Nhà Xuất Bản"
        subtitle={`Đối tác phân phối liên kết từ ${publishers?.totalElements ?? 0} đơn vị xuất bản`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Thêm Nhà Xuất Bản
          </AdminBtn>
        }
      />

      <div className="mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="max-w-md">
          <AdminSearch value={keyword} onChange={v => { setKeyword(v); setPage(1); }} placeholder="Tìm đối tác xuất bản..." />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={publishers?.content} loading={loading} emptyMsg="Chưa ghi nhận thông tin nhà xuất bản nào" />
      </div>

      <div className="mt-4 flex justify-end">
        <AdminPagination data={publishers} page={page} onPageChange={setPage} />
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Hiệu Đính NXB' : 'Đăng Ký Nhà Xuất Bản Mới'} width="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid grid-cols-1 gap-4 bg-[#FAF8F5] p-3 rounded-lg border border-[#D4C4A8]/30">
            <FormField label="Tên Nhà Xuất Bản" required>
              <AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ví dụ: Nhà Xuất Bản Hội Nhà Văn" />
            </FormField>
            <FormField label="Trang Web Chính Thức (Website)">
              <AdminInput value={form.website} onChange={v => setForm(f => ({ ...f, website: v }))} placeholder="https://nxbhoinhavan.vn" className="font-mono text-xs" />
            </FormField>
          </div>

          <FormField label="Giới Thiệu / Ghi Chú">
            <AdminTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} rows={4} placeholder="Địa chỉ, thông tin liên hệ hoặc chính sách chiết khấu phát hành của đối tác..." />
          </FormField>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Hủy Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-5">
              {submitting ? 'Đang lưu...' : editing ? 'Lưu Thay Đổi' : 'Đăng Ký Đơn Vị'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>
      <Dialog />
      <Toasts />
    </div>
  );
}
```

`src\admin\AdminComponents.jsx`:

```jsx
import { useState } from 'react';

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

export function StatusBadge({ status, map }) {
  const config = map[status] || { label: status, colorClass: 'bg-stone-100 text-stone-700 border-stone-200' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.colorClass}`}>
      {config.label}
    </span>
  );
}

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
```

`src\admin\AdminCoupons.jsx`:

```jsx
import { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminSearch, AdminTable, AdminModal,
  FormField, AdminInput, AdminSelect, StatusBadge,
  useConfirm, useAdminToast,
} from './AdminComponents';

const STATUS_MAP = {
  ACTIVE: { label: 'Hiệu Lực', colorClass: 'bg-green-100 text-green-800 border-green-200' },
  INACTIVE: { label: 'Vô Hiệu', colorClass: 'bg-gray-100 text-gray-700 border-gray-200' },
  EXPIRED: { label: 'Hết Hạn', colorClass: 'bg-red-100 text-red-700 border-red-200' },
};

const TYPE_LABELS = { PERCENTAGE: 'Chiết khấu (%)', FIXED_AMOUNT: 'Khấu trừ thẳng (Đ)' };

const EMPTY_FORM = {
  code: '', type: 'PERCENTAGE', value: '',
  minOrderAmount: '', maxDiscountAmount: '',
  usageLimit: '', startDate: '', endDate: '', status: 'ACTIVE',
};

const fmt = (n) => new Intl.NumberFormat('vi-VN').format(n);
const isoToDate = (iso) => iso ? iso.split('T')[0] : '';
const dateToIso = (d) => d ? new Date(d).toISOString() : null;

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, Dialog: ConfirmDialog } = useConfirm();
  const { add: toast, Toasts } = useAdminToast();

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminAPI.coupons.getAll();
      setCoupons(res.data || []);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const filtered = coupons.filter(c =>
    !keyword || c.code.toLowerCase().includes(keyword.toLowerCase())
  );

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (coupon) => {
    setEditing(coupon);
    setForm({
      code: coupon.code || '',
      type: coupon.type || 'PERCENTAGE',
      value: coupon.value || '',
      minOrderAmount: coupon.minOrderAmount || '',
      maxDiscountAmount: coupon.maxDiscountAmount || '',
      usageLimit: coupon.usageLimit || '',
      startDate: isoToDate(coupon.startDate),
      endDate: isoToDate(coupon.endDate),
      status: coupon.status || 'ACTIVE',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        code: form.code.toUpperCase(),
        value: parseFloat(form.value),
        minOrderAmount: form.minOrderAmount ? parseFloat(form.minOrderAmount) : null,
        maxDiscountAmount: form.maxDiscountAmount ? parseFloat(form.maxDiscountAmount) : null,
        usageLimit: form.usageLimit ? parseInt(form.usageLimit) : null,
        startDate: form.startDate ? dateToIso(form.startDate) : null,
        endDate: form.endDate ? dateToIso(form.endDate) : null,
      };
      if (editing) {
        await adminAPI.coupons.update(editing.id, payload);
        toast('Cập nhật coupon thành công');
      } else {
        await adminAPI.coupons.create(payload);
        toast('Tạo coupon thành công');
      }
      setModalOpen(false);
      fetchCoupons();
    } catch (e) { toast(e.message, 'error'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (coupon) => {
    if (coupon.usedCount > 0) {
      toast(`Không thể xoá — coupon đã dùng ${coupon.usedCount} lần. Hãy đặt trạng thái INACTIVE.`, 'error');
      return;
    }
    const ok = await confirm(`Xác nhận xoá coupon "${coupon.code}"?`);
    if (!ok) return;
    try {
      await adminAPI.coupons.delete(coupon.id);
      toast('Đã xoá coupon');
      fetchCoupons();
    } catch (e) { toast(e.message, 'error'); }
  };

  const handleDeactivate = async (coupon) => {
    try {
      const payload = {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        minOrderAmount: coupon.minOrderAmount ?? null,
        maxDiscountAmount: coupon.maxDiscountAmount ?? null,
        usageLimit: coupon.usageLimit ?? null,
        startDate: coupon.startDate ?? null,
        endDate: coupon.endDate ?? null,
        status: 'INACTIVE',
      };
      await adminAPI.coupons.update(coupon.id, payload);
      toast('Đã vô hiệu hoá coupon');
      fetchCoupons();
    } catch (e) { toast(e.message, 'error'); }
  };

  const columns = [
    {
      key: 'code', label: 'MÃ ƯU ĐÃI',
      render: (v, row) => (
        <div className="py-0.5">
          <p className="font-bold text-[#8B6508] font-mono tracking-widest text-sm bg-[#8B6508]/5 border border-[#8B6508]/20 px-2 py-0.5 rounded inline-block shadow-2xs">{v}</p>
          <p className="text-[11px] text-stone-400 mt-1 font-medium">{TYPE_LABELS[row.type]}</p>
        </div>
      )
    },
    {
      key: 'value', label: 'MỨC GIẢM',
      render: (v, row) => (
        <span className="font-mono font-bold text-sm text-[#140E0A] bg-stone-100/80 px-2 py-1 rounded border border-stone-200/40">
          {row.type === 'PERCENTAGE' ? `${v}%` : `${fmt(v)}đ`}
        </span>
      )
    },
    {
      key: 'usedCount', label: 'SẢN LƯỢNG SỬ DỤNG',
      render: (v, row) => (
        <div className="text-xs">
          <span className="font-mono font-bold text-[#140E0A]">{v ?? 0}</span>
          {row.usageLimit ? (
            <span className="text-stone-400 font-mono text-[11px]"> / {row.usageLimit} <span className="text-[10px] text-stone-400 font-sans block mt-0.5">lượt tối đa</span></span>
          ) : (
            <span className="text-stone-400 font-sans text-[10px] block mt-0.5">Vô hạn lượt</span>
          )}
        </div>
      )
    },
    {
      key: 'endDate', label: 'HẠN SỬ DỤNG',
      render: v => v ? (
        <div className="font-mono text-xs">
          <span className={new Date(v) < new Date() ? 'text-red-600 bg-red-50 font-bold px-1.5 py-0.5 rounded' : 'text-stone-600'}>
            {new Date(v).toLocaleDateString('vi-VN')}
          </span>
        </div>
      ) : <span className="text-stone-400 italic text-xs bg-stone-50 px-2 py-0.5 rounded border border-dashed border-stone-200">Vĩnh viễn</span>
    },
    {
      key: 'status', label: 'TRẠNG THÁI',
      render: v => <StatusBadge status={v} map={STATUS_MAP} />,
    },
    {
      key: '_actions', label: 'THAO TÁC',
      render: (_, row) => (
        <div className="flex gap-2 justify-end opacity-90 hover:opacity-100 transition-opacity">
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-100" onClick={() => openEdit(row)}>Sửa</AdminBtn>
          {row.status === 'ACTIVE' && row.usedCount > 0 ? (
            <AdminBtn size="sm" variant="danger" className="hover:bg-red-50 text-amber-700 border-amber-200" onClick={() => handleDeactivate(row)}>Vô Hiệu</AdminBtn>
          ) : (
            <AdminBtn size="sm" variant="danger" className="hover:bg-red-50" onClick={() => handleDelete(row)}>Xoá</AdminBtn>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-sm border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Quản Lý Mã Ưu Đãi (Coupon)"
        subtitle={`Hệ thống đang phát hành ${coupons.length} chiến dịch giảm giá công khai`}
        action={
          <AdminBtn onClick={openCreate} className="shadow-sm shadow-[#8B6508]/10 hover:translate-y-[-1px] transition-transform">
            + Khởi Tạo Coupon
          </AdminBtn>
        }
      />

      <div className="mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-xs">
        <div className="max-w-md">
          <AdminSearch value={keyword} onChange={setKeyword} placeholder="Tra cứu theo mã Coupon ký tự..." />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-xs overflow-hidden">
        <AdminTable columns={columns} data={filtered} loading={loading} emptyMsg="Chưa ghi nhận mã coupon giảm giá nào" />
      </div>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Cấu Hình Lại Mã Ưu Đãi' : 'Khởi Tạo Mã Ưu Đãi Mới'}
        width="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-3 rounded-lg border border-[#D4C4A8]/30">
            <FormField label="Mã Ưu Đãi (Mã viết hoa)" required>
              <AdminInput
                value={form.code}
                onChange={v => setForm(f => ({ ...f, code: v.toUpperCase() }))}
                placeholder="Ví dụ: BOOKWORM10"
                disabled={!!editing}
                className="font-mono tracking-widest font-bold text-sm"
              />
            </FormField>
            <FormField label="Phương Thức Khấu Trừ" required>
              <AdminSelect
                value={form.type}
                onChange={v => setForm(f => ({ ...f, type: v, value: '' }))}
                options={[
                  { value: 'PERCENTAGE', label: 'Chiết khấu Phần Trăm (%)' },
                  { value: 'FIXED_AMOUNT', label: 'Khấu trừ Tiền Mặt (VNĐ)' },
                ]}
              />
            </FormField>
          </div>

          {}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label={form.type === 'PERCENTAGE' ? 'Mức Chiết Khấu (%)' : 'Số Tiền Giảm (VNĐ)'} required>
              <div className="relative">
                <AdminInput type="number" value={form.value} onChange={v => setForm(f => ({ ...f, value: v }))} placeholder={form.type === 'PERCENTAGE' ? '10' : '50000'} />
                <span className="absolute right-3 top-2.5 text-xs font-bold text-stone-400 pointer-events-none font-mono">
                  {form.type === 'PERCENTAGE' ? '%' : 'đ'}
                </span>
              </div>
            </FormField>

            <FormField label="Đơn Tối Thiểu Được Áp Dụng" hint="Nhập 0 nếu không giới hạn">
              <div className="relative">
                <AdminInput type="number" value={form.minOrderAmount} onChange={v => setForm(f => ({ ...f, minOrderAmount: v }))} placeholder="200000" />
                <span className="absolute right-3 top-2.5 text-xs text-stone-400 pointer-events-none font-mono">đ</span>
              </div>
            </FormField>

            <FormField
              label="Mức Giảm Tối Đa"
              hint={form.type === 'PERCENTAGE' ? "Giới hạn trần giảm" : "Bị khóa cho loại trừ thẳng"}
            >
              <div className="relative">
                <AdminInput
                  type="number"
                  value={form.maxDiscountAmount}
                  onChange={v => setForm(f => ({ ...f, maxDiscountAmount: v }))}
                  placeholder="100000"
                  disabled={form.type === 'FIXED_AMOUNT'}
                  className={form.type === 'FIXED_AMOUNT' ? 'bg-stone-100/50 text-stone-400 cursor-not-allowed' : ''}
                />
                <span className="absolute right-3 top-2.5 text-xs text-stone-400 pointer-events-none font-mono">đ</span>
              </div>
            </FormField>
          </div>

          {}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-stone-200/60 py-4">
            <FormField label="Giới Hạn Tổng Lượt Dùng" hint="Để trống nếu vô hạn">
              <AdminInput type="number" value={form.usageLimit} onChange={v => setForm(f => ({ ...f, usageLimit: v }))} placeholder="100" />
            </FormField>

            <FormField label="Ngày Bắt Đầu Hiệu Lực">
              <AdminInput type="date" value={form.startDate} onChange={v => setForm(f => ({ ...f, startDate: v }))} className="text-xs" />
            </FormField>

            <FormField label="Ngày Hết Hạn">
              <AdminInput type="date" value={form.endDate} onChange={v => setForm(f => ({ ...f, endDate: v }))} className="text-xs" />
            </FormField>
          </div>

          <FormField label="Trạng Thái Vận Hành" required>
            <AdminSelect
              value={form.status}
              onChange={v => setForm(f => ({ ...f, status: v }))}
              options={[
                { value: 'ACTIVE', label: 'Hiệu Lực (Kích hoạt chạy chiến dịch ngay)' },
                { value: 'INACTIVE', label: 'Vô Hiệu (Tạm đóng mã)' },
                { value: 'EXPIRED', label: 'Hết Hạn (Buộc dừng chiến dịch)' },
              ]}
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <AdminBtn variant="secondary" className="hover:bg-stone-100" onClick={() => setModalOpen(false)}>Huỷ Bỏ</AdminBtn>
            <AdminBtn type="submit" disabled={submitting} className="px-5">
              {submitting ? 'Đang lưu...' : editing ? 'Lưu Thay Đổi' : 'Phát Hành Mã'}
            </AdminBtn>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog />
      <Toasts />
    </div>
  );
}
```

`src\admin\AdminDashboard.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../api';

const StatCard = ({ icon, label, value, sub, to, color = '#8B6508', isCurrency = false }) => (
  <Link
    to={to}
    className="bg-white border border-stone-200/80 p-5 hover:border-[#8B6508]/40 hover:shadow-md transition-all duration-300 group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-[#FCFAF6]/40"
  >
    <div
      className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.07]"
      style={{ background: color, transform: 'translate(20%, -20%)' }}
    />
    <div className="absolute inset-1 border border-[#8B6508]/0 group-hover:border-[#8B6508]/5 pointer-events-none transition-all rounded-lg" />
    <div className="flex items-start justify-between relative z-10">
      <div className="space-y-1">
        <p
          className="text-[10px] uppercase tracking-widest font-bold font-sans"
          style={{ color }}
        >
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-[#140E0A] font-mono tracking-tight break-all">
          {value !== null ? (isCurrency ? fmt(value) : new Intl.NumberFormat('vi-VN').format(value)) : '—'}
        </p>
        {sub && (
          <p className="text-[11px] text-stone-400 font-serif italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {sub}
          </p>
        )}
      </div>
      <span className="text-xl p-2 bg-stone-50 rounded-lg border border-stone-100 opacity-70 group-hover:opacity-100 group-hover:bg-white transition-all shadow-3xs">{icon}</span>
    </div>
  </Link>
);

const QuickLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3.5 bg-white border border-stone-200/80 rounded-xl hover:border-[#8B6508]/40 hover:bg-[#8B6508]/5 transition-all duration-200 group shadow-3xs"
  >
    <span className="text-base p-1.5 bg-stone-50 rounded-lg group-hover:bg-white border border-stone-100 group-hover:border-[#8B6508]/10 transition-colors shadow-3xs">{icon}</span>
    <span
      className="text-xs uppercase tracking-wider font-bold text-stone-600 group-hover:text-[#8B6508] transition-colors font-sans"
    >
      {label}
    </span>
    <span className="ml-auto text-stone-300 group-hover:text-[#8B6508] text-sm font-serif transition-transform group-hover:translate-x-0.5">→</span>
  </Link>
);

const ORDER_STATUS_LABELS = {
  PENDING: 'Chờ xác nhận', CONFIRMED: 'Đã xác nhận', PROCESSING: 'Đang xử lý',
  SHIPPED: 'Đang giao', DELIVERED: 'Đã giao', CANCELLED: 'Đã huỷ đơn',
  RETURNED: 'Trả hàng',
};

const ORDER_STATUS_COLORS = {
  PENDING: '#D97706', CONFIRMED: '#2563EB', PROCESSING: '#7C3AED',
  SHIPPED: '#0891B2', DELIVERED: '#059669', CANCELLED: '#DC2626',
  RETURNED: '#EA580C',
};

const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      adminAPI.dashboard.getStatistics(),
      adminAPI.orders.getAll({ size: 5, page: 1 }),
    ]).then(([statsRes, ordersRes]) => {
      if (statsRes.status === 'fulfilled' && statsRes.value.data) {
        setStats(statsRes.value.data);
      }
      if (ordersRes.status === 'fulfilled') {
        setRecentOrders(ordersRes.value.data?.content?.slice(0, 5) || []);
      }
      setLoading(false);
    });
  }, []);

  // Prepare chart metrics
  const monthlyRevenueData = stats?.monthlyRevenue 
    ? [...stats.monthlyRevenue].reverse() 
    : [];

  const maxRevenue = monthlyRevenueData.length > 0 
    ? Math.max(...monthlyRevenueData.map(d => d.revenue), 1) 
    : 1;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-2xl shadow-xs border border-stone-200/60 my-4 space-y-6">
      {/* Title */}
      <div className="border-b border-[#D4C4A8]/40 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1
            className="text-2xl font-bold text-[#140E0A] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bản Tin Quản Trị
          </h1>
          <p className="text-xs text-stone-400 font-serif italic mt-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Báo cáo tổng quan tiến trình lưu thông hệ thống thư viện thư quán
          </p>
        </div>
        <div className="text-[11px] text-stone-400 font-mono bg-white px-2.5 py-1 rounded-md border border-stone-200/60 self-start sm:self-auto shadow-3xs">
          Hệ thống trực tuyến
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="💰" label="Doanh thu thực tế" value={stats?.totalRevenue ?? 0} sub="Tổng doanh thu đơn hàng đã giao" to="/admin/orders" color="#059669" isCurrency={true} />
        <StatCard icon="📜" label="Quy mô Đơn Hàng" value={stats?.totalOrders ?? 0} sub="Toàn bộ lịch sử giao dịch" to="/admin/orders" color="#8B6508" />
        <StatCard icon="📚" label="Sản lượng đầu sách" value={stats?.totalBooks ?? 0} sub="Tổng mục lưu kho thư viện" to="/admin/books" color="#4A7C59" />
        <StatCard icon="👥" label="Khách hàng đăng ký" value={stats?.totalUsers ?? 0} sub="Quy mô thành viên thư quán" to="/admin/orders" color="#2563EB" />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Monthly Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-xl p-5 shadow-2xs relative">
          <div className="absolute inset-1 border border-stone-50 rounded-lg pointer-events-none" />
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#8B6508] mb-6 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
            <span>📈</span> Xu hướng doanh thu (6 tháng gần nhất)
          </h2>

          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
              <span className="text-[11px] text-stone-400 font-serif italic">Đang tải biểu đồ...</span>
            </div>
          ) : monthlyRevenueData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-xs text-stone-400 font-serif italic">
              Chưa có dữ liệu thống kê doanh thu theo tháng
            </div>
          ) : (
            <div className="w-full">
              {/* Custom SVG Bar Chart */}
              <svg viewBox="0 0 500 240" className="w-full overflow-visible">
                {/* Horizontal Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = 20 + (1 - ratio) * 160;
                  return (
                    <g key={idx}>
                      <line x1="40" y1={y} x2="480" y2={y} stroke="#F5F5F0" strokeWidth="1" />
                      <text x="35" y={y + 3} fill="#A8A29E" fontSize="8" textAnchor="end" fontFamily="monospace">
                        {ratio === 0 ? '0' : (ratio === 1 ? fmt(maxRevenue) : fmt(maxRevenue * ratio))}
                      </text>
                    </g>
                  );
                })}

                {/* Bars */}
                {monthlyRevenueData.map((d, idx) => {
                  const barCount = monthlyRevenueData.length;
                  const spacing = 440 / barCount;
                  const x = 50 + idx * spacing;
                  const barHeight = (d.revenue / maxRevenue) * 160;
                  const y = 180 - barHeight;
                  const barWidth = Math.min(30, spacing - 15);

                  return (
                    <g key={idx} className="group/bar cursor-pointer">
                      {/* Bar Fill */}
                      <rect
                        x={x - barWidth / 2}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill="url(#barGradient)"
                        rx="4"
                        className="transition-all duration-300 hover:fill-[#8B6508]"
                      />
                      {/* Month Text */}
                      <text
                        x={x}
                        y="198"
                        fill="#57534E"
                        fontSize="9"
                        textAnchor="middle"
                        className="font-serif italic"
                      >
                        {d.month}
                      </text>
                      
                      {/* Tooltip Hover value */}
                      <rect
                        x={x - 45}
                        y={y - 25}
                        width="90"
                        height="20"
                        fill="#140E0A"
                        rx="4"
                        className="opacity-0 group-hover/bar:opacity-90 transition-opacity pointer-events-none"
                      />
                      <text
                        x={x}
                        y={y - 12}
                        fill="#FFFFFF"
                        fontSize="7"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none"
                      >
                        {fmt(d.revenue)} ({d.orderCount} ĐH)
                      </text>
                    </g>
                  );
                })}

                {/* Gradients */}
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B6508" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4C4A8" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>

        {/* Order Status Summary */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-2xs relative">
          <div className="absolute inset-1 border border-stone-50 rounded-lg pointer-events-none" />
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#8B6508] mb-4 flex items-center gap-1.5"
              style={{ fontFamily: "'Cinzel', serif" }}>
            <span>📊</span> Trạng thái giao dịch
          </h2>

          <div className="space-y-3">
            {loading ? (
              <div className="py-12 flex justify-center">
                <div className="w-5 h-5 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
              </div>
            ) : !stats || Object.keys(stats.orderStatusCounts || {}).length === 0 ? (
              <p className="text-center text-xs text-stone-400 font-serif italic py-8">Chưa có giao dịch phát sinh</p>
            ) : (
              Object.entries(stats.orderStatusCounts).map(([status, count]) => {
                const total = stats.totalOrders || 1;
                const percent = ((count / total) * 100).toFixed(0);
                const color = ORDER_STATUS_COLORS[status] || '#8B6508';

                return (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="font-semibold text-stone-700 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />
                        {ORDER_STATUS_LABELS[status] || status}
                      </span>
                      <span className="font-mono text-stone-500 font-bold">{count} ({percent}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percent}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-xl overflow-hidden relative shadow-2xs">
          <div className="absolute inset-1 border border-stone-50 rounded-lg pointer-events-none" />

          <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-100 bg-[#FAF9F5]">
            <h2
              className="text-xs uppercase tracking-wider font-bold text-[#8B6508] flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span>⏱️</span> Biên bản giao dịch gần đây
            </h2>
            <Link
              to="/admin/orders"
              className="text-[10px] uppercase font-bold tracking-wider text-stone-400 hover:text-[#8B6508] transition-colors bg-white px-2 py-1 rounded border border-stone-200/60 shadow-3xs"
            >
              Xem toàn bộ →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-2">
                <div className="w-6 h-6 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
                <span className="text-[11px] text-stone-400 font-serif italic">Đang truy vấn dữ liệu luồng...</span>
              </div>
            ) : recentOrders.length === 0 ? (
              <p className="px-5 py-12 text-center text-xs text-stone-400 font-serif italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Hệ thống chưa ghi nhận phát sinh giao dịch mới
              </p>
            ) : (
              recentOrders.map(order => (
                <Link
                  key={order.id}
                  to={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-[#FCFAF6] transition-colors group"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#140E0A] group-hover:text-[#8B6508] transition-colors font-sans flex items-center gap-1.5">
                      <span className="font-mono text-[#8B6508]/80 bg-[#8B6508]/5 px-1 py-0.2 rounded border border-[#8B6508]/10 text-[11px]">#{order.id}</span>
                      <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-stone-800">{order.recipientName}</span>
                    </p>
                    <p className="text-[10px] text-stone-400 font-mono pl-0.5">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 ml-4 space-y-1">
                    <span
                      className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border font-sans"
                      style={{
                        color: ORDER_STATUS_COLORS[order.status] || '#8B6508',
                        background: (ORDER_STATUS_COLORS[order.status] || '#8B6508') + '0a',
                        borderColor: (ORDER_STATUS_COLORS[order.status] || '#8B6508') + '25',
                      }}
                    >
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </span>
                    <p className="text-xs font-bold text-[#8B6508] font-mono">
                      {fmt(order.totalAmount)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Top Selling Books */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-2xs relative">
          <div className="absolute inset-1 border border-stone-50 rounded-lg pointer-events-none" />
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#8B6508] mb-4 flex items-center gap-1.5"
              style={{ fontFamily: "'Cinzel', serif" }}>
            <span>🏆</span> Ấn bản bán chạy nhất
          </h2>

          <div className="space-y-4">
            {loading ? (
              <div className="py-12 flex justify-center">
                <div className="w-5 h-5 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
              </div>
            ) : !stats || stats.topSellingBooks.length === 0 ? (
              <p className="text-center text-xs text-stone-400 font-serif italic py-8">Chưa ghi nhận sản lượng tiêu thụ sách</p>
            ) : (
              stats.topSellingBooks.map((book, idx) => (
                <div key={book.bookId} className="flex items-center gap-3 group">
                  <div className="w-8 h-10 bg-stone-100 rounded border border-stone-200 overflow-hidden flex-shrink-0 shadow-3xs">
                    {book.coverUrl ? (
                      <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400 font-serif">📖</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-stone-800 truncate font-sans group-hover:text-[#8B6508] transition-colors">{idx + 1}. {book.title}</p>
                    <p className="text-[10px] text-stone-400 font-mono">Đã bán: <span className="font-bold text-stone-600 font-sans">{book.totalSoldQuantity} cuốn</span></p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

`src\admin\AdminLayout.jsx`:

```jsx
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
```

`src\admin\AdminOrders.jsx`:

```jsx
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../api';
import {
  AdminPageHeader, AdminBtn, AdminTable, AdminSelect, StatusBadge,
  AdminPagination, useAdminToast,
} from './AdminComponents';

const ORDER_STATUS_MAP = {
  PENDING: { label: 'Chờ Xác Nhận', colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  CONFIRMED: { label: 'Đã Xác Nhận', colorClass: 'bg-blue-100 text-blue-800 border-blue-200' },
  PROCESSING: { label: 'Đang Xử Lý', colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  SHIPPED: { label: 'Đang Giao', colorClass: 'bg-purple-100 text-purple-800 border-purple-200' },
  DELIVERED: { label: 'Đã Giao', colorClass: 'bg-green-100 text-green-800 border-green-200' },
  CANCELLED: { label: 'Đã Huỷ Đơn', colorClass: 'bg-red-100 text-red-700 border-red-200' },
  RETURNED: { label: 'Trả Hàng', colorClass: 'bg-orange-100 text-orange-800 border-orange-200' },
};

const PAYMENT_STATUS_MAP = {
  UNPAID: { label: 'Chưa Thanh Toán', colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  PAID: { label: 'Đã Thanh Toán', colorClass: 'bg-green-100 text-green-800 border-green-200' },
  REFUNDED: { label: 'Hoàn Tiền', colorClass: 'bg-purple-100 text-purple-800 border-purple-200' },
};

const NEXT_STATUSES = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED', 'RETURNED'],
  DELIVERED: [], CANCELLED: [], RETURNED: [],
};

const NEXT_PAYMENT = {
  UNPAID: ['PAID'], PAID: ['REFUNDED'], REFUNDED: [],
};

const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
const fmtDate = (d) => d ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(d)) : '—';

export default function AdminOrders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const { add: toast, Toasts } = useAdminToast();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: 20 };
      if (statusFilter) params.status = statusFilter;
      const res = await adminAPI.orders.getAll(params);
      setOrders(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [statusFilter, page]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const columns = [
    {
      key: 'id', label: 'MÃ ĐƠN', width: '80px',
      render: v => <span className="font-mono text-[#8B6508] font-bold text-xs bg-[#8B6508]/5 px-2 py-0.5 rounded border border-[#8B6508]/10 shadow-3xs">#{v}</span>
    },
    {
      key: 'recipientName',
      label: 'ĐỐI TÁC KHÁCH HÀNG',
      render: (v, row) => (
        <div className="py-0.5">
          <p className="font-bold text-[#140E0A] text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>{v}</p>
          <p className="text-[10px] text-stone-400 font-mono mt-0.5 tracking-wide">{row.recipientPhone}</p>
        </div>
      )
    },
    {
      key: 'totalAmount',
      label: 'GIÁ TRỊ ĐƠN',
      render: v => <span className="font-mono font-bold text-[#8B6508] text-xs bg-stone-50 px-2 py-1 rounded border border-stone-100">{fmt(v)}</span>
    },
    {
      key: 'status', label: 'VẬN CHUYỂN',
      render: v => <StatusBadge status={v} map={ORDER_STATUS_MAP} />,
    },
    {
      key: 'paymentStatus', label: 'DÒNG TIỀN',
      render: v => <StatusBadge status={v} map={PAYMENT_STATUS_MAP} />,
    },
    {
      key: 'createdAt', label: 'THỜI ĐIỂM ĐẶT',
      render: v => <span className="text-[11px] text-stone-500 font-mono">{fmtDate(v)}</span>
    },
    {
      key: '_actions', label: 'QUẢN TRỊ',
      render: (_, row) => (
        <Link to={`/admin/orders/${row.id}`}>
          <AdminBtn size="sm" variant="secondary" className="hover:bg-stone-50 border-stone-300">
            Chi Tiết
          </AdminBtn>
        </Link>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-xs border border-stone-200/60 my-4">
      <AdminPageHeader
        title="Sổ Cái Đơn Hàng"
        subtitle={`Quản lý toàn bộ hệ thống lưu chuyển gồm ${orders?.totalElements ?? 0} giao dịch`}
      />

      <div className="flex gap-3 mb-5 bg-white p-3 rounded-lg border border-stone-200/60 shadow-3xs flex-wrap items-center">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider pl-1">Lọc theo trạng thái vận hành:</span>
        <div className="w-56">
          <AdminSelect
            value={statusFilter}
            onChange={v => { setStatusFilter(v); setPage(1); }}
            placeholder="Tất cả trạng thái"
            options={Object.entries(ORDER_STATUS_MAP).map(([v, c]) => ({ value: v, label: c.label }))}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-stone-200/60 shadow-3xs overflow-hidden">
        <AdminTable columns={columns} data={orders?.content} loading={loading} emptyMsg="Hệ thống chưa ghi nhận đơn hàng nào phù hợp" />
      </div>

      <div className="mt-4">
        <AdminPagination data={orders} page={page} onPageChange={setPage} />
      </div>
      <Toasts />
    </div>
  );
}

export function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { add: toast, Toasts } = useAdminToast();

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminAPI.orders.getById(id);
      setOrder(res.data);
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); }
  }, [id]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      const res = await adminAPI.orders.updateStatus(id, status);
      setOrder(res.data);
      toast('Cập nhật trạng thái đơn hàng thành công');
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); setUpdating(false); }
  };

  const updatePayment = async (paymentStatus) => {
    setUpdating(true);
    try {
      const res = await adminAPI.orders.updatePayment(id, paymentStatus);
      setOrder(res.data);
      toast('Cập nhật trạng thái dòng tiền thành công');
    } catch (e) { toast(e.message, 'error'); }
    finally { setLoading(false); setUpdating(false); }
  };

  if (loading) return (
    <div className="flex justify-center py-32 bg-[#FCFAF6] rounded-xl border border-stone-200/60 max-w-4xl mx-auto my-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin" />
        <span className="text-xs text-stone-400 font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Đang đối chiếu chứng từ...</span>
      </div>
    </div>
  );

  if (!order) return (
    <div className="text-center py-20 bg-[#FCFAF6] rounded-xl border border-stone-200/60 max-w-4xl mx-auto my-4">
      <p className="text-stone-400 font-serif italic text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Chứng từ hoặc đơn hàng không tồn tại trên hệ thống dữ liệu
      </p>
      <AdminBtn variant="secondary" size="sm" className="mt-4" onClick={() => navigate('/admin/orders')}>Quay lại danh sách</AdminBtn>
    </div>
  );

  const nextStatuses = NEXT_STATUSES[order.status] || [];
  const nextPayments = NEXT_PAYMENT[order.paymentStatus] || [];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#FCFAF6] rounded-xl shadow-xs border border-stone-200/60 my-4">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#D4C4A8]/40 pb-4">
        <div className="flex items-center gap-3">
          <AdminBtn variant="ghost" size="sm" className="hover:bg-stone-200/60 text-stone-600" onClick={() => navigate('/admin/orders')}>
            ← Danh sách
          </AdminBtn>
          <h1 className="text-xl font-bold text-[#140E0A] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Chi Tiết Đơn Hàng <span className="font-mono text-[#8B6508]">#{order.id}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <StatusBadge status={order.status} map={ORDER_STATUS_MAP} />
          <StatusBadge status={order.paymentStatus} map={PAYMENT_STATUS_MAP} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="lg:col-span-2 space-y-5">
          {}
          <div className="bg-white border border-stone-200/80 p-5 relative rounded-lg shadow-2xs">
            <div className="absolute inset-1 border border-stone-100 rounded-md pointer-events-none" />
            <h2 className="text-[11px] uppercase tracking-wider font-bold text-[#8B6508] mb-4 pb-2 border-b border-stone-100 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <span>📚</span> DANH MỤC ẤN PHẨM CUNG CẤP
            </h2>
            <div className="space-y-4">
              {order.items?.map(item => (
                <div key={item.bookId} className="flex items-start justify-between py-1 border-b border-stone-100 last:border-0 last:pb-0">
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-bold text-[#140E0A] leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.bookTitleSnapshot}
                    </p>
                    <p className="text-[11px] text-stone-400 font-mono mt-1 bg-stone-50 inline-block px-1.5 py-0.5 rounded">
                      SL: {item.quantity} × {fmt(item.unitPrice)}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#140E0A] pt-0.5">
                    {fmt(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="bg-white border border-stone-200/80 p-5 relative rounded-lg shadow-2xs">
            <div className="absolute inset-1 border border-stone-100 rounded-md pointer-events-none" />
            <h2 className="text-[11px] uppercase tracking-wider font-bold text-[#8B6508] mb-3 pb-1.5 border-b border-stone-100 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <span>📍</span> THÔNG TIN ĐỊA CHỈ GIAO NHẬN
            </h2>
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#140E0A]" style={{ fontFamily: "'Cinzel', serif" }}>
                {order.recipientName}
              </p>
              <p className="text-xs text-stone-500 font-mono bg-stone-50 inline-block px-1.5 py-0.5 rounded border border-stone-100 mt-1">{order.recipientPhone}</p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed bg-stone-50/40 p-2.5 rounded border border-stone-100/60 font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {order.shippingAddress}
              </p>
            </div>
            {order.note && (
              <div className="mt-3 bg-amber-50/40 border border-amber-100/70 p-2.5 rounded">
                <p className="text-xs text-amber-800 italic font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <span className="font-sans font-bold not-italic text-[10px] text-amber-700 uppercase tracking-wide block mb-0.5">Bản ghi chú hệ thống:</span>
                  "{order.note}"
                </p>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="space-y-5">
          {}
          <div className="bg-[#FAF7F2] border border-[#D4C4A8]/80 p-5 relative rounded-lg shadow-2xs">
            <div className="absolute inset-1 border border-[#8B6508]/5 rounded-md pointer-events-none" />
            <h2 className="text-[11px] uppercase tracking-wider font-bold text-[#8B6508] mb-4 pb-2 border-b border-[#D4C4A8]/40 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <span>💰</span> HÓA ĐƠN ĐỐI SOÁT
            </h2>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Tổng giá trị hàng</span>
                <span className="font-mono text-stone-800 font-medium">{fmt(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 flex flex-col">
                    <span>Chiết khấu mã</span>
                    {order.couponCode && <span className="text-[10px] text-[#8B6508] font-mono font-bold">[{order.couponCode}]</span>}
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">-{fmt(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Phí vận chuyển</span>
                <span className="font-mono text-stone-800 font-medium">{order.shippingFee > 0 ? fmt(order.shippingFee) : 'Miễn phí'}</span>
              </div>

              <div className="flex justify-between items-baseline border-t border-[#D4C4A8]/60 pt-2.5 mt-2 font-bold">
                <span className="text-[#140E0A] text-xs uppercase tracking-wide">Thực thu (Tổng)</span>
                <span className="font-mono text-base text-[#8B6508]">{fmt(order.totalAmount)}</span>
              </div>

              <div className="flex flex-col gap-1 border-t border-dashed border-[#D4C4A8]/40 pt-2.5 mt-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-400">Phương thức:</span>
                  <span className="text-stone-600 font-medium font-mono uppercase text-[10px] bg-stone-200/60 px-1 py-0.2 rounded">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="bg-white border border-stone-200/80 p-5 relative rounded-lg shadow-2xs">
            <div className="absolute inset-1 border border-stone-100 rounded-md pointer-events-none" />
            <h2 className="text-[11px] uppercase tracking-wider font-bold text-[#8B6508] mb-4 pb-2 border-b border-stone-100 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <span>⚙️</span> ĐIỀU HÀNH ĐƠN HÀNG
            </h2>

            {}
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-2">Quy trình xử lý đơn:</p>
              {nextStatuses.length > 0 ? (
                <div className="space-y-2">
                  {nextStatuses.map(s => (
                    <AdminBtn
                      key={s}
                      variant={s === 'CANCELLED' || s === 'RETURNED' ? 'danger' : 'primary'}
                      size="sm"
                      disabled={updating}
                      onClick={() => updateStatus(s)}
                      className="w-full justify-center shadow-3xs font-medium text-xs py-1.5"
                    >
                      Chuyển: {ORDER_STATUS_MAP[s]?.label}
                    </AdminBtn>
                  ))}
                </div>
              ) : (
                <div className="bg-stone-50 p-2.5 rounded text-center border border-dashed border-stone-200">
                  <p className="text-xs text-stone-400 font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Vòng đời hoàn tất hoặc đơn đã huỷ
                  </p>
                </div>
              )}
            </div>

            {}
            {nextPayments.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-2">Đối soát dòng tiền:</p>
                <div className="space-y-2">
                  {nextPayments.map(s => (
                    <AdminBtn
                      key={s}
                      variant={s === 'REFUNDED' ? 'danger' : 'primary'}
                      size="sm"
                      disabled={updating}
                      onClick={() => updatePayment(s)}
                      className="w-full justify-center border-amber-600/30 text-amber-900 bg-amber-50 hover:bg-amber-100 font-medium text-xs py-1.5"
                    >
                      Xác nhận: {PAYMENT_STATUS_MAP[s]?.label}
                    </AdminBtn>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-[10px] text-stone-400 font-mono text-right pr-1">
            Khởi tạo hệ thống: {fmtDate(order.createdAt)}
          </p>
        </div>
      </div>
      <Toasts />
    </div>
  );
}
```

`src\admin\AdminRoute.jsx`:

```jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner } from '../components/common';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0F0A06]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  const isAdmin = user.roles?.includes('ROLE_ADMIN');

    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }

  return children;
}

```

`src\api\index.js`:

```js
const BASE_URL = "/api";

const getToken = () => localStorage.getItem("accessToken");

const setToken = (token) => {
  if (token) localStorage.setItem("accessToken", token);
  else localStorage.removeItem("accessToken");
};

const headers = (isJson = true) => {
  const h = {};
  if (isJson) h["Content-Type"] = "application/json";
  const token = getToken();
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

let refreshPromise = null;

let onAuthFailure = null;
export const setAuthFailureHandler = (fn) => {
  onAuthFailure = fn;
};

const refreshAccessToken = async () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setToken(null);
      throw new Error(data?.message || "Phiên đăng nhập đã hết hạn");
    }
    const token = data?.data?.accessToken;
    if (token) setToken(token);
    return token;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

const AUTH_PATHS = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
]);

const request = async (
  method,
  path,
  body = null,
  params = null,
  { retried = false, signal } = {},
) => {
  let url = `${BASE_URL}${path}`;
  if (params) {
    const q = new URLSearchParams(
      Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== "",
      ),
    );
    if ([...q].length) url += `?${q}`;
  }

  const res = await fetch(url, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    signal,
  });

  const data = await res.json().catch(() => ({}));

  
  if (res.status === 401 && !retried && !AUTH_PATHS.has(path) && getToken()) {
    try {
      await refreshAccessToken();
      
      return request(method, path, body, params, { retried: true, signal });
    } catch (err) {
      
      onAuthFailure?.();
      throw err;
    }
  }

  
  if (res.status === 401 && !getToken()) {
    onAuthFailure?.();
  }

  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const claims = JSON.parse(json);
    const roles = (claims.roles || []).map((r) =>
      r.startsWith("ROLE_") ? r : `ROLE_${r}`,
    );
    return {
      id: claims.userId,
      email: claims.sub,
      name: claims.name || claims.sub,
      roles,
    };
  } catch {
    return null;
  }
};

export const authAPI = {
  login: (body) => request("POST", "/auth/login", body),
  register: (body) => request("POST", "/auth/register", body),
  refresh: () => request("POST", "/auth/refresh"),
  logout: () => request("POST", "/auth/logout"),
  me: () => {
    const token = getToken();
    if (!token) return Promise.reject(new Error("No token"));
    const user = decodeJwt(token);
    if (!user) return Promise.reject(new Error("Invalid token"));
    return Promise.resolve({ data: user });
  },
  changePassword: (body) => request("PUT", "/auth/change-password", body),
  forgotPassword: (body) => request("POST", "/auth/forgot-password", body),
  resetPassword: (body) => request("POST", "/auth/reset-password", body),
};

export const bookAPI = {
  getAll: (params, options) => request("GET", "/books", null, params, options),
  getById: (id, options) => request("GET", `/books/${id}`, null, null, options),
};

export const categoryAPI = {
  getAll: (params, options) =>
    request("GET", "/categories", null, params, options),
  getAllList: (options) => request("GET", "/categories/all", null, null, options),
  getById: (id, options) =>
    request("GET", `/categories/${id}`, null, null, options),
};

export const authorAPI = {
  getAll: (params, options) =>
    request("GET", "/authors", null, params, options),
  getAllList: (options) => request("GET", "/authors/all", null, null, options),
  getById: (id, options) =>
    request("GET", `/authors/${id}`, null, null, options),
};

export const publisherAPI = {
  getAll: (params, options) =>
    request("GET", "/publishers", null, params, options),
  getAllList: (options) => request("GET", "/publishers/all", null, null, options),
  getById: (id, options) =>
    request("GET", `/publishers/${id}`, null, null, options),
};

export const adminAPI = {
  books: {
    create: (body) => request("POST", "/admin/books", body),
    update: (id, body) => request("PUT", `/admin/books/${id}`, body),
    delete: (id) => request("DELETE", `/admin/books/${id}`),
  },
  categories: {
    create: (body) => request("POST", "/admin/categories", body),
    update: (id, body) => request("PUT", `/admin/categories/${id}`, body),
    delete: (id) => request("DELETE", `/admin/categories/${id}`),
  },
  authors: {
    create: (body) => request("POST", "/admin/authors", body),
    update: (id, body) => request("PUT", `/admin/authors/${id}`, body),
    delete: (id) => request("DELETE", `/admin/authors/${id}`),
  },
  publishers: {
    create: (body) => request("POST", "/admin/publishers", body),
    update: (id, body) => request("PUT", `/admin/publishers/${id}`, body),
    delete: (id) => request("DELETE", `/admin/publishers/${id}`),
  },
  orders: {
    getAll: (params) => request("GET", "/admin/orders", null, params),
    getById: (id) => request("GET", `/admin/orders/${id}`),
    updateStatus: (id, status) =>
      request("PATCH", `/admin/orders/${id}/status`, null, { status }),
    updatePayment: (id, paymentStatus) =>
      request("PATCH", `/admin/orders/${id}/payment`, { paymentStatus }),
  },
  coupons: {
    getAll: () => request("GET", "/admin/coupons"),
    getById: (id) => request("GET", `/admin/coupons/${id}`),
    create: (body) => request("POST", "/admin/coupons", body),
    update: (id, body) => request("PUT", `/admin/coupons/${id}`, body),
    delete: (id) => request("DELETE", `/admin/coupons/${id}`),
  },
  dashboard: {
    getStatistics: () => request("GET", "/admin/dashboard/statistics"),
  },
};

export const cartAPI = {
  get: () => request("GET", "/cart"),
  addItem: (body) => request("POST", "/cart/items", body),
  updateItem: (bookId, body) => request("PUT", `/cart/items/${bookId}`, body),
  removeItem: (bookId) => request("DELETE", `/cart/items/${bookId}`),
  clear: () => request("DELETE", "/cart"),
};

export const orderAPI = {
  create: (body) => request("POST", "/orders/checkout", body),
  getMyOrders: (params) => request("GET", "/orders", null, params),
  getById: (id) => request("GET", `/orders/${id}`),
  cancel: (id) => request("PATCH", `/orders/${id}/cancel`),
};

export const paymentAPI = {
  zaloPayInit: (orderId) => request("POST", `/payment/zalopay/init/${orderId}`),
  zaloPayStatus: (orderId) => request("GET", `/payment/zalopay/status/${orderId}`),
};

export const couponAPI = {
  validate: (code, subtotal) =>
    request("GET", "/coupons/preview", null, { code, subtotal }),
};

export const addressAPI = {
  getAll: () => request("GET", "/addresses"),
  create: (body) => request("POST", "/addresses", body),
  update: (id, body) => request("PUT", `/addresses/${id}`, body),
  delete: (id) => request("DELETE", `/addresses/${id}`),
  setDefault: (id) => request("PATCH", `/addresses/${id}/default`),
};

export const reviewAPI = {
  getByBook: (bookId, params) =>
    request("GET", `/reviews/book/${bookId}`, null, params),
  create: (body) => request("POST", "/reviews", body),
  update: (id, body) => request("PUT", `/reviews/${id}`, body),
  delete: (id) => request("DELETE", `/reviews/${id}`),
};

export const commentAPI = {
  getByBook: (bookId, params) =>
    request("GET", `/comments/book/${bookId}`, null, params),
  create: (body) => request("POST", "/comments", body),
  update: (id, content) => request("PUT", `/comments/${id}`, { content }),
  delete: (id) => request("DELETE", `/comments/${id}`),
  countByBook: (bookId) =>
    request("GET", `/comments/book/${bookId}/count`),
};


```

`src\components\book\BookCard.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { formatPrice, getDiscountPercent, PLACEHOLDER_BOOK } from '../../utils';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function BookCard({ book }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  
  const discountPercent = getDiscountPercent(book);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      await addItem(book.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (_) { }
    finally { setAdding(false); }
  };

  return (
    <Link
      to={`/books/${book.id}`}
      className="group bg-[#FAF5EC] rounded-[1px] transition-all duration-300 overflow-hidden flex flex-col border border-[#D4C4A8]/65 hover:border-[#8B6508]/60 relative p-2"
    >

      <div className="absolute inset-3 border border-[#8B6508]/5 pointer-events-none z-10 group-hover:border-[#8B6508]/10 transition-colors" />

      <div className="relative overflow-hidden bg-[#FAF5EC] aspect-[3/4] border border-[#D4C4A8]/40 p-1 bg-white">
        <img
          src={book.coverImageUrl || PLACEHOLDER_BOOK}
          alt={book.title}
          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-102 transition-all duration-500"
          onError={e => { e.target.src = PLACEHOLDER_BOOK; }}
        />

        {discountPercent > 0 && (
          <span
            className="absolute top-2 left-2 bg-[#8B6508] text-[#FAF5EC] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[1px] shadow-sm z-20"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            -{discountPercent}%
          </span>
        )}

        {book.stockQuantity === 0 && (
          <div className="absolute inset-0 bg-[#2C2114]/70 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span
              className="text-[#FAF5EC] text-xs uppercase tracking-[0.2em] font-bold border border-[#FAF5EC]/30 px-3 py-1.5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Cạn Bản
            </span>
          </div>
        )}
      </div>

      <div className="p-3 pt-4 flex flex-col flex-1 gap-1.5 relative z-10">
        <h3
          className="font-serif font-bold text-[#140E0A] text-sm leading-snug line-clamp-2 group-hover:text-[#8B6508] transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {book.title}
        </h3>

        <p
          className="text-[11px] font-serif italic text-stone-500 truncate"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {book.authorName || book.authors?.map(a => a.name).join(', ')}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2 border-t border-[#D4C4A8]/30">

          <div className="min-w-0">
            {book.discountPrice && book.discountPrice < book.price ? (
              <>
                <p className="text-[#8B6508] font-bold text-xs font-mono">{formatPrice(book.discountPrice)}</p>
                <p className="text-stone-400 text-[10px] line-through font-mono mt-0.5">{formatPrice(book.price)}</p>
              </>
            ) : (
              <p className="text-[#2C2114] font-bold text-xs font-mono">{formatPrice(book.price)}</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding || book.stockQuantity === 0}
            className={`relative text-[10px] uppercase tracking-wider font-extrabold px-3 py-2 rounded-[1px] transition-all duration-300 focus:outline-none overflow-hidden h-8 min-w-[70px] flex items-center justify-center border ${added
              ? 'bg-emerald-800 border-emerald-800 text-[#FAF5EC]'
              : 'bg-transparent border-[#2C2114]/80 text-[#2C2114] hover:text-[#FAF5EC] before:absolute before:inset-0 before:bg-[#2C2114] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-250 disabled:opacity-30 disabled:before:hidden'
              }`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="relative z-10">
              {adding ? '...' : added ? '✓ Có' : '+ Thêm'}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}

```

`src\components\book\BookCardSkeleton.jsx`:

```jsx
export default function BookCardSkeleton() {
  return (
    <div className="bg-[#FAF5EC] rounded-[1px] border border-[#D4C4A8]/65 p-2 flex flex-col animate-pulse">
      <div className="aspect-[3/4] bg-[#D4C4A8]/40 border border-[#D4C4A8]/30" />
      <div className="p-3 pt-4 flex flex-col gap-2 flex-1">
        <div className="h-4 bg-[#D4C4A8]/50 rounded-[1px] w-full" />
        <div className="h-3 bg-[#D4C4A8]/35 rounded-[1px] w-2/3" />
        <div className="mt-auto pt-3 border-t border-[#D4C4A8]/30 flex justify-between items-center">
          <div className="h-4 bg-[#D4C4A8]/45 rounded-[1px] w-20" />
          <div className="h-8 bg-[#D4C4A8]/40 rounded-[1px] w-16" />
        </div>
      </div>
    </div>
  );
}

export function BookCardSkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
      {Array.from({ length: count }, (_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}

```

`src\components\comment\CommentForm.jsx`:

```jsx
import { useState } from 'react';
import { commentAPI } from '../../api';
import { ErrorMsg } from '../common';

export default function CommentForm({
  bookId,
  parentId = null,
  initialValue = '',
  onSubmitSuccess,
  onCancel,
  placeholder = 'Viết lời luận đàm của bạn tại đây...'
}) {
  const [content, setContent] = useState(initialValue);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(false);
    setError('');
    setSubmitting(true);

    try {
      let data;
      if (initialValue) {
        // Mode chỉnh sửa
        data = await commentAPI.update(parentId, content);
      } else {
        // Mode tạo mới
        data = await commentAPI.create({
          bookId,
          parentId,
          content: content.trim()
        });
      }
      setContent('');
      if (onSubmitSuccess) {
        onSubmitSuccess(data.data);
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={parentId ? 3 : 4}
        className="w-full bg-transparent border border-[#D4C4A8] rounded-[1px] p-4 text-sm focus:outline-none focus:border-[#8B6508] placeholder-[#A8967E]/60 font-serif italic text-[#140E0A] resize-none transition-colors"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        disabled={submitting}
      />
      {error && <ErrorMsg message={error} />}
      <div className="flex gap-2.5 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#D4C4A8]/80 text-[#2C2114]/80 hover:text-[#2C2114] text-xs font-bold uppercase tracking-widest transition-colors rounded-[1px]"
            style={{ fontFamily: "'Cinzel', serif" }}
            disabled={submitting}
          >
            Hủy bỏ
          </button>
        )}
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="bg-[#2C2114] hover:bg-[#8B6508] text-[#FAF5EC] px-5 py-2 uppercase tracking-widest text-xs font-bold transition-colors disabled:opacity-40 rounded-[1px]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {submitting ? 'Đang gửi...' : initialValue ? 'Cập nhật' : parentId ? 'Phản hồi' : 'Ký danh gửi ngôn'}
        </button>
      </div>
    </form>
  );
}

```

`src\components\comment\CommentItem.jsx`:

```jsx
import { useState } from 'react';
import { commentAPI } from '../../api';
import { formatDate } from '../../utils';
import CommentForm from './CommentForm';

export default function CommentItem({
  comment,
  currentUser,
  bookId,
  onCommentUpdate,
  onCommentDelete,
  onReplyCreate
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isAdmin = currentUser?.roles?.includes('ADMIN') || currentUser?.roles?.includes('ROLE_ADMIN');
  const isOwner = currentUser && currentUser.id === comment.userId;
  const canEdit = isOwner && !comment.isDeleted;
  const canDelete = currentUser && (isOwner || isAdmin) && !comment.isDeleted;
  const canReply = comment.parentId === null && !comment.isDeleted; // Chỉ comment gốc chưa bị xóa mới được reply

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn gỡ bỏ lời luận bàn này không?')) return;
    setDeleting(true);
    try {
      await commentAPI.delete(comment.id);
      if (onCommentDelete) {
        onCommentDelete(comment.id, comment.parentId);
      }
    } catch (err) {
      alert(err.message || 'Lỗi khi xóa bình luận.');
    } finally {
      setDeleting(false);
    }
  };

  const handleEditSuccess = (updatedComment) => {
    setIsEditing(false);
    if (onCommentUpdate) {
      onCommentUpdate(updatedComment);
    }
  };

  const handleReplySuccess = (newReply) => {
    setIsReplying(false);
    if (onReplyCreate) {
      onReplyCreate(newReply);
    }
  };

  return (
    <div className="group pt-5 first:pt-0">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div 
          className={`w-8 h-8 rounded-[1px] border border-[#8B6508]/60 bg-[#F3EFE6] flex items-center justify-center text-xs font-bold text-[#2C2114] select-none shrink-0 ${comment.isDeleted ? 'opacity-50' : ''}`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {comment.isDeleted ? '?' : comment.userName?.charAt(0).toUpperCase()}
        </div>

        {/* Comment Content Area */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <span 
              className={`font-bold text-xs uppercase tracking-wide ${comment.isDeleted ? 'text-stone-400 italic font-medium' : 'text-[#2C2114]'}`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {comment.userName}
            </span>
            {isAdmin && !comment.isDeleted && comment.userId === comment.userId && (
              <span className="text-[8px] uppercase tracking-widest bg-[#8B6508]/10 border border-[#8B6508]/30 text-[#8B6508] px-1 font-bold">Admin</span>
            )}
            <span 
              className="text-[9px] tracking-wider text-[#A8967E] uppercase font-bold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ❖ {formatDate(comment.createdAt)}
            </span>
          </div>

          {isEditing ? (
            <div className="mt-2">
              <CommentForm
                bookId={bookId}
                parentId={comment.id}
                initialValue={comment.content}
                onSubmitSuccess={handleEditSuccess}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <>
              <p 
                className={`text-stone-700 font-serif text-sm md:text-base text-justify leading-relaxed whitespace-pre-wrap ${comment.isDeleted ? 'italic text-stone-400/80 font-serif' : ''}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {comment.content}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-2 select-none" style={{ fontFamily: "'Cinzel', serif" }}>
                {canReply && (
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        alert('Vui lòng đăng nhập để phản hồi bình luận.');
                        return;
                      }
                      setIsReplying(!isReplying);
                    }}
                    className="text-[10px] uppercase font-extrabold text-[#A8967E] hover:text-[#8B6508] transition-colors"
                  >
                    Trả lời
                  </button>
                )}
                {canEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-[10px] uppercase font-extrabold text-[#A8967E] hover:text-[#8B6508] transition-colors"
                  >
                    Sửa
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-[10px] uppercase font-extrabold text-[#A8967E] hover:text-red-700 transition-colors disabled:opacity-50"
                  >
                    {deleting ? 'Đang gỡ...' : 'Gỡ bỏ'}
                  </button>
                )}
              </div>
            </>
          )}

          {/* Inline Reply Form */}
          {isReplying && (
            <div className="mt-4 border-l-2 border-[#8B6508]/30 pl-4 py-1">
              <CommentForm
                bookId={bookId}
                parentId={comment.id}
                onSubmitSuccess={handleReplySuccess}
                onCancel={() => setIsReplying(false)}
                placeholder={`Đang phản hồi luận đàm của ${comment.userName}...`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies (Only rendered for top-level comments) */}
      {comment.parentId === null && comment.replies && comment.replies.length > 0 && (
        <div className="pl-8 md:pl-11 border-l border-[#D4C4A8]/30 mt-4 space-y-5">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              bookId={bookId}
              onCommentUpdate={onCommentUpdate}
              onCommentDelete={onCommentDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

```

`src\components\comment\CommentSection.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { commentAPI } from '../../api';
import { Spinner, Empty, ErrorMsg } from '../common';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

export default function CommentSection({ bookId, onCountChange }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [commentCount, setCommentCount] = useState(0);

  // Lấy dữ liệu comment ban đầu và số lượng
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      setError('');
      try {
        const [commentsRes, countRes] = await Promise.all([
          commentAPI.getByBook(bookId, { page: 1, size: 10 }),
          commentAPI.countByBook(bookId)
        ]);
        
        setComments(commentsRes.data.content || []);
        const total = countRes.data || 0;
        setCommentCount(total);
        if (onCountChange) onCountChange(total);
        
        setPage(1);
        const hasNext = commentsRes.data.hasNext ?? (commentsRes.data.page < commentsRes.data.totalPages);
        setHasMore(hasNext);
      } catch (err) {
        setError(err.message || 'Không thể nạp danh sách bình luận.');
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [bookId]);

  // Tải thêm trang tiếp theo
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const res = await commentAPI.getByBook(bookId, { page: nextPage, size: 10 });
      const newComments = res.data.content || [];
      setComments(prev => [...prev, ...newComments]);
      setPage(nextPage);
      const hasNext = res.data.hasNext ?? (res.data.page < res.data.totalPages);
      setHasMore(hasNext);
    } catch (err) {
      setError(err.message || 'Lỗi khi tải thêm bình luận.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleCommentCreateSuccess = (newComment) => {
    // Thêm comment cha mới vào đầu danh sách
    setComments(prev => [newComment, ...prev]);
    const nextCount = commentCount + 1;
    setCommentCount(nextCount);
    if (onCountChange) onCountChange(nextCount);
  };

  const handleReplyCreateSuccess = (newReply) => {
    // Chèn reply mới vào comment cha
    setComments(prev => prev.map(c => {
      if (c.id === newReply.parentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply]
        };
      }
      return c;
    }));
    const nextCount = commentCount + 1;
    setCommentCount(nextCount);
    if (onCountChange) onCountChange(nextCount);
  };

  const handleCommentUpdate = (updatedComment) => {
    setComments(prev => prev.map(c => {
      // Nếu là comment gốc
      if (c.id === updatedComment.id) {
        return { ...c, content: updatedComment.content };
      }
      // Nếu là reply con
      if (c.replies && c.replies.length > 0) {
        return {
          ...c,
          replies: c.replies.map(r => r.id === updatedComment.id ? { ...r, content: updatedComment.content } : r)
        };
      }
      return c;
    }));
  };

  const handleCommentDelete = (commentId, parentId) => {
    setComments(prev => prev.map(c => {
      // 1. Nếu comment gốc bị xóa
      if (c.id === commentId) {
        if (c.replies && c.replies.length > 0) {
          // Soft delete cha vì có replies
          return {
            ...c,
            isDeleted: true,
            content: 'Bình luận đã bị xóa',
            userName: 'Người dùng ẩn danh',
            userId: null
          };
        } else {
          // Xóa hẳn cha vì không có replies
          return null;
        }
      }

      // 2. Nếu reply con bị xóa
      if (parentId && c.id === parentId) {
        const updatedReplies = c.replies.filter(r => r.id !== commentId);
        // Nếu cha cũng đã bị soft-delete và nay không còn reply nào nữa, ẩn luôn cha
        if (c.isDeleted && updatedReplies.length === 0) {
          return null;
        }
        return {
          ...c,
          replies: updatedReplies
        };
      }
      return c;
    }).filter(Boolean));

    const nextCount = Math.max(0, commentCount - 1);
    setCommentCount(nextCount);
    if (onCountChange) onCountChange(nextCount);
  };

  return (
    <div className="space-y-8 text-[#2C2114]">
      {/* Box nhập luận đàm (nếu đã login) */}
      {user ? (
        <div className="border border-[#D4C4A8]/60 bg-[#F3EFE6]/40 p-6 space-y-4 rounded-[1px]">
          <h3 
            className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114]" 
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Để lại bút tích luận đàm
          </h3>
          <CommentForm
            bookId={bookId}
            onSubmitSuccess={handleCommentCreateSuccess}
            placeholder="Luận bàn về giá trị tác phẩm hoặc câu chuyện của bạn tại đây..."
          />
        </div>
      ) : (
        <div 
          className="border border-[#D4C4A8]/50 bg-[#F3EFE6]/20 p-6 text-center rounded-[1px] font-serif italic text-stone-500 text-sm"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Hãy{' '}
          <Link to="/login" className="text-[#8B6508] font-bold not-italic hover:underline uppercase tracking-wider text-xs px-1 font-sans">
            Đăng nhập
          </Link>{' '}
          để ghi lại bút tích luận đàm của bạn về thư tịch này.
        </div>
      )}

      {error && <ErrorMsg message={error} />}

      {/* Danh sách bình luận */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : comments.length === 0 ? (
        <div className="py-6">
          <Empty icon="❖" message="Tác phẩm này hiện chưa có học giả nào để lại lời luận bàn." />
        </div>
      ) : (
        <div className="divide-y divide-[#D4C4A8]/30 space-y-6">
          {comments.map(c => (
            <CommentItem
              key={c.id}
              comment={c}
              currentUser={user}
              bookId={bookId}
              onCommentUpdate={handleCommentUpdate}
              onCommentDelete={handleCommentDelete}
              onReplyCreate={handleReplyCreateSuccess}
            />
          ))}
        </div>
      )}

      {/* Nút load more */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="h-10 px-6 border border-[#D4C4A8] text-xs font-bold uppercase tracking-widest text-[#2C2114] hover:bg-[#2C2114] hover:text-[#FAF5EC] transition-all duration-300 rounded-[1px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {loadingMore ? 'Đang nạp...' : 'Xem thêm luận đàm'}
          </button>
        </div>
      )}
    </div>
  );
}

```

`src\components\comment\index.js`:

```js
export { default as CommentSection } from './CommentSection';
export { default as CommentItem } from './CommentItem';
export { default as CommentForm } from './CommentForm';

```

`src\components\common\ErrorBoundary.jsx`:

```jsx
import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-20 bg-[#FAF5EC] text-center">
          <p className="text-4xl mb-4 text-[#8B6508]">❖</p>
          <h1
            className="text-lg font-bold uppercase tracking-wider text-[#140E0A] mb-2"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Đã xảy ra lỗi
          </h1>
          <p className="text-sm text-stone-500 font-serif italic mb-8 max-w-md">
            Trang này gặp sự cố không mong muốn. Bạn có thể thử tải lại hoặc quay về trang chủ.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-5 py-2.5 border-2 border-[#2C2114] text-xs font-bold uppercase tracking-wider text-[#2C2114] hover:bg-[#2C2114] hover:text-[#FAF5EC] transition-colors rounded-[1px]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Thử lại
            </button>
            <Link
              to="/"
              className="px-5 py-2.5 bg-[#8B6508] text-[#FAF5EC] text-xs font-bold uppercase tracking-wider hover:bg-[#735220] transition-colors rounded-[1px]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

```

`src\components\common\ImageUploader.jsx`:

```jsx
import { useState, useRef, useEffect } from "react";
import { uploadToCloudinary } from "../../utils/cloudinary";

export default function ImageUploader({ value, onChange, disabled }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(value || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    const MAX_SIZE = 5 * 1024 * 1024; 
    const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
    if (!ALLOWED.includes(file.type)) {
      setError("Chỉ chấp nhận JPG, PNG, WEBP");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Ảnh tối đa 5MB");
      return;
    }

    
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setError("");
    setUploading(true);
    setProgress(0);

    try {
      const cloudUrl = await uploadToCloudinary(file, setProgress);
      setPreview(cloudUrl);
      onChange(cloudUrl); 
    } catch (err) {
      setError(err.message);
      setPreview(value || ""); 
    } finally {
      setUploading(false);
      setProgress(0);
      
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleClear = (e) => {
    e.stopPropagation(); 
    if (disabled || uploading) return;
    setPreview("");
    onChange(""); 
  };

  return (
    <div className="space-y-2">
      {}
      <div
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition-colors group
          ${uploading ? "border-[#8B6508]/40 cursor-wait" : "border-[#D4C4A8] hover:border-[#8B6508]"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        style={{ aspectRatio: "3/4", maxWidth: "160px" }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Book cover preview"
              className="w-full h-full object-cover"
            />
            {}
            {!disabled && !uploading && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-1.5 right-1.5 bg-red-600/80 hover:bg-red-700 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-200"
                title="Xóa ảnh"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 p-4 text-center">
            <span className="text-3xl mb-2">📷</span>
            <p className="text-xs font-serif">Chọn ảnh bìa</p>
          </div>
        )}

        {}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
            <p className="text-white text-xs font-bold mb-2">{progress}%</p>
            <div className="w-3/4 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B6508] transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {}
        {preview && !uploading && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded transition-opacity duration-200">
              Thay đổi
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="hidden"
      />

      {error && (
        <p className="text-red-600 text-xs font-serif italic">{error}</p>
      )}

      {}
      {value && !uploading && (
        <p className="text-[10px] text-stone-400 font-mono break-all line-clamp-1" title={value}>
          ✓ {value.split("/").pop()}
        </p>
      )}
    </div>
  );
}

```

`src\components\common\index.jsx`:

```jsx
import { Link } from 'react-router-dom';

export { default as ErrorBoundary } from './ErrorBoundary';

export function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`px-5 py-3.5 rounded-[1px] border shadow-md text-xs font-bold uppercase tracking-wider animate-slide-in relative flex items-center gap-2 bg-[#FAF5EC] ${t.type === 'error'
            ? 'border-red-800/60 text-red-900 bg-red-50/30'
            : t.type === 'warning'
              ? 'border-[#8B6508]/60 text-[#8B6508] bg-amber-50/30'
              : 'border-emerald-800/60 text-emerald-950 bg-emerald-50/30'
            }`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span>{t.type === 'error' ? '✕' : t.type === 'warning' ? '❖' : '✓'}</span>
          <span className="font-serif tracking-normal normal-case font-normal text-stone-700">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

export function Spinner({ size = 'md' }) {
  const s = { sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-[3px]', lg: 'w-12 h-12 border-4' }[size];
  return (
    <div className={`${s} border-[#D4C4A8] border-t-[#8B6508] rounded-full animate-spin`} />
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-[60vh] bg-[#FAF5EC] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export function Pagination({ data, onPageChange, currentPage }) {
  if (!data || data.totalPages <= 1) return null;
  const { totalPages, hasNext, hasPrevious } = data;
  const page = currentPage ?? data.page ?? 1;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  const btnClass = "h-9 px-3 border border-[#D4C4A8] text-xs font-bold uppercase tracking-wider text-[#2C2114] hover:text-[#FAF5EC] relative overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:bg-[#2C2114] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-250 disabled:opacity-30 disabled:before:hidden disabled:hover:text-[#2C2114] flex items-center justify-center rounded-[1px]";

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10 select-none" style={{ fontFamily: "'Cinzel', serif" }}>
      <button disabled={!hasPrevious} onClick={() => onPageChange(page - 1)} className={btnClass}>
        <span className="relative z-10">← Trước</span>
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="w-9 h-9 border border-[#D4C4A8]/60 text-xs font-medium text-stone-500 hover:text-[#8B6508] transition-colors">1</button>
          <span className="text-stone-400 px-1 text-xs">...</span>
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 text-xs font-bold transition-all rounded-[1px] ${p === page
            ? 'bg-[#8B6508] border border-[#8B6508] text-[#FAF5EC]'
            : 'border border-[#D4C4A8]/60 text-stone-600 hover:border-[#2C2114] hover:text-[#2C2114]'
            }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          <span className="text-stone-400 px-1 text-xs">...</span>
          <button onClick={() => onPageChange(totalPages)} className="w-9 h-9 border border-[#D4C4A8]/60 text-xs font-medium text-stone-500 hover:text-[#8B6508] transition-colors">{totalPages}</button>
        </>
      )}

      <button disabled={!hasNext} onClick={() => onPageChange(page + 1)} className={btnClass}>
        <span className="relative z-10">Sau →</span>
      </button>
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-[#2C2114]/60 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative bg-[#FAF5EC] border-2 border-[#2C2114] rounded-[1px] shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-1">
        <div className="absolute inset-1 border border-[#8B6508]/10 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between p-5 border-b border-[#D4C4A8]/60">
            <h2 className="text-base font-serif font-bold text-[#140E0A] uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-red-800 text-xl transition-colors focus:outline-none"
            >
              ✕
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ErrorMsg({ message }) {
  if (!message) return null;
  return (
    <div className="bg-[#FAF5EC] border border-red-800/40 text-red-900 px-4 py-3 rounded-[1px] text-xs font-serif italic flex items-center gap-2">
      <span className="text-red-800 font-sans not-italic font-bold">✕</span> {message}
    </div>
  );
}

export function Empty({ icon = '❖', message = 'Không có dữ liệu' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-stone-400 border border-dashed border-[#D4C4A8]/60 rounded-[1px] bg-[#FAF5EC]/50 relative">
      <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />
      <span className="text-3xl mb-3 text-[#A8967E]">{icon}</span>
      <p className="text-xs font-serif italic text-stone-500" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {message}
      </p>
    </div>
  );
}

export function StarRating({ value = 0, onChange, readonly = false }) {
  return (
    <div className="flex gap-1 select-none">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(s)}
          className={`text-lg focus:outline-none leading-none ${s <= value ? 'text-[#8B6508]' : 'text-stone-300'
            } ${!readonly ? 'hover:text-[#A67B1E] transition-colors cursor-pointer' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
```

`src\components\layout\Footer.jsx`:

```jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#140E0A] text-[#C4B498]/80 mt-auto relative border-t border-[#8B6508] select-none">

      <div className="absolute inset-x-0 top-[3px] h-[1px] bg-gradient-to-r from-transparent via-[#8B6508]/60 to-transparent mx-8" />

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-2.5 text-white tracking-[0.25em] font-medium">
            <span className="text-[#8B6508] text-xl animate-pulse">❖</span>
            <span className="text-xl uppercase font-bold tracking-widest text-[#E6C280]" style={{ fontFamily: "'Cinzel', serif" }}>
              Bibliotheca
            </span>
          </div>
          <p className="text-base font-serif italic text-stone-400/90 leading-relaxed max-w-md text-justify" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            "Mỗi cuốn sách mở ra là một tinh cầu tư tưởng." Nơi gìn giữ, tôn vinh và lưu truyền các giá trị nhân văn, hệ thống triết học cổ đại xuyên thế kỷ đến tận tay những học giả trân quý tri thức.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#E6C280] mb-6 font-extrabold border-b border-[#8B6508]/20 pb-2 inline-block" style={{ fontFamily: "'Cinzel', serif" }}>
            Mục Lục Khảo Cứu
          </h4>
          <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
            <li>
              <Link to="/books" className="text-stone-400 hover:text-[#E6C280] transition-colors duration-200 flex items-center gap-1.5 group">
                <span className="text-[#8B6508] opacity-0 group-hover:opacity-100 transition-opacity duration-200">✦</span> Toàn Bộ Thư Mục
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-stone-400 hover:text-[#E6C280] transition-colors duration-200 flex items-center gap-1.5 group">
                <span className="text-[#8B6508] opacity-0 group-hover:opacity-100 transition-opacity duration-200">✦</span> Hệ Tư Tưởng
              </Link>
            </li>
            <li>
              <Link to="/authors" className="text-stone-400 hover:text-[#E6C280] transition-colors duration-200 flex items-center gap-1.5 group">
                <span className="text-[#8B6508] opacity-0 group-hover:opacity-100 transition-opacity duration-200">✦</span> Đại Triết Gia
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#E6C280] mb-6 font-extrabold border-b border-[#8B6508]/20 pb-2 inline-block" style={{ fontFamily: "'Cinzel', serif" }}>
            Độc Giả Đường Dây
          </h4>
          <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
            <li>
              <Link to="/orders" className="text-stone-400 hover:text-[#E6C280] transition-colors duration-200 flex items-center gap-1.5 group">
                <span className="text-[#8B6508] opacity-0 group-hover:opacity-100 transition-opacity duration-200">✦</span> Kiểm Đơn Hành Trình
              </Link>
            </li>
            <li>
              <a href="mailto:contact@bibliotheca.edu" className="text-stone-400 hover:text-[#E6C280] transition-colors duration-200 flex items-center gap-1.5 group">
                <span className="text-[#8B6508] opacity-0 group-hover:opacity-100 transition-opacity duration-200">✦</span> Liên Hệ Học Sảnh
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-[#8B6508]/15 bg-[#0C0805] py-6 text-center text-[10px] uppercase tracking-[0.25em] text-stone-500/80 font-medium" style={{ fontFamily: "'Cinzel', serif" }}>
        © {new Date().getFullYear()} Bibliotheca. Bản Quyền Sở Hữu Thuộc Về Viện Hàn Lâm Tri Thức.
      </div>
    </footer>
  );
}
```

`src\components\layout\Navbar.jsx`:

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/books?keyword=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF5EC]/90 backdrop-blur-xl border-b border-[#D4C4A8]/70 text-[#2C2114] select-none shadow-[0_4px_30px_rgba(38,28,18,0.06)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link to="/" className="flex items-center gap-2.5 tracking-[0.25em] font-medium transition-all duration-300 hover:opacity-90 group">
            <span className="text-xl text-[#8B6508] transition-transform duration-500 group-hover:rotate-180">❖</span>
            <span className="text-lg md:text-xl uppercase font-bold text-[#140E0A] group-hover:text-[#8B6508] transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
              Bibliotheca
            </span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-12 group">
            <div className="relative w-full border-b border-[#2C2114]/30 focus-within:border-[#8B6508] transition-all duration-300 pb-1.5 flex items-center">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm kinh điển, tác phẩm..."
                className="w-full bg-transparent pl-1 pr-8 text-sm focus:outline-none placeholder-[#A8967E]/70 font-serif italic text-[#140E0A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              />
              <button type="submit" className="absolute right-1 text-[#2C2114]/40 group-focus-within:text-[#8B6508] text-xs transition-colors duration-300 hover:scale-120">
                ✦
              </button>
            </div>
          </form>

          <div className="flex items-center gap-6">
            <Link to="/profile/wishlist" className="relative p-1.5 text-[#2C2114] hover:text-[#8B6508] transition-all duration-300 group flex items-center">
              <span className="text-xs font-bold tracking-[0.15em] uppercase hidden lg:inline mr-2.5 border-b border-transparent group-hover:border-[#8B6508]/40 pb-0.5 transition-all" style={{ fontFamily: "'Cinzel', serif" }}>
                Sách Ưa Thích
              </span>
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {user?.wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#8B6508] text-[#FAF5EC] text-[9px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-[#FAF5EC] shadow-sm">
                    {user.wishlistCount > 99 ? '99' : user.wishlistCount}
                  </span>
                )}
              </div>
            </Link>
            <Link to="/cart" className="relative p-1.5 text-[#2C2114] hover:text-[#8B6508] transition-all duration-300 group flex items-center">
              <span className="text-xs font-bold tracking-[0.15em] uppercase hidden lg:inline mr-2.5 border-b border-transparent group-hover:border-[#8B6508]/40 pb-0.5 transition-all" style={{ fontFamily: "'Cinzel', serif" }}>
                Túi Sách
              </span>
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#8B6508] text-[#FAF5EC] text-[9px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-[#FAF5EC] shadow-sm animate-pulse">
                    {totalItems > 99 ? '99' : totalItems}
                  </span>
                )}
              </div>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2.5 hover:text-[#8B6508] transition-colors focus:outline-none py-1 group"
                >
                  <div className="w-8 h-8 rounded-none border border-[#8B6508]/60 bg-[#F3EFE6] flex items-center justify-center text-xs font-bold shadow-sm group-hover:border-[#8B6508] transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-[#140E0A] group-hover:text-[#8B6508]" style={{ fontFamily: "'Cinzel', serif" }}>
                    {user.name}
                  </span>
                </button>

                {userMenu && (
                  <div
                    className="absolute right-0 mt-3 w-52 bg-[#FAF5EC] border border-[#D4C4A8] shadow-[0_10px_30px_rgba(38,28,18,0.12)] rounded-[1px] py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserMenu(false)}
                  >
                    <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-[#A8967E] border-b border-[#D4C4A8]/30 mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                      Quyền Trượng Học Giả
                    </div>
                    <Link to="/orders" className="block px-4 py-2.5 text-xs uppercase tracking-wide text-[#3E2F1A] hover:bg-[#F3EFE6]/70 hover:text-[#8B6508] transition-colors" style={{ fontFamily: "'Cinzel', serif" }} onClick={() => setUserMenu(false)}>
                      Khảo Đơn Hàng
                    </Link>
                    <Link to="/profile" className="block px-4 py-2.5 text-xs uppercase tracking-wide text-[#3E2F1A] hover:bg-[#F3EFE6]/70 hover:text-[#8B6508] transition-colors" style={{ fontFamily: "'Cinzel', serif" }} onClick={() => setUserMenu(false)}>
                      Hồ Sơ Độc Giả
                    </Link>
                    {user.roles?.includes('ROLE_ADMIN') && (
                      <Link to="/admin" className="block px-4 py-2.5 text-xs uppercase tracking-wide text-[#8B6508] bg-[#8B6508]/5 hover:bg-[#8B6508]/10 font-bold" style={{ fontFamily: "'Cinzel', serif" }} onClick={() => setUserMenu(false)}>
                        Biện Giám (Admin)
                      </Link>
                    )}
                    <hr className="my-1.5 border-[#D4C4A8]/50" />
                    <button
                      onClick={() => { logout(); setUserMenu(false); }}
                      className="block w-full text-left px-4 py-2.5 text-xs uppercase tracking-wide text-red-800 hover:bg-red-50/60 font-semibold transition-colors"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Rời Thư Viện
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-5 text-xs uppercase tracking-[0.15em] font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
                <Link to="/login" className="hover:text-[#8B6508] text-[#3E2F1A] transition-colors duration-200">
                  Đăng nhập
                </Link>
                <Link to="/register" className="border-2 border-[#8B6508] bg-[#8B6508] text-white px-5 py-2 hover:bg-transparent hover:text-[#8B6508] shadow-md hover:shadow-none transition-all duration-300 rounded-[1px]">
                  Đăng ký
                </Link>
              </div>
            )}

            <button className="md:hidden p-1 text-xl text-[#2C2114] hover:text-[#8B6508] focus:outline-none transition-transform active:scale-95" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-5 pt-2 border-t border-[#D4C4A8]/40 space-y-3">
            <form onSubmit={handleSearch} className="flex border-b-2 border-[#2C2114]/60 focus-within:border-[#8B6508] transition-colors pb-1 mx-2">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm tác phẩm tâm đắc..."
                className="flex-1 bg-transparent px-1 py-2 text-sm focus:outline-none placeholder-[#A8967E] font-serif italic"
              />
              <button type="submit" className="px-3 text-xs font-bold uppercase tracking-wider text-[#2C2114]" style={{ fontFamily: "'Cinzel', serif" }}>
                TRA
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
```

`src\context\AuthContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, setAuthFailureHandler } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    try { await authAPI.logout(); } catch (_) { }
    localStorage.removeItem('accessToken');
    setUser(null);
  }, []);

  
  
  useEffect(() => {
    setAuthFailureHandler(() => {
      localStorage.removeItem('accessToken');
      setUser(null);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      authAPI.me()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('accessToken'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password });
    const token = res?.data?.accessToken;
    if (token) localStorage.setItem('accessToken', token);
    const me = await authAPI.me();
    setUser(me?.data);
    return res?.data;
  }, []);

  const loginWithToken = useCallback(async (token) => {
    if (token) localStorage.setItem('accessToken', token);
    const me = await authAPI.me();
    setUser(me?.data);
    return me?.data;
  }, []);

  const register = useCallback(async (data) => {
    return authAPI.register(data);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithToken, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

`src\context\CartContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setCart(null); return; }
    setLoading(true);
    try {
      const res = await cartAPI.get();
      setCart(res.data);
    } catch (_) {}
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addItem = useCallback(async (bookId, quantity = 1) => {
    const res = await cartAPI.addItem({ bookId, quantity });
    setCart(res.data);
    return res;
  }, []);

  const updateItem = useCallback(async (bookId, quantity) => {
    const res = await cartAPI.updateItem(bookId, { quantity });
    setCart(res.data);
  }, []);

  const removeItem = useCallback(async (bookId) => {
    const res = await cartAPI.removeItem(bookId);
    setCart(res.data);
  }, []);

  const clearCart = useCallback(async () => {
    await cartAPI.clear();
    setCart(null);
  }, []);

  const totalItems = cart?.items?.reduce((s, i) => s + i.quantity, 0) || 0;
  
  const totalPrice = cart?.items?.reduce((s, i) => s + i.unitPrice * i.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, totalItems, totalPrice, addItem, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

```

`src\hooks\index.js`:

```js
import { useState, useEffect, useCallback, useRef } from "react";

export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const mountedRef = useRef(true);

  const execute = useCallback(async (...args) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await asyncFn(...args);
      if (mountedRef.current) {
        setState({ data, loading: false, error: null });
      }
      return data;
    } catch (err) {
      if (mountedRef.current) {
        setState((s) => ({ ...s, loading: false, error: err.message }));
      }
      throw err;
    }
    
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    execute();
    return () => {
      mountedRef.current = false;
    };
  }, [execute]);

  return { ...state, refetch: execute };
}

export function usePagination(fetchFn, initialParams = {}) {
  const [params, setParams] = useState({ page: 1, size: 12, ...initialParams });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);
  const abortRef = useRef(null);

  const fetch = useCallback(
    async (p = params) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);
      try {
        const res = await fetchFn(p, { signal: controller.signal });
        if (mountedRef.current && !controller.signal.aborted) {
          setData(res.data);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        if (mountedRef.current) setError(err.message);
      } finally {
        if (mountedRef.current && abortRef.current === controller) {
          setLoading(false);
        }
      }
    },
    [fetchFn, params],
  );

  useEffect(() => {
    mountedRef.current = true;
    fetch(params);
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, [params]);

  const setPage = (page) => setParams((p) => ({ ...p, page }));
  const setSize = (size) => setParams((p) => ({ ...p, size, page: 1 }));
  const updateParams = (newParams) =>
    setParams((p) => ({ ...p, ...newParams, page: 1 }));

  return {
    data,
    loading,
    error,
    params,
    setPage,
    setSize,
    updateParams,
    refetch: fetch,
  };
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return { toasts, addToast };
}

```

`src\index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { font-family: 'Source Sans 3', sans-serif; }
  h1, h2, h3 { font-family: 'Playfair Display', serif; }
  
  
  * { box-sizing: border-box; }
}

@layer utilities {
  .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
  .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

  @keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .animate-slide-in { animation: slide-in 0.3s ease; }
}
```

`src\main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

`src\pages\AuthPages.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ErrorMsg, Spinner } from '../components/common';
import { authAPI } from '../api';

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
              <div className="flex justify-end mt-2">
                <Link to="/forgot-password" className="text-stone-500 hover:text-[#8B6508] text-[11px] font-serif italic transition-colors">
                  Quên mật từ?
                </Link>
              </div>
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

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phase, setPhase] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await authAPI.forgotPassword({ email });
      setSuccessMsg('Mã OTP khôi phục đã được gửi tới email của bạn.');
      setPhase(2);
    } catch (err) {
      setError(err.message || 'Gửi yêu cầu thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authAPI.resetPassword({ email, otpCode, newPassword });
      navigate('/login', { state: { message: 'Khôi phục mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.' } });
    } catch (err) {
      setError(err.message || 'Khôi phục mật khẩu thất bại.');
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
            Khôi Phục Mật Tự
          </h1>
          <p className="text-stone-500 text-xs font-serif italic mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Xác minh danh tính độc giả để thiết lập lại mật mã truy cập
          </p>
        </div>

        <div className="bg-[#FAF3E3] border border-[#C4B498] shadow-[0_15px_50px_rgba(38,28,18,0.1)] p-8 relative">
          <div className="absolute inset-2 border border-[#8B6508]/10 pointer-events-none" />

          {successMsg && !error && (
            <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-wider text-center font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
              {successMsg}
            </div>
          )}

          {phase === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2C2114] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Nhập địa chỉ Email liên kết
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#2C2114]/30 focus:border-[#8B6508] pb-1.5 text-sm focus:outline-none placeholder-[#A8967E]/60 font-serif italic text-[#140E0A] transition-colors"
                  placeholder="reader@bibliotheca.edu"
                />
              </div>

              {error && <ErrorMsg message={error} />}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B6508] hover:bg-[#A67B1E] text-white font-bold py-3.5 px-4 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs shadow-md hover:shadow-lg rounded-[1px]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {loading ? <><Spinner size="sm" /> Đang gửi yêu cầu...</> : 'Gửi mã xác thực'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2C2114] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full bg-transparent border-b-2 border-[#2C2114]/10 pb-1.5 text-sm focus:outline-none font-serif text-[#140E0A]/60 opacity-70"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2C2114] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Mã xác thực OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent border-b-2 border-[#2C2114]/30 focus:border-[#8B6508] pb-1.5 text-sm focus:outline-none placeholder-[#A8967E]/60 tracking-[0.5em] text-center font-bold text-[#140E0A]"
                  placeholder="000000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2C2114] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Mật từ truy cập mới
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#2C2114]/30 focus:border-[#8B6508] pb-1.5 text-sm focus:outline-none placeholder-[#A8967E]/60 font-serif text-[#140E0A]"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2C2114] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Xác thực mật từ mới
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#2C2114]/30 focus:border-[#8B6508] pb-1.5 text-sm focus:outline-none placeholder-[#A8967E]/60 font-serif text-[#140E0A]"
                  placeholder="••••••••"
                />
              </div>

              {error && <ErrorMsg message={error} />}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B6508] hover:bg-[#A67B1E] text-white font-bold py-3.5 px-4 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs shadow-md hover:shadow-lg rounded-[1px] mt-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {loading ? <><Spinner size="sm" /> Đang cập nhật...</> : 'Cập nhật mật từ'}
              </button>

              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={() => { setPhase(1); setError(''); setSuccessMsg(''); }}
                  className="text-stone-500 hover:text-[#8B6508] text-xs font-serif italic"
                >
                  Quay lại bước nhập Email
                </button>
              </div>
            </form>
          )}

          <div className="text-center mt-6 pt-6 border-t border-[#C4B498]/40">
            <p className="text-xs font-serif text-stone-500">
              Nhớ ra mật từ?{' '}
              <Link to="/login" className="text-[#8B6508] font-bold hover:text-[#A67B1E] underline underline-offset-4 uppercase tracking-wider ml-1 text-[11px]" style={{ fontFamily: "'Cinzel', serif" }}>
                Quay lại Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

`src\pages\BookDetailPage.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookAPI, reviewAPI, commentAPI } from '../api';
import { CommentSection } from '../components/comment';
import { useCart } from '../context/CartContext';
import { formatPrice, formatDate, getDiscountPercent, PLACEHOLDER_BOOK } from '../utils';
import { Spinner, StarRating, Empty, ErrorMsg } from '../components/common';

export default function BookDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('desc');
  const [commentCount, setCommentCount] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [bookRes, revRes, commentCountRes] = await Promise.all([
          bookAPI.getById(id),
          reviewAPI.getByBook(id, { page: 1, size: 10 }).catch(() => null),
          commentAPI.countByBook(id).catch(() => ({ data: 0 })),
        ]);
        setBook(bookRes.data);
        setReviews(revRes?.data);
        setCommentCount(commentCountRes?.data || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addItem(book.id, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await reviewAPI.create({ bookId: Number(id), ...reviewForm });
      const revRes = await reviewAPI.getByBook(id, { page: 1, size: 10 });
      setReviews(revRes.data);
      setReviewForm({ rating: 5, comment: '' });
    } catch (_) {
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-24 bg-[#FAF5EC] min-h-screen"><Spinner size="lg" /></div>;
  if (!book) return <div className="max-w-2xl mx-auto px-4 py-16"><ErrorMsg message={error || 'Không tìm thấy tác phẩm cổ điển này.'} /></div>;

  const displayPrice = book.discountPrice && book.discountPrice < book.price ? book.discountPrice : book.price;
  
  const discountPercent = getDiscountPercent(book);
  
  const publishedYear = book.publishedDate ? new Date(book.publishedDate).getFullYear() : null;

  return (
    <div className="bg-[#FAF5EC] min-h-screen selection:bg-[#E6CE9A]/50 text-[#2C2114] pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        <nav className="text-xs uppercase tracking-widest text-[#A8967E] mb-10 flex items-center gap-2 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
          <Link to="/" className="hover:text-[#8B6508] transition-colors">Thư Viện</Link>
          <span className="text-[#A8967E]/40">❖</span>
          <Link to="/books" className="hover:text-[#8B6508] transition-colors">Toàn Bản</Link>
          <span className="text-[#A8967E]/40">❖</span>
          <span className="text-[#2C2114] font-semibold truncate max-w-[200px] md:max-w-xs">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          <div className="md:col-span-5 flex justify-center items-start">
            <div className="w-full max-w-sm bg-[#FAF5EC] border border-[#D4C4A8] p-4 shadow-[0_15px_40px_rgba(38,28,18,0.08)] relative group">
              <div className="absolute inset-2 border border-[#8B6508]/10 pointer-events-none" />
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={book.coverImageUrl || PLACEHOLDER_BOOK}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={e => { e.target.src = PLACEHOLDER_BOOK; }}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {book.categories?.map(c => (
                    <Link
                      key={c.id}
                      to={`/books?categoryId=${c.id}`}
                      className="text-[10px] uppercase tracking-widest font-extrabold bg-[#8B6508]/5 border border-[#8B6508]/20 text-[#8B6508] px-2.5 py-1 rounded-[1px] hover:bg-[#8B6508]/10 transition-colors"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#140E0A] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {book.title}
                </h1>
              </div>

              <div className="text-xs uppercase tracking-wider space-y-2.5 border-y border-[#D4C4A8]/40 py-5 text-stone-600 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
                {book.authors?.length > 0 && (
                  <p className="flex items-center gap-2">
                    <span className="text-[#A8967E] min-w-[100px]">Tác giả:</span>
                    <span className="text-[#2C2114]">{book.authors.map(a => a.name).join(', ')}</span>
                  </p>
                )}
                {book.publisher && (
                  <p className="flex items-center gap-2">
                    <span className="text-[#A8967E] min-w-[100px]">Ấn hành cục:</span>
                    <span className="text-[#2C2114]">{book.publisher.name}</span>
                  </p>
                )}
                {}
                {publishedYear && (
                  <p className="flex items-center gap-2">
                    <span className="text-[#A8967E] min-w-[100px]">Niên đại XB:</span>
                    <span className="text-[#2C2114]">{publishedYear}</span>
                  </p>
                )}
                {book.isbn && (
                  <p className="flex items-center gap-2">
                    <span className="text-[#A8967E] min-w-[100px]">Mã thư tịch:</span>
                    <span className="text-[#2C2114] font-mono tracking-normal">{book.isbn}</span>
                  </p>
                )}
                {book.pages && (
                  <p className="flex items-center gap-2">
                    <span className="text-[#A8967E] min-w-[100px]">Khảo số trang:</span>
                    <span className="text-[#2C2114]">{book.pages} trang</span>
                  </p>
                )}
              </div>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl font-bold text-[#8B6508]" style={{ fontFamily: "'Cinzel', serif" }}>
                  {formatPrice(displayPrice)}
                </span>
                {book.discountPrice && book.discountPrice < book.price && (
                  <>
                    <span className="text-lg text-[#A8967E] line-through font-medium" style={{ fontFamily: "'Cinzel', serif" }}>
                      {formatPrice(book.price)}
                    </span>
                    {}
                    {discountPercent > 0 && (
                      <span className="bg-[#8B6508] text-[#FAF5EC] text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wider rounded-[1px]" style={{ fontFamily: "'Cinzel', serif" }}>
                        -{discountPercent}% Tiết giảm
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="pt-2">
                <span
                  className={`text-xs uppercase tracking-widest font-extrabold px-3 py-1 border rounded-[1px] ${book.stockQuantity > 0
                    ? 'border-emerald-600/30 bg-emerald-50 text-emerald-800'
                    : 'border-red-600/30 bg-red-50 text-red-800'
                    }`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {book.stockQuantity > 0 ? `✓ Hiện tàng ${book.stockQuantity} quyển` : '✗ Mộc bản đã hết'}
                </span>
              </div>
            </div>

            {book.stockQuantity > 0 && (
              <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-8 mt-6 border-t border-[#D4C4A8]/40">
                <div className="flex items-center justify-between border-2 border-[#2C2114]/40 h-14 px-2 min-w-[140px]">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg text-stone-600 hover:text-[#8B6508] transition-colors focus:outline-none font-bold"
                  >
                    −
                  </button>
                  <span className="font-bold text-base text-[#140E0A] w-12 text-center" style={{ fontFamily: "'Cinzel', serif" }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => Math.min(book.stockQuantity, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg text-stone-600 hover:text-[#8B6508] transition-colors focus:outline-none font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className={`flex-1 h-14 px-6 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 rounded-[1px] shadow-sm hover:shadow-md ${added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#8B6508] hover:bg-[#A67B1E] text-white'
                    }`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {adding ? 'Đang thâu tập...' : added ? '✓ Đã đưa vào Túi Sách!' : '🛒 Thu nhận vào Túi Sách'}
                </button>
              </div>
            )}

            {error && <div className="mt-4"><ErrorMsg message={error} /></div>}
          </div>
        </div>

        <div className="bg-[#FAF5EC] border border-[#D4C4A8] shadow-sm relative">
          <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />

          <div className="flex border-b border-[#D4C4A8] relative z-10 bg-[#F3EFE6]">
            {[
              { key: 'desc', label: 'Tóm lược tác phẩm' },
              { key: 'reviews', label: `Học giả bình nghị (${reviews?.totalElements || 0})` },
              { key: 'comments', label: `Luận đàm thảo luận (${commentCount})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 sm:px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all focus:outline-none relative ${activeTab === tab.key
                  ? 'text-[#8B6508] bg-[#FAF5EC] border-r border-[#D4C4A8] last:border-r-0 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#8B6508]'
                  : 'text-stone-500 hover:text-[#2C2114] border-r border-[#D4C4A8]/40 hover:bg-[#FAF5EC]/50'
                  }`}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8 relative z-10">
            {activeTab === 'desc' && (
              <p
                className="text-stone-700 leading-relaxed text-justify font-serif text-base whitespace-pre-line first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#8B6508] first-letter:mr-2 first-letter:float-left first-letter:leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {book.description || 'Tác phẩm hiện chưa được cập nhật tờ khải mô tả.'}
              </p>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-10">
                <form onSubmit={handleSubmitReview} className="border border-[#D4C4A8]/60 bg-[#F3EFE6]/40 p-6 space-y-4 rounded-[1px]">
                  <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114]" style={{ fontFamily: "'Cinzel', serif" }}>
                    Để lại bút tích phê bình
                  </h3>
                  <div className="py-1">
                    <StarRating value={reviewForm.rating} onChange={r => setReviewForm(f => ({ ...f, rating: r }))} />
                  </div>
                  <textarea
                    value={reviewForm.comment}
                    onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                    placeholder="Viết lời bình nghị của bạn về giá trị tác phẩm tại đây..."
                    rows={4}
                    className="w-full bg-transparent border border-[#D4C4A8] rounded-[1px] p-4 text-sm focus:outline-none focus:border-[#8B6508] placeholder-[#A8967E]/60 font-serif italic text-[#140E0A] resize-none transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  />
                  <button
                    type="submit"
                    disabled={submitting || !reviewForm.comment.trim()}
                    className="bg-[#2C2114] hover:bg-[#8B6508] text-[#FAF5EC] px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors disabled:opacity-40 rounded-[1px]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {submitting ? 'Đang khắc thư...' : 'Ký danh gửi ngôn'}
                  </button>
                </form>

                {!reviews?.content?.length ? (
                  <div className="py-8">
                    <Empty icon="❖" message="Thư tịch này hiện chưa có học giả để lại lời phê bình." />
                  </div>
                ) : (
                  <div className="divide-y divide-[#D4C4A8]/40 space-y-6">
                    {reviews.content.map(rev => (
                      <div key={rev.id} className="pt-6 first:pt-0 group">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <div className="w-8 h-8 border border-[#8B6508]/60 bg-[#F3EFE6] flex items-center justify-center text-xs font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
                            {rev.userName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-xs uppercase tracking-wide text-[#2C2114]" style={{ fontFamily: "'Cinzel', serif" }}>
                              {rev.userName}
                            </span>
                            <div className="flex items-center gap-3 mt-0.5">
                              <StarRating value={rev.rating} readonly />
                              <span className="text-[10px] tracking-wider text-[#A8967E] uppercase font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
                                {formatDate(rev.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-stone-700 font-serif text-base text-justify pl-11 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'comments' && (
              <CommentSection bookId={Number(id)} onCountChange={setCommentCount} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

```

`src\pages\BooksPage.jsx`:

```jsx
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

export default function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    categoryId: searchParams.get('categoryId') || '',
    sort: 'createdAt,desc',
    page: 1,
    size: 12,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    categoryAPI.getAll({ size: 50 }).then(r => setCategories(r.data?.content || r.data || [])).catch(() => { });
  }, []);

  const fetchBooks = useCallback(async (f) => {
    setLoading(true);
    try {
      const [sortBy, sortDir] = (f.sort || 'createdAt,desc').split(',');
      const params = {
        page: f.page,
        size: f.size,
        sortBy,
        sortDir,
      };
      if (f.keyword) params.keyword = f.keyword;
      if (f.categoryId) params.categoryId = f.categoryId;

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

  const setFilter = (key, value) => {
    setFilters(f => ({ ...f, [key]: value, page: 1 }));
  };

  const Sidebar = () => (
    <div className="space-y-8">
      <div className="relative">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#2C2114] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
          Khảo Tìm Văn Bản
        </label>
        <div className="relative border-b-2 border-[#2C2114]/30 focus-within:border-[#8B6508] pb-1 transition-colors">
          <input
            type="text"
            value={filters.keyword}
            onChange={e => setFilter('keyword', e.target.value)}
            placeholder="Tên kinh điển, triết gia..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder-[#A8967E]/60 font-serif italic text-[#140E0A]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          />
          <span className="absolute right-1 bottom-1 text-[#A8967E] text-xs">✦</span>
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#2C2114] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
          Hệ Thống Tư Tưởng
        </label>
        <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
          <button
            onClick={() => setFilter('categoryId', '')}
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
              onClick={() => setFilter('categoryId', cat.id)}
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
            <div className="relative border border-[#D4C4A8] bg-[#FAF5EC] rounded-[1px] px-3 py-2 flex items-center shadow-sm">
              <select
                value={filters.sort}
                onChange={e => setFilter('sort', e.target.value)}
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
              Bộ Lọc
            </button>
          </div>
        </div>

        <div className="flex gap-10 lg:gap-12">
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 sticky top-28 shadow-sm">
              <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />
              <Sidebar />
            </div>
          </div>

          {sidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden animate-fadeIn">
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
                  <Sidebar />
                </div>
              </div>
            </div>
          )}

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
```

`src\pages\CartPage.jsx`:

```jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, PLACEHOLDER_BOOK } from '../utils';
import { Spinner } from '../components/common';

export default function CartPage() {
  const { cart, loading, totalPrice, updateItem, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return (
    <div className="bg-[#FAF5EC] min-h-[75vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#FAF5EC] border border-[#D4C4A8] p-8 text-center shadow-sm relative">
        <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />
        <span className="inline-block text-2xl text-[#8B6508] mb-4">❖</span>
        <h2 className="text-lg font-serif font-bold text-[#140E0A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Yêu Cầu Kiến Danh
        </h2>
        <p className="text-stone-500 text-xs font-serif italic mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vui lòng thông quan nhập cảnh để kiểm tra thư mục tàng thư cá nhân của bạn.
        </p>
        <Link
          to="/login"
          className="relative inline-block bg-[#8B6508] text-[#FAF5EC] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-[1px] transition-all duration-300 hover:bg-[#2C2114] hover:tracking-[0.22em] shadow-sm group"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className="absolute inset-1 border border-[#FAF5EC]/10 pointer-events-none" />
          Đăng Nhập Ngay
        </Link>
      </div>
    </div>
  );

  if (loading) return <div className="flex justify-center py-28 bg-[#FAF5EC] min-h-screen"><Spinner size="lg" /></div>;

  const items = cart?.items || [];

  return (
    <div className="bg-[#FAF5EC] min-h-screen text-[#2C2114] selection:bg-[#E6CE9A]/50 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#140E0A] tracking-wide border-b border-[#D4C4A8] pb-5 mb-8 flex items-center gap-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Túi Sách Thu Thập
          <span className="text-xs uppercase tracking-widest text-[#8B6508] font-bold bg-[#8B6508]/5 border border-[#8B6508]/20 px-2.5 py-0.5 rounded-[1px]" style={{ fontFamily: "'Cinzel', serif" }}>
            {items.length} Quyển
          </span>
        </h1>

        {items.length === 0 ? (
          <div className="bg-[#FAF5EC] border border-[#D4C4A8] py-20 px-4 text-center shadow-sm relative">
            <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />
            <span className="inline-block text-3xl text-[#A8967E] mb-4">❖</span>
            <h2 className="text-lg font-serif font-bold text-[#140E0A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Túi Sách Hiện Trống
            </h2>
            <p className="text-stone-500 text-xs font-serif italic mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Chưa có mộc bản hay kinh điển nào được lựa chọn lưu giữ.
            </p>
            <Link
              to="/books"
              className="relative inline-block bg-[#8B6508] text-[#FAF5EC] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-[1px] transition-all duration-300 hover:bg-[#2C2114] hover:tracking-[0.22em] shadow-sm group"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span className="absolute inset-1 border border-[#FAF5EC]/10 pointer-events-none" />
              Quay Lại Tầm Thư
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.bookId} className="bg-[#FAF5EC] border border-[#D4C4A8] p-5 flex gap-5 items-start shadow-sm relative">
                  <div className="absolute inset-1 border border-[#8B6508]/5 pointer-events-none" />

                  <Link to={`/books/${item.bookId}`} className="flex-shrink-0 border border-[#D4C4A8]/60 p-1.5 bg-white aspect-[3/4] w-20">
                    <img
                      
                      src={item.bookCoverUrl || PLACEHOLDER_BOOK}
                      alt={item.bookTitle}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = PLACEHOLDER_BOOK; }}
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch relative z-10">
                    <div>
                      <Link
                        to={`/books/${item.bookId}`}
                        className="font-serif font-bold text-base text-[#140E0A] hover:text-[#8B6508] transition-colors line-clamp-1 block mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.bookTitle}
                      </Link>
                      {}
                      <p className="text-xs uppercase tracking-wider font-bold text-[#8B6508]" style={{ fontFamily: "'Cinzel', serif" }}>
                        {formatPrice(item.unitPrice)}
                      </p>
                    </div>

                    <div className="flex items-end justify-between pt-4 mt-2 border-t border-[#D4C4A8]/30">
                      <div className="flex items-center border border-[#D4C4A8] bg-[#FAF5EC] h-8 px-0.5 rounded-[1px]">
                        <button
                          onClick={() => item.quantity > 1 ? updateItem(item.bookId, item.quantity - 1) : removeItem(item.bookId)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-stone-500 hover:text-[#8B6508] hover:bg-[#8B6508]/5 font-bold transition-colors focus:outline-none"
                        >
                          −
                        </button>
                        <span className="text-xs font-bold text-[#140E0A] w-8 text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateItem(item.bookId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-stone-500 hover:text-[#8B6508] hover:bg-[#8B6508]/5 font-bold transition-colors focus:outline-none"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-5">
                        {}
                        <span className="font-bold text-sm text-[#2C2114]" style={{ fontFamily: "'Cinzel', serif" }}>
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.bookId)}
                          className="text-[11px] uppercase tracking-widest font-bold text-stone-400 hover:text-red-800 transition-colors focus:outline-none border-b border-transparent hover:border-red-800/30 pb-0.5"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          Tẩy trừ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={clearCart}
                  className="text-[11px] uppercase tracking-widest font-bold text-stone-400 hover:text-red-800 transition-all duration-300 focus:outline-none border-b border-transparent hover:border-red-800/40 pb-0.5"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  ✕ Tẩy trống toàn bộ túi sách
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#FAF5EC] border-2 border-[#2C2114]/80 p-6 sticky top-28 shadow-md relative">
                <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />

                <h2 className="font-serif font-bold text-lg text-[#140E0A] uppercase tracking-wide border-b border-[#D4C4A8] pb-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Tổng Kê Sách Quy
                </h2>

                <div className="space-y-3 text-xs uppercase tracking-wider font-bold text-stone-600" style={{ fontFamily: "'Cinzel', serif" }}>
                  <div className="flex justify-between items-center">
                    <span>Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)} cuốn)</span>
                    <span className="text-[#2C2114] font-sans font-normal text-xs">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phí chuyển thư</span>
                    <span className="text-emerald-700 font-extrabold">Miễn ngân</span>
                  </div>
                </div>

                <div className="border-t border-[#D4C4A8] pt-4 mt-4 flex justify-between items-baseline font-bold text-[#2C2114]">
                  <span className="text-xs uppercase tracking-widest font-extrabold" style={{ fontFamily: "'Cinzel', serif" }}>Tổng ngân chung</span>
                  <span className="text-xl text-[#8B6508]" style={{ fontFamily: "'Cinzel', serif" }}>{formatPrice(totalPrice)}</span>
                </div>

                <div className="pt-6 space-y-4">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="relative w-full h-12 bg-transparent text-[#2C2114] border border-[#2C2114] font-bold text-xs uppercase tracking-[0.2em] rounded-[1px] overflow-hidden transition-all duration-350 before:absolute before:inset-0 before:bg-[#2C2114] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-300 before:ease-out hover:text-[#FAF5EC] flex items-center justify-center z-10 focus:outline-none"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    <span className="relative z-20">
                      Tiến Hành Trả Ngân ➔
                    </span>
                  </button>

                  <Link
                    to="/books"
                    className="block text-center text-xs uppercase tracking-[0.15em] font-extrabold text-[#8B6508] hover:text-[#A67B1E] transition-all hover:tracking-[0.2em] pt-1"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    ✦ Tiếp Tục Tầm Thư
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

```

`src\pages\CheckoutPage.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addressAPI, couponAPI, orderAPI, paymentAPI } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils';
import { Spinner, ErrorMsg } from '../components/common';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addrErrors, setAddrErrors] = useState({});

  const [newAddr, setNewAddr] = useState({
    fullName: '', phone: '', street: '', province: '', district: '', ward: '',
    isDefault: false
  });
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [editingAddrId, setEditingAddrId] = useState(null);

  useEffect(() => {
    addressAPI.getAll().then(r => {
      const addrs = r.data || [];
      setAddresses(addrs);
      const def = addrs.find(a => a.isDefault) || addrs[0];
      if (def) setSelectedAddress(def.id);
    }).catch(() => { });
  }, []);

  const validateCoupon = async () => {
    setCouponError('');
    setCouponData(null);
    try {
      const res = await couponAPI.validate(couponCode, totalPrice);
      if (res.data?.isValid) setCouponData(res.data);
      else setCouponError(res.data?.errorMessage || 'Mã sức giảm bất hợp lệ');
    } catch (err) {
      setCouponError(err.message);
    }
  };

  const FREE_SHIPPING_THRESHOLD = 300000;
  const SHIPPING_FEE = 30000;

  const discount = couponData?.discountAmount || 0;
  const subtotalAfterDiscount = Math.max(0, totalPrice - discount);
  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const finalPrice = subtotalAfterDiscount + shippingFee;

  const handleOrder = async () => {
    if (!selectedAddress) {
      setError('Vui lòng định đoạt địa sở thụ thư');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await orderAPI.create({
        addressId: selectedAddress,
        paymentMethod,
        couponCode: couponData ? couponCode : undefined,
        note: note || undefined,
      });
      const orderId = res.data.id;
      await clearCart();

      if (paymentMethod === 'ZALOPAY') {
        
        try {
          const payRes = await paymentAPI.zaloPayInit(orderId);
          const orderUrl = payRes?.data?.orderUrl;
          if (orderUrl) {
            window.location.href = orderUrl; 
            return;
          }
        } catch {
          
        }
        navigate(`/orders/${orderId}`, { state: { success: true, zalopay: true, pendingPayment: true } });
      } else {
        navigate(`/orders/${orderId}`, { state: { success: true } });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleEditAddress = (addr, e) => {
    e.stopPropagation();
    e.preventDefault();
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

  const handleDeleteAddress = async (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm('Bạn có chắc chắn muốn xóa địa sở này?')) return;
    try {
      await addressAPI.delete(id);
      const addrsRes = await addressAPI.getAll();
      const addrs = addrsRes.data || [];
      setAddresses(addrs);
      if (selectedAddress === id) {
        const def = addrs.find(a => a.isDefault) || addrs[0];
        setSelectedAddress(def ? def.id : null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const PHONE_REGEX = /^(0[35789])[0-9]{7,8}$/;
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!PHONE_REGEX.test(newAddr.phone)) {
      setError('Số điện thoại không hợp lệ (9-10 số, bắt đầu bằng 03/05/07/08/09)');
      return;
    }
    try {
      const payload = { ...newAddr, isDefault: !!newAddr.isDefault };
      if (editingAddrId) {
        await addressAPI.update(editingAddrId, payload);
      } else {
        const res = await addressAPI.create(payload);
        setSelectedAddress(res.data.id);
      }
      const addrsRes = await addressAPI.getAll();
      const addrs = addrsRes.data || [];
      setAddresses(addrs);
      if (!editingAddrId) {
        const newlyCreated = addrs.find(a => a.fullName === payload.fullName && a.phone === payload.phone && a.street === payload.street);
        if (newlyCreated) setSelectedAddress(newlyCreated.id);
      }
      setShowNewAddr(false);
      setEditingAddrId(null);
      setNewAddr({ fullName: '', phone: '', street: '', province: '', district: '', ward: '', isDefault: false });
    } catch (err) {
      setError(err.message);
    }
  };

  if (!cart?.items?.length) return (
    <div className="bg-[#FAF5EC] min-h-[75vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#FAF5EC] border border-[#D4C4A8] p-8 text-center shadow-sm relative">
        <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />
        <span className="inline-block text-3xl text-[#A8967E] mb-4">❖</span>
        <p className="text-stone-600 font-serif text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Túi sách hiện thời trống rỗng. Hãy thâu tập kinh điển trước khi tiến hành trả ngân.
        </p>
      </div>
    </div>
  );

  const PAYMENT_OPTIONS = [
    { value: 'COD', label: '💵 Thanh toán khi nhận hàng (COD)' },
    { value: 'BANKING', label: '🏦 Chuyển khoản ngân hàng' },
    { value: 'MOMO', label: '💜 Ví MoMo' },
    { value: 'ZALOPAY', label: '💙 ZaloPay' },
    { value: 'VNPAY', label: '🔴 VNPay' },
  ];

  return (
    <div className="bg-[#FAF5EC] min-h-screen text-[#2C2114] selection:bg-[#E6CE9A]/50 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#140E0A] tracking-wide border-b border-[#D4C4A8] pb-5 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Khấu Trừ Trả Ngân
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          <div className="lg:col-span-2 space-y-6">

            {}
            <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
              <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />

              <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114] mb-4 flex items-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                <span>📍 Địa Sở Thụ Thư</span>
              </h2>

              <div className="space-y-3 relative z-10">
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`flex items-start gap-4 p-4 rounded-[1px] border cursor-pointer transition-all duration-300 relative group ${selectedAddress === addr.id
                      ? 'border-[#8B6508] bg-[#8B6508]/5 shadow-sm'
                      : 'border-[#D4C4A8]/60 bg-transparent hover:border-[#8B6508]/40'
                      }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="mt-1 accent-[#8B6508]"
                    />
                    <div className="text-xs sm:text-sm flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-[#2C2114] uppercase tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
                          {addr.fullName} <span className="text-[#A8967E] font-mono tracking-normal px-1">·</span> {addr.phone}
                        </p>
                        <div className="flex gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleEditAddress(addr, e)}
                            className="text-[10px] uppercase tracking-wider font-bold text-stone-500 hover:text-[#8B6508]"
                            style={{ fontFamily: "'Cinzel', serif" }}
                          >
                            Sửa
                          </button>
                          {!addr.isDefault && (
                            <button
                              onClick={(e) => handleDeleteAddress(addr.id, e)}
                              className="text-[10px] uppercase tracking-wider font-bold text-stone-500 hover:text-red-700"
                              style={{ fontFamily: "'Cinzel', serif" }}
                            >
                              Xóa
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-stone-600 font-serif mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {addr.street}, {addr.ward}, {addr.district}, {addr.province}
                      </p>
                      {addr.isDefault && (
                        <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold text-[#8B6508] bg-[#8B6508]/10 px-1.5 py-0.5 mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                          Định Ước Mặc Định
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <button
                    onClick={() => setShowNewAddr(!showNewAddr)}
                    className="text-xs uppercase tracking-[0.15em] font-extrabold text-[#8B6508] hover:text-[#A67B1E] hover:tracking-[0.18em] transition-all focus:outline-none border-b border-transparent hover:border-[#A67B1E]/30 pb-0.5"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    + Thiết lập địa sở mới
                  </button>
                </div>
              </div>

              {showNewAddr && (
                <form onSubmit={handleAddAddress} className="mt-6 grid grid-cols-2 gap-4 relative z-10 border-t border-[#D4C4A8]/40 pt-6">
                  <h3 className="col-span-2 text-xs uppercase tracking-wider font-bold text-[#8B6508] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    {editingAddrId ? '✍️ Cập Nhật Địa Sở' : '📍 Thiết Lập Địa Sở Mới'}
                  </h3>
                  {[
                    { key: 'fullName', label: 'Danh tính thụ nhân', col: 2 },
                    { key: 'phone', label: 'Liên lạc minh số', col: 1 },
                    { key: 'province', label: 'Tỉnh / Thành thành', col: 1 },
                    { key: 'district', label: 'Quận / Huyện phủ', col: 1 },
                    { key: 'ward', label: 'Phường / Xã hạt', col: 1 },
                    { key: 'street', label: 'Chi tiết lộ trình địa sở', col: 2 },
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
                      className="text-xs font-serif italic text-stone-600 cursor-pointer user-select-none"
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
                      onClick={() => {
                        setShowNewAddr(false);
                        setEditingAddrId(null);
                        setNewAddr({ fullName: '', phone: '', street: '', province: '', district: '', ward: '', isDefault: false });
                      }}
                      className="h-10 text-stone-400 hover:text-red-800 text-xs font-bold uppercase tracking-[0.15em] px-6 border border-[#D4C4A8] hover:border-red-800/20 rounded-[1px] transition-all bg-transparent focus:outline-none"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Bãi Miễn
                    </button>
                  </div>
                </form>
              )}
            </div>

            {}
            <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
              <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />
              <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                💳 Phương Thức Thanh Toán
              </h2>
              <div className="space-y-2 relative z-10">
                {PAYMENT_OPTIONS.map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-[1px] border cursor-pointer transition-all ${paymentMethod === opt.value
                      ? 'border-[#8B6508] bg-[#8B6508]/5'
                      : 'border-[#D4C4A8]/60 hover:border-[#8B6508]/40'
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      checked={paymentMethod === opt.value}
                      onChange={() => setPaymentMethod(opt.value)}
                      className="accent-[#8B6508]"
                    />
                    <span className="text-sm font-serif text-[#2C2114]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {}
            <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
              <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />
              <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                🎫 Tiết Giảm Minh Tờ (Coupon)
              </h2>
              <div className="flex gap-4 relative z-10">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Điền văn tự giảm giá..."
                  className="flex-1 bg-transparent border border-[#D4C4A8] rounded-[1px] px-4 py-2.5 text-xs uppercase tracking-widest font-bold placeholder-[#A8967E]/60 focus:outline-none focus:border-[#8B6508] text-[#140E0A]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                />
                <button
                  onClick={validateCoupon}
                  disabled={!couponCode}
                  className="relative h-11 bg-transparent text-[#8B6508] border border-[#8B6508] font-bold text-xs uppercase tracking-[0.15em] px-6 rounded-[1px] overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:bg-[#8B6508] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-250 before:ease-out hover:text-[#FAF5EC] flex items-center justify-center z-10 disabled:opacity-40 disabled:before:hidden disabled:hover:text-[#8B6508] disabled:border-[#D4C4A8] focus:outline-none"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <span className="relative z-20">Chiếu Dụng</span>
                </button>
              </div>
              {couponError && <p className="text-red-700 text-xs font-serif italic mt-2.5 pl-1">{couponError}</p>}
              {couponData && <p className="text-emerald-700 text-xs font-extrabold uppercase tracking-wider mt-2.5 pl-1" style={{ fontFamily: "'Cinzel', serif" }}>✓ Đã trừ khấu {formatPrice(couponData.discountAmount)}</p>}
            </div>

            {}
            <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
              <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />
              <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#2C2114] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                📝 Bút Tích Đính Kèm (Ghi chú)
              </h2>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Lời căn dặn dịch quan vận chuyển mộc bản..."
                rows={2}
                className="w-full bg-transparent border border-[#D4C4A8] rounded-[1px] p-4 text-sm focus:outline-none focus:border-[#8B6508] placeholder-[#A8967E]/60 font-serif italic text-[#140E0A] relative z-10 resize-none transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              />
            </div>
          </div>

          {}
          <div className="lg:col-span-1">
            <div className="bg-[#FAF5EC] border-2 border-[#2C2114]/80 p-6 sticky top-28 shadow-md relative">
              <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />

              <h2 className="font-serif font-bold text-lg text-[#140E0A] uppercase tracking-wide border-b border-[#D4C4A8] pb-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Tổng Đơn Biên Lai
              </h2>

              <div className="space-y-3 max-h-40 overflow-y-auto pr-1 divide-y divide-[#D4C4A8]/30">
                {cart.items.map(item => (
                  <div key={item.bookId} className="flex justify-between items-start text-xs pt-2.5 first:pt-0 font-serif text-stone-700" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    <span className="line-clamp-2 flex-1 mr-4 font-bold leading-tight">{item.bookTitle} <span className="font-sans font-normal text-xs text-stone-400">x{item.quantity}</span></span>
                    <span className="font-sans font-bold text-stone-900 whitespace-nowrap">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#D4C4A8] pt-4 mt-4 space-y-2.5 text-xs uppercase tracking-wider font-bold text-stone-600" style={{ fontFamily: "'Cinzel', serif" }}>
                <div className="flex justify-between items-center">
                  <span>Sơ tính ngân</span>
                  <span className="text-[#2C2114] font-sans font-normal text-xs">{formatPrice(totalPrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-700">
                    <span>Khấu giảm</span>
                    <span className="font-sans font-normal text-xs">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>Phí vận cục</span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-extrabold">Miễn ngân</span>
                  ) : (
                    <span className="font-sans font-normal text-xs text-[#2C2114]">{formatPrice(shippingFee)}</span>
                  )}
                </div>
                {shippingFee > 0 && (
                  <p className="text-[9px] text-stone-400 font-normal normal-case tracking-normal italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    ✦ Miễn phí vận chuyển cho đơn từ {formatPrice(FREE_SHIPPING_THRESHOLD)}
                  </p>
                )}
              </div>

              <div className="border-t border-[#D4C4A8] pt-4 mt-4 flex justify-between items-baseline font-bold text-[#2C2114]">
                <span className="text-xs uppercase tracking-widest font-extrabold" style={{ fontFamily: "'Cinzel', serif" }}>Tổng ngân chung</span>
                <span className="text-xl text-[#8B6508]" style={{ fontFamily: "'Cinzel', serif" }}>{formatPrice(finalPrice)}</span>
              </div>

              {error && <div className="mt-3"><ErrorMsg message={error} /></div>}

              <div className="pt-6">
                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="relative w-full h-12 bg-transparent text-[#2C2114] border border-[#2C2114] font-bold text-xs uppercase tracking-[0.2em] rounded-[1px] overflow-hidden transition-all duration-350 before:absolute before:inset-0 before:bg-[#2C2114] before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-300 before:ease-out hover:text-[#FAF5EC] flex items-center justify-center gap-2 disabled:opacity-40 disabled:before:hidden disabled:hover:text-[#2C2114] focus:outline-none z-10"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <span className="relative z-20 flex items-center justify-center gap-2">
                    {loading ? (
                      <><Spinner size="sm" /> Đang sắc lệnh...</>
                    ) : (
                      'Khởi Sự Đặt Hàng ❖'
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
```

`src\pages\HomePage.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bookAPI, categoryAPI } from '../api';
import BookCard from '../components/book/BookCard';
import { Empty } from '../components/common';
import { BookCardSkeletonGrid } from '../components/book/BookCardSkeleton';

function OrnamentalDivider({ color = "#8B6508" }) {
  return (
    <div className="flex items-center gap-4 w-full my-12 opacity-70 select-none animate-fade-in">
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
      <div className="text-sm tracking-widest transition-all duration-300 hover:scale-110 cursor-default" style={{ color, textShadow: '0 0 8px rgba(139, 101, 8, 0.2)' }}>
        ☙ ❖ ❧
      </div>
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
    </div>
  );
}

function InteractiveBookShelf() {
  const [hovered, setHovered] = useState(null);
  const SPINE_COLORS = ["#1A2A40", "#5C201E", "#234427", "#3E1B50", "#735220", "#20424C"];
  const SPINE_TITLES = ["Plato", "Nietzsche", "Locke", "Kinh Điển", "Kant", "Spinoza"];

  return (
    <div className="relative max-w-xs mx-auto mt-6 hidden md:block select-none">
      <div className="flex items-end justify-center gap-[3px] h-[140px] px-2 relative z-10 overflow-hidden pb-1">
        {SPINE_COLORS.map((color, i) => {
          const isHov = hovered === i;
          const widths = [36, 30, 40, 32, 38, 34];
          const heights = [120, 105, 125, 110, 122, 115];
          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-t-[4px] cursor-pointer flex-shrink-0 transition-all duration-300 ease-out"
              style={{
                width: `${widths[i]}px`,
                height: `${heights[i]}px`,
                transform: isHov ? 'translateY(-12px) scaleX(1.05)' : 'translateY(0)',
                background: `linear-gradient(90deg, rgba(0,0,0,0.4) 0%, ${color} 25%, ${color} 75%, rgba(0,0,0,0.6) 100%)`,
                boxShadow: isHov ? `8px 12px 20px rgba(0,0,0,0.6)` : `2px 2px 6px rgba(0,0,0,0.35)`,
              }}
            >

              <div className="absolute inset-x-0 top-3 h-[2px] bg-black/20 border-b border-white/10" />
              <div className="absolute inset-x-0 bottom-4 h-[2px] bg-black/20 border-t border-white/10" />

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-bold tracking-widest uppercase transition-colors duration-200"
                style={{
                  transform: "translate(-50%, -50%) rotate(-90deg)",
                  fontFamily: "'Cinzel', serif",
                  color: isHov ? '#F4ECE0' : 'rgba(212, 160, 23, 0.75)'
                }}
              >
                {SPINE_TITLES[i]}
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[12px] bg-gradient-to-b from-[#3E2F1A] to-[#1A130B] border-t-2 border-[#8B6508]/40 shadow-xl rounded-b-[2px]" />
    </div>
  );
}

export default function HomePage() {
  const [newBooks, setNewBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [booksRes, catsRes] = await Promise.all([
          bookAPI.getAll({ page: 1, size: 6, sortBy: 'createdAt', sortDir: 'desc' }),
          categoryAPI.getAll({ page: 1, size: 6 }),
        ]);
        setNewBooks(booksRes.data?.content || []);
        setCategories(catsRes.data?.content || catsRes.data || []);
      } catch (_) { }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/books?keyword=${encodeURIComponent(search.trim())}`);
  };

  const categoryIcons = ['📜', '🏛️', '🖋️', '⚖️', '🕊️', '🕰️'];

  return (
    <div className="min-h-screen bg-[#FAF3E3] text-[#261C12] selection:bg-[#E6CE9A] relative overflow-x-hidden antialiased">

      <div className="absolute inset-0 bg-[radial-gradient(#C4B293_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF3E3]/50 to-transparent pointer-events-none" />

      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Cinzel:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto border-x border-[#C4B498]/40 lg:border-x-4 lg:border-double lg:border-[#C4B498]/80 bg-[#FAF3E3] shadow-[0_0_60px_rgba(38,28,18,0.15)] relative">

        <div className="absolute inset-y-0 left-6 w-[1px] border-l border-dashed border-[#C4B498]/30 pointer-events-none hidden lg:block" />
        <div className="absolute inset-y-0 right-6 w-[1px] border-r border-dashed border-[#C4B498]/30 pointer-events-none hidden lg:block" />

        <section className="border-b border-[#C4B498]/60 py-20 px-6 md:px-16 relative overflow-hidden">
          <div className="absolute inset-6 border border-[#8B6508]/20 pointer-events-none rounded-[2px]" />
          <div className="absolute -top-24 -left-24 w-48 h-48 border border-[#8B6508]/10 rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 border border-[#8B6508]/10 rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="text-[#8B6508] text-xs tracking-[0.4em] uppercase font-extrabold block mb-5 animate-fade-in" style={{ fontFamily: "'Cinzel', serif" }}>
              ✦ EX LIBRIS BIBLIOTHECA ✦
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#140E0A] leading-tight mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Những Cuốn Sách <em className="font-serif italic font-normal text-[#8B6508] relative inline-block">Khai Mở<span className="absolute bottom-2 left-0 w-full h-[2px] bg-[#8B6508]/20"></span></em> Bản Ngã
            </h1>

            <div className="text-[#4E3A26] text-lg md:text-xl mb-10 font-serif leading-relaxed text-center italic max-w-2xl mx-auto font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              "Nơi lưu giữ những hệ tư tưởng vĩ đại làm thay đổi sâu sắc toàn bộ dòng chảy lịch sử và nền văn minh nhân loại qua muôn vàn thế kỷ thịnh suy."
            </div>

            <form onSubmit={handleSearch} className="flex max-w-lg mx-auto gap-3 border-b-2 border-[#261C12]/80 pb-3 focus-within:border-[#8B6508] transition-all duration-300 group px-2">
              <span className="text-[#A8967E] group-focus-within:text-[#8B6508] transition-colors duration-300">🔍</span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Khảo cứu tác phẩm, tác giả hoặc hệ tư tưởng..."
                className="flex-1 bg-transparent text-[#261C12] focus:outline-none text-base placeholder-[#A8967E]/80 font-serif italic"
              />
              <button type="submit" className="text-[#261C12] hover:text-[#8B6508] text-xs font-bold tracking-widest uppercase transition-colors duration-200" style={{ fontFamily: "'Cinzel', serif" }}>
                TRA CỨU
              </button>
            </form>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-[#C4B498]/60">

          <div className="lg:col-span-3 p-6 md:p-12 space-y-16 border-r-0 lg:border-r border-[#C4B498]/60">

            {categories.length > 0 && (
              <div>
                <div className="flex items-end justify-between mb-8 border-b border-[#C4B498] pb-4">
                  <h2 className="text-2xl font-serif font-bold text-[#140E0A] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                    I. Hệ Thống Tư Tưởng
                  </h2>
                  <Link to="/categories" className="text-[#614E3A] hover:text-[#8B6508] text-xs font-bold uppercase tracking-widest pb-1 border-b-2 border-transparent hover:border-[#8B6508] transition-all duration-300" style={{ fontFamily: "'Cinzel', serif" }}>
                    XEM PHÂN HỆ →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {categories.map((cat, i) => (
                    <Link
                      key={cat.id}
                      to={`/books?categoryId=${cat.id}`}
                      className="flex items-center gap-4 p-5 bg-[#F5EFE0] border border-[#C4B498]/60 hover:border-[#8B6508] hover:bg-white transition-all duration-300 shadow-[2px_2px_8px_rgba(38,28,18,0.03)] hover:shadow-[4px_8px_20px_rgba(139,101,8,0.1)] group rounded-[1px]"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FAF3E3] group-hover:bg-[#FAF3E3]/50 flex items-center justify-center text-2xl shadow-inner transition-colors duration-300">
                        <span className="filter sepia-[0.2] group-hover:scale-110 transition-transform duration-300">{categoryIcons[i % categoryIcons.length]}</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-[#3E2F1A] font-bold tracking-wider group-hover:text-[#8B6508] block uppercase transition-colors duration-200" style={{ fontFamily: "'Cinzel', serif" }}>
                          {cat.name}
                        </span>
                        <span className="text-[11px] font-serif italic text-stone-500 block mt-0.5">Khảo cứu văn bản</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <OrnamentalDivider />

            <div>
              <div className="flex items-end justify-between mb-8 border-b border-[#C4B498] pb-4">
                <h2 className="text-2xl font-serif font-bold text-[#140E0A] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                  II. Ấn Bản Mới Thu Thập
                </h2>
                <Link to="/books" className="text-[#614E3A] hover:text-[#8B6508] text-xs font-bold uppercase tracking-widest pb-1 border-b-2 border-transparent hover:border-[#8B6508] transition-all duration-300" style={{ fontFamily: "'Cinzel', serif" }}>
                  TRA KHỐ →
                </Link>
              </div>

              {loading ? (
                <BookCardSkeletonGrid count={6} />
              ) : newBooks.length === 0 ? (
                <div className="bg-[#FAF3E3] py-16 border border-dashed border-[#C4B498] text-center rounded-[2px]"><Empty message="Chưa có bản thảo mới." /></div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {newBooks.map(book => (
                    <div key={book.id} className="hover:-translate-y-2 transition-transform duration-300 ease-out">
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="bg-[#F4ECE0]/80 p-8 space-y-12 font-serif text-sm border-t lg:border-t-0 border-[#C4B498]/60">

            <div className="border-b border-[#C4B498]/60 pb-8 text-center">
              <span className="text-[10px] uppercase font-extrabold text-[#8B6508] tracking-[0.2em] block mb-3" style={{ fontFamily: "'Cinzel', serif" }}>TỦ CỔ THƯ VIRTUAL</span>
              <InteractiveBookShelf />
            </div>

            <div className="border-b border-[#C4B498]/60 pb-8 space-y-4 relative">
              <span className="absolute top-0 right-0 text-4xl text-[#C4B498]/30 font-serif pointer-events-none select-none">“</span>
              <h4 className="text-xs uppercase font-extrabold text-[#140E0A] tracking-wider border-l-2 border-[#8B6508] pl-3" style={{ fontFamily: "'Cinzel', serif" }}>
                Lời Người Đi Trước
              </h4>
              <p className="text-stone-800 italic leading-relaxed text-justify px-1 text-base font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                "Cuộc sống không được phản tỉnh thì không đáng sống."
              </p>
              <span className="block text-right text-xs font-bold text-[#8B6508] tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>— Socrates</span>
            </div>

            <div className="border-b border-[#C4B498]/60 pb-8 space-y-4">
              <h4 className="text-xs uppercase font-extrabold text-[#140E0A] tracking-wider border-l-2 border-[#8B6508] pl-3" style={{ fontFamily: "'Cinzel', serif" }}>
                Số Liệu Ký Mục
              </h4>
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center border-b border-[#C4B498]/30 pb-2">
                  <span className="text-stone-700 font-serif">Tác phẩm tinh tuyển:</span>
                  <span className="font-bold text-[#8B6508] bg-[#FAF3E3] px-2 py-0.5 rounded-[2px] shadow-sm font-mono">XII,450+</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#C4B498]/30 pb-2">
                  <span className="text-stone-700 font-serif">Đại tư tưởng gia:</span>
                  <span className="font-bold text-[#8B6508] bg-[#FAF3E3] px-2 py-0.5 rounded-[2px] shadow-sm font-mono">DCCCL+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-700 font-serif">Thời gian vận chuyển:</span>
                  <span className="font-bold text-[#8B6508] bg-[#FAF3E3] px-2 py-0.5 rounded-[2px] shadow-sm font-mono">XLVIII H</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-[#FAF3E3]/40 p-4 border border-[#C4B498]/40 rounded-[2px]">
              <h4 className="text-xs uppercase font-extrabold text-[#140E0A] tracking-wider border-l-2 border-[#8B6508] pl-2" style={{ fontFamily: "'Cinzel', serif" }}>
                Thư Sảnh Nhật Ký
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed text-justify italic font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Bản dịch mới cho cuốn <span className="not-italic font-bold text-[#140E0A]">Phê phán lý tính thuần túy</span> của Immanuel Kant dự kiến sẽ cập bến vào tuần sau. Độc giả có thể liên hệ bộ phận cổ thư để đặt trước.
              </p>
            </div>

          </div>

        </div>

        <section className="p-6 md:p-12 bg-[#FAF3E3]">
          <div className="bg-[#1E1410] text-[#FAF3E3] py-16 px-6 md:px-12 rounded-[2px] text-center border-2 border-double border-[#8B6508] relative overflow-hidden shadow-2xl group">

            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#8B6508]/60 transition-all duration-300 group-hover:scale-105" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#8B6508]/60 transition-all duration-300 group-hover:scale-105" />

            <div className="absolute inset-0 bg-[radial-gradient(rgba(139,101,8,0.15)_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#D4A017] text-xs tracking-[0.40em] font-extrabold block mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                — EX LIBRIS PRIVILEGIO —
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#E6C280] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                Mật Mã Ưu Đãi Học Giả
              </h3>
              <p className="text-stone-300 text-base font-serif italic mb-8 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Nhập mã độc quyền <span className="text-[#E6C280] font-bold not-italic border-b-2 border-[#8B6508] px-2 py-0.5 bg-black/40 tracking-wider font-mono">PHILOSOPHY26</span> để nhận đặc quyền tri ân thượng hạng từ Thư phòng.
              </p>
              <Link
                to="/books"
                className="bg-[#8B6508] hover:bg-[#A67B1E] text-white font-bold px-10 py-4 shadow-lg transition-all duration-300 inline-block uppercase tracking-[0.2em] text-xs rounded-[1px] hover:shadow-[0_0_25px_rgba(139,101,8,0.4)]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                SƯU TẦM CỔ THƯ
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
```

`src\pages\OrderPages.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { orderAPI, paymentAPI } from '../api';
import { formatPrice, formatDate, getOrderStatusColor, getOrderStatusLabel, getPaymentStatusLabel, PLACEHOLDER_BOOK } from '../utils';
import { Spinner, Pagination } from '../components/common';

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    orderAPI.getMyOrders()
      .then(r => setOrders(r.data || []))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const ordersList = Array.isArray(orders) ? orders : (orders?.content || []);
  const totalPages = Math.ceil(ordersList.length / itemsPerPage);
  const paginatedOrders = ordersList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-[#FAF5EC] min-h-screen text-[#2C2114] selection:bg-[#E6CE9A]/50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#140E0A] tracking-wide border-b border-[#D4C4A8] pb-5 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Lịch Sử Tông Ký (Quản Lý Đơn Hàng)
        </h1>
        {loading ? (
          <div className="flex justify-center py-28"><Spinner size="lg" /></div>
        ) : !ordersList.length ? (
          <div className="bg-[#FAF5EC] border border-[#D4C4A8] py-20 px-4 text-center shadow-sm relative">
            <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />
            <span className="inline-block text-3xl text-[#A8967E] mb-4">❖</span>
            <h2 className="text-lg font-serif font-bold text-[#140E0A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Chưa Có Đơn Kỳ
            </h2>
            <p className="text-stone-500 text-xs font-serif italic mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Nơi đây chưa lưu vết bất kỳ giao dịch tàng thư hay điều phối mộc bản nào.
            </p>
            <Link to="/books" className="inline-block bg-[#8B6508] hover:bg-[#A67B1E] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-[1px] transition-all shadow-sm" style={{ fontFamily: "'Cinzel', serif" }}>
              Khởi Sự Tầm Thư
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedOrders.map(order => (
                <Link key={order.id} to={`/orders/${order.id}`} className="block bg-[#FAF5EC] border border-[#D4C4A8] p-5 shadow-sm hover:border-[#8B6508]/60 hover:shadow-md transition-all relative group">
                  <div className="absolute inset-1 border border-[#8B6508]/0 group-hover:border-[#8B6508]/5 pointer-events-none transition-all" />
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-sm text-[#140E0A] uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                        Mã Số Ký # {order.id}
                      </p>
                      <p className="text-[11px] text-stone-400 font-mono mt-0.5">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className={`text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-[1px] border ${getOrderStatusColor(order.status)}`} style={{ fontFamily: "'Cinzel', serif" }}>
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#D4C4A8]/30">
                    <p className="text-xs font-serif italic text-stone-500" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Thu thâu {order.items?.length || 0} mục văn bản
                    </p>
                    <p className="font-bold text-sm text-[#8B6508]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button key={pageNum} onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 border rounded-[1px] text-xs font-mono font-bold transition-all ${page === pageNum ? 'bg-[#2C2114] text-[#FAF5EC] border-[#2C2114]' : 'border-[#D4C4A8] hover:bg-[#8B6508]/5 text-[#2C2114]'}`}>
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function OrderDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [zaloPayLoading, setZaloPayLoading] = useState(false);
  const [zaloPayError, setZaloPayError] = useState('');

  useEffect(() => {
    orderAPI.getById(id).then(r => setOrder(r.data)).catch(() => { }).finally(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Hành vi huỷ bỏ tàng thư này không thể vãn hồi. Xác nhận trục xuất đơn ký?')) return;
    setCancelling(true);
    try {
      const res = await orderAPI.cancel(id);
      setOrder(res.data);
    } catch (_) { }
    finally { setCancelling(false); }
  };

  const handleZaloPayNow = async () => {
    setZaloPayLoading(true);
    setZaloPayError('');
    try {
      const res = await paymentAPI.zaloPayInit(id);
      const orderUrl = res?.data?.orderUrl;
      if (orderUrl) {
        window.location.href = orderUrl;
      } else {
        setZaloPayError('Không nhận được đường dẫn thanh toán từ ZaloPay.');
      }
    } catch (err) {
      setZaloPayError(err.message || 'Khởi tạo thanh toán thất bại.');
    } finally {
      setZaloPayLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-28 bg-[#FAF5EC] min-h-screen"><Spinner size="lg" /></div>;
  if (!order) return (
    <div className="text-center py-28 bg-[#FAF5EC] min-h-screen text-stone-500 font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      Không tìm thấy dữ kiện về đơn văn bách nghệ này.
    </div>
  );

  
  
  const pendingZaloPay = location.state?.pendingPayment && location.state?.zalopay;
  const showZaloPayBanner = (pendingZaloPay || (
    order?.paymentMethod === 'ZALOPAY' && order?.paymentStatus === 'UNPAID'
  )) && order?.status === 'PENDING';

  return (
    <div className="bg-[#FAF5EC] min-h-screen text-[#2C2114] selection:bg-[#E6CE9A]/50 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {location.state?.success && !location.state?.zalopay && (
          <div className="bg-emerald-50 border-2 border-emerald-700/30 text-emerald-950 px-5 py-4 rounded-[1px] mb-8 text-center text-xs uppercase tracking-widest font-bold relative" style={{ fontFamily: "'Cinzel', serif" }}>
            <div className="absolute inset-0.5 border border-emerald-750/5 pointer-events-none" />
            ❖ Khởi trạng hoàn tất! Bản ký đã được nghi nhận vào hệ thống tàng thư quốc gia.
          </div>
        )}

        {}
        {showZaloPayBanner && (
          <div className="bg-blue-50 border-2 border-blue-400/40 text-blue-900 px-5 py-5 rounded-[1px] mb-8 relative" style={{ fontFamily: "'Cinzel', serif" }}>
            <div className="absolute inset-0.5 border border-blue-300/10 pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-black">Z</span>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-700">
                    Đơn Hàng Chưa Thanh Toán
                  </p>
                  <p className="text-[11px] font-serif italic text-blue-600 mt-0.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Quý khách chưa hoàn tất thanh toán qua ZaloPay.
                  </p>
                </div>
              </div>
              <button onClick={handleZaloPayNow} disabled={zaloPayLoading}
                className="relative h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-[0.15em] px-5 rounded-[1px] transition-all flex-shrink-0 disabled:opacity-50 flex items-center gap-2 focus:outline-none">
                {zaloPayLoading ? (
                  <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> Đang tải...</>
                ) : <>💳 Thanh Toán Ngay</>}
              </button>
            </div>
            {zaloPayError && <p className="text-red-600 text-[10px] font-serif italic mt-3">{zaloPayError}</p>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4C4A8] pb-5 mb-8">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#140E0A] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              Đơn Biên Lai # {order.id}
            </h1>
            <p className="text-[11px] text-stone-400 font-mono mt-1">Niên giám thiết lập: {formatDate(order.createdAt)}</p>
          </div>
          <span className={`text-[10px] uppercase tracking-widest font-extrabold px-4 py-2 rounded-[1px] border self-start sm:self-center ${getOrderStatusColor(order.status)}`} style={{ fontFamily: "'Cinzel', serif" }}>
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 mb-6 shadow-sm relative">
          <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#140E0A] mb-5 border-b border-[#D4C4A8]/40 pb-2" style={{ fontFamily: "'Cinzel', serif" }}>
            📚 Khảo Mục Mộc Bản
          </h2>
          <div className="space-y-4 relative z-10">
            {order.items?.map(item => (
              <div key={item.bookId} className="flex gap-4 items-center border-b border-[#D4C4A8]/20 pb-4 last:border-0 last:pb-0">
                <div className="border border-[#D4C4A8]/60 p-1 bg-white aspect-[3/4] w-12 flex-shrink-0">
                  <img src={item.bookCoverSnapshot || PLACEHOLDER_BOOK} alt={item.bookTitleSnapshot}
                    className="w-full h-full object-cover" onError={e => { e.target.src = PLACEHOLDER_BOOK; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-sm text-[#2C2114] line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.bookTitleSnapshot}
                  </p>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                    Số lượng: {item.quantity} × {formatPrice(item.unitPrice)}
                  </p>
                </div>
                <p className="font-bold text-xs text-[#140E0A]" style={{ fontFamily: "'Cinzel', serif" }}>
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
            <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#140E0A] mb-4 border-b border-[#D4C4A8]/40 pb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              📍 Địa Sở Tiếp Thụ
            </h2>
            {order.recipientName && (
              <div className="text-xs sm:text-sm space-y-1.5 relative z-10">
                <p className="font-bold text-[#2C2114] uppercase tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
                  {order.recipientName}
                </p>
                <p className="text-[#8B6508] font-mono">{order.recipientPhone}</p>
                <p className="text-stone-600 font-serif leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {order.shippingAddress}
                </p>
              </div>
            )}
          </div>

          <div className="bg-[#FAF5EC] border border-[#D4C4A8] p-6 shadow-sm relative">
            <div className="absolute inset-1.5 border border-[#8B6508]/5 pointer-events-none" />
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#140E0A] mb-4 border-b border-[#D4C4A8]/40 pb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              💰 Đối Chiếu Ngân Khố
            </h2>
            {}
            <div className="text-xs uppercase tracking-wider font-bold text-stone-600 space-y-2 relative z-10" style={{ fontFamily: "'Cinzel', serif" }}>
              <div className="flex justify-between items-center">
                <span>Nguyên ngân tinh</span>
                <span className="text-[#2C2114] font-sans font-normal text-xs">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between items-center text-emerald-700">
                  <span>Khấu trừ giảm</span>
                  <span className="font-sans font-normal text-xs">-{formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span>Vận chuyển cục</span>
                <span className={order.shippingFee > 0 ? 'font-sans font-normal text-xs' : 'text-emerald-700 font-extrabold'}>
                  {order.shippingFee > 0 ? formatPrice(order.shippingFee) : 'Miễn ngân'}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-[#140E0A] border-t border-[#D4C4A8]/40 pt-2 mt-2 font-extrabold">
                <span className="text-[11px]">Tổng ngân tất yếu</span>
                <span className="text-sm text-[#8B6508] font-sans font-bold">{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] pt-1 text-stone-500">
                <span>Khố trạng hiệu</span>
                <span className="text-[#2C2114] font-serif italic text-xs lowercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {getPaymentStatusLabel(order.paymentStatus)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link to="/orders" className="text-xs uppercase tracking-widest font-extrabold text-[#8B6508] hover:text-[#A67B1E] transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
            ← Bản Sách Tổng Ký
          </Link>
          {order.status === 'PENDING' && (
            <button onClick={handleCancel} disabled={cancelling}
              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-[1px] transition-colors disabled:opacity-40 focus:outline-none"
              style={{ fontFamily: "'Cinzel', serif" }}>
              {cancelling ? 'Đang Khấu Trục...' : '✕ Trục Xuất Đơn Đặt'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

```

`src\pages\ProfilePage.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI, addressAPI, orderAPI } from '../api';
import { ErrorMsg, Spinner } from '../components/common';
import { formatPrice, formatDate, getOrderStatusColor, getOrderStatusLabel } from '../utils';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); 

  
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwError, setPwError] = useState('');

  
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
          {}
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

          {}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {}
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

                {}
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
```

`src\pages\WishlistPage.jsx`:

```jsx
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { PLACEHOLDER_BOOK, formatPrice, getDiscountPercent } from "../utils";

/* ─── Mock API ─── replace these with your real src/api/index.js calls ─── */
const wishlistAPI = {
  getAll: () =>
    fetch("/api/wishlist", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((r) => r.json()),
  remove: (bookId) =>
    fetch(`/api/wishlist/${bookId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
};

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

/* ─────────────────────────── BookCard ─────────────────────────── */
function WishlistCard({ book, onRemove, onAddToCart }) {
  const [removing, setRemoving] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const discount = getDiscountPercent(book);

  const handleRemove = async () => {
    setRemoving(true);
    await onRemove(book.id);
  };

  const handleAddToCart = () => {
    onAddToCart(book);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <div
      className={`group relative bg-white border border-stone-200/80 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(44,33,20,0.1)] ${removing ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
      style={{ transition: removing ? "opacity 0.35s, transform 0.35s" : "all 0.3s" }}
    >
      {/* Remove button (Heart Icon like sample) */}
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
      <Link to={`/books/${book.slug || book.id}`} className="block overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          <img
            src={book.coverImageUrl || PLACEHOLDER_BOOK}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            onError={(e) => { e.target.src = PLACEHOLDER_BOOK; }}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        {book.category && (
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5"
            style={{ color: "#8B6508", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {book.category.name}
          </p>
        )}

        <Link to={`/books/${book.slug || book.id}`}>
          <h3
            className="font-bold text-[#140E0A] text-lg leading-snug mb-1.5 hover:text-[#8B6508] transition-colors line-clamp-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {book.title}
          </h3>
        </Link>

        {book.authors?.length > 0 && (
          <p
            className="text-sm text-stone-400 italic mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {book.authors.map((a) => a.name).join(", ")}
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
          disabled={book.stockQuantity === 0}
          className={`w-full relative h-11 font-black text-[11px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 ${book.stockQuantity === 0
            ? "bg-stone-200 text-stone-400 cursor-not-allowed"
            : addedToCart
              ? "bg-[#8B6508] text-[#FAF5EC]"
              : "bg-[#000000] text-[#FAF5EC] hover:bg-[#8B6508]"
            }`}
        >
          {book.stockQuantity === 0
            ? "Hết Hàng"
            : addedToCart
              ? "✓ Đã Thêm"
              : "Add to Bag"}
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
                style={{
                  height: item.height,
                  backgroundColor: item.color,
                }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white/80 tracking-widest"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full h-10 border border-[#2C2114] text-[#2C2114] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#2C2114] hover:text-[#FAF5EC] transition-all duration-200"
        >
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
          {["Triết học", "Văn học cổ điển", "Tư tưởng phương Đông", "Lịch sử"].map(
            (cat) => (
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
            )
          )}
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
  const { addToCart } = useCart();

  const loadWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const data = await wishlistAPI.getAll();
      setBooks(Array.isArray(data) ? data : data.content ?? []);
    } catch {
      setError("Không thể tải danh sách yêu thích. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
    const interval = setInterval(() => setQuoteIndex((i) => i + 1), 6000);
    return () => clearInterval(interval);
  }, [loadWishlist]);

  const handleRemove = async (bookId) => {
    try {
      await wishlistAPI.remove(bookId);
      setTimeout(() => {
        setBooks((prev) => prev.filter((b) => b.id !== bookId));
      }, 380);
    } catch {
      alert("Không thể xoá. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "#FAF5EC" }}>
      {/* ── Hero Banner (Matched completely to image) ── */}
      <div
        className="relative border border-stone-200/80 mx-4 mt-8 mb-12 md:mx-12 lg:mx-24 p-12 text-center"
        style={{ backgroundColor: "#F5EDD8" }}
      >
        {/* Corner ornaments */}
        {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
          (pos) => (
            <span
              key={pos}
              className={`absolute ${pos} w-3 h-3 border-stone-400/40 select-none`}
            />
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
          Danh Sách Yêu Thích <em className="italic text-[#8B6508] font-normal font-serif"></em>
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
            placeholder="Khảo cứu tác phẩm, tác giả hoặc hệ tư tưởng..."
            className="w-full bg-transparent text-sm text-[#140E0A] placeholder-stone-400/80 focus:outline-none italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
          <button
            className="text-[10px] font-black tracking-widest text-stone-600 uppercase border-l border-stone-300 pl-4 ml-2 whitespace-nowrap hover:text-[#8B6508]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            TRA CỨU
          </button>
        </div>
      </div>

      {/* ── Main Layout Split ── */}
      <div className="px-4 md:px-12 lg:px-24">
        {/* Adjusted Column ratio: Left 73%, Right 27% */}
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
                    ({books.length})
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
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
              /* Adjusted grid layout for items to look larger and better proportioned */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8">
                {books.map((book) => (
                  <WishlistCard
                    key={book.id}
                    book={book}
                    onRemove={handleRemove}
                    onAddToCart={(b) => addToCart(b, 1)}
                  />
                ))}
              </div>
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
```

`src\pages\ZaloPayReturnPage.jsx`:

```jsx
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { paymentAPI } from '../api';
import { Spinner } from '../components/common';

export default function ZaloPayReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  
  
  const appTransId = searchParams.get('apptransid') || '';
  const statusParam = searchParams.get('status');   
  const isPaid = statusParam === '1';

  
  const orderId = (() => {
    const parts = appTransId.split('_');
    
    if (parts.length >= 2) return parts[1];
    return null;
  })();

  const [syncing, setSyncing] = useState(true);
  const [syncResult, setSyncResult] = useState(null); 
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

    
    poll();
    pollRef.current = setInterval(poll, 2000);

    return () => clearInterval(pollRef.current);
  }, [orderId]);

  
  useEffect(() => {
    if (!syncing && orderId) {
      const t = setTimeout(() => {
        navigate(`/orders/${orderId}`, { replace: true });
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [syncing, orderId, navigate]);

  

  const finalStatus = syncResult?.status ?? (isPaid ? 'SUCCESS' : 'FAILED');
  const isSuccess = finalStatus === 'SUCCESS';

  return (
    <div className="bg-[#FAF5EC] min-h-screen flex items-center justify-center px-4 py-20"
      style={{ fontFamily: "'Cinzel', serif" }}>

      <div className="w-full max-w-md text-center">

        {}
        <div className="bg-[#FAF5EC] border-2 border-[#2C2114]/70 p-10 shadow-xl relative">
          <div className="absolute inset-1.5 border border-[#8B6508]/10 pointer-events-none" />

          {syncing ? (
            
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
            
            <div className="space-y-5">
              {}
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
            
            <div className="space-y-5">
              {}
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

        {}
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

```

`src\utils\cloudinary.js`:

```js
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export async function uploadToCloudinary(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "bookstore/books");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.secure_url);
      } else {
        reject(new Error("Upload thất bại: " + xhr.statusText));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Lỗi mạng khi upload")));
    xhr.addEventListener("abort", () => reject(new Error("Upload bị huỷ")));

    xhr.open("POST", UPLOAD_URL);
    xhr.send(formData);
  });
}

```

`src\utils\index.js`:

```js
export const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price,
  );

export const formatDate = (date) =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

export const truncate = (str, n = 100) =>
  str?.length > n ? str.slice(0, n) + "..." : str;

export const getOrderStatusColor = (status) => {
  const map = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-indigo-100 text-indigo-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    RETURNED: "bg-orange-100 text-orange-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
};

export const getOrderStatusLabel = (status) => {
  const map = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    PROCESSING: "Đang xử lý",
    SHIPPED: "Đang giao",
    DELIVERED: "Đã giao",
    CANCELLED: "Đã huỷ",
    RETURNED: "Đã trả hàng",
  };
  return map[status] || status;
};

export const getPaymentStatusLabel = (status) => {
  const map = {
    UNPAID: "Chưa thanh toán",
    PAID: "Đã thanh toán",
    REFUNDED: "Đã hoàn tiền",
  };
  return map[status] || status;
};

export const PLACEHOLDER_BOOK =
  "https://placehold.co/300x400/f0e6d3/8b5e3c?text=📖";

export const getDiscountPercent = (book) => {
  if (!book?.discountPrice || !book?.price || book.discountPrice >= book.price)
    return 0;
  return Math.round((1 - book.discountPrice / book.price) * 100);
};

```

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

```

`vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

```