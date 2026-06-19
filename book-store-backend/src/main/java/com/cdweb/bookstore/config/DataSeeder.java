package com.cdweb.bookstore.config;

import com.cdweb.bookstore.modules.order.model.Coupon;
import com.cdweb.bookstore.modules.order.model.Order;
import com.cdweb.bookstore.modules.order.model.OrderItem;
import com.cdweb.bookstore.modules.order.repository.CouponRepository;
import com.cdweb.bookstore.modules.order.repository.OrderRepository;
import com.cdweb.bookstore.modules.product.model.*;
import com.cdweb.bookstore.modules.product.repository.AuthorRepository;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.product.repository.CategoryRepository;
import com.cdweb.bookstore.modules.product.repository.PublisherRepository;
import com.cdweb.bookstore.modules.user.model.Role;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.RoleRepository;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;
    private final BookRepository bookRepository;
    private final CouponRepository couponRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() > 0 || userRepository.count() > 0) {
            log.info("Database đã có sẵn dữ liệu. Bỏ qua bước Seeding.");
            return;
        }

        log.info("Bắt đầu khởi tạo dữ liệu mẫu cho Bookstore...");

        // 1. Seed Roles
        Role userRole = Role.builder().name("USER").build();
        Role adminRole = Role.builder().name("ADMIN").build();
        roleRepository.saveAll(Arrays.asList(userRole, adminRole));
        log.info("Đã lưu các Roles mặc định.");

        // 2. Seed Users
        User admin = User.builder()
                .name("Admin Bookstore")
                .email("admin@gmail.com")
                .password(passwordEncoder.encode("123456"))
                .provider(User.Provider.LOCAL)
                .roles(Set.of(adminRole))
                .build();

        User customer = User.builder()
                .name("Nguyễn Văn A")
                .email("user@gmail.com")
                .password(passwordEncoder.encode("123456"))
                .provider(User.Provider.LOCAL)
                .roles(Set.of(userRole))
                .build();

        userRepository.saveAll(Arrays.asList(admin, customer));
        log.info("Đã lưu tài khoản Admin (admin@gmail.com / 123456) và Customer (user@gmail.com / 123456).");

        // 3. Seed Categories
        Category catVanHoc = Category.builder().name("Văn học").slug("van-hoc").description("Các tác phẩm tiểu thuyết, truyện ngắn").build();
        Category catKinhTe = Category.builder().name("Kinh tế").slug("kinh-te").description("Sách tài chính, quản trị kinh doanh").build();
        Category catKyNang = Category.builder().name("Kỹ năng sống").slug("ky-nang-song").description("Phát triển bản thân, kỹ năng mềm").build();
        Category catKhoaHoc = Category.builder().name("Khoa học").slug("khoa-hoc").description("Sách khoa học tự nhiên và xã hội").build();
        Category catThieuNhi = Category.builder().name("Thiếu nhi").slug("thieu-nhi").description("Truyện tranh, truyện ngụ ngôn trẻ em").build();
        categoryRepository.saveAll(Arrays.asList(catVanHoc, catKinhTe, catKyNang, catKhoaHoc, catThieuNhi));

        // 4. Seed Authors
        Author autDale = Author.builder().name("Dale Carnegie").bio("Tác giả viết sách tự giúp nổi tiếng người Mỹ.").build();
        Author autPaulo = Author.builder().name("Paulo Coelho").bio("Tiểu thuyết gia người Brazil.").build();
        Author autRobert = Author.builder().name("Robert Kiyosaki").bio("Nhà đầu tư, doanh nhân và tác giả.").build();
        Author autNhatAnh = Author.builder().name("Nguyễn Nhật Ánh").bio("Nhà văn nổi tiếng của Việt Nam với các tác phẩm tuổi trẻ.").build();
        Author autHarari = Author.builder().name("Yuval Noah Harari").bio("Nhà lịch sử học và tác giả người Israel.").build();
        authorRepository.saveAll(Arrays.asList(autDale, autPaulo, autRobert, autNhatAnh, autHarari));

        // 5. Seed Publishers
        Publisher pubTre = Publisher.builder().name("NXB Trẻ").description("Nhà xuất bản uy tín tại TP. Hồ Chí Minh").website("https://www.nxbtre.com.vn").build();
        Publisher pubKimDong = Publisher.builder().name("NXB Kim Đồng").description("Nhà xuất bản sách thiếu nhi hàng đầu Việt Nam").website("https://www.nxbkimdong.com.vn").build();
        Publisher pubHoiNhaVan = Publisher.builder().name("NXB Hội Nhà Văn").description("Nhà xuất bản tác phẩm văn học Việt Nam").website("http://nxbhoinhavan.vn").build();
        Publisher pubTheGioi = Publisher.builder().name("NXB Thế Giới").description("Nhà xuất bản sách dịch thuật, lịch sử, văn hóa").website("http://nxbthegioi.com.vn").build();
        publisherRepository.saveAll(Arrays.asList(pubTre, pubKimDong, pubHoiNhaVan, pubTheGioi));

        // 6. Seed Books with real titles and placeholders
        List<Book> books = new ArrayList<>();
        
        books.add(createBook("Đắc Nhân Tâm", "dac-nhan-tam", "Sách đắc nhân tâm của Dale Carnegie giúp bạn xây dựng mối quan hệ.", 
                "9786041029302", 86000, 78000, 100, 320, catKyNang, pubTre, autDale,
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"));

        books.add(createBook("Nhà Giả Kim", "nha-gia-kim", "Hành trình theo đuổi ước mơ của chàng chăn cừu Santiago.", 
                "9786045332612", 79000, 69000, 85, 228, catVanHoc, pubHoiNhaVan, autPaulo,
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300"));

        books.add(createBook("Cha Giàu Cha Nghèo", "cha-giau-cha-ngheo", "Học cách tư duy tài chính thông minh từ Robert Kiyosaki.", 
                "9786041131102", 95000, 85000, 120, 380, catKinhTe, pubTre, autRobert,
                "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=300"));

        books.add(createBook("Cho Tôi Xin Một Vé Đi Tuổi Thơ", "cho-toi-xin-mot-ve-di-tuoi-tho", "Cuốn sách đưa độc giả quay lại thế giới của tuổi thơ hồn nhiên.", 
                "9786041014112", 72000, 65000, 150, 208, catVanHoc, pubTre, autNhatAnh,
                "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300"));

        books.add(createBook("Tôi Thấy Hoa Vàng Trên Cỏ Xanh", "toi-thay-hoa-vang-tren-co-xanh", "Truyện dài tái hiện bức tranh đồng quê nghèo khó và tình cảm anh em.", 
                "9786041029112", 115000, 99000, 90, 378, catVanHoc, pubTre, autNhatAnh,
                "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=300"));

        books.add(createBook("Sapiens: Lược Sử Loài Người", "sapiens-luoc-su-loai-nguoi", "Khám phá lịch sử loài người từ thời đồ đá đến nay.", 
                "9786047746112", 189000, 169000, 50, 560, catKhoaHoc, pubTheGioi, autHarari,
                "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=300"));

        bookRepository.saveAll(books);
        log.info("Đã lưu các đầu sách thực tế.");

        // 7. Seed Coupons
        Coupon c1 = Coupon.builder().code("UUDAI10").type(Coupon.CouponType.PERCENTAGE).value(BigDecimal.valueOf(10))
                .minOrderAmount(BigDecimal.valueOf(50000)).status(Coupon.CouponStatus.ACTIVE).startDate(Instant.now().minus(1, ChronoUnit.DAYS))
                .endDate(Instant.now().plus(30, ChronoUnit.DAYS)).usageLimit(100).build();
        Coupon c2 = Coupon.builder().code("KM30K").type(Coupon.CouponType.FIXED_AMOUNT).value(BigDecimal.valueOf(30000))
                .minOrderAmount(BigDecimal.valueOf(150000)).status(Coupon.CouponStatus.ACTIVE).startDate(Instant.now().minus(1, ChronoUnit.DAYS))
                .endDate(Instant.now().plus(30, ChronoUnit.DAYS)).usageLimit(50).build();
        couponRepository.saveAll(Arrays.asList(c1, c2));

        // 8. Seed Historical Orders for Last 6 Months (important for Dashboard Statistics)
        Random random = new Random();
        Instant baseTime = Instant.now();

        log.info("Bắt đầu tạo đơn hàng mẫu cho 6 tháng gần nhất...");
        for (int monthOffset = 5; monthOffset >= 0; monthOffset--) {
            // Create 3-5 orders per month
            int ordersInMonth = 3 + random.nextInt(3);
            for (int i = 0; i < ordersInMonth; i++) {
                Instant orderTime = baseTime
                        .minus(monthOffset * 30L, ChronoUnit.DAYS)
                        .minus(random.nextInt(28), ChronoUnit.DAYS);

                // Select a random book
                Book book = books.get(random.nextInt(books.size()));
                int qty = 1 + random.nextInt(3);
                BigDecimal price = book.getEffectivePrice();
                BigDecimal subtotal = price.multiply(BigDecimal.valueOf(qty));
                BigDecimal shipping = subtotal.compareTo(BigDecimal.valueOf(300000)) >= 0 ? BigDecimal.ZERO : BigDecimal.valueOf(30000);
                BigDecimal total = subtotal.add(shipping);

                Order.OrderStatus status = Order.OrderStatus.DELIVERED;
                Order.PaymentStatus payStatus = Order.PaymentStatus.PAID;

                // Make some orders CANCELLED or PENDING for stats diversity
                if (monthOffset == 0 && i == 0) {
                    status = Order.OrderStatus.PENDING;
                    payStatus = Order.PaymentStatus.UNPAID;
                } else if (i == 1 && random.nextBoolean()) {
                    status = Order.OrderStatus.CANCELLED;
                    payStatus = Order.PaymentStatus.UNPAID;
                }

                Order order = Order.builder()
                        .user(customer)
                        .subtotal(subtotal)
                        .shippingFee(shipping)
                        .totalAmount(total)
                        .status(status)
                        .paymentMethod(Order.PaymentMethod.COD)
                        .paymentStatus(payStatus)
                        .recipientName("Khách Hàng Mẫu " + i)
                        .recipientPhone("0987654321")
                        .shippingAddress("Địa chỉ ngẫu nhiên, Hà Nội")
                        .createdAt(orderTime)
                        .build();

                OrderItem item = OrderItem.builder()
                        .order(order)
                        .book(book)
                        .quantity(qty)
                        .unitPrice(price)
                        .bookTitleSnapshot(book.getTitle())
                        .bookCoverSnapshot(book.getCoverUrl())
                        .build();

                order.getItems().add(item);
                orderRepository.save(order);
            }
        }

        log.info("Hoàn thành Seeding toàn bộ dữ liệu mẫu!");
    }

    private Book createBook(String title, String slug, String desc, String isbn, double price, double discountPrice,
                            int stock, int pages, Category category, Publisher publisher, Author author, String imgUrl) {
        Book book = Book.builder()
                .title(title)
                .slug(slug)
                .description(desc)
                .isbn(isbn)
                .price(BigDecimal.valueOf(price))
                .discountPrice(BigDecimal.valueOf(discountPrice))
                .stockQuantity(stock)
                .pages(pages)
                .language("Tiếng Việt")
                .category(category)
                .publisher(publisher)
                .status(Book.Status.ACTIVE)
                .isDeleted(false)
                .authors(new ArrayList<>(Collections.singletonList(author)))
                .build();

        BookImage image = BookImage.builder()
                .book(book)
                .imageUrl(imgUrl)
                .isCover(true)
                .sortOrder(1)
                .build();

        book.getImages().add(image);
        return book;
    }
}
