Project Path: src

Source Tree:

```txt
src
├── main
│   ├── java
│   │   └── com
│   │       └── cdweb
│   │           └── bookstore
│   │               ├── BookstoreApplication.java
│   │               ├── common
│   │               │   ├── ApiResponse.java
│   │               │   ├── GlobalExceptionHandle.java
│   │               │   ├── PageResponse.java
│   │               │   ├── exception
│   │               │   │   ├── CustomAccessDeniedHandler.java
│   │               │   │   ├── CustomAuthenticationEntryPoint.java
│   │               │   │   ├── ResourceAlreadyExistsException.java
│   │               │   │   └── ResourceNotFoundException.java
│   │               │   └── service
│   │               │       └── EmailService.java
│   │               ├── config
│   │               │   ├── CustomOAuth2UserService.java
│   │               │   ├── DataSeeder.java
│   │               │   ├── GoogleOAuth2SuccessHandler.java
│   │               │   ├── JwtConfig.java
│   │               │   ├── JwtProperties.java
│   │               │   ├── JwtService.java
│   │               │   ├── OpenAPIConfig.java
│   │               │   ├── SecurityConfig.java
│   │               │   ├── UserDetailsServiceImpl.java
│   │               │   └── ZaloPayProperties.java
│   │               └── modules
│   │                   ├── auth
│   │                   │   ├── AuthController.java
│   │                   │   ├── AuthService.java
│   │                   │   └── dto
│   │                   │       ├── ChangePasswordRequest.java
│   │                   │       ├── ForgotPasswordRequest.java
│   │                   │       ├── LoginRequest.java
│   │                   │       ├── LoginResponse.java
│   │                   │       ├── RegisterRequest.java
│   │                   │       ├── RegisterResponse.java
│   │                   │       └── ResetPasswordRequest.java
│   │                   ├── interaction
│   │                   │   ├── controller
│   │                   │   │   ├── CommentController.java
│   │                   │   │   ├── ReviewController.java
│   │                   │   │   └── WishlistController.java
│   │                   │   ├── dto
│   │                   │   │   ├── CommentRequest.java
│   │                   │   │   ├── CommentResponse.java
│   │                   │   │   ├── ReviewDTO.java
│   │                   │   │   └── WishlistResponse.java
│   │                   │   ├── model
│   │                   │   │   ├── Comment.java
│   │                   │   │   ├── Notification.java
│   │                   │   │   ├── Review.java
│   │                   │   │   ├── ViewHistory.java
│   │                   │   │   └── Wishlist.java
│   │                   │   ├── repository
│   │                   │   │   ├── CommentRepository.java
│   │                   │   │   ├── ReviewRepository.java
│   │                   │   │   └── WishlistRepository.java
│   │                   │   └── service
│   │                   │       ├── CommentService.java
│   │                   │       ├── ReviewService.java
│   │                   │       └── WishlistService.java
│   │                   ├── order
│   │                   │   ├── controller
│   │                   │   │   ├── AddressController.java
│   │                   │   │   ├── AdminCouponController.java
│   │                   │   │   ├── AdminDashboardController.java
│   │                   │   │   ├── AdminOrderController.java
│   │                   │   │   ├── CartController.java
│   │                   │   │   ├── CouponUserController.java
│   │                   │   │   └── OrderController.java
│   │                   │   ├── dto
│   │                   │   │   ├── AddToCartRequest.java
│   │                   │   │   ├── AddressRequest.java
│   │                   │   │   ├── AddressResponse.java
│   │                   │   │   ├── CartItemResponse.java
│   │                   │   │   ├── CartResponse.java
│   │                   │   │   ├── CheckoutRequest.java
│   │                   │   │   ├── CouponRequest.java
│   │                   │   │   ├── CouponResponse.java
│   │                   │   │   ├── CouponValidationResponse.java
│   │                   │   │   ├── DashboardStatsResponse.java
│   │                   │   │   ├── MonthlyRevenueProjection.java
│   │                   │   │   ├── OrderItemResponse.java
│   │                   │   │   ├── OrderResponse.java
│   │                   │   │   ├── TopBookProjection.java
│   │                   │   │   ├── UpdateCartItemRequest.java
│   │                   │   │   └── UpdatePaymentStatusRequest.java
│   │                   │   ├── model
│   │                   │   │   ├── Address.java
│   │                   │   │   ├── Cart.java
│   │                   │   │   ├── CartItem.java
│   │                   │   │   ├── Coupon.java
│   │                   │   │   ├── CouponUsage.java
│   │                   │   │   ├── Order.java
│   │                   │   │   └── OrderItem.java
│   │                   │   ├── repository
│   │                   │   │   ├── AddressRepository.java
│   │                   │   │   ├── CartRepository.java
│   │                   │   │   ├── CouponRepository.java
│   │                   │   │   ├── CouponUsageRepository.java
│   │                   │   │   └── OrderRepository.java
│   │                   │   └── service
│   │                   │       ├── AddressService.java
│   │                   │       ├── AdminDashboardService.java
│   │                   │       ├── CartService.java
│   │                   │       ├── CheckoutService.java
│   │                   │       ├── CouponAdminService.java
│   │                   │       ├── CouponService.java
│   │                   │       └── OrderService.java
│   │                   ├── payment
│   │                   │   ├── controller
│   │                   │   │   └── ZaloPayController.java
│   │                   │   ├── dto
│   │                   │   │   ├── ZaloPayDTOs.java
│   │                   │   │   └── ZaloPayInitResponse.java
│   │                   │   ├── model
│   │                   │   │   └── ZaloPayTransaction.java
│   │                   │   ├── repository
│   │                   │   │   └── ZaloPayTransactionRepository.java
│   │                   │   └── service
│   │                   │       ├── ZaloPayApiService.java
│   │                   │       └── ZaloPayPaymentService.java
│   │                   ├── product
│   │                   │   ├── controller
│   │                   │   │   ├── AdminAuthorController.java
│   │                   │   │   ├── AdminBookController.java
│   │                   │   │   ├── AdminCategoryController.java
│   │                   │   │   ├── AdminPublisherController.java
│   │                   │   │   ├── AuthorController.java
│   │                   │   │   ├── BookController.java
│   │                   │   │   ├── CategoryController.java
│   │                   │   │   └── PublisherController.java
│   │                   │   ├── dto
│   │                   │   │   ├── AuthorDTO.java
│   │                   │   │   ├── BookDTO.java
│   │                   │   │   ├── CategoryDTO.java
│   │                   │   │   └── PublisherDTO.java
│   │                   │   ├── model
│   │                   │   │   ├── Author.java
│   │                   │   │   ├── Book.java
│   │                   │   │   ├── BookImage.java
│   │                   │   │   ├── Category.java
│   │                   │   │   └── Publisher.java
│   │                   │   ├── repository
│   │                   │   │   ├── AuthorRepository.java
│   │                   │   │   ├── BookRepository.java
│   │                   │   │   ├── CategoryRepository.java
│   │                   │   │   └── PublisherRepository.java
│   │                   │   └── service
│   │                   │       ├── AuthorService.java
│   │                   │       ├── BookService.java
│   │                   │       ├── CategoryService.java
│   │                   │       └── PublisherService.java
│   │                   └── user
│   │                       ├── model
│   │                       │   ├── PasswordResetOtp.java
│   │                       │   ├── RefreshToken.java
│   │                       │   ├── Role.java
│   │                       │   └── User.java
│   │                       └── repository
│   │                           ├── PasswordResetOtpRepository.java
│   │                           ├── RefreshTokenRepository.java
│   │                           ├── RoleRepository.java
│   │                           └── UserRepository.java
│   └── resources
└── test
    └── java
        └── com
            └── cdweb
                └── bookstore
                    └── BookstoreApplicationTests.java

```

`main\java\com\cdweb\bookstore\BookstoreApplication.java`:

```java
package com.cdweb.bookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookstoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookstoreApplication.class, args);
    }

}

```

`main\java\com\cdweb\bookstore\common\ApiResponse.java`:

```java
package com.cdweb.bookstore.common;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private String status;
    private String message;
    private T data;
    private String errorCode;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    public ApiResponse(HttpStatus httpStatus, String message, T data, String errorCode) {
        this.status = httpStatus.is2xxSuccessful() ? "success" : "error";
        this.message = message;
        this.data = data;
        this.errorCode = errorCode;
        this.timestamp = LocalDateTime.now();
    }

    
    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Thao tác thành công", data, null));
    }

    
    public static <T> ResponseEntity<ApiResponse<T>> ok(T data, String message) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, message, data, null));
    }

    
    public static <T> ResponseEntity<ApiResponse<T>> created(T data, String message) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(HttpStatus.CREATED, message, data, null));
    }

    
    public static <T> ResponseEntity<ApiResponse<T>> error(String message, String errorCode) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(HttpStatus.BAD_REQUEST, message, null, errorCode));
    }

    
    public static <T> ResponseEntity<ApiResponse<T>> unauthorized(String message) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse<>(HttpStatus.UNAUTHORIZED, message, null, "AUTH_UNAUTHORIZED"));
    }

    
    public static <T> ResponseEntity<ApiResponse<T>> internalServerError(String message) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, message, null, "SERVER_ERROR"));
    }
}
```

`main\java\com\cdweb\bookstore\common\GlobalExceptionHandle.java`:

```java
package com.cdweb.bookstore.common;

import java.util.List;
import java.util.stream.Collectors;

import com.cdweb.bookstore.common.exception.ResourceAlreadyExistsException;
import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandle {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception ex) {
		ex.printStackTrace();
		return ApiResponse.error("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.", "INTERNAL_SERVER_ERROR");
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<?> handleNotFound(EntityNotFoundException ex) {
		return ApiResponse.error(ex.getMessage(), HttpStatus.BAD_REQUEST.name());
	}

	@ExceptionHandler({ ResourceNotFoundException.class, ResourceAlreadyExistsException.class })
	public ResponseEntity<?> handleNotFound(Exception ex) {
		return ApiResponse.error(ex.getMessage(), HttpStatus.BAD_REQUEST.name());
	}

	@ExceptionHandler(org.springframework.security.authentication.BadCredentialsException.class)
	public ResponseEntity<?> handleBadCredentials(org.springframework.security.authentication.BadCredentialsException ex) {
		return ApiResponse.error("Email hoặc mật khẩu không chính xác.", "BAD_CREDENTIALS");
	}

	@ExceptionHandler(org.springframework.security.core.userdetails.UsernameNotFoundException.class)
	public ResponseEntity<?> handleUsernameNotFound(org.springframework.security.core.userdetails.UsernameNotFoundException ex) {
		return ApiResponse.error(ex.getMessage(), "USER_NOT_FOUND");
	}

	@ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
	public ResponseEntity<?> handleAccessDenied(org.springframework.security.access.AccessDeniedException ex) {
		return ResponseEntity.status(HttpStatus.FORBIDDEN)
				.body(new ApiResponse<>(HttpStatus.FORBIDDEN, "Bạn không có quyền truy cập tài nguyên này.", null, "FORBIDDEN"));
	}

	@ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
	public ResponseEntity<?> handleAuthenticationException(org.springframework.security.core.AuthenticationException ex) {
		return ApiResponse.unauthorized("Yêu cầu chưa được xác thực hoặc phiên làm việc đã hết hạn.");
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
		String message = ex.getMessage();
		if (message == null || message.isBlank()) {
			message = "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.";
		}
		return ApiResponse.error(message, "BAD_REQUEST");
	}

	
	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<?> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
		String errorMessage = String.format("Tham số '%s' có giá trị '%s' không đúng định dạng.", ex.getName(),
				ex.getValue());
		return ApiResponse.error(errorMessage, HttpStatus.BAD_REQUEST.name());
	}

	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
		List<String> errorList = ex.getBindingResult().getFieldErrors().stream()
				.map(error -> error.getField() + ": " + error.getDefaultMessage()).collect(Collectors.toList());
		String errors = String.join("; ", errorList);
		ApiResponse<Object> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, errors, null, "VALIDATION_ERROR");
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

}

```

`main\java\com\cdweb\bookstore\common\PageResponse.java`:

```java
package com.cdweb.bookstore.common;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean hasNext;
    private boolean hasPrevious;

    public static <T> PageResponse<T> from(Page<T> page) {
        // @formatter:off
        return new PageResponse<>(
                page.getContent(),
                page.getNumber() + 1,
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.hasNext(),
                page.hasPrevious()
        );
        // @formatter:on
    }
}

```

`main\java\com\cdweb\bookstore\common\exception\CustomAccessDeniedHandler.java`:

```java


package com.cdweb.bookstore.common.exception;

import java.io.IOException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
					   AccessDeniedException accessDeniedException) throws IOException {

		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.setContentType("application/json;charset=UTF-8");

		String body = """
				{
				  "status": "error",
				  "message": "Bạn không có quyền truy cập tài nguyên này",
				  "data": null,
				  "errorCode": "FORBIDDEN"
				}
				""";

		response.getWriter().write(body);
	}
}

```

`main\java\com\cdweb\bookstore\common\exception\CustomAuthenticationEntryPoint.java`:

```java


package com.cdweb.bookstore.common.exception;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
						 AuthenticationException authException) throws IOException {

		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json;charset=UTF-8");

		String body = """
				{
				  "status": "error",
				  "message": "Bạn cần đăng nhập hoặc token không hợp lệ",
				  "data": null,
				  "errorCode": "AUTH_UNAUTHORIZED"
				}
				""";

		response.getWriter().write(body);
	}
}

```

`main\java\com\cdweb\bookstore\common\exception\ResourceAlreadyExistsException.java`:

```java
package com.cdweb.bookstore.common.exception;

public class ResourceAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ResourceAlreadyExistsException(String message) {
		super(message);
	}
}

```

`main\java\com\cdweb\bookstore\common\exception\ResourceNotFoundException.java`:

```java
package com.cdweb.bookstore.common.exception;

public class ResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException(String message) {
		super(message);
	}

}

```

`main\java\com\cdweb\bookstore\common\service\EmailService.java`:

```java
package com.cdweb.bookstore.common.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendOtpEmail(String to, String otp) {
        log.info("=== [OTP SYSTEM] Preparing to send OTP '{}' to email: {} ===", otp, to);
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("[Bookstore] Mã OTP khôi phục mật khẩu");
            message.setText("Xin chào,\n\n"
                    + "Mã OTP khôi phục mật khẩu của bạn là: " + otp + "\n\n"
                    + "Mã này có hiệu lực trong vòng 5 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.\n\n"
                    + "Trân trọng,\n"
                    + "Bookstore Team");
            mailSender.send(message);
            log.info("=== [OTP SYSTEM] Sent OTP email successfully to {} ===", to);
        } catch (Exception e) {
            log.error("=== [OTP SYSTEM] Failed to send email via SMTP: {}. Showing OTP here for development/testing: {} ===", e.getMessage(), otp);
        }
    }
}

```

`main\java\com\cdweb\bookstore\config\CustomOAuth2UserService.java`:

```java
package com.cdweb.bookstore.config;

import com.cdweb.bookstore.modules.user.model.Role;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String avatarUrl = (String) attributes.get("picture");
        String providerId = (String) attributes.get("sub"); 

        log.info("Google OAuth2 login: email={}", email);

        User user = userRepository.findByEmail(email)
                .map(existing -> updateGoogleInfo(existing, providerId, avatarUrl))
                .orElseGet(() -> createGoogleUser(email, name, avatarUrl, providerId));

        
        Map<String, Object> enrichedAttributes = new java.util.HashMap<>(attributes);
        enrichedAttributes.put("userId", user.getId());
        enrichedAttributes.put("localEmail", email);

        return new DefaultOAuth2User(
                List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_USER")),
                enrichedAttributes,
                "email" 
        );
    }

    

    private User createGoogleUser(String email, String name, String avatarUrl, String providerId) {
        log.info("Tạo user mới từ Google: {}", email);
        User user = User.builder()
                .email(email)
                .name(name != null ? name : email)
                .avatarUrl(avatarUrl)
                .provider(User.Provider.GOOGLE)
                .providerId(providerId)
                .roles(Set.of(Role.builder().id(1L).name("USER").build()))
                .build();
        return userRepository.save(user);
    }

    

    private User updateGoogleInfo(User existing, String providerId, String avatarUrl) {
        if (existing.getProvider() == User.Provider.LOCAL) {
            log.info("Link Google account cho user LOCAL: {}", existing.getEmail());
        }
        
        if (existing.getProviderId() == null) {
            existing.setProviderId(providerId);
        }
        if (existing.getAvatarUrl() == null && avatarUrl != null) {
            existing.setAvatarUrl(avatarUrl);
        }
        return userRepository.save(existing);
    }
}

```

`main\java\com\cdweb\bookstore\config\DataSeeder.java`:

```java
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

```

`main\java\com\cdweb\bookstore\config\GoogleOAuth2SuccessHandler.java`:

```java
package com.cdweb.bookstore.config;

import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class GoogleOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    
    private static final String FRONTEND_REDIRECT_URL = "http://localhost:3000/auth/callback";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        
        Object userIdRaw = oAuth2User.getAttribute("userId");
        if (userIdRaw == null) {
            log.error("Google OAuth2 success: thiếu userId trong attributes");
            response.sendRedirect(FRONTEND_REDIRECT_URL + "?error=auth_failed");
            return;
        }

        Long userId = Long.parseLong(userIdRaw.toString());
        User user = userRepository.findByIdWithRoles(userId).orElse(null);
        if (user == null) {
            log.error("Google OAuth2 success: không tìm thấy user ID={}", userId);
            response.sendRedirect(FRONTEND_REDIRECT_URL + "?error=user_not_found");
            return;
        }

        
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(r -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + r.getName()))
                .toList();
        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getEmail(), null, authorities);

        
        String accessToken = jwtService.buildAccessToken(auth, user);
        String refreshToken = jwtService.createOrRotateRefreshToken(user);

        
        jwtService.setRefreshTokenCookie(response, refreshToken);

        String redirectUrl = UriComponentsBuilder.fromUriString(FRONTEND_REDIRECT_URL)
                .queryParam("token", accessToken)
                .build()
                .encode()
                .toUriString();
        log.info("Google OAuth2: redirect về frontend [userId={}]", userId);
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}

```

`main\java\com\cdweb\bookstore\config\JwtConfig.java`:

```java
package com.cdweb.bookstore.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Configuration
@RequiredArgsConstructor
public class JwtConfig {

    private final JwtProperties jwtProperties;

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(secretKey()).build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(secretKey()));
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        grantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return converter;
    }

    

    @Bean
    @ConditionalOnMissingBean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    private SecretKey secretKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtProperties.getBase64Secret());
        return new SecretKeySpec(keyBytes, 0, keyBytes.length, JwtService.JWT_ALGORITHM.getName());
    }
}

```

`main\java\com\cdweb\bookstore\config\JwtProperties.java`:

```java
package com.cdweb.bookstore.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.jwt")
@Getter
@Setter
public class JwtProperties {
    private String base64Secret;
    private long accessTokenExpiration;   
    private long refreshTokenExpiration;  
}
```

`main\java\com\cdweb\bookstore\config\JwtService.java`:

```java
package com.cdweb.bookstore.config;

import com.cdweb.bookstore.modules.user.model.RefreshToken;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.RefreshTokenRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProperties jwtProperties;
    private final JwtEncoder jwtEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS256;

    public String buildAccessToken(Authentication auth, User user) {
        Instant now = Instant.now();

        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("bookstore")
                .issuedAt(now)
                .expiresAt(now.plusMillis(jwtProperties.getAccessTokenExpiration()))
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("roles", roles)
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    public String createOrRotateRefreshToken(User user) {
        String tokenValue = UUID.randomUUID().toString();
        Instant expiry = Instant.now().plusMillis(jwtProperties.getRefreshTokenExpiration());

        RefreshToken refreshToken = refreshTokenRepository.findByUser(user)
                .map(rt -> {
                    rt.setToken(tokenValue);
                    rt.setExpiryDate(expiry);
                    return rt;
                })
                .orElseGet(() -> RefreshToken.builder()
                        .user(user)
                        .token(tokenValue)
                        .expiryDate(expiry)
                        .build());

        refreshTokenRepository.save(refreshToken);
        return tokenValue;
    }

    public String rotateRefreshToken(RefreshToken refreshToken) {
        String newValue = UUID.randomUUID().toString();
        refreshToken.setToken(newValue);
        refreshToken.setExpiryDate(Instant.now().plusMillis(jwtProperties.getRefreshTokenExpiration()));
        refreshTokenRepository.save(refreshToken);
        return newValue;
    }

    public void setRefreshTokenCookie(HttpServletResponse response, String tokenValue) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokenValue)
                .httpOnly(true)
                .secure(true)           
                .path("/")              
                .maxAge(jwtProperties.getRefreshTokenExpiration() / 1000)
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public void clearRefreshTokenCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}

```

`main\java\com\cdweb\bookstore\config\OpenAPIConfig.java`:

```java
package com.cdweb.bookstore.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPIConfig {

    private SecurityScheme createBearerScheme() {
        // @formatter:off
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer")
                .description("Nhập Access Token vào đây để gọi các API cần quyền truy cập.");
        // @formatter:on
    }

    private Server createServer(String url, String description) {
        Server server = new Server();
        server.setUrl(url);
        server.setDescription(description);
        return server;
    }

    private Contact createContact() {
        // @formatter:off
        return new Contact()
                .email("your-email@example.com") 
                .name("Bookstore Admin Team")
                .url("https://yourbookstore.vn"); 
        // @formatter:on
    }

    private License createLicense() {
        return new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");
    }

    private Info createApiInfo() {
        // @formatter:off
        return new Info()
                .title("Bookstore API Documentation") 
                .version("1.0.0")
                .contact(createContact())
                .description("Tài liệu API chi tiết cho hệ thống quản lý cửa hàng sách (Backend Services).")
                .termsOfService("https://yourbookstore.vn/terms")
                .license(createLicense());
        // @formatter:on
    }

    @Bean
    OpenAPI myOpenAPI() {
        // @formatter:off
        return new OpenAPI()
                .info(createApiInfo())
                .servers(List.of(
                        createServer("http://localhost:8080",
                                "Môi trường Phát triển (Development)"),
                        createServer("https://api-staging.bookstore.com",
                                "Môi trường Kiểm thử (Testing)"),
                        createServer("https://api.bookstore.com",
                                "Môi trường Thực tế (Production)")))
                .addSecurityItem(
                        new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication", createBearerScheme()));
        // @formatter:on
    }
}
```

`main\java\com\cdweb\bookstore\config\SecurityConfig.java`:

```java
package com.cdweb.bookstore.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final com.cdweb.bookstore.common.exception.CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final com.cdweb.bookstore.common.exception.CustomAccessDeniedHandler customAccessDeniedHandler;

    

    @Lazy
    private final GoogleOAuth2SuccessHandler googleOAuth2SuccessHandler;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(
                Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(
                Arrays.asList("Authorization", "Content-Type", "Cache-Control"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtDecoder jwtDecoder,
            JwtAuthenticationConverter jwtAuthenticationConverter) throws Exception {
        // @formatter:off
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .accessDeniedHandler(customAccessDeniedHandler)
            )
            
            
            .sessionManagement(s -> s
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .authorizeHttpRequests(auth -> auth

                
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers(HttpMethod.GET, "/books/**", "/categories/**",
                        "/authors/**", "/publishers/**", "/comments/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/books/**", "/categories/**",
                        "/authors/**", "/publishers/**").permitAll()

                
                
                .requestMatchers(HttpMethod.POST, "/payment/zalopay/callback").permitAll()

                
                .requestMatchers("/admin/**").hasRole("ADMIN")

                
                .requestMatchers("/cart/**").authenticated()
                .requestMatchers("/orders/**").authenticated()
                .requestMatchers("/coupons/preview").authenticated()
                .requestMatchers("/payment/**").authenticated()
                .requestMatchers("/addresses/**").authenticated()

                .anyRequest().authenticated()
            )
            
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .decoder(jwtDecoder)
                    .jwtAuthenticationConverter(jwtAuthenticationConverter)
                )
            )
            
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)
                )
                .successHandler(googleOAuth2SuccessHandler)
                .failureUrl("/auth/oauth2/failure")
            );
        // @formatter:on
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

```

`main\java\com\cdweb\bookstore\config\UserDetailsServiceImpl.java`:

```java
package com.cdweb.bookstore.config;

import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(@Nonnull String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .map(a -> (GrantedAuthority) a)
                .toList();

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword() != null ? user.getPassword() : "",
                authorities
        );
    }
}
```

`main\java\com\cdweb\bookstore\config\ZaloPayProperties.java`:

```java
package com.cdweb.bookstore.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "zalopay")
@Getter
@Setter
public class ZaloPayProperties {
    private int appId;
    private String macKey;
    private String refundKey;
    private String createOrderUrl = "https://sb-openapi.zalopay.vn/v2/create";
    private String queryOrderUrl = "https://sb-openapi.zalopay.vn/v2/query";
    private String serverUrl;
    private String clientUrl = "http://localhost:3000";
}

```

`main\java\com\cdweb\bookstore\modules\auth\AuthController.java`:

```java
package com.cdweb.bookstore.modules.auth;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.auth.dto.LoginRequest;
import com.cdweb.bookstore.modules.auth.dto.LoginResponse;
import com.cdweb.bookstore.modules.auth.dto.RegisterRequest;
import com.cdweb.bookstore.modules.auth.dto.RegisterResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import com.cdweb.bookstore.modules.auth.dto.ChangePasswordRequest;
import com.cdweb.bookstore.modules.auth.dto.ForgotPasswordRequest;
import com.cdweb.bookstore.modules.auth.dto.ResetPasswordRequest;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
// @formatter:off
public class AuthController {

    private final AuthService authService;
    

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {
        LoginResponse data = authService.login(request, response);
        return ApiResponse.ok(data, "Đăng nhập thành công");
    }

    

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response) {
        if (refreshToken == null || refreshToken.isBlank()) {
            log.warn("Yêu cầu /auth/refresh bị từ chối: Không tìm thấy cookie 'refreshToken' trong request.");
            return ApiResponse.unauthorized("Phiên làm việc hết hạn, vui lòng đăng nhập lại");
        }
        log.info("Yêu cầu /auth/refresh hợp lệ: Đã nhận được cookie 'refreshToken'. Tiến hành làm mới token...");
        LoginResponse data = authService.refresh(refreshToken, response);
        return ApiResponse.ok(data, "Lấy Access Token mới thành công");
    }

    

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response) {
        authService.logout(refreshToken, response);
        return ApiResponse.ok(null, "Đăng xuất thành công");
    }

    

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        RegisterResponse user = authService.register(request);
        return ApiResponse.created(user, "Đăng ký tài khoản người dùng thành công");
    }

    

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        authService.changePassword(extractUserId(jwt), request);
        return ApiResponse.ok(null, "Thay đổi mật khẩu thành công");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request.email());
        return ApiResponse.ok(null, "Yêu cầu khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ApiResponse.ok(null, "Khôi phục mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới.");
    }

    private Long extractUserId(Jwt jwt) {
        if (jwt == null) throw new RuntimeException("Chưa đăng nhập (thiếu JWT)");
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) return number.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
```

`main\java\com\cdweb\bookstore\modules\auth\AuthService.java`:

```java
package com.cdweb.bookstore.modules.auth;

import com.cdweb.bookstore.config.JwtProperties;
import com.cdweb.bookstore.config.JwtService;
import com.cdweb.bookstore.modules.auth.dto.LoginRequest;
import com.cdweb.bookstore.modules.auth.dto.LoginResponse;
import com.cdweb.bookstore.modules.auth.dto.RegisterRequest;
import com.cdweb.bookstore.modules.auth.dto.RegisterResponse;
import com.cdweb.bookstore.modules.user.model.RefreshToken;
import com.cdweb.bookstore.modules.user.model.Role;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.RefreshTokenRepository;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final JwtProperties jwtProperties;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final com.cdweb.bookstore.common.service.EmailService emailService;
    private final com.cdweb.bookstore.modules.user.repository.PasswordResetOtpRepository passwordResetOtpRepository;

    @Transactional
    public LoginResponse login(LoginRequest request, HttpServletResponse response) {
        log.info("Yêu cầu đăng nhập nhận được cho email: {}", request.email());

        Authentication auth = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        User user = userRepository.findByEmailWithRoles(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Email hoặc mật khẩu không chính xác."));

        String accessToken = jwtService.buildAccessToken(auth, user);
        String refreshTokenValue = jwtService.createOrRotateRefreshToken(user);
        jwtService.setRefreshTokenCookie(response, refreshTokenValue);

        log.info("Đăng nhập thành công cho user ID: {}. Đã tạo Access Token và lưu Refresh Token vào Cookie.", user.getId());

        return new LoginResponse(accessToken, "Bearer", jwtProperties.getAccessTokenExpiration() / 1000, user.getId(),
                user.getName(), user.getEmail());
    }

    @Transactional
    public LoginResponse refresh(String cookieToken, HttpServletResponse response) {
        log.info("Yêu cầu làm mới Access Token nhận được bằng Refresh Token.");

        RefreshToken refreshToken = refreshTokenRepository.findByToken(cookieToken)
                .orElseThrow(() -> {
                    log.error("Refresh token không tồn tại trong cơ sở dữ liệu.");
                    return new RuntimeException("Refresh token không hợp lệ");
                });

        if (refreshToken.isExpired()) {
            log.warn("Refresh token của User ID: {} đã hết hạn.", refreshToken.getUser().getId());
            refreshTokenRepository.delete(refreshToken);
            jwtService.clearRefreshTokenCookie(response);
            throw new RuntimeException("Refresh token đã hết hạn, vui lòng đăng nhập lại");
        }

        User user = refreshToken.getUser();
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(r -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + r.getName())).toList();
        Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);

        String newAccessToken = jwtService.buildAccessToken(auth, user);
        String newRefreshToken = jwtService.rotateRefreshToken(refreshToken);
        jwtService.setRefreshTokenCookie(response, newRefreshToken);

        log.info("Làm mới Access Token thành công cho User ID: {}. Đã xoay vòng (rotate) Refresh Token mới.", user.getId());

        return new LoginResponse(newAccessToken, "Bearer", jwtProperties.getAccessTokenExpiration() / 1000,
                user.getId(), user.getName(), user.getEmail());
    }

    @Transactional
    public void logout(String cookieToken, HttpServletResponse response) {
        if (cookieToken != null) {
            refreshTokenRepository.findByToken(cookieToken).ifPresent(refreshTokenRepository::delete);
        }
        jwtService.clearRefreshTokenCookie(response);
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new com.cdweb.bookstore.common.exception.ResourceAlreadyExistsException(
                    "Email này đã được sử dụng bởi một tài khoản khác.");
        }
        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .provider(User.Provider.LOCAL)
                .roles(Set.of(Role.builder().id(1L).name("USER").build()))
                .build();
        userRepository.save(user);
        return RegisterResponse.fromUser(user);
    }

    @Transactional
    public void changePassword(Long userId, com.cdweb.bookstore.modules.auth.dto.ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new com.cdweb.bookstore.common.exception.ResourceNotFoundException(
                        "Không tìm thấy thông tin tài khoản người dùng."));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new RuntimeException("Mật khẩu hiện tại không chính xác.");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void forgotPassword(String email) {
        if (!userRepository.existsByEmail(email)) {
            throw new com.cdweb.bookstore.common.exception.ResourceNotFoundException("Email này chưa được đăng ký trong hệ thống.");
        }

        String otpCode = String.format("%06d", new java.util.Random().nextInt(999999));
        java.time.Instant expiryDate = java.time.Instant.now().plus(5, java.time.temporal.ChronoUnit.MINUTES);

        com.cdweb.bookstore.modules.user.model.PasswordResetOtp resetOtp = com.cdweb.bookstore.modules.user.model.PasswordResetOtp.builder()
                .email(email)
                .otpCode(otpCode)
                .expiryDate(expiryDate)
                .used(false)
                .build();

        passwordResetOtpRepository.save(resetOtp);
        emailService.sendOtpEmail(email, otpCode);
    }

    @Transactional
    public void resetPassword(com.cdweb.bookstore.modules.auth.dto.ResetPasswordRequest request) {
        com.cdweb.bookstore.modules.user.model.PasswordResetOtp resetOtp = passwordResetOtpRepository
                .findFirstByEmailAndOtpCodeAndUsedFalseOrderByCreatedAtDesc(request.email(), request.otpCode())
                .orElseThrow(() -> new RuntimeException("Mã OTP không hợp lệ hoặc đã được sử dụng."));

        if (resetOtp.isExpired()) {
            throw new RuntimeException("Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.");
        }

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new com.cdweb.bookstore.common.exception.ResourceNotFoundException("Không tìm thấy người dùng có email: " + request.email()));

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);

        resetOtp.setUsed(true);
        passwordResetOtpRepository.save(resetOtp);
    }
}
```

`main\java\com\cdweb\bookstore\modules\auth\dto\ChangePasswordRequest.java`:

```java
package com.cdweb.bookstore.modules.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotBlank(message = "Mật khẩu hiện tại không được để trống")
        String currentPassword,

        @NotBlank(message = "Mật khẩu mới không được để trống")
        @Size(min = 6, message = "Mật khẩu mới phải có ít nhất 6 ký tự")
        String newPassword
) {
}

```

`main\java\com\cdweb\bookstore\modules\auth\dto\ForgotPasswordRequest.java`:

```java
package com.cdweb.bookstore.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordRequest(
        @NotBlank(message = "Email không được để trống")
        @Email(message = "Định dạng email không hợp lệ")
        String email
) {
}

```

`main\java\com\cdweb\bookstore\modules\auth\dto\LoginRequest.java`:

```java
package com.cdweb.bookstore.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// @formatter:off
public record LoginRequest(
        @NotBlank(message = "Email không được để trống")
        @Email(message = "Định dạng email không hợp lệ")
        String email,

        @NotBlank(message = "Mật khẩu không được để trống")
        @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
        String password
) {
}
```

`main\java\com\cdweb\bookstore\modules\auth\dto\LoginResponse.java`:

```java
package com.cdweb.bookstore.modules.auth.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,       
        long expiresIn,         
        Long userId,
        String name,
        String email
) {}
```

`main\java\com\cdweb\bookstore\modules\auth\dto\RegisterRequest.java`:

```java
package com.cdweb.bookstore.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// @formatter:off
public record RegisterRequest(
        @NotBlank(message = "Tên người dùng không được để trống")
        String name,

        @NotBlank(message = "Email không được để trống")
        @Email(message = "Định dạng email không hợp lệ")
        String email,

        @NotBlank(message = "Mật khẩu không được để trống")
        @Size(min = 6, max = 20, message = "Mật khẩu phải từ 6 đến 20 ký tự")
        String password
) {
}
```

`main\java\com\cdweb\bookstore\modules\auth\dto\RegisterResponse.java`:

```java
package com.cdweb.bookstore.modules.auth.dto;

import com.cdweb.bookstore.modules.user.model.Role;
import com.cdweb.bookstore.modules.user.model.User;

import java.util.Set;

public record RegisterResponse(
        Long id,
        String name,
        String email,
        Set<String> roles
) {
    public static RegisterResponse fromUser(User user) {
        return new RegisterResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRoles().stream()
                        .map(Role::getName)
                        .collect(java.util.stream.Collectors.toSet())
        );
    }
}
```

`main\java\com\cdweb\bookstore\modules\auth\dto\ResetPasswordRequest.java`:

```java
package com.cdweb.bookstore.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
        @NotBlank(message = "Email không được để trống")
        @Email(message = "Định dạng email không hợp lệ")
        String email,

        @NotBlank(message = "Mã OTP không được để trống")
        @Size(min = 6, max = 6, message = "Mã OTP phải có đúng 6 ký tự")
        String otpCode,

        @NotBlank(message = "Mật khẩu mới không được để trống")
        @Size(min = 6, max = 20, message = "Mật khẩu mới phải từ 6 đến 20 ký tự")
        String newPassword
) {
}

```

`main\java\com\cdweb\bookstore\modules\interaction\controller\CommentController.java`:

```java
package com.cdweb.bookstore.modules.interaction.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.interaction.dto.CommentRequest;
import com.cdweb.bookstore.modules.interaction.dto.CommentResponse;
import com.cdweb.bookstore.modules.interaction.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    /**
     * Lấy danh sách comments của một cuốn sách (phân trang, cho phép truy cập vãng lai)
     */
    @GetMapping("/book/{bookId}")
    public ResponseEntity<ApiResponse<Page<CommentResponse>>> getByBook(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.ok(commentService.getByBook(bookId, page, size));
    }

    /**
     * Tạo comment mới hoặc reply (yêu cầu đăng nhập)
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CommentResponse>> create(
            @Valid @RequestBody CommentRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.created(
                commentService.create(extractUserId(jwt), request),
                "Bình luận của bạn đã được đăng tải thành công."
        );
    }

    /**
     * Sửa bình luận (yêu cầu đăng nhập, chỉ chủ sở hữu được sửa)
     */
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CommentResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest request, // chỉ cần truyền trường content, có thể sử dụng lại CommentRequest
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(
                commentService.update(extractUserId(jwt), id, request.content()),
                "Cập nhật bình luận thành công."
        );
    }

    /**
     * Xóa bình luận (yêu cầu đăng nhập, chủ sở hữu hoặc admin được xóa)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        boolean isAdmin = false;
        List<String> roles = jwt.getClaimAsStringList("roles");
        if (roles != null && (roles.contains("ADMIN") || roles.contains("ROLE_ADMIN"))) {
            isAdmin = true;
        }

        commentService.delete(extractUserId(jwt), id, isAdmin);
        return ApiResponse.ok(null, "Xóa bình luận thành công.");
    }

    /**
     * Đếm tổng số bình luận hoạt động của một cuốn sách (public)
     */
    @GetMapping("/book/{bookId}/count")
    public ResponseEntity<ApiResponse<Long>> countByBook(@PathVariable Long bookId) {
        return ApiResponse.ok(commentService.countByBook(bookId));
    }

    /**
     * Hàm helper trích xuất userId từ JWT Token
     */
    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) {
            return number.longValue();
        }
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\controller\ReviewController.java`:

```java
package com.cdweb.bookstore.modules.interaction.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.interaction.dto.ReviewDTO;
import com.cdweb.bookstore.modules.interaction.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    

    @GetMapping("/book/{bookId}")
    public ResponseEntity<ApiResponse<Page<ReviewDTO>>> getByBook(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.ok(reviewService.getByBook(bookId, page, size));
    }

    

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ReviewDTO>> create(
            @RequestBody ReviewDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.created(
                reviewService.create(extractUserId(jwt), dto),
                "Đăng tải đánh giá thành công");
    }

    

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ReviewDTO>> update(
            @PathVariable Long id,
            @RequestBody ReviewDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(
                reviewService.update(extractUserId(jwt), id, dto),
                "Cập nhật đánh giá thành công");
    }

    

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        reviewService.delete(extractUserId(jwt), id);
        return ApiResponse.ok(null, "Xóa đánh giá thành công");
    }

    

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) return number.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\controller\WishlistController.java`:

```java
package com.cdweb.bookstore.modules.interaction.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.interaction.dto.WishlistResponse;
import com.cdweb.bookstore.modules.interaction.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/wishlists")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class WishlistController {

    private final WishlistService wishlistService;

    /**
     * Lấy danh sách wishlist của user đang đăng nhập — có phân trang và tìm kiếm.
     * Pattern giống BookController.getAll():
     *   GET /books?keyword=...&page=1&size=10&sortBy=id&sortDir=desc
     *   GET /wishlists?keyword=...&page=1&size=10&sortBy=createdAt&sortDir=desc
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<WishlistResponse>>> getMyWishlist(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ApiResponse.ok(
                wishlistService.getMyWishlist(extractUserId(jwt), keyword, page, size, sortBy, sortDir)
        );
    }

    /**
     * Thêm sách vào wishlist.
     * POST /wishlists/{bookId}
     */
    @PostMapping("/{bookId}")
    public ResponseEntity<ApiResponse<WishlistResponse>> addToWishlist(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ApiResponse.created(
                wishlistService.addToWishlist(extractUserId(jwt), bookId),
                "Đã thêm sách vào danh sách yêu thích."
        );
    }

    /**
     * Xóa sách khỏi wishlist theo bookId.
     * DELETE /wishlists/{bookId}
     */
    @DeleteMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Void>> removeFromWishlist(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        wishlistService.removeFromWishlist(extractUserId(jwt), bookId);
        return ApiResponse.ok(null, "Đã xóa sách khỏi danh sách yêu thích.");
    }

    /**
     * Toggle wishlist: thêm nếu chưa có, xóa nếu đã có.
     * POST /wishlists/{bookId}/toggle
     * Trả về:
     *   - WishlistResponse (added: true) khi thêm mới
     *   - { added: false } khi đã xóa
     */
    @PostMapping("/{bookId}/toggle")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleWishlist(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        WishlistResponse result = wishlistService.toggleWishlist(extractUserId(jwt), bookId);
        if (result != null) {
            return ApiResponse.ok(Map.of("added", true, "wishlist", result), "Đã thêm vào danh sách yêu thích.");
        } else {
            return ApiResponse.ok(Map.of("added", false), "Đã xóa khỏi danh sách yêu thích.");
        }
    }

    /**
     * Kiểm tra một sách cụ thể có trong wishlist không.
     * GET /wishlists/{bookId}/check
     */
    @GetMapping("/{bookId}/check")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> checkWishlist(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        boolean inWishlist = wishlistService.isInWishlist(extractUserId(jwt), bookId);
        return ApiResponse.ok(Map.of("inWishlist", inWishlist));
    }

    /**
     * Đếm tổng số sách trong wishlist.
     * GET /wishlists/count
     */
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> countMyWishlist(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(wishlistService.countMyWishlist(extractUserId(jwt)));
    }

    // ────────────────────────────────────────────
    // Helper: trích xuất userId từ JWT (giống CommentController, ReviewController)
    // ────────────────────────────────────────────
    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) return number.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\dto\CommentRequest.java`:

```java
package com.cdweb.bookstore.modules.interaction.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CommentRequest(
    Long bookId,

    Long parentId,          // null nếu là bình luận gốc

    @NotBlank(message = "Nội dung bình luận không được để trống")
    @Size(max = 2000, message = "Nội dung bình luận tối đa 2000 ký tự")
    String content
) {}

```

`main\java\com\cdweb\bookstore\modules\interaction\dto\CommentResponse.java`:

```java
package com.cdweb.bookstore.modules.interaction.dto;

import com.cdweb.bookstore.modules.interaction.model.Comment;
import java.time.Instant;
import java.util.List;

public record CommentResponse(
    Long id,
    Long bookId,
    Long userId,
    String userName,
    String userAvatarUrl,
    Long parentId,
    String content,
    boolean isDeleted,
    Instant createdAt,
    Instant updatedAt,
    List<CommentResponse> replies   // chỉ điền khi load top-level
) {
    public static CommentResponse from(Comment c, List<CommentResponse> replies) {
        if (c.isDeleted()) {
            return new CommentResponse(
                c.getId(),
                c.getBook().getId(),
                null,
                "Người dùng ẩn danh",
                null,
                c.getParent() != null ? c.getParent().getId() : null,
                "Bình luận đã bị xóa",
                true,
                c.getCreatedAt(),
                c.getUpdatedAt(),
                replies
            );
        }

        return new CommentResponse(
            c.getId(),
            c.getBook().getId(),
            c.getUser().getId(),
            c.getUser().getName(),
            c.getUser().getAvatarUrl(),
            c.getParent() != null ? c.getParent().getId() : null,
            c.getContent(),
            false,
            c.getCreatedAt(),
            c.getUpdatedAt(),
            replies
        );
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\dto\ReviewDTO.java`:

```java
package com.cdweb.bookstore.modules.interaction.dto;

import com.cdweb.bookstore.modules.interaction.model.Review;
import lombok.*;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private Long id;
    private Long userId;
    private String userName;
    private Long bookId;
    private Instant createdAt;

    private Integer rating;
    private String comment;

    public static ReviewDTO from(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .userId(review.getUser().getId())
                .userName(review.getUser().getName())
                .bookId(review.getBook().getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\dto\WishlistResponse.java`:

```java
package com.cdweb.bookstore.modules.interaction.dto;

import com.cdweb.bookstore.modules.interaction.model.Wishlist;

import java.math.BigDecimal;
import java.time.Instant;

public record WishlistResponse(
        Long wishlistId,
        Long bookId,
        String bookTitle,
        String bookSlug,
        String coverImageUrl,
        BigDecimal price,
        BigDecimal discountPrice,
        String categoryName,
        Instant addedAt
) {
    public static WishlistResponse from(Wishlist w) {
        var book = w.getBook();
        return new WishlistResponse(
                w.getId(),
                book.getId(),
                book.getTitle(),
                book.getSlug(),
                book.getCoverUrl(),
                book.getPrice(),
                book.getDiscountPrice(),
                book.getCategory() != null ? book.getCategory().getName() : null,
                w.getCreatedAt()
        );
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\model\Comment.java`:

```java
package com.cdweb.bookstore.modules.interaction.model;

import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Self-reference: reply to another comment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent")
    @Builder.Default
    private List<Comment> replies = new ArrayList<>();

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Builder.Default
    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;

    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void prePersist() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    void preUpdate() {
        this.updatedAt = Instant.now();
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\model\Notification.java`:

```java
package com.cdweb.bookstore.modules.interaction.model;

import com.cdweb.bookstore.modules.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private NotificationType type;  

    @Column(name = "is_read")
    @Builder.Default
    private boolean isRead = false;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @PrePersist
    void prePersist() {
        this.createdAt = Instant.now();
    }

    public enum NotificationType {ORDER, PROMOTION, SYSTEM, REVIEW}
}
```

`main\java\com\cdweb\bookstore\modules\interaction\model\Review.java`:

```java
package com.cdweb.bookstore.modules.interaction.model;

import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "reviews",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "book_id"}))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @PrePersist
    void prePersist() {
        this.createdAt = Instant.now();
    }
}
```

`main\java\com\cdweb\bookstore\modules\interaction\model\ViewHistory.java`:

```java
package com.cdweb.bookstore.modules.interaction.model;

import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "view_histories")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ViewHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "viewed_at")
    private Instant viewedAt;

    @PrePersist
    void prePersist() {
        this.viewedAt = Instant.now();
    }
}
```

`main\java\com\cdweb\bookstore\modules\interaction\model\Wishlist.java`:

```java
package com.cdweb.bookstore.modules.interaction.model;

import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "wishlists", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "book_id"}))
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @PrePersist
    void prePersist() {
        this.createdAt = Instant.now();
    }
}
```

`main\java\com\cdweb\bookstore\modules\interaction\repository\CommentRepository.java`:

```java
package com.cdweb.bookstore.modules.interaction.repository;

import com.cdweb.bookstore.modules.interaction.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Lấy top-level comments (không có parent) theo sách
    // Điều kiện: comment gốc chưa bị xóa HOẶC đã bị xóa nhưng vẫn có ít nhất một reply con chưa bị xóa.
    @Query("SELECT c FROM Comment c WHERE c.book.id = :bookId AND c.parent IS NULL AND " +
           "(c.isDeleted = false OR EXISTS (SELECT 1 FROM Comment r WHERE r.parent.id = c.id AND r.isDeleted = false))")
    Page<Comment> findTopLevelComments(@Param("bookId") Long bookId, Pageable pageable);

    // Lấy tất cả replies chưa bị xóa của một danh sách comment cha (để tránh N+1 query)
    @Query("SELECT c FROM Comment c WHERE c.parent.id IN :parentIds AND c.isDeleted = false ORDER BY c.createdAt ASC")
    List<Comment> findRepliesByParentIds(@Param("parentIds") List<Long> parentIds);

    // Đếm tổng số comment chưa bị xóa của một cuốn sách (cả comment gốc và reply)
    long countByBookIdAndIsDeletedFalse(Long bookId);

    // Tìm comment chưa bị xóa theo id
    Optional<Comment> findByIdAndIsDeletedFalse(Long id);

    // Tìm comment chưa bị xóa theo id và userId (để xác nhận chủ sở hữu)
    Optional<Comment> findByIdAndUserIdAndIsDeletedFalse(Long id, Long userId);
}

```

`main\java\com\cdweb\bookstore\modules\interaction\repository\ReviewRepository.java`:

```java
package com.cdweb.bookstore.modules.interaction.repository;

import com.cdweb.bookstore.modules.interaction.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByBookIdOrderByCreatedAtDesc(Long bookId, Pageable pageable);

    boolean existsByUserIdAndBookId(Long userId, Long bookId);

    Optional<Review> findByIdAndUserId(Long reviewId, Long userId);
}

```

`main\java\com\cdweb\bookstore\modules\interaction\repository\WishlistRepository.java`:

```java
package com.cdweb.bookstore.modules.interaction.repository;

import com.cdweb.bookstore.modules.interaction.model.Wishlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    /**
     * Tìm kiếm wishlist của user với phân trang.
     * Hỗ trợ tìm kiếm theo tên sách (keyword).
     * Tương tự BookRepository.searchBooks()
     */
    @Query("""
            SELECT w FROM Wishlist w
            JOIN FETCH w.book b
            WHERE w.user.id = :userId
              AND (:keyword IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')))
            ORDER BY w.createdAt DESC
            """)
    Page<Wishlist> searchWishlists(
            @Param("userId") Long userId,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    /** Kiểm tra sách đã có trong wishlist chưa */
    boolean existsByUserIdAndBookId(Long userId, Long bookId);

    /** Xóa theo userId + bookId (toggle wishlist) */
    Optional<Wishlist> findByUserIdAndBookId(Long userId, Long bookId);

    /** Đếm tổng số sách trong wishlist của user */
    long countByUserId(Long userId);
}

```

`main\java\com\cdweb\bookstore\modules\interaction\service\CommentService.java`:

```java
package com.cdweb.bookstore.modules.interaction.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.interaction.dto.CommentRequest;
import com.cdweb.bookstore.modules.interaction.dto.CommentResponse;
import com.cdweb.bookstore.modules.interaction.model.Comment;
import com.cdweb.bookstore.modules.interaction.repository.CommentRepository;
import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BookRepository    bookRepository;
    private final UserRepository    userRepository;

    /**
     * Lấy danh sách comments phân trang của một cuốn sách (chỉ top-level comments)
     * kèm theo các replies được nạp bằng Batch Fetching.
     */
    @Transactional(readOnly = true)
    public Page<CommentResponse> getByBook(Long bookId, int page, int size) {
        int pageIndex = Math.max(0, page - 1);
        Page<Comment> topLevels = commentRepository.findTopLevelComments(bookId, PageRequest.of(pageIndex, size));

        if (topLevels.isEmpty()) {
            return topLevels.map(c -> CommentResponse.from(c, Collections.emptyList()));
        }

        // Tối ưu N+1 Query: Lấy toàn bộ replies của tất cả comments cha trong trang hiện tại chỉ với 1 query
        List<Long> parentIds = topLevels.stream().map(Comment::getId).toList();
        List<Comment> allReplies = commentRepository.findRepliesByParentIds(parentIds);

        // Nhóm các replies theo parentId
        Map<Long, List<CommentResponse>> repliesMap = allReplies.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getParent().getId(),
                        Collectors.mapping(r -> CommentResponse.from(r, null), Collectors.toList())
                ));

        // Ánh xạ comments cha kèm theo danh sách replies tương ứng
        return topLevels.map(c -> CommentResponse.from(c, repliesMap.getOrDefault(c.getId(), Collections.emptyList())));
    }

    /**
     * Tạo một comment mới hoặc reply cho comment cha
     */
    @Transactional
    public CommentResponse create(Long userId, CommentRequest request) {
        if (request.bookId() == null) {
            throw new IllegalArgumentException("Book ID không được để trống");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + request.bookId()));

        Comment parent = null;
        if (request.parentId() != null) {
            parent = commentRepository.findByIdAndIsDeletedFalse(request.parentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Bình luận cha không tồn tại hoặc đã bị xóa"));

            // Validate parent comment
            if (!parent.getBook().getId().equals(request.bookId())) {
                throw new IllegalArgumentException("Bình luận cha không thuộc cùng tác phẩm");
            }
            if (parent.getParent() != null) {
                throw new IllegalArgumentException("Hệ thống chỉ hỗ trợ phản hồi bình luận lồng nhau tối đa 1 cấp");
            }
        }

        Comment comment = Comment.builder()
                .book(book)
                .user(user)
                .parent(parent)
                .content(request.content())
                .build();

        Comment saved = commentRepository.save(comment);
        return CommentResponse.from(saved, Collections.emptyList());
    }

    /**
     * Chỉnh sửa nội dung comment (Chỉ chủ sở hữu được sửa)
     */
    @Transactional
    public CommentResponse update(Long userId, Long commentId, String content) {
        Comment comment = commentRepository.findByIdAndUserIdAndIsDeletedFalse(commentId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bình luận hoặc bạn không có quyền chỉnh sửa"));

        comment.setContent(content);
        Comment saved = commentRepository.save(comment);
        return CommentResponse.from(saved, Collections.emptyList());
    }

    /**
     * Xóa bình luận (Chủ sở hữu hoặc Admin được xóa)
     */
    @Transactional
    public void delete(Long userId, Long commentId, boolean isAdmin) {
        Comment comment = commentRepository.findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Bình luận không tồn tại hoặc đã bị xóa"));

        if (!comment.getUser().getId().equals(userId) && !isAdmin) {
            throw new AccessDeniedException("Bạn không có quyền xóa bình luận này");
        }

        // Soft delete
        comment.setDeleted(true);
        commentRepository.save(comment);
    }

    /**
     * Đếm số bình luận chưa bị xóa của một sách
     */
    @Transactional(readOnly = true)
    public long countByBook(Long bookId) {
        return commentRepository.countByBookIdAndIsDeletedFalse(bookId);
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\service\ReviewService.java`:

```java
package com.cdweb.bookstore.modules.interaction.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.interaction.dto.ReviewDTO;
import com.cdweb.bookstore.modules.interaction.model.Review;
import com.cdweb.bookstore.modules.interaction.repository.ReviewRepository;
import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookRepository   bookRepository;
    private final UserRepository   userRepository;

    

    @Transactional(readOnly = true)
    public Page<ReviewDTO> getByBook(Long bookId, int page, int size) {
        int pageIndex = Math.max(0, page - 1);
        return reviewRepository
                .findByBookIdOrderByCreatedAtDesc(bookId, PageRequest.of(pageIndex, size))
                .map(ReviewDTO::from);
    }

    

    @Transactional
    public ReviewDTO create(Long userId, ReviewDTO dto) {
        if (reviewRepository.existsByUserIdAndBookId(userId, dto.getBookId())) {
            throw new RuntimeException("Bạn đã đánh giá cuốn sách này rồi.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));
        Book book = bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + dto.getBookId()));

        Review review = Review.builder()
                .user(user)
                .book(book)
                .rating(dto.getRating())
                .comment(dto.getComment())
                .build();

        return ReviewDTO.from(reviewRepository.save(review));
    }

    

    @Transactional
    public ReviewDTO update(Long userId, Long reviewId, ReviewDTO dto) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy đánh giá hoặc bạn không có quyền chỉnh sửa"));

        if (dto.getRating() != null)  review.setRating(dto.getRating());
        if (dto.getComment() != null) review.setComment(dto.getComment());

        return ReviewDTO.from(reviewRepository.save(review));
    }

    

    @Transactional
    public void delete(Long userId, Long reviewId) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy đánh giá hoặc bạn không có quyền xóa"));
        reviewRepository.delete(review);
    }
}

```

`main\java\com\cdweb\bookstore\modules\interaction\service\WishlistService.java`:

```java
package com.cdweb.bookstore.modules.interaction.service;

import com.cdweb.bookstore.common.exception.ResourceAlreadyExistsException;
import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.interaction.dto.WishlistResponse;
import com.cdweb.bookstore.modules.interaction.model.Wishlist;
import com.cdweb.bookstore.modules.interaction.repository.WishlistRepository;
import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository     userRepository;
    private final BookRepository     bookRepository;

    /**
     * Lấy danh sách wishlist của user hiện tại — có phân trang và tìm kiếm.
     * Pattern giống BookService.getAllBooks(keyword, categoryId, page, size, sortBy, sortDir).
     */
    @Transactional(readOnly = true)
    public Page<WishlistResponse> getMyWishlist(
            Long userId,
            String keyword,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        int pageIndex = Math.max(0, page - 1);
        Pageable pageable = PageRequest.of(pageIndex, size, sort);

        // keyword null/blank → truyền null để query bỏ qua điều kiện LIKE
        String kw = (keyword == null || keyword.isBlank()) ? null : keyword.trim();

        return wishlistRepository.searchWishlists(userId, kw, pageable)
                .map(WishlistResponse::from);
    }

    /**
     * Thêm sách vào wishlist.
     * Ném ResourceAlreadyExistsException nếu đã tồn tại.
     */
    @Transactional
    public WishlistResponse addToWishlist(Long userId, Long bookId) {
        if (wishlistRepository.existsByUserIdAndBookId(userId, bookId)) {
            throw new ResourceAlreadyExistsException("Sách này đã có trong danh sách yêu thích.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + bookId));

        Wishlist wishlist = Wishlist.builder()
                .user(user)
                .book(book)
                .build();

        return WishlistResponse.from(wishlistRepository.save(wishlist));
    }

    /**
     * Xóa sách khỏi wishlist theo bookId.
     * Ném ResourceNotFoundException nếu sách chưa có trong wishlist.
     */
    @Transactional
    public void removeFromWishlist(Long userId, Long bookId) {
        Wishlist wishlist = wishlistRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Sách không có trong danh sách yêu thích."));
        wishlistRepository.delete(wishlist);
    }

    /**
     * Toggle: nếu đã có thì xóa, chưa có thì thêm.
     * Trả về WishlistResponse khi thêm mới, null khi xóa.
     */
    @Transactional
    public WishlistResponse toggleWishlist(Long userId, Long bookId) {
        return wishlistRepository.findByUserIdAndBookId(userId, bookId)
                .map(existing -> {
                    wishlistRepository.delete(existing);
                    return (WishlistResponse) null;
                })
                .orElseGet(() -> addToWishlist(userId, bookId));
    }

    /**
     * Kiểm tra sách có trong wishlist của user không.
     */
    @Transactional(readOnly = true)
    public boolean isInWishlist(Long userId, Long bookId) {
        return wishlistRepository.existsByUserIdAndBookId(userId, bookId);
    }

    /**
     * Đếm tổng số sách trong wishlist.
     */
    @Transactional(readOnly = true)
    public long countMyWishlist(Long userId) {
        return wishlistRepository.countByUserId(userId);
    }
}

```

`main\java\com\cdweb\bookstore\modules\order\controller\AddressController.java`:

```java
package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.order.dto.AddressRequest;
import com.cdweb.bookstore.modules.order.dto.AddressResponse;
import com.cdweb.bookstore.modules.order.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
// @formatter:off
public class AddressController {

    private final AddressService addressService;

    
    @GetMapping
    public ResponseEntity<ApiResponse<List<AddressResponse>>> getMyAddresses(
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(addressService.getMyAddresses(extractUserId(jwt)));
    }

    
    @PostMapping
    public ResponseEntity<ApiResponse<AddressResponse>> addAddress(
            @Valid @RequestBody AddressRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        AddressResponse response = addressService.addAddress(extractUserId(jwt), request);
        return ApiResponse.created(response, "Thêm địa chỉ thành công");
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AddressResponse>> updateAddress(
            @PathVariable Long id,
            @Valid @RequestBody AddressRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        AddressResponse response = addressService.updateAddress(extractUserId(jwt), id, request);
        return ApiResponse.ok(response, "Cập nhật địa chỉ thành công");
    }

    
    @PatchMapping("/{id}/default")
    public ResponseEntity<ApiResponse<AddressResponse>> setDefault(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        AddressResponse response = addressService.setDefault(extractUserId(jwt), id);
        return ApiResponse.ok(response, "Đã đặt làm địa chỉ mặc định");
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        addressService.deleteAddress(extractUserId(jwt), id);
        return ApiResponse.ok(null, "Xóa địa chỉ thành công");
    }

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number n) return n.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\controller\AdminCouponController.java`:

```java
package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.order.dto.CouponRequest;
import com.cdweb.bookstore.modules.order.dto.CouponResponse;
import com.cdweb.bookstore.modules.order.service.CouponAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/coupons")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminCouponController {

    private final CouponAdminService couponAdminService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CouponResponse>>> getAllCoupons() {
        return ApiResponse.ok(couponAdminService.getAllCoupons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CouponResponse>> getCouponById(@PathVariable Long id) {
        return ApiResponse.ok(couponAdminService.getCouponById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CouponResponse>> createCoupon(
            @Valid @RequestBody CouponRequest request) {
        return ApiResponse.created(couponAdminService.createCoupon(request), "Tạo coupon thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CouponResponse>> updateCoupon(
            @PathVariable Long id,
            @Valid @RequestBody CouponRequest request) {
        return ApiResponse.ok(couponAdminService.updateCoupon(id, request), "Cập nhật coupon thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCoupon(@PathVariable Long id) {
        couponAdminService.deleteCoupon(id);
        return ApiResponse.ok(null, "Xóa coupon thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\controller\AdminDashboardController.java`:

```java
package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.order.dto.DashboardStatsResponse;
import com.cdweb.bookstore.modules.order.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStatistics() {
        DashboardStatsResponse stats = adminDashboardService.getDashboardStats();
        return ApiResponse.ok(stats, "Lấy thông tin thống kê dashboard thành công");
    }
}

```

`main\java\com\cdweb\bookstore\modules\order\controller\AdminOrderController.java`:

```java
package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.common.PageResponse;
import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.dto.OrderResponse;
import com.cdweb.bookstore.modules.order.dto.UpdatePaymentStatusRequest;
import com.cdweb.bookstore.modules.order.model.Order;
import com.cdweb.bookstore.modules.order.repository.OrderRepository;
import com.cdweb.bookstore.modules.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
// @formatter:off
public class AdminOrderController {

    private final OrderRepository orderRepository;
    private final OrderService    orderService;

    

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getAllOrders(
            @RequestParam(required = false) Order.OrderStatus status,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {

        Page<Order> page = (status != null)
                ? orderRepository.findAllByStatusWithItems(status, pageable)
                : orderRepository.findAllWithItems(pageable);

        return ApiResponse.ok(PageResponse.from(page.map(OrderResponse::fromOrder)));
    }

    

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderDetail(
            @PathVariable Long id) {

        Order order = orderRepository.findByIdWithItems(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Đơn hàng #" + id + " không tồn tại"));

        return ApiResponse.ok(OrderResponse.fromOrder(order));
    }

    

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam Order.OrderStatus status) {

        return ApiResponse.ok(
                orderService.updateStatus(id, status),
                "Cập nhật trạng thái đơn hàng thành công");
    }

    

    @PatchMapping("/{id}/payment")
    public ResponseEntity<ApiResponse<OrderResponse>> updatePaymentStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePaymentStatusRequest request) {

        return ApiResponse.ok(
                orderService.updatePaymentStatus(id, request.paymentStatus()),
                "Cập nhật trạng thái thanh toán thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\controller\CartController.java`:

```java
package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.order.dto.AddToCartRequest;
import com.cdweb.bookstore.modules.order.dto.CartResponse;
import com.cdweb.bookstore.modules.order.dto.UpdateCartItemRequest;
import com.cdweb.bookstore.modules.order.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
// @formatter:off
public class CartController {

    private final CartService cartService;

    

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(
            @AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.ok(cartService.getCart(extractUserId(jwt)));
    }

    

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addItem(
            @Valid @RequestBody AddToCartRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        CartResponse cart = cartService.addItem(extractUserId(jwt), request);
        return ApiResponse.ok(cart, "Thêm sách vào giỏ hàng thành công");
    }

    

    @PutMapping("/items/{bookId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateItem(
            @PathVariable Long bookId,
            @Valid @RequestBody UpdateCartItemRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        CartResponse cart = cartService.updateItem(extractUserId(jwt), bookId, request);
        return ApiResponse.ok(cart, "Cập nhật giỏ hàng thành công");
    }

    

    @DeleteMapping("/items/{bookId}")
    public ResponseEntity<ApiResponse<CartResponse>> removeItem(
            @PathVariable Long bookId,
            @AuthenticationPrincipal Jwt jwt) {
        CartResponse cart = cartService.removeItem(extractUserId(jwt), bookId);
        return ApiResponse.ok(cart, "Xóa sản phẩm khỏi giỏ hàng thành công");
    }

    

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(
            @AuthenticationPrincipal Jwt jwt) {
        cartService.clearCart(extractUserId(jwt));
        return ApiResponse.ok(null, "Đã xóa toàn bộ giỏ hàng");
    }

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number number) return number.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\controller\CouponUserController.java`:

```java
package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.dto.CouponValidationResponse;
import com.cdweb.bookstore.modules.order.service.CouponService;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/coupons")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class CouponUserController {

    private final CouponService  couponService;
    private final UserRepository userRepository;

    

    @GetMapping("/preview")
    public ResponseEntity<ApiResponse<CouponValidationResponse>> previewCoupon(
            @RequestParam String code,
            @RequestParam BigDecimal subtotal,
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = extractUserId(jwt);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));

        CouponValidationResponse result = couponService.previewCoupon(code, subtotal, user);
        return ApiResponse.ok(result, result.isValid() ? "Mã hợp lệ" : result.errorMessage());
    }

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number n) return n.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\controller\OrderController.java`:

```java
package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.order.dto.CheckoutRequest;
import com.cdweb.bookstore.modules.order.dto.OrderResponse;
import com.cdweb.bookstore.modules.order.service.CheckoutService;
import com.cdweb.bookstore.modules.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
// @formatter:off
public class OrderController {

    private final CheckoutService checkoutService;
    private final OrderService    orderService;

    
    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<OrderResponse>> checkout(
            @Valid @RequestBody CheckoutRequest request,
            @AuthenticationPrincipal Jwt jwt) {

        OrderResponse order = checkoutService.checkout(extractUserId(jwt), request);
        return ApiResponse.created(order, "Đặt hàng thành công! Mã đơn: #" + order.id());
    }

    
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getMyOrders(
            @AuthenticationPrincipal Jwt jwt) {

        return ApiResponse.ok(orderService.getOrdersByUser(extractUserId(jwt)));
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderDetail(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {

        return ApiResponse.ok(orderService.getOrderDetail(id, extractUserId(jwt)));
    }

    
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {

        return ApiResponse.ok(
                orderService.cancelOrder(id, extractUserId(jwt)),
                "Hủy đơn hàng thành công");
    }

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number n) return n.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\dto\AddToCartRequest.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AddToCartRequest(
        @NotNull(message = "bookId không được để trống")
        Long bookId,

        @NotNull(message = "Số lượng không được để trống")
        @Min(value = 1, message = "Số lượng phải ít nhất là 1")
        Integer quantity
) {}
```

`main\java\com\cdweb\bookstore\modules\order\dto\AddressRequest.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record AddressRequest(

        @NotBlank(message = "Họ tên không được để trống")
        String fullName,

        @NotBlank(message = "Số điện thoại không được để trống")
        @Pattern(regexp = "^(0[3|5|7|8|9])+([0-9]{7,8})$",
                message = "Số điện thoại không hợp lệ (9-10 số, đầu số 03/05/07/08/09)")
        String phone,

        @NotBlank(message = "Số nhà, tên đường không được để trống")
        String street,

        @NotBlank(message = "Phường/Xã không được để trống")
        String ward,

        @NotBlank(message = "Quận/Huyện không được để trống")
        String district,

        @NotBlank(message = "Tỉnh/Thành phố không được để trống")
        String province,

        
        boolean isDefault
) {}
```

`main\java\com\cdweb\bookstore\modules\order\dto\AddressResponse.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.Address;

public record AddressResponse(
        Long id,
        String fullName,
        String phone,
        String street,
        String ward,
        String district,
        String province,
        String fullAddress,   
        boolean isDefault
) {
    public static AddressResponse from(Address address) {
        String full = String.join(", ",
                address.getStreet(),
                address.getWard(),
                address.getDistrict(),
                address.getProvince());

        return new AddressResponse(
                address.getId(),
                address.getFullName(),
                address.getPhone(),
                address.getStreet(),
                address.getWard(),
                address.getDistrict(),
                address.getProvince(),
                full,
                address.isDefault()
        );
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\dto\CartItemResponse.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.CartItem;

import java.math.BigDecimal;

public record CartItemResponse(
                Long cartItemId,
                Long bookId,
                String bookTitle,
                String bookCoverUrl,
                BigDecimal unitPrice,
                Integer quantity,
                BigDecimal subtotal) {
        public static CartItemResponse from(CartItem item) {
                BigDecimal unitPrice = item.getUnitPrice() != null
                                ? item.getUnitPrice()
                                : item.getBook().getEffectivePrice();
                return new CartItemResponse(
                                item.getId(),
                                item.getBook().getId(),
                                item.getBook().getTitle(),
                                item.getBook().getCoverUrl(),
                                unitPrice,
                                item.getQuantity(),
                                unitPrice.multiply(BigDecimal.valueOf(item.getQuantity())));
        }
}
```

`main\java\com\cdweb\bookstore\modules\order\dto\CartResponse.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.Cart;

import java.math.BigDecimal;
import java.util.List;

public record CartResponse(
        Long cartId,
        int totalItems,
        BigDecimal totalAmount,
        List<CartItemResponse> items
) {
    public static CartResponse from(Cart cart) {
        List<CartItemResponse> items = cart.getItems().stream()
                .map(CartItemResponse::from)
                .toList();
        return new CartResponse(
                cart.getId(),
                cart.getTotalItems(),
                cart.getTotalAmount(),
                items
        );
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\dto\CheckoutRequest.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.Order;
import jakarta.validation.constraints.NotNull;

public record CheckoutRequest(

        @NotNull(message = "Địa chỉ giao hàng không được để trống")
        Long addressId,

        @NotNull(message = "Phương thức thanh toán không được để trống")
        Order.PaymentMethod paymentMethod,

        
        String couponCode,

        String note
) {}
```

`main\java\com\cdweb\bookstore\modules\order\dto\CouponRequest.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.Coupon;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.Instant;

public record CouponRequest(

        @NotBlank(message = "Mã coupon không được để trống")
        @Size(min = 3, max = 50, message = "Mã coupon phải từ 3 đến 50 ký tự")
        String code,

        @NotNull(message = "Loại coupon không được để trống")
        Coupon.CouponType type,

        @NotNull(message = "Giá trị giảm không được để trống")
        @DecimalMin(value = "0.01", message = "Giá trị giảm phải lớn hơn 0")
        BigDecimal value,

        
        @DecimalMin(value = "0", message = "Giá trị tối thiểu không được âm")
        BigDecimal minOrderAmount,

        
        @DecimalMin(value = "0", message = "Giảm tối đa không được âm")
        BigDecimal maxDiscountAmount,

        
        @Min(value = 1, message = "Giới hạn sử dụng phải ít nhất 1")
        Integer usageLimit,

        Instant startDate,
        Instant endDate,

        @NotNull(message = "Trạng thái không được để trống")
        Coupon.CouponStatus status
) {}
```

`main\java\com\cdweb\bookstore\modules\order\dto\CouponResponse.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.Coupon;

import java.math.BigDecimal;
import java.time.Instant;

public record CouponResponse(
        Long id,
        String code,
        Coupon.CouponType type,
        BigDecimal value,
        BigDecimal minOrderAmount,
        BigDecimal maxDiscountAmount,
        Integer usageLimit,
        Integer usedCount,
        Instant startDate,
        Instant endDate,
        Coupon.CouponStatus status,
        Instant createdAt
) {
    public static CouponResponse from(Coupon coupon) {
        return new CouponResponse(
                coupon.getId(),
                coupon.getCode(),
                coupon.getType(),
                coupon.getValue(),
                coupon.getMinOrderAmount(),
                coupon.getMaxDiscountAmount(),
                coupon.getUsageLimit(),
                coupon.getUsedCount(),
                coupon.getStartDate(),
                coupon.getEndDate(),
                coupon.getStatus(),
                coupon.getCreatedAt()
        );
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\dto\CouponValidationResponse.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CouponValidationResponse(
        @JsonProperty("isValid") boolean isValid,
        String couponCode,
        String couponType,
        BigDecimal discountAmount,
        String errorMessage) {
    public static CouponValidationResponse valid(String code, String type, BigDecimal discountAmount) {
        return new CouponValidationResponse(true, code, type, discountAmount, null);
    }

    public static CouponValidationResponse invalid(String code, String reason) {
        return new CouponValidationResponse(false, code, null, BigDecimal.ZERO, reason);
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\dto\DashboardStatsResponse.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public record DashboardStatsResponse(
    BigDecimal totalRevenue,
    long totalOrders,
    long totalBooks,
    long totalUsers,
    Map<String, Long> orderStatusCounts,
    List<MonthlyRevenue> monthlyRevenue,
    List<TopBook> topSellingBooks
) {
    public record MonthlyRevenue(
        String month,
        BigDecimal revenue,
        long orderCount
    ) {}

    public record TopBook(
        Long bookId,
        String title,
        String coverUrl,
        long totalSoldQuantity
    ) {}
}

```

`main\java\com\cdweb\bookstore\modules\order\dto\MonthlyRevenueProjection.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import java.math.BigDecimal;

public interface MonthlyRevenueProjection {
    String getMonth();
    BigDecimal getRevenue();
    Long getOrderCount();
}

```

`main\java\com\cdweb\bookstore\modules\order\dto\OrderItemResponse.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.OrderItem;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long bookId,
        String bookTitleSnapshot,
        String bookCoverSnapshot,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal subtotal
) {
    public static OrderItemResponse fromOrderItem(OrderItem item) {
        return new OrderItemResponse(
                item.getBook().getId(),
                item.getBookTitleSnapshot(),
                item.getBookCoverSnapshot(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getSubtotal()
        );
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\dto\OrderResponse.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.Order;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        String recipientName,
        String recipientPhone,
        String shippingAddress,
        BigDecimal subtotal,
        BigDecimal discountAmount,
        BigDecimal shippingFee,
        BigDecimal totalAmount,
        String couponCode,
        String note,
        Order.OrderStatus status,
        Order.PaymentMethod paymentMethod,
        Order.PaymentStatus paymentStatus,
        Instant createdAt,
        List<OrderItemResponse> items
) {
    public static OrderResponse fromOrder(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems().stream()
                .map(OrderItemResponse::fromOrderItem)
                .toList();

        String couponCode = order.getCoupon() != null ? order.getCoupon().getCode() : null;

        return new OrderResponse(
                order.getId(),
                order.getRecipientName(),
                order.getRecipientPhone(),
                order.getShippingAddress(),
                order.getSubtotal(),
                order.getDiscountAmount(),
                order.getShippingFee(),
                order.getTotalAmount(),
                couponCode,
                order.getNote(),
                order.getStatus(),
                order.getPaymentMethod(),
                order.getPaymentStatus(),
                order.getCreatedAt(),
                itemResponses
        );
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\dto\TopBookProjection.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

public interface TopBookProjection {
    Long getBookId();
    String getTitle();
    String getCoverUrl();
    Long getTotalSoldQuantity();
}

```

`main\java\com\cdweb\bookstore\modules\order\dto\UpdateCartItemRequest.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateCartItemRequest(
        @NotNull(message = "Số lượng không được để trống")
        @Min(value = 1, message = "Số lượng phải ít nhất là 1")
        Integer quantity
) {}
```

`main\java\com\cdweb\bookstore\modules\order\dto\UpdatePaymentStatusRequest.java`:

```java
package com.cdweb.bookstore.modules.order.dto;

import com.cdweb.bookstore.modules.order.model.Order;
import jakarta.validation.constraints.NotNull;

public record UpdatePaymentStatusRequest(
        @NotNull(message = "Trạng thái thanh toán không được để trống")
        Order.PaymentStatus paymentStatus
) {}
```

`main\java\com\cdweb\bookstore\modules\order\model\Address.java`:

```java
package com.cdweb.bookstore.modules.order.model;

import com.cdweb.bookstore.modules.user.model.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phone;

    private String street;
    private String ward;      
    private String district;  
    private String province;  

    @Column(name = "is_default")
    private boolean isDefault;
}
```

`main\java\com\cdweb\bookstore\modules\order\model\Cart.java`:

```java
package com.cdweb.bookstore.modules.order.model;
import com.cdweb.bookstore.modules.user.model.User;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CartItem> items = new ArrayList<>();

    public int getTotalItems() {
        return items.stream().mapToInt(CartItem::getQuantity).sum();
    }

    public BigDecimal getTotalAmount() {
        return items.stream().map(i -> i.getBook().getEffectivePrice().multiply(BigDecimal.valueOf(i.getQuantity()))).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\model\CartItem.java`:

```java
package com.cdweb.bookstore.modules.order.model;

import com.cdweb.bookstore.modules.product.model.Book;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items", uniqueConstraints = @UniqueConstraint(columnNames = { "cart_id", "book_id" }))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;
}
```

`main\java\com\cdweb\bookstore\modules\order\model\Coupon.java`:

```java
package com.cdweb.bookstore.modules.order.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "coupons")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CouponType type;   

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal value;

    @Column(name = "min_order_amount", precision = 12, scale = 2)
    private BigDecimal minOrderAmount;

    @Column(name = "max_discount_amount", precision = 12, scale = 2)
    private BigDecimal maxDiscountAmount;

    @Column(name = "usage_limit")
    private Integer usageLimit;

    @Column(name = "used_count")
    @Builder.Default
    private Integer usedCount = 0;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Enumerated(EnumType.STRING)
    private CouponStatus status;   

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "coupon")
    @Builder.Default
    private List<CouponUsage> usages = new ArrayList<>();

    @PrePersist
    void prePersist() {
        this.createdAt = Instant.now();
    }

    public boolean isValid(BigDecimal orderAmount) {
        Instant today = Instant.now();
        return status == CouponStatus.ACTIVE
                && (startDate == null || !today.isBefore(startDate))
                && (endDate == null || !today.isAfter(endDate))
                && (usageLimit == null || usedCount < usageLimit)
                && (minOrderAmount == null || orderAmount.compareTo(minOrderAmount) >= 0);
    }

    public BigDecimal calculateDiscount(BigDecimal orderAmount) {
        BigDecimal discount = type == CouponType.PERCENTAGE
                ? orderAmount.multiply(value).divide(BigDecimal.valueOf(100))
                : value;
        if (maxDiscountAmount != null && discount.compareTo(maxDiscountAmount) > 0)
            discount = maxDiscountAmount;
        return discount.min(orderAmount);
    }

    public enum CouponType {PERCENTAGE, FIXED_AMOUNT}

    public enum CouponStatus {ACTIVE, INACTIVE, EXPIRED}
}
```

`main\java\com\cdweb\bookstore\modules\order\model\CouponUsage.java`:

```java
package com.cdweb.bookstore.modules.order.model;

import com.cdweb.bookstore.modules.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "coupon_usages",
        uniqueConstraints = @UniqueConstraint(columnNames = {"coupon_id", "user_id", "order_id"}))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CouponUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_id", nullable = false)
    private Coupon coupon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "used_at")
    private Instant usedAt;

    @PrePersist
    void prePersist() {
        this.usedAt = Instant.now();
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\model\Order.java`:

```java
package com.cdweb.bookstore.modules.order.model;

import com.cdweb.bookstore.modules.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "discount_amount", precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(name = "shipping_fee", precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "recipient_phone")
    private String recipientPhone;

    @Column(name = "shipping_address", columnDefinition = "TEXT")
    private String shippingAddress;

    private String note;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    @PrePersist
    void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = Instant.now();
        }
    }

    public enum OrderStatus {
        PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, RETURNED
    }

    public enum PaymentMethod {COD, BANKING, MOMO, ZALOPAY, VNPAY}

    public enum PaymentStatus {UNPAID, PAID, REFUNDED}
}
```

`main\java\com\cdweb\bookstore\modules\order\model\OrderItem.java`:

```java
package com.cdweb.bookstore.modules.order.model;

import com.cdweb.bookstore.modules.product.model.Book;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    

    @Column(name = "book_title_snapshot")
    private String bookTitleSnapshot;

    

    @Column(name = "book_cover_snapshot")
    private String bookCoverSnapshot;

    public BigDecimal getSubtotal() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\repository\AddressRepository.java`:

```java
package com.cdweb.bookstore.modules.order.repository;

import com.cdweb.bookstore.modules.order.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByIdAndUserId(Long id, Long userId);

    List<Address> findByUserId(Long userId);

    Optional<Address> findByUserIdAndIsDefaultTrue(Long userId);
}
```

`main\java\com\cdweb\bookstore\modules\order\repository\CartRepository.java`:

```java
package com.cdweb.bookstore.modules.order.repository;

import com.cdweb.bookstore.modules.order.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    

    @Query("""
            SELECT c FROM Cart c
            LEFT JOIN FETCH c.items ci
            LEFT JOIN FETCH ci.book b
            WHERE c.user.id = :userId
            """)
    Optional<Cart> findByUserIdWithItems(@Param("userId") Long userId);

    Optional<Cart> findByUserId(Long userId);
}
```

`main\java\com\cdweb\bookstore\modules\order\repository\CouponRepository.java`:

```java
package com.cdweb.bookstore.modules.order.repository;

import com.cdweb.bookstore.modules.order.model.Coupon;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    Optional<Coupon> findByCode(String code);

    

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM Coupon c WHERE c.code = :code")
    Optional<Coupon> findByCodeForUpdate(@Param("code") String code);
}
```

`main\java\com\cdweb\bookstore\modules\order\repository\CouponUsageRepository.java`:

```java
package com.cdweb.bookstore.modules.order.repository;

import com.cdweb.bookstore.modules.order.model.Coupon;
import com.cdweb.bookstore.modules.order.model.CouponUsage;
import com.cdweb.bookstore.modules.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponUsageRepository extends JpaRepository<CouponUsage, Long> {

    

    boolean existsByCouponAndUser(Coupon coupon, User user);
}
```

`main\java\com\cdweb\bookstore\modules\order\repository\OrderRepository.java`:

```java
package com.cdweb.bookstore.modules.order.repository;

import com.cdweb.bookstore.modules.order.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("""
            SELECT DISTINCT o FROM Order o
            LEFT JOIN FETCH o.items oi
            LEFT JOIN FETCH oi.book
            WHERE o.user.id = :userId
            ORDER BY o.createdAt DESC
            """)
    List<Order> findByUserIdWithItems(@Param("userId") Long userId);

    @Query("""
            SELECT o FROM Order o
            LEFT JOIN FETCH o.items oi
            LEFT JOIN FETCH oi.book
            LEFT JOIN FETCH o.coupon
            WHERE o.id = :orderId
            """)
    Optional<Order> findByIdWithItems(@Param("orderId") Long orderId);

    @Query(value = """
            SELECT DISTINCT o FROM Order o
            LEFT JOIN FETCH o.items oi
            LEFT JOIN FETCH oi.book
            LEFT JOIN FETCH o.user
            ORDER BY o.createdAt DESC
            """, countQuery = "SELECT COUNT(o) FROM Order o")
    Page<Order> findAllWithItems(Pageable pageable);

    @Query(value = """
            SELECT DISTINCT o FROM Order o
            LEFT JOIN FETCH o.items oi
            LEFT JOIN FETCH oi.book
            LEFT JOIN FETCH o.user
            WHERE o.status = :status
            """, countQuery = "SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Page<Order> findAllByStatusWithItems(@Param("status") Order.OrderStatus status, Pageable pageable);

    @Query(value = "SELECT COALESCE(SUM(o.total_amount), 0) FROM orders o WHERE o.status = 'DELIVERED'", nativeQuery = true)
    java.math.BigDecimal calculateTotalRevenue();

    @Query(value = "SELECT o.status as status, COUNT(o.id) as count FROM orders o GROUP BY o.status", nativeQuery = true)
    List<Object[]> countOrdersByStatus();

    @Query(value = "SELECT DATE_FORMAT(o.created_at, '%Y-%m') AS month, " +
                   "SUM(o.total_amount) AS revenue, " +
                   "COUNT(o.id) AS orderCount " +
                   "FROM orders o " +
                   "WHERE o.status = 'DELIVERED' " +
                   "GROUP BY DATE_FORMAT(o.created_at, '%Y-%m') " +
                   "ORDER BY month DESC LIMIT 6", nativeQuery = true)
    List<com.cdweb.bookstore.modules.order.dto.MonthlyRevenueProjection> getMonthlyRevenueForLast6Months();
}
```

`main\java\com\cdweb\bookstore\modules\order\service\AddressService.java`:

```java
package com.cdweb.bookstore.modules.order.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.dto.AddressRequest;
import com.cdweb.bookstore.modules.order.dto.AddressResponse;
import com.cdweb.bookstore.modules.order.model.Address;
import com.cdweb.bookstore.modules.order.repository.AddressRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<AddressResponse> getMyAddresses(Long userId) {
        return addressRepository.findByUserId(userId).stream().map(AddressResponse::from).toList();
    }

    @Transactional
    public AddressResponse addAddress(Long userId, AddressRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));

        
        if (request.isDefault()) {
            clearCurrentDefault(userId);
        }

        
        boolean hasNoAddress = addressRepository.findByUserId(userId).isEmpty();

        Address address = Address.builder().user(user).fullName(request.fullName()).phone(request.phone()).street(request.street()).ward(request.ward()).district(request.district()).province(request.province()).isDefault(request.isDefault() || hasNoAddress).build();

        return AddressResponse.from(addressRepository.save(address));
    }

    @Transactional
    public AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request) {
        Address address = loadOwnedAddress(userId, addressId);

        if (request.isDefault() && !address.isDefault()) {
            clearCurrentDefault(userId);
        }

        address.setFullName(request.fullName());
        address.setPhone(request.phone());
        address.setStreet(request.street());
        address.setWard(request.ward());
        address.setDistrict(request.district());
        address.setProvince(request.province());
        address.setDefault(request.isDefault());

        return AddressResponse.from(addressRepository.save(address));
    }

    @Transactional
    public AddressResponse setDefault(Long userId, Long addressId) {
        Address address = loadOwnedAddress(userId, addressId);

        if (!address.isDefault()) {
            clearCurrentDefault(userId);
            address.setDefault(true);
            addressRepository.save(address);
        }

        return AddressResponse.from(address);
    }

    @Transactional
    public void deleteAddress(Long userId, Long addressId) {
        Address address = loadOwnedAddress(userId, addressId);

        if (address.isDefault()) {
            throw new RuntimeException("Không thể xóa địa chỉ mặc định. Hãy đặt địa chỉ khác làm mặc định trước.");
        }

        addressRepository.delete(address);
    }

    private Address loadOwnedAddress(Long userId, Long addressId) {
        return addressRepository.findByIdAndUserId(addressId, userId).orElseThrow(() -> new ResourceNotFoundException("Địa chỉ #" + addressId + " không tồn tại hoặc không thuộc về bạn"));
    }

    private void clearCurrentDefault(Long userId) {
        addressRepository.findByUserIdAndIsDefaultTrue(userId).ifPresent(old -> {
            old.setDefault(false);
            addressRepository.save(old);
        });
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\service\AdminDashboardService.java`:

```java
package com.cdweb.bookstore.modules.order.service;

import com.cdweb.bookstore.modules.order.dto.DashboardStatsResponse;
import com.cdweb.bookstore.modules.order.repository.OrderRepository;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();
        long totalOrders = orderRepository.count();
        long totalBooks = bookRepository.count();
        long totalUsers = userRepository.count();

        // Status counts
        List<Object[]> statusCountsRaw = orderRepository.countOrdersByStatus();
        Map<String, Long> statusCounts = new HashMap<>();
        for (Object[] row : statusCountsRaw) {
            if (row[0] != null) {
                statusCounts.put(row[0].toString(), ((Number) row[1]).longValue());
            }
        }

        // Monthly revenue
        List<DashboardStatsResponse.MonthlyRevenue> monthlyRevenue = orderRepository.getMonthlyRevenueForLast6Months()
                .stream()
                .map(proj -> new DashboardStatsResponse.MonthlyRevenue(
                        proj.getMonth(),
                        proj.getRevenue(),
                        proj.getOrderCount()
                ))
                .collect(Collectors.toList());

        // Top Selling Books
        List<DashboardStatsResponse.TopBook> topBooks = bookRepository.getTopSellingBooks()
                .stream()
                .map(proj -> new DashboardStatsResponse.TopBook(
                        proj.getBookId(),
                        proj.getTitle(),
                        proj.getCoverUrl(),
                        proj.getTotalSoldQuantity()
                ))
                .collect(Collectors.toList());

        return new DashboardStatsResponse(
                totalRevenue,
                totalOrders,
                totalBooks,
                totalUsers,
                statusCounts,
                monthlyRevenue,
                topBooks
        );
    }
}

```

`main\java\com\cdweb\bookstore\modules\order\service\CartService.java`:

```java
package com.cdweb.bookstore.modules.order.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.dto.AddToCartRequest;
import com.cdweb.bookstore.modules.order.dto.CartResponse;
import com.cdweb.bookstore.modules.order.dto.UpdateCartItemRequest;
import com.cdweb.bookstore.modules.order.model.Cart;
import com.cdweb.bookstore.modules.order.model.CartItem;
import com.cdweb.bookstore.modules.order.repository.CartRepository;
import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Transactional
    public CartResponse getCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        return CartResponse.from(cart);
    }

    @Transactional
    public CartResponse addItem(Long userId, AddToCartRequest request) {
        Cart cart = getOrCreateCart(userId);
        Book book = loadActiveBook(request.bookId());

        
        CartItem existingItem = cart.getItems().stream()
                .filter(i -> i.getBook().getId().equals(book.getId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            int newQty = existingItem.getQuantity() + request.quantity();
            assertSufficientStock(book, newQty);
            existingItem.setQuantity(newQty);
            existingItem.setUnitPrice(book.getEffectivePrice());
        } else {
            assertSufficientStock(book, request.quantity());
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .book(book)
                    .quantity(request.quantity())
                    .unitPrice(book.getEffectivePrice())
                    .build();
            cart.getItems().add(newItem);
        }

        return CartResponse.from(cartRepository.save(cart));
    }

    @Transactional
    public CartResponse updateItem(Long userId, Long bookId, UpdateCartItemRequest request) {
        Cart cart = getOrCreateCart(userId);
        Book book = loadActiveBook(bookId);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getBook().getId().equals(bookId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Sách #" + bookId + " không có trong giỏ hàng"));

        assertSufficientStock(book, request.quantity());
        item.setQuantity(request.quantity());

        return CartResponse.from(cartRepository.save(cart));
    }

    @Transactional
    public CartResponse removeItem(Long userId, Long bookId) {
        Cart cart = getOrCreateCart(userId);

        boolean removed = cart.getItems()
                .removeIf(i -> i.getBook().getId().equals(bookId));

        if (!removed) {
            throw new ResourceNotFoundException("Sách #" + bookId + " không có trong giỏ hàng");
        }

        return CartResponse.from(cartRepository.save(cart));
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserIdWithItems(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));
                    Cart newCart = Cart.builder().user(user).build();
                    return cartRepository.save(newCart);
                });
    }

    private Book loadActiveBook(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + bookId));
        if (book.getStatus() != Book.Status.ACTIVE) {
            throw new RuntimeException("Sách \"" + book.getTitle() + "\" hiện không còn bán");
        }
        return book;
    }

    private void assertSufficientStock(Book book, int requiredQty) {
        int available = book.getStockQuantity() != null ? book.getStockQuantity() : 0;
        if (available < requiredQty) {
            throw new RuntimeException(
                    "Sách \"" + book.getTitle() + "\" chỉ còn " + available +
                            " cuốn trong kho (bạn yêu cầu " + requiredQty + ")");
        }
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\service\CheckoutService.java`:

```java
package com.cdweb.bookstore.modules.order.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.dto.CheckoutRequest;
import com.cdweb.bookstore.modules.order.dto.OrderResponse;
import com.cdweb.bookstore.modules.order.model.*;
import com.cdweb.bookstore.modules.order.repository.*;
import com.cdweb.bookstore.modules.product.model.Book;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.model.User;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckoutService {

    private static final BigDecimal SHIPPING_FEE = new BigDecimal("30000");
    private static final BigDecimal FREE_SHIPPING_THRESHOLD = new BigDecimal("300000");

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final CouponRepository couponRepository;
    private final BookRepository bookRepository;
    private final CouponService couponService;

    @Transactional
    public OrderResponse checkout(Long userId, CheckoutRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));

        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Giỏ hàng không tồn tại"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Giỏ hàng đang trống, không thể đặt hàng");
        }

        BigDecimal subtotal = validateStockAndCalcSubtotal(cart.getItems());

        Address address = addressRepository.findByIdAndUserId(request.addressId(), userId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Địa chỉ giao hàng không tồn tại hoặc không thuộc về bạn"));

        BigDecimal shippingFee = calcShippingFee(subtotal);

        BigDecimal discountAmount = BigDecimal.ZERO;
        Coupon appliedCoupon = null;

        if (request.couponCode() != null && !request.couponCode().isBlank()) {
            appliedCoupon = couponRepository.findByCodeForUpdate(request.couponCode())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Mã giảm giá không tồn tại: " + request.couponCode()));

            couponService.assertCouponValid(appliedCoupon, user, subtotal);
            discountAmount = appliedCoupon.calculateDiscount(subtotal);
        }

        BigDecimal totalAmount = subtotal.subtract(discountAmount).add(shippingFee);

        Order order = Order.builder()
                .user(user)
                .coupon(appliedCoupon)
                .subtotal(subtotal)
                .discountAmount(discountAmount)
                .shippingFee(shippingFee)
                .totalAmount(totalAmount)
                .status(Order.OrderStatus.PENDING)
                .paymentMethod(request.paymentMethod())
                .paymentStatus(Order.PaymentStatus.UNPAID)
                .recipientName(address.getFullName())
                .recipientPhone(address.getPhone())
                .shippingAddress(buildAddressSnapshot(address))
                .note(request.note())
                .build();

        
        
        List<OrderItem> orderItems = buildOrderItems(cart.getItems(), order);
        order.getItems().addAll(orderItems);

        Order savedOrder = orderRepository.save(order);

        decreaseStockOrThrow(cart.getItems());

        if (appliedCoupon != null) {
            couponService.recordUsage(appliedCoupon, user, savedOrder);
        }

        cart.getItems().clear();
        cartRepository.save(cart);

        return OrderResponse.fromOrder(savedOrder);
    }

    

    private BigDecimal validateStockAndCalcSubtotal(List<CartItem> items) {
        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem item : items) {
            Book book = item.getBook();

            if (book.getStatus() != Book.Status.ACTIVE) {
                throw new RuntimeException(
                        "Sách \"" + book.getTitle() + "\" hiện không còn bán, vui lòng xóa khỏi giỏ hàng");
            }

            if (book.getStockQuantity() == null || book.getStockQuantity() < item.getQuantity()) {
                int available = book.getStockQuantity() != null ? book.getStockQuantity() : 0;
                throw new RuntimeException(
                        "Sách \"" + book.getTitle() + "\" chỉ còn " + available + " cuốn trong kho (bạn đang chọn "
                                + item.getQuantity() + ")");
            }

            BigDecimal unitPrice = item.getUnitPrice() != null
                    ? item.getUnitPrice()
                    : book.getEffectivePrice();
            subtotal = subtotal.add(unitPrice.multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        return subtotal;
    }

    

    private BigDecimal calcShippingFee(BigDecimal subtotal) {
        return subtotal.compareTo(FREE_SHIPPING_THRESHOLD) >= 0
                ? BigDecimal.ZERO
                : SHIPPING_FEE;
    }

    

    private String buildAddressSnapshot(Address address) {
        List<String> parts = new ArrayList<>();
        if (address.getStreet() != null)
            parts.add(address.getStreet());
        if (address.getWard() != null)
            parts.add(address.getWard());
        if (address.getDistrict() != null)
            parts.add(address.getDistrict());
        if (address.getProvince() != null)
            parts.add(address.getProvince());
        return String.join(", ", parts);
    }

    

    private List<OrderItem> buildOrderItems(List<CartItem> cartItems, Order order) {
        return cartItems.stream().map(item -> {
            Book book = item.getBook();
            
            BigDecimal unitPrice = item.getUnitPrice() != null
                    ? item.getUnitPrice()
                    : book.getEffectivePrice();
            return OrderItem.builder()
                    .order(order)
                    .book(book)
                    .quantity(item.getQuantity())
                    .unitPrice(unitPrice)
                    .bookTitleSnapshot(book.getTitle())
                    .bookCoverSnapshot(book.getCoverUrl())
                    .build();
        }).toList();
    }

    

    private void decreaseStockOrThrow(List<CartItem> items) {
        for (CartItem item : items) {
            int rowsAffected = bookRepository.decreaseStock(item.getBook().getId(), item.getQuantity());
            if (rowsAffected == 0) {
                throw new RuntimeException(
                        "Không thể trừ tồn kho cho sách \"" + item.getBook().getTitle() +
                                "\" — tồn kho đã thay đổi. Vui lòng kiểm tra lại giỏ hàng");
            }
        }
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\service\CouponAdminService.java`:

```java
package com.cdweb.bookstore.modules.order.service;

import com.cdweb.bookstore.common.exception.ResourceAlreadyExistsException;
import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.dto.CouponRequest;
import com.cdweb.bookstore.modules.order.dto.CouponResponse;
import com.cdweb.bookstore.modules.order.model.Coupon;
import com.cdweb.bookstore.modules.order.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponAdminService {

    private final CouponRepository couponRepository;

    @Transactional(readOnly = true)
    public List<CouponResponse> getAllCoupons() {
        return couponRepository.findAll()
                .stream()
                .map(CouponResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public CouponResponse getCouponById(Long id) {
        return CouponResponse.from(loadCoupon(id));
    }

    @Transactional
    public CouponResponse createCoupon(CouponRequest request) {
        if (couponRepository.findByCode(request.code().toUpperCase()).isPresent()) {
            throw new ResourceAlreadyExistsException(
                    "Mã coupon '" + request.code() + "' đã tồn tại");
        }

        Coupon coupon = Coupon.builder()
                .code(request.code().toUpperCase())
                .type(request.type())
                .value(request.value())
                .minOrderAmount(request.minOrderAmount())
                .maxDiscountAmount(request.maxDiscountAmount())
                .usageLimit(request.usageLimit())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .status(request.status())
                .build();

        return CouponResponse.from(couponRepository.save(coupon));
    }

    @Transactional
    public CouponResponse updateCoupon(Long id, CouponRequest request) {
        Coupon coupon = loadCoupon(id);

        
        String newCode = request.code().toUpperCase();
        if (!newCode.equals(coupon.getCode())) {
            couponRepository.findByCode(newCode).ifPresent(existing -> {
                throw new ResourceAlreadyExistsException(
                        "Mã coupon '" + newCode + "' đã được sử dụng bởi coupon khác");
            });
            coupon.setCode(newCode);
        }

        coupon.setType(request.type());
        coupon.setValue(request.value());
        coupon.setMinOrderAmount(request.minOrderAmount());
        coupon.setMaxDiscountAmount(request.maxDiscountAmount());
        coupon.setUsageLimit(request.usageLimit());
        coupon.setStartDate(request.startDate());
        coupon.setEndDate(request.endDate());
        coupon.setStatus(request.status());

        return CouponResponse.from(couponRepository.save(coupon));
    }

    @Transactional
    public void deleteCoupon(Long id) {
        Coupon coupon = loadCoupon(id);
        if (coupon.getUsedCount() > 0) {
            throw new RuntimeException(
                    "Không thể xóa coupon đã được sử dụng " + coupon.getUsedCount() + " lần. " +
                    "Hãy chuyển trạng thái sang INACTIVE nếu muốn vô hiệu hóa.");
        }
        couponRepository.delete(coupon);
    }

    private Coupon loadCoupon(Long id) {
        return couponRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy coupon với ID: " + id));
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\service\CouponService.java`:

```java
package com.cdweb.bookstore.modules.order.service;

import com.cdweb.bookstore.modules.order.dto.CouponValidationResponse;
import com.cdweb.bookstore.modules.order.model.Coupon;
import com.cdweb.bookstore.modules.order.model.CouponUsage;
import com.cdweb.bookstore.modules.order.model.Order;
import com.cdweb.bookstore.modules.order.repository.CouponRepository;
import com.cdweb.bookstore.modules.order.repository.CouponUsageRepository;
import com.cdweb.bookstore.modules.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final CouponUsageRepository couponUsageRepository;

    

    @Transactional(readOnly = true)
    public CouponValidationResponse previewCoupon(String code, BigDecimal orderAmount, User user) {
        Coupon coupon = couponRepository.findByCode(code).orElse(null);

        if (coupon == null) {
            return CouponValidationResponse.invalid(code, "Mã giảm giá không tồn tại");
        }

        String invalidReason = findInvalidReason(coupon, user, orderAmount);
        if (invalidReason != null) {
            return CouponValidationResponse.invalid(code, invalidReason);
        }

        BigDecimal discount = coupon.calculateDiscount(orderAmount);
        return CouponValidationResponse.valid(code, coupon.getType().name(), discount);
    }

    

    public void assertCouponValid(Coupon coupon, User user, BigDecimal orderAmount) {
        String reason = findInvalidReason(coupon, user, orderAmount);
        if (reason != null) {
            throw new RuntimeException("Mã giảm giá '" + coupon.getCode() + "': " + reason);
        }
    }

    

    public void recordUsage(Coupon coupon, User user, Order order) {
        coupon.setUsedCount(coupon.getUsedCount() + 1);
        couponRepository.save(coupon);

        CouponUsage usage = CouponUsage.builder().coupon(coupon).user(user).order(order).build();
        couponUsageRepository.save(usage);
    }

    

    private String findInvalidReason(Coupon coupon, User user, BigDecimal orderAmount) {
        if (!coupon.isValid(orderAmount)) {
            if (coupon.getStatus() != Coupon.CouponStatus.ACTIVE) {
                return "Mã giảm giá không còn hoạt động";
            }
            if (coupon.getMinOrderAmount() != null && orderAmount.compareTo(coupon.getMinOrderAmount()) < 0) {
                return "Đơn hàng tối thiểu " + coupon.getMinOrderAmount() + "đ mới được dùng mã này";
            }
            if (coupon.getUsageLimit() != null && coupon.getUsedCount() >= coupon.getUsageLimit()) {
                return "Mã giảm giá đã hết lượt sử dụng";
            }
            return "Mã giảm giá đã hết hạn hoặc chưa đến thời gian áp dụng";
        }

        if (couponUsageRepository.existsByCouponAndUser(coupon, user)) {
            return "Bạn đã sử dụng mã giảm giá này rồi";
        }

        return null; 
    }
}
```

`main\java\com\cdweb\bookstore\modules\order\service\OrderService.java`:

```java
package com.cdweb.bookstore.modules.order.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.dto.OrderResponse;
import com.cdweb.bookstore.modules.order.model.Order;
import com.cdweb.bookstore.modules.order.model.OrderItem;
import com.cdweb.bookstore.modules.order.repository.OrderRepository;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OrderService {

    private static final Set<Order.OrderStatus> CANCELLABLE_STATUSES = Set.of(
            Order.OrderStatus.PENDING,
            Order.OrderStatus.CONFIRMED
    );

    private final OrderRepository orderRepository;
    private final BookRepository  bookRepository;

    

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUser(Long userId) {
        return orderRepository.findByUserIdWithItems(userId)
                .stream()
                .map(OrderResponse::fromOrder)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderDetail(Long orderId, Long userId) {
        Order order = loadWithItems(orderId);
        assertOrderBelongsToUser(order, userId);
        return OrderResponse.fromOrder(order);
    }

    

    @Transactional
    public OrderResponse cancelOrder(Long orderId, Long userId) {
        Order order = loadWithItems(orderId);
        assertOrderBelongsToUser(order, userId);

        if (!CANCELLABLE_STATUSES.contains(order.getStatus())) {
            throw new RuntimeException(
                    "Không thể hủy đơn hàng ở trạng thái " + order.getStatus() +
                    ". Chỉ hủy được khi đơn ở trạng thái: " + CANCELLABLE_STATUSES);
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        restoreStock(order.getItems());

        return OrderResponse.fromOrder(orderRepository.save(order));
    }

    

    

    @Transactional
    public OrderResponse updateStatus(Long orderId, Order.OrderStatus newStatus) {
        Order order = loadWithItems(orderId);
        validateStatusTransition(order.getStatus(), newStatus);

        order.setStatus(newStatus);

        
        if (newStatus == Order.OrderStatus.CANCELLED ||
            newStatus == Order.OrderStatus.RETURNED) {
            restoreStock(order.getItems());
        }

        return OrderResponse.fromOrder(orderRepository.save(order));
    }

    

    

    @Transactional
    public OrderResponse updatePaymentStatus(Long orderId, Order.PaymentStatus newPaymentStatus) {
        Order order = loadWithItems(orderId);

        validatePaymentTransition(order.getPaymentStatus(), newPaymentStatus);
        order.setPaymentStatus(newPaymentStatus);

        return OrderResponse.fromOrder(orderRepository.save(order));
    }

    

    private Order loadWithItems(Long orderId) {
        return orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Đơn hàng #" + orderId + " không tồn tại"));
    }

    private void assertOrderBelongsToUser(Order order, Long userId) {
        
        if (!order.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException(
                    "Đơn hàng #" + order.getId() + " không tồn tại");
        }
    }

    private void restoreStock(List<OrderItem> items) {
        for (OrderItem item : items) {
            bookRepository.increaseStock(item.getBook().getId(), item.getQuantity());
        }
    }

    private void validateStatusTransition(Order.OrderStatus current, Order.OrderStatus next) {
        boolean valid = switch (current) {
            case PENDING    -> next == Order.OrderStatus.CONFIRMED  || next == Order.OrderStatus.CANCELLED;
            case CONFIRMED  -> next == Order.OrderStatus.PROCESSING || next == Order.OrderStatus.CANCELLED;
            case PROCESSING -> next == Order.OrderStatus.SHIPPED    || next == Order.OrderStatus.CANCELLED;
            case SHIPPED    -> next == Order.OrderStatus.DELIVERED  || next == Order.OrderStatus.RETURNED;
            default         -> false; 
        };

        if (!valid) {
            throw new RuntimeException(
                    "Chuyển trạng thái không hợp lệ: " + current + " → " + next);
        }
    }

    private void validatePaymentTransition(Order.PaymentStatus current, Order.PaymentStatus next) {
        boolean valid = switch (current) {
            case UNPAID   -> next == Order.PaymentStatus.PAID;
            case PAID     -> next == Order.PaymentStatus.REFUNDED;
            case REFUNDED -> false; 
        };

        if (!valid) {
            throw new RuntimeException(
                    "Chuyển trạng thái thanh toán không hợp lệ: " + current + " → " + next);
        }
    }
}
```

`main\java\com\cdweb\bookstore\modules\payment\controller\ZaloPayController.java`:

```java
package com.cdweb.bookstore.modules.payment.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.payment.dto.ZaloPayInitResponse;
import com.cdweb.bookstore.modules.payment.model.ZaloPayTransaction;
import com.cdweb.bookstore.modules.payment.service.ZaloPayPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment/zalopay")
@RequiredArgsConstructor
@Slf4j
// @formatter:off
public class ZaloPayController {

    private final ZaloPayPaymentService paymentService;

    

    @PostMapping("/init/{orderId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ZaloPayInitResponse>> initPayment(
            @PathVariable Long orderId,
            @AuthenticationPrincipal Jwt jwt) {

        ZaloPayInitResponse response = paymentService.initPayment(orderId, extractUserId(jwt));
        return ApiResponse.ok(response, "Khởi tạo thanh toán ZaloPay thành công");
    }

    

    @PostMapping("/callback")
    public ResponseEntity<Map<String, Object>> handleCallback(
            @RequestBody Map<String, Object> body) {

        String data = (String) body.get("data");
        String mac  = (String) body.get("mac");

        log.info("ZaloPay callback nhận được [data_length={}]",
                data != null ? data.length() : 0);

        boolean success = paymentService.handleCallback(data, mac);

        if (success) {
            return ResponseEntity.ok(Map.of(
                    "return_code",    1,
                    "return_message", "success"));
        } else {
            
            return ResponseEntity.ok(Map.of(
                    "return_code",    0,
                    "return_message", "Xử lý callback thất bại"));
        }
    }

    

    @GetMapping("/status/{orderId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ZaloPayTransaction>> queryStatus(
            @PathVariable Long orderId,
            @AuthenticationPrincipal Jwt jwt) {

        ZaloPayTransaction txn = paymentService.queryAndSync(orderId, extractUserId(jwt));
        return ApiResponse.ok(txn, "Truy vấn trạng thái thành công");
    }

    private Long extractUserId(Jwt jwt) {
        Object raw = jwt.getClaim("userId");
        if (raw instanceof Number n) return n.longValue();
        throw new RuntimeException("Token không hợp lệ: thiếu claim userId");
    }
}

```

`main\java\com\cdweb\bookstore\modules\payment\dto\ZaloPayDTOs.java`:

```java
package com.cdweb.bookstore.modules.payment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
class ZaloPayCreateResponse {
    
    @JsonProperty("return_code")
    private int returnCode;

    @JsonProperty("return_message")
    private String returnMessage;

    @JsonProperty("sub_return_code")
    private int subReturnCode;

    @JsonProperty("sub_return_message")
    private String subReturnMessage;

    
    @JsonProperty("order_url")
    private String orderUrl;

    
    @JsonProperty("zp_trans_token")
    private String zpTransToken;

    
    @JsonProperty("order_token")
    private String orderToken;
}

@Data
class ZaloPayQueryResponse {
    @JsonProperty("return_code")
    private int returnCode;

    @JsonProperty("return_message")
    private String returnMessage;

    @JsonProperty("sub_return_code")
    private int subReturnCode;

    @JsonProperty("sub_return_message")
    private String subReturnMessage;

    
    @JsonProperty("is_processing")
    private boolean isProcessing;

    @JsonProperty("amount")
    private long amount;

    @JsonProperty("discount_amount")
    private long discountAmount;

    @JsonProperty("zp_trans_id")
    private long zpTransId;
}

@Data
class ZaloPayCallbackPayload {
    private String data;
    private String mac;
    private int type;
}

@Data
class ZaloPayCallbackData {
    @JsonProperty("app_id")
    private int appId;

    @JsonProperty("app_trans_id")
    private String appTransId;

    @JsonProperty("app_time")
    private long appTime;

    @JsonProperty("app_user")
    private String appUser;

    @JsonProperty("amount")
    private long amount;

    @JsonProperty("embed_data")
    private String embedData;

    @JsonProperty("item")
    private String item;

    @JsonProperty("zp_trans_id")
    private long zpTransId;

    @JsonProperty("server_time")
    private long serverTime;

    @JsonProperty("channel")
    private int channel;

    @JsonProperty("merchant_user_id")
    private String merchantUserId;

    @JsonProperty("user_fee_amount")
    private long userFeeAmount;

    @JsonProperty("discount_amount")
    private long discountAmount;
}

@Data
class ZaloPayCallbackResponse {
    @JsonProperty("return_code")
    private int returnCode;

    @JsonProperty("return_message")
    private String returnMessage;

    public static ZaloPayCallbackResponse success() {
        ZaloPayCallbackResponse r = new ZaloPayCallbackResponse();
        r.returnCode = 1;
        r.returnMessage = "success";
        return r;
    }

    public static ZaloPayCallbackResponse failure(String message) {
        ZaloPayCallbackResponse r = new ZaloPayCallbackResponse();
        r.returnCode = 0;
        r.returnMessage = message;
        return r;
    }
}
```

`main\java\com\cdweb\bookstore\modules\payment\dto\ZaloPayInitResponse.java`:

```java
package com.cdweb.bookstore.modules.payment.dto;

public record ZaloPayInitResponse(
        Long orderId,
        String appTransId,
        String orderUrl,
        long amount) {
}

```

`main\java\com\cdweb\bookstore\modules\payment\model\ZaloPayTransaction.java`:

```java
package com.cdweb.bookstore.modules.payment.model;

import com.cdweb.bookstore.modules.order.model.Order;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "zalopay_transactions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ZaloPayTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    

    @Column(name = "app_trans_id", unique = true, nullable = false)
    private String appTransId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    
    @Column(nullable = false)
    private Long amount;

    
    @Column(name = "order_url", columnDefinition = "TEXT")
    private String orderUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TransactionStatus status = TransactionStatus.PENDING;

    
    @Column(name = "zp_return_code")
    private Integer zpReturnCode;

    
    @Column(name = "zp_trans_id")
    private String zpTransId;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    void prePersist() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public enum TransactionStatus {
        PENDING,    
        SUCCESS,    
        FAILED,     
        CANCELLED   
    }
}

```

`main\java\com\cdweb\bookstore\modules\payment\repository\ZaloPayTransactionRepository.java`:

```java
package com.cdweb.bookstore.modules.payment.repository;

import com.cdweb.bookstore.modules.payment.model.ZaloPayTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ZaloPayTransactionRepository extends JpaRepository<ZaloPayTransaction, Long> {

    Optional<ZaloPayTransaction> findByAppTransId(String appTransId);

    Optional<ZaloPayTransaction> findTopByOrderIdOrderByCreatedAtDesc(Long orderId);
}

```

`main\java\com\cdweb\bookstore\modules\payment\service\ZaloPayApiService.java`:

```java
package com.cdweb.bookstore.modules.payment.service;

import com.cdweb.bookstore.config.ZaloPayProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ZaloPayApiService {

    private final ZaloPayProperties zaloPayProperties;
    private final RestTemplate restTemplate;

    public String hmacSha256(String key, String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(
                    key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKey);
            byte[] bytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi tính HMAC-SHA256", e);
        }
    }

    public String buildAppTransId(Long orderId) {
        String date = ZonedDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"))
                .format(DateTimeFormatter.ofPattern("yyMMdd"));
        return date + "_" + orderId + "_" + System.currentTimeMillis();
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> createOrder(String appTransId, String appUser,
            long amount, String description, Long orderId) {
        try {
            int appId = zaloPayProperties.getAppId();
            long appTime = System.currentTimeMillis();

            String redirectUrl = zaloPayProperties.getClientUrl() + "/payment/zalopay/return";
            String embedData = "{\"orderId\":" + orderId + ",\"redirecturl\":\"" + redirectUrl + "\"}";
            String item = "[]";

            String hmacInput = appId + "|" + appTransId + "|" + appUser + "|"
                    + amount + "|" + appTime + "|" + embedData + "|" + item;
            String mac = hmacSha256(zaloPayProperties.getMacKey(), hmacInput);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("app_id", String.valueOf(appId));
            body.add("app_user", appUser);
            body.add("app_trans_id", appTransId);
            body.add("app_time", String.valueOf(appTime));
            body.add("expire_duration_seconds", "900");
            body.add("amount", String.valueOf(amount));
            body.add("description", description);
            body.add("embed_data", embedData);
            body.add("item", item);
            body.add("mac", mac);

            if (zaloPayProperties.getServerUrl() != null) {
                String callbackUrl = zaloPayProperties.getServerUrl() + "/payment/zalopay/callback";
                body.add("callback_url", callbackUrl);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    zaloPayProperties.getCreateOrderUrl(), request, Map.class);

            return response.getBody() != null ? response.getBody() : new HashMap<>();

        } catch (Exception e) {
            log.error("Lỗi tạo đơn ZaloPay: {}", e.getMessage(), e);
            throw new RuntimeException("Không thể kết nối ZaloPay: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> queryOrder(String appTransId) {
        try {
            int appId = zaloPayProperties.getAppId();

            String hmacInput = appId + "|" + appTransId + "|" + zaloPayProperties.getMacKey();
            String mac = hmacSha256(zaloPayProperties.getMacKey(), hmacInput);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("app_id", String.valueOf(appId));
            body.add("app_trans_id", appTransId);
            body.add("mac", mac);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    zaloPayProperties.getQueryOrderUrl(), request, Map.class);

            return response.getBody() != null ? response.getBody() : new HashMap<>();

        } catch (Exception e) {
            log.error("Lỗi query đơn ZaloPay {}: {}", appTransId, e.getMessage(), e);
            throw new RuntimeException("Không thể truy vấn trạng thái ZaloPay: " + e.getMessage());
        }
    }

    public boolean verifyCallback(String data, String mac) {
        String expectedMac = hmacSha256(zaloPayProperties.getMacKey(), data);
        return expectedMac.equalsIgnoreCase(mac);
    }
}

```

`main\java\com\cdweb\bookstore\modules\payment\service\ZaloPayPaymentService.java`:

```java
package com.cdweb.bookstore.modules.payment.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.order.model.Order;
import com.cdweb.bookstore.modules.order.repository.OrderRepository;
import com.cdweb.bookstore.modules.payment.dto.ZaloPayInitResponse;
import com.cdweb.bookstore.modules.payment.model.ZaloPayTransaction;
import com.cdweb.bookstore.modules.payment.repository.ZaloPayTransactionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ZaloPayPaymentService {

    private final ZaloPayApiService zaloPayApiService;
    private final ZaloPayTransactionRepository transactionRepository;
    private final OrderRepository orderRepository;
    private final ObjectMapper objectMapper;

    

    

    @Transactional
    public ZaloPayInitResponse initPayment(Long orderId, Long userId) {
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng #" + orderId + " không tồn tại"));

        
        if (!order.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Đơn hàng #" + orderId + " không tồn tại");
        }

        
        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new RuntimeException("Đơn hàng không ở trạng thái chờ thanh toán");
        }
        if (order.getPaymentMethod() != Order.PaymentMethod.ZALOPAY) {
            throw new RuntimeException("Đơn hàng không sử dụng phương thức thanh toán ZaloPay");
        }
        if (order.getPaymentStatus() == Order.PaymentStatus.PAID) {
            throw new RuntimeException("Đơn hàng đã được thanh toán");
        }

        long amount = order.getTotalAmount().longValue();
        String appTransId = zaloPayApiService.buildAppTransId(orderId);
        String appUser = "user_" + userId;
        String description = "Thanh toan don hang #" + orderId;

        
        Map<String, Object> zpResponse = zaloPayApiService.createOrder(
                appTransId, appUser, amount, description, orderId);

        int returnCode = (Integer) zpResponse.getOrDefault("return_code", 0);
        if (returnCode != 1) {
            String msg = (String) zpResponse.getOrDefault("return_message", "Lỗi không xác định");
            log.error("ZaloPay tạo đơn thất bại [orderId={}]: {} ", orderId, msg);
            throw new RuntimeException("ZaloPay: " + msg);
        }

        String orderUrl = (String) zpResponse.get("order_url");

        
        ZaloPayTransaction txn = ZaloPayTransaction.builder()
                .appTransId(appTransId)
                .order(order)
                .amount(amount)
                .orderUrl(orderUrl)
                .status(ZaloPayTransaction.TransactionStatus.PENDING)
                .build();
        transactionRepository.save(txn);

        log.info("ZaloPay: tạo giao dịch thành công [orderId={}, appTransId={}]", orderId, appTransId);
        return new ZaloPayInitResponse(orderId, appTransId, orderUrl, amount);
    }

    

    

    @Transactional
    public boolean handleCallback(String data, String mac) {
        
        if (!zaloPayApiService.verifyCallback(data, mac)) {
            log.warn("ZaloPay callback: MAC không hợp lệ");
            return false;
        }

        try {
            
            Map<?, ?> dataMap = objectMapper.readValue(data, Map.class);
            String appTransId = (String) dataMap.get("app_trans_id");
            long zpTransId = Long.parseLong(dataMap.get("zp_trans_id").toString());

            
            ZaloPayTransaction txn = transactionRepository.findByAppTransId(appTransId)
                    .orElse(null);
            if (txn == null) {
                log.warn("ZaloPay callback: không tìm thấy appTransId={}", appTransId);
                return false;
            }

            
            if (txn.getStatus() == ZaloPayTransaction.TransactionStatus.SUCCESS) {
                log.info("ZaloPay callback: giao dịch {} đã xử lý trước đó", appTransId);
                return true;
            }

            
            txn.setStatus(ZaloPayTransaction.TransactionStatus.SUCCESS);
            txn.setZpTransId(String.valueOf(zpTransId));
            txn.setZpReturnCode(1);
            transactionRepository.save(txn);

            
            Order order = txn.getOrder();
            order.setPaymentStatus(Order.PaymentStatus.PAID);
            orderRepository.save(order);

            log.info("ZaloPay: thanh toán thành công [orderId={}, zpTransId={}]",
                    order.getId(), zpTransId);
            return true;

        } catch (Exception e) {
            log.error("ZaloPay callback: lỗi xử lý data", e);
            return false;
        }
    }

    

    

    @Transactional
    public ZaloPayTransaction queryAndSync(Long orderId, Long userId) {
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng #" + orderId + " không tồn tại"));

        if (!order.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Đơn hàng #" + orderId + " không tồn tại");
        }

        ZaloPayTransaction txn = transactionRepository
                .findTopByOrderIdOrderByCreatedAtDesc(orderId)
                .orElseThrow(() -> new RuntimeException(
                        "Chưa có giao dịch ZaloPay cho đơn hàng #" + orderId));

        
        if (txn.getStatus() == ZaloPayTransaction.TransactionStatus.SUCCESS) {
            return txn;
        }

        Map<String, Object> result = zaloPayApiService.queryOrder(txn.getAppTransId());
        int returnCode = (Integer) result.getOrDefault("return_code", 0);

        if (returnCode == 1) {
            
            txn.setStatus(ZaloPayTransaction.TransactionStatus.SUCCESS);
            txn.setZpReturnCode(returnCode);
            transactionRepository.save(txn);

            order.setPaymentStatus(Order.PaymentStatus.PAID);
            orderRepository.save(order);

        } else if (returnCode == -49) {
            
            txn.setZpReturnCode(returnCode);
            transactionRepository.save(txn);
        } else {
            
            txn.setStatus(ZaloPayTransaction.TransactionStatus.FAILED);
            txn.setZpReturnCode(returnCode);
            transactionRepository.save(txn);
        }

        return txn;
    }
}

```

`main\java\com\cdweb\bookstore\modules\product\controller\AdminAuthorController.java`:

```java
package com.cdweb.bookstore.modules.product.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.product.dto.AuthorDTO;
import com.cdweb.bookstore.modules.product.service.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/authors")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminAuthorController {

    private final AuthorService authorService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AuthorDTO>>> getAllAuthors() {
        return ApiResponse.ok(authorService.getAllAuthors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AuthorDTO>> getAuthorById(@PathVariable Long id) {
        return ApiResponse.ok(authorService.getAuthorById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AuthorDTO>> createAuthor(@Valid @RequestBody AuthorDTO dto) {
        return ApiResponse.created(authorService.createAuthor(dto), "Tạo tác giả thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AuthorDTO>> updateAuthor(
            @PathVariable Long id,
            @Valid @RequestBody AuthorDTO dto) {
        return ApiResponse.ok(authorService.updateAuthor(id, dto), "Cập nhật tác giả thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAuthor(@PathVariable Long id) {
        authorService.deleteAuthor(id);
        return ApiResponse.ok(null, "Xóa tác giả thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\controller\AdminBookController.java`:

```java
package com.cdweb.bookstore.modules.product.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.product.dto.BookDTO;
import com.cdweb.bookstore.modules.product.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/books")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminBookController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookDTO>> createBook(@Valid @RequestBody BookDTO dto) {
        return ApiResponse.created(bookService.createBook(dto), "Tạo sách thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BookDTO>> updateBook(
            @PathVariable Long id,
            @Valid @RequestBody BookDTO dto) {
        return ApiResponse.ok(bookService.updateBook(id, dto), "Cập nhật sách thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ApiResponse.ok(null, "Xóa sách thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\controller\AdminCategoryController.java`:

```java
package com.cdweb.bookstore.modules.product.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.product.dto.CategoryDTO;
import com.cdweb.bookstore.modules.product.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/categories")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminCategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryDTO>> createCategory(@Valid @RequestBody CategoryDTO dto) {
        return ApiResponse.created(categoryService.createCategory(dto), "Tạo danh mục thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryDTO>> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryDTO dto) {
        return ApiResponse.ok(categoryService.updateCategory(id, dto), "Cập nhật danh mục thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ApiResponse.ok(null, "Xóa danh mục thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\controller\AdminPublisherController.java`:

```java
package com.cdweb.bookstore.modules.product.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.product.dto.PublisherDTO;
import com.cdweb.bookstore.modules.product.service.PublisherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/publishers")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminPublisherController {

    private final PublisherService publisherService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PublisherDTO>>> getAll() {
        return ApiResponse.ok(publisherService.getAllPublishers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PublisherDTO>> getById(@PathVariable Long id) {
        return ApiResponse.ok(publisherService.getPublisherById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PublisherDTO>> create(@Valid @RequestBody PublisherDTO dto) {
        return ApiResponse.created(publisherService.createPublisher(dto), "Tạo nhà xuất bản thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PublisherDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody PublisherDTO dto) {
        return ApiResponse.ok(publisherService.updatePublisher(id, dto), "Cập nhật nhà xuất bản thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        publisherService.deletePublisher(id);
        return ApiResponse.ok(null, "Xóa nhà xuất bản thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\controller\AuthorController.java`:

```java
package com.cdweb.bookstore.modules.product.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.product.service.AuthorService;
import com.cdweb.bookstore.modules.product.dto.AuthorDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authors")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AuthorDTO>>> getAll(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        return ApiResponse.ok(authorService.getAllAuthors(keyword, page, size, sortBy, sortDir));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<AuthorDTO>>> getAllWithoutPagination() {
        return ApiResponse.ok(authorService.getAllAuthors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AuthorDTO>> getAuthorById(@PathVariable Long id) {
        return ApiResponse.ok(authorService.getAuthorById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AuthorDTO>> createAuthor(@RequestBody AuthorDTO authorDTO) {
        return ApiResponse.created(authorService.createAuthor(authorDTO), "Tạo tác giả thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AuthorDTO>> updateAuthor(
            @PathVariable Long id,
            @RequestBody AuthorDTO authorDTO) {
        return ApiResponse.ok(authorService.updateAuthor(id, authorDTO), "Cập nhật tác giả thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAuthor(@PathVariable Long id) {
        authorService.deleteAuthor(id);
        return ApiResponse.ok(null, "Xóa tác giả thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\controller\BookController.java`:

```java
package com.cdweb.bookstore.modules.product.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.product.dto.BookDTO;
import com.cdweb.bookstore.modules.product.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookDTO>>> getAll(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        return ApiResponse.ok(bookService.getAllBooks(keyword, categoryId, page, size, sortBy, sortDir));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<BookDTO>>> getAllWithoutPagination() {
        return ApiResponse.ok(bookService.getAllBooks());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BookDTO>> createBook(@RequestBody BookDTO bookDTO) {
        return ApiResponse.created(bookService.createBook(bookDTO), "Tạo sách thành công");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookDTO>> getBookById(@PathVariable Long id) {
        return ApiResponse.ok(bookService.getBookById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BookDTO>> updateBook(
            @PathVariable Long id,
            @RequestBody BookDTO bookDTO) {
        return ApiResponse.ok(bookService.updateBook(id, bookDTO), "Cập nhật sách thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ApiResponse.ok(null, "Xóa sách thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\controller\CategoryController.java`:

```java
package com.cdweb.bookstore.modules.product.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.product.dto.CategoryDTO;
import com.cdweb.bookstore.modules.product.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CategoryDTO>>> getAll(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        return ApiResponse.ok(categoryService.getAllCategories(keyword, page, size, sortBy, sortDir));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CategoryDTO>>> getAllWithoutPagination() {
        return ApiResponse.ok(categoryService.getAllCategories());
    }
    @PostMapping
    public ResponseEntity<ApiResponse<CategoryDTO>> createCategory(@RequestBody CategoryDTO categoryDTO) {
        return ApiResponse.created(categoryService.createCategory(categoryDTO), "Tạo danh mục thành công");
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryDTO>> getCategoryById(@PathVariable Long id) {
        return ApiResponse.ok(categoryService.getCategoryById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryDTO>> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryDTO categoryDTO) {
        return ApiResponse.ok(categoryService.updateCategory(id, categoryDTO), "Cập nhật danh mục thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ApiResponse.ok(null, "Xóa danh mục thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\controller\PublisherController.java`:

```java
package com.cdweb.bookstore.modules.product.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.product.dto.PublisherDTO;
import com.cdweb.bookstore.modules.product.service.PublisherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publishers")
@RequiredArgsConstructor
public class PublisherController {

    private final PublisherService publisherService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PublisherDTO>>> getAll(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        return ApiResponse.ok(publisherService.getAllPublishers(keyword, page, size, sortBy, sortDir));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<PublisherDTO>>> getAllWithoutPagination() {
        return ApiResponse.ok(publisherService.getAllPublishers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PublisherDTO>> getById(@PathVariable Long id) {
        return ApiResponse.ok(publisherService.getPublisherById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PublisherDTO>> create(@RequestBody PublisherDTO dto) {
        return ApiResponse.created(publisherService.createPublisher(dto), "Tạo nhà xuất bản thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PublisherDTO>> update(
            @PathVariable Long id,
            @RequestBody PublisherDTO dto) {
        return ApiResponse.ok(publisherService.updatePublisher(id, dto), "Cập nhật nhà xuất bản thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        publisherService.deletePublisher(id);
        return ApiResponse.ok(null, "Xóa nhà xuất bản thành công");
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\dto\AuthorDTO.java`:

```java
package com.cdweb.bookstore.modules.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDTO {
    private Long id;

    @NotBlank(message = "Tên tác giả không được để trống")
    private String name;

    private String bio;
    private String avatarUrl;
}
```

`main\java\com\cdweb\bookstore\modules\product\dto\BookDTO.java`:

```java
package com.cdweb.bookstore.modules.product.dto;

import com.cdweb.bookstore.modules.product.model.Book;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    
    private Long id;

    @NotBlank(message = "Tên sách không được để trống")
    private String title;

    @NotBlank(message = "Slug không được để trống")
    private String slug;

    private String description;
    private String isbn;

    @NotNull(message = "Giá bán không được để trống")
    @Min(value = 0, message = "Giá bán phải lớn hơn hoặc bằng 0")
    private BigDecimal price;

    @Min(value = 0, message = "Giá khuyến mãi phải lớn hơn hoặc bằng 0")
    private BigDecimal discountPrice;

    @NotNull(message = "Số lượng kho không được để trống")
    @Min(value = 0, message = "Số lượng kho phải lớn hơn hoặc bằng 0")
    private Integer stockQuantity;

    @Min(value = 1, message = "Số trang phải lớn hơn 0")
    private Integer pages;

    private String language;

    @NotNull(message = "Danh mục không được để trống")
    private Long categoryId;

    @NotNull(message = "Nhà xuất bản không được để trống")
    private Long publisherId;
    private Instant publishedDate;
    private Book.Status status;
    private Boolean isDeleted;
    private String coverImageUrl;
    private String coverUrl;
    private List<Long> authorIds;
    private List<AuthorDTO> authors;
    private PublisherDTO publisher;
    private List<CategoryDTO> categories;
}
```

`main\java\com\cdweb\bookstore\modules\product\dto\CategoryDTO.java`:

```java
package com.cdweb.bookstore.modules.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;

    @NotBlank(message = "Tên danh mục không được để trống")
    private String name;

    @NotBlank(message = "Slug không được để trống")
    private String slug;

    private String description;

    
    private Long parentId;
}
```

`main\java\com\cdweb\bookstore\modules\product\dto\PublisherDTO.java`:

```java
package com.cdweb.bookstore.modules.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublisherDTO {
    private Long id;

    @NotBlank(message = "Tên nhà xuất bản không được để trống")
    private String name;

    private String description;
    private String website;
}
```

`main\java\com\cdweb\bookstore\modules\product\model\Author.java`:

```java
package com.cdweb.bookstore.modules.product.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "authors")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @ManyToMany(mappedBy = "authors")
    @Builder.Default
    private List<Book> books = new ArrayList<>();
}
```

`main\java\com\cdweb\bookstore\modules\product\model\Book.java`:

```java
package com.cdweb.bookstore.modules.product.model;

import com.cdweb.bookstore.modules.interaction.model.Review;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;

@Entity
@Table(name = "books")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(unique = true)
    private String isbn;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "discount_price", precision = 12, scale = 2)
    private BigDecimal discountPrice;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    private Integer pages;
    private String language;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    @Column(name = "published_date")
    private Instant publishedDate;

    @Enumerated(EnumType.STRING)
    private Status status;   
    @Column(name = "is_deleted")
    private Boolean isDeleted;
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "book_authors", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
    @Builder.Default
    private List<Author> authors = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("sortOrder ASC")
    @Builder.Default
    private List<BookImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "book")
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();

    @PrePersist
    void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = Instant.now();
        }
    }

    public String getCoverUrl() {
        return images.stream().filter(BookImage::isCover).map(BookImage::getImageUrl).findFirst().orElse(images.isEmpty() ? null : images.get(0).getImageUrl());
    }

    public BigDecimal getEffectivePrice() {
        return discountPrice != null ? discountPrice : price;
    }

    public enum Status {ACTIVE, INACTIVE, OUT_OF_STOCK}
}
```

`main\java\com\cdweb\bookstore\modules\product\model\BookImage.java`:

```java
package com.cdweb.bookstore.modules.product.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "book_images")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "is_cover")
    private boolean isCover;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
```

`main\java\com\cdweb\bookstore\modules\product\model\Category.java`:

```java
package com.cdweb.bookstore.modules.product.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    @OneToMany(mappedBy = "parent")
    @Builder.Default
    private List<Category> children = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    @Builder.Default
    private List<Book> books = new ArrayList<>();
}
```

`main\java\com\cdweb\bookstore\modules\product\model\Publisher.java`:

```java
package com.cdweb.bookstore.modules.product.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "publishers")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Publisher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String website;

    @OneToMany(mappedBy = "publisher")
    @Builder.Default
    private List<Book> books = new ArrayList<>();
}
```

`main\java\com\cdweb\bookstore\modules\product\repository\AuthorRepository.java`:

```java
package com.cdweb.bookstore.modules.product.repository;

import com.cdweb.bookstore.modules.product.model.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("SELECT a FROM Author a WHERE " +
            ":keyword IS NULL OR LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Author> searchAuthors(@Param("keyword") String keyword, Pageable pageable);
}
```

`main\java\com\cdweb\bookstore\modules\product\repository\BookRepository.java`:

```java
package com.cdweb.bookstore.modules.product.repository;

import com.cdweb.bookstore.modules.product.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findBySlug(String slug);

    boolean existsByIsbn(String isbn);

    boolean existsBySlug(String slug);

    @Query("SELECT b FROM Book b WHERE " +
            "(b.isDeleted IS NULL OR b.isDeleted = false) AND " +
            "(:categoryId IS NULL OR b.category.id = :categoryId) AND " +
            "(:keyword IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.isbn) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.slug) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Book> searchBooks(@Param("keyword") String keyword, @Param("categoryId") Long categoryId, Pageable pageable);

    @Modifying
    @Query("UPDATE Book b SET b.stockQuantity = b.stockQuantity - :qty " +
            "WHERE b.id = :id AND b.stockQuantity >= :qty")
    int decreaseStock(@Param("id") Long id, @Param("qty") int qty);

    @Modifying
    @Query("UPDATE Book b SET b.stockQuantity = b.stockQuantity + :qty WHERE b.id = :id")
    void increaseStock(@Param("id") Long id, @Param("qty") int qty);

    @Query(value = "SELECT oi.book_id as bookId, b.title as title, bi.image_url as coverUrl, " +
                   "SUM(oi.quantity) as totalSoldQuantity " +
                   "FROM order_items oi " +
                   "JOIN books b ON oi.book_id = b.id " +
                   "LEFT JOIN book_images bi ON b.id = bi.book_id AND bi.is_cover = true " +
                   "JOIN orders o ON oi.order_id = o.id " +
                   "WHERE o.status = 'DELIVERED' " +
                   "GROUP BY oi.book_id, b.title, bi.image_url " +
                   "ORDER BY totalSoldQuantity DESC LIMIT 5", nativeQuery = true)
    java.util.List<com.cdweb.bookstore.modules.order.dto.TopBookProjection> getTopSellingBooks();
}
```

`main\java\com\cdweb\bookstore\modules\product\repository\CategoryRepository.java`:

```java
package com.cdweb.bookstore.modules.product.repository;

import com.cdweb.bookstore.modules.product.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsBySlug(String slug);
    boolean existsByName(String name);
    Optional<Category> findBySlug(String slug);
    @Query("SELECT c FROM Category c WHERE " +
            ":keyword IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.slug) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Category> searchCategories(@Param("keyword") String keyword, Pageable pageable);
}
```

`main\java\com\cdweb\bookstore\modules\product\repository\PublisherRepository.java`:

```java
package com.cdweb.bookstore.modules.product.repository;

import com.cdweb.bookstore.modules.product.model.Publisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    
    
    @Query("SELECT p FROM Publisher p WHERE " +
            ":keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Publisher> searchPublishers(@Param("keyword") String keyword, Pageable pageable);
}
```

`main\java\com\cdweb\bookstore\modules\product\service\AuthorService.java`:

```java
package com.cdweb.bookstore.modules.product.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.product.dto.AuthorDTO;
import com.cdweb.bookstore.modules.product.model.Author;
import com.cdweb.bookstore.modules.product.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthorService {

    private final AuthorRepository authorRepository;

    public Page<AuthorDTO> getAllAuthors(String keyword, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        int pageIndex = Math.max(0, page - 1);
        Pageable pageable = PageRequest.of(pageIndex, size, sort);
        return authorRepository.searchAuthors(keyword, pageable).map(this::toDTO);
    }

    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public AuthorDTO getAuthorById(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả với ID: " + id));
        return toDTO(author);
    }

    @Transactional
    public AuthorDTO createAuthor(AuthorDTO dto) {
        Author author = Author.builder()
                .name(dto.getName())
                .bio(dto.getBio())
                .avatarUrl(dto.getAvatarUrl())
                .build();
        return toDTO(authorRepository.save(author));
    }
    @Transactional
    public AuthorDTO updateAuthor(Long id, AuthorDTO dto) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả với ID: " + id));
        setDtoToEntity(dto, author);
        return toDTO(authorRepository.save(author));
    }
    @Transactional
    public void deleteAuthor(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả với ID: " + id));

        if (!author.getBooks().isEmpty()) {
            throw new RuntimeException(
                    "Không thể xóa tác giả này vì đang có " + author.getBooks().size() + " cuốn sách liên quan.");
        }

        authorRepository.delete(author);
    }
    

    private void setDtoToEntity(AuthorDTO dto, Author author) {
        if (dto.getName() != null)     author.setName(dto.getName());
        if (dto.getBio() != null)      author.setBio(dto.getBio());
        if (dto.getAvatarUrl() != null) author.setAvatarUrl(dto.getAvatarUrl());
    }
    private AuthorDTO toDTO(Author author) {
        return AuthorDTO.builder()
                .id(author.getId())
                .name(author.getName())
                .bio(author.getBio())
                .avatarUrl(author.getAvatarUrl())
                .build();
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\service\BookService.java`:

```java
package com.cdweb.bookstore.modules.product.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.product.repository.AuthorRepository;
import com.cdweb.bookstore.modules.product.dto.AuthorDTO;
import com.cdweb.bookstore.modules.product.dto.BookDTO;
import com.cdweb.bookstore.modules.product.dto.CategoryDTO;
import com.cdweb.bookstore.modules.product.dto.PublisherDTO;
import com.cdweb.bookstore.modules.product.model.*;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.product.repository.CategoryRepository;
import com.cdweb.bookstore.modules.product.repository.PublisherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final PublisherRepository publisherRepository;
    private final AuthorRepository authorRepository;

    @Transactional
    public BookDTO createBook(BookDTO dto) {
        if (bookRepository.existsByIsbn(dto.getIsbn())) {
            throw new RuntimeException("Mã ISBN đã tồn tại: " + dto.getIsbn());
        }
        if (bookRepository.existsBySlug(dto.getSlug())) {
            throw new RuntimeException("Slug đã tồn tại: " + dto.getSlug());
        }
        if (dto.getDiscountPrice() != null && dto.getPrice() != null && dto.getDiscountPrice().compareTo(dto.getPrice()) > 0) {
            throw new RuntimeException("Giá khuyến mãi không được lớn hơn giá gốc.");
        }

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Không tìm thấy danh mục với ID: " + dto.getCategoryId()));

        Publisher publisher = publisherRepository.findById(dto.getPublisherId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy nhà xuất bản với ID: " + dto.getPublisherId()));

        List<Author> authors = authorRepository.findAllById(dto.getAuthorIds());
        if (authors.size() != dto.getAuthorIds().size()) {
            throw new RuntimeException("Một hoặc nhiều tác giả không hợp lệ.");
        }

        Book book = Book.builder()
                .title(dto.getTitle())
                .slug(dto.getSlug())
                .description(dto.getDescription())
                .isbn(dto.getIsbn())
                .price(dto.getPrice())
                .discountPrice(dto.getDiscountPrice())
                .stockQuantity(dto.getStockQuantity())
                .pages(dto.getPages())
                .language(dto.getLanguage())
                .category(category)
                .publisher(publisher)
                .publishedDate(dto.getPublishedDate())
                .status(dto.getStatus() != null ? dto.getStatus() : Book.Status.ACTIVE)
                .authors(authors)
                .build();

        String coverUrl = dto.getCoverUrl() != null ? dto.getCoverUrl() : dto.getCoverImageUrl();
        if (coverUrl != null && !coverUrl.isBlank()) {
            BookImage cover = BookImage.builder()
                    .book(book)
                    .imageUrl(coverUrl.trim())
                    .isCover(true)
                    .sortOrder(0)
                    .build();
            book.getImages().add(cover);
        }

        return toDTO(bookRepository.save(book));
    }

    @Transactional(readOnly = true)
    public Page<BookDTO> getAllBooks(String keyword, Long categoryId, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        int pageIndex = Math.max(0, page - 1);
        Pageable pageable = PageRequest.of(pageIndex, size, sort);
        return bookRepository.searchBooks(keyword, categoryId, pageable).map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + id));
        return toDTO(book);
    }

    @Transactional
    public BookDTO updateBook(Long id, BookDTO dto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + id));
        setDtoToEntity(dto, book);
        return toDTO(bookRepository.save(book));
    }

    @Transactional
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không thể xóa. Không tìm thấy sách với ID: " + id);
        }
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách với ID: " + id));
        book.setIsDeleted(true);
        bookRepository.save(book);
    }

    private void setDtoToEntity(BookDTO dto, Book book) {
        if (dto.getPrice() != null)
            book.setPrice(dto.getPrice());
        if (dto.getDiscountPrice() != null)
            book.setDiscountPrice(dto.getDiscountPrice());

        java.math.BigDecimal finalPrice = book.getPrice();
        java.math.BigDecimal finalDiscount = book.getDiscountPrice();
        if (finalDiscount != null && finalPrice != null && finalDiscount.compareTo(finalPrice) > 0) {
            throw new RuntimeException("Giá khuyến mãi không được lớn hơn giá gốc.");
        }

        if (dto.getTitle() != null)
            book.setTitle(dto.getTitle());
        if (dto.getDescription() != null)
            book.setDescription(dto.getDescription());
        if (dto.getStockQuantity() != null)
            book.setStockQuantity(dto.getStockQuantity());
        if (dto.getPages() != null)
            book.setPages(dto.getPages());
        if (dto.getLanguage() != null)
            book.setLanguage(dto.getLanguage());
        if (dto.getPublishedDate() != null)
            book.setPublishedDate(dto.getPublishedDate());
        if (dto.getStatus() != null)
            book.setStatus(dto.getStatus());

        if (dto.getIsbn() != null && !dto.getIsbn().equals(book.getIsbn())) {
            if (bookRepository.existsByIsbn(dto.getIsbn())) {
                throw new RuntimeException("Mã ISBN mới đã tồn tại ở một cuốn sách khác.");
            }
            book.setIsbn(dto.getIsbn());
        }

        if (dto.getSlug() != null && !dto.getSlug().equals(book.getSlug())) {
            if (bookRepository.existsBySlug(dto.getSlug())) {
                throw new RuntimeException("Slug mới đã tồn tại ở một cuốn sách khác.");
            }
            book.setSlug(dto.getSlug());
        }

        if (dto.getCategoryId() != null &&
                (book.getCategory() == null || !book.getCategory().getId().equals(dto.getCategoryId()))) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Không tìm thấy danh mục với ID: " + dto.getCategoryId()));
            book.setCategory(category);
        }

        if (dto.getPublisherId() != null &&
                (book.getPublisher() == null || !book.getPublisher().getId().equals(dto.getPublisherId()))) {
            Publisher publisher = publisherRepository.findById(dto.getPublisherId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Không tìm thấy nhà xuất bản với ID: " + dto.getPublisherId()));
            book.setPublisher(publisher);
        }

        if (dto.getAuthorIds() != null && !dto.getAuthorIds().isEmpty()) {
            List<Author> authors = authorRepository.findAllById(dto.getAuthorIds());
            if (authors.size() != dto.getAuthorIds().size()) {
                throw new RuntimeException("Một hoặc nhiều tác giả không hợp lệ.");
            }
            book.setAuthors(authors);
        }

        String incomingUrl = dto.getCoverUrl() != null ? dto.getCoverUrl() : dto.getCoverImageUrl();
        if (incomingUrl != null) {
            if (incomingUrl.isBlank()) {
                book.getImages().removeIf(BookImage::isCover);
            } else {
                boolean hasSameCover = book.getImages().stream()
                        .anyMatch(img -> img.isCover() && incomingUrl.equals(img.getImageUrl()));
                if (!hasSameCover) {
                    book.getImages().removeIf(BookImage::isCover);
                    BookImage newCover = BookImage.builder()
                            .book(book)
                            .imageUrl(incomingUrl.trim())
                            .isCover(true)
                            .sortOrder(0)
                            .build();
                    book.getImages().add(newCover);
                }
            }
        }
    }

    private BookDTO toDTO(Book book) {
        List<AuthorDTO> authorDTOs = book.getAuthors().stream()
                .map(a -> AuthorDTO.builder()
                        .id(a.getId())
                        .name(a.getName())
                        .bio(a.getBio())
                        .avatarUrl(a.getAvatarUrl())
                        .build())
                .toList();

        PublisherDTO publisherDTO = book.getPublisher() != null
                ? PublisherDTO.builder()
                        .id(book.getPublisher().getId())
                        .name(book.getPublisher().getName())
                        .description(book.getPublisher().getDescription())
                        .website(book.getPublisher().getWebsite())
                        .build()
                : null;

        List<CategoryDTO> categoryDTOs = book.getCategory() != null
                ? List.of(CategoryDTO.builder()
                        .id(book.getCategory().getId())
                        .name(book.getCategory().getName())
                        .slug(book.getCategory().getSlug())
                        .parentId(book.getCategory().getParent() != null
                                ? book.getCategory().getParent().getId()
                                : null)
                        .build())
                : List.of();

        return BookDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .slug(book.getSlug())
                .description(book.getDescription())
                .isbn(book.getIsbn())
                .price(book.getPrice())
                .discountPrice(book.getDiscountPrice())
                .stockQuantity(book.getStockQuantity())
                .pages(book.getPages())
                .language(book.getLanguage())
                .categoryId(book.getCategory() != null ? book.getCategory().getId() : null)
                .publisherId(book.getPublisher() != null ? book.getPublisher().getId() : null)
                .publishedDate(book.getPublishedDate())
                .status(book.getStatus())
                .coverImageUrl(book.getCoverUrl())
                .coverUrl(book.getCoverUrl())
                .authors(authorDTOs)
                .publisher(publisherDTO)
                .categories(categoryDTOs)
                .build();
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\service\CategoryService.java`:

```java
package com.cdweb.bookstore.modules.product.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.product.dto.CategoryDTO;
import com.cdweb.bookstore.modules.product.repository.CategoryRepository;
import com.cdweb.bookstore.modules.product.model.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public CategoryDTO createCategory(CategoryDTO dto) {
        if (categoryRepository.existsBySlug(dto.getSlug())) {
            throw new RuntimeException("Slug danh mục đã tồn tại: " + dto.getSlug());
        }
        if (categoryRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Tên danh mục đã tồn tại: " + dto.getName());
        }

        Category category = Category.builder()
                .name(dto.getName())
                .slug(dto.getSlug())
                .description(dto.getDescription())
                .build();

        if (dto.getParentId() != null) {
            Category parent = categoryRepository.findById(dto.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục cha với ID: " + dto.getParentId()));
            category.setParent(parent);
        }

        return toDTO(categoryRepository.save(category));
    }

    public Page<CategoryDTO> getAllCategories(String keyword, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        int pageIndex = Math.max(0, page - 1);
        Pageable pageable = PageRequest.of(pageIndex, size, sort);
        return categoryRepository.searchCategories(keyword, pageable).map(this::toDTO);
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    
    public CategoryDTO getCategoryById(Long id) {
        return toDTO(categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + id)));

    }

    @Transactional
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục với ID: " + id));

        if (dto.getName() != null) {
            category.setName(dto.getName());
        }
        if (dto.getDescription() != null) {
            category.setDescription(dto.getDescription());
        }
        if (dto.getSlug() != null && !dto.getSlug().equals(category.getSlug())) {
            if (categoryRepository.existsBySlug(dto.getSlug())) {
                throw new RuntimeException("Slug '" + dto.getSlug() + "' đã được sử dụng cho một danh mục khác.");
            }
            category.setSlug(dto.getSlug());
        }
        if (dto.getParentId() != null) {
            if (dto.getParentId().equals(id)) {
                throw new RuntimeException("Một danh mục không thể là cha của chính nó.");
            }
            if (category.getParent() == null || !category.getParent().getId().equals(dto.getParentId())) {
                Category parent = categoryRepository.findById(dto.getParentId())
                        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục cha với ID: " + dto.getParentId()));
                category.setParent(parent);
            }
        }

        return toDTO(categoryRepository.save(category));
    }

    
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục với ID: " + id));

        if (!category.getChildren().isEmpty()) {
            throw new RuntimeException(
                    "Không thể xóa danh mục này vì vẫn còn " + category.getChildren().size() + " danh mục con.");
        }
        if (!category.getBooks().isEmpty()) {
            throw new RuntimeException(
                    "Không thể xóa danh mục này vì đang chứa " + category.getBooks().size() + " cuốn sách.");
        }

        categoryRepository.delete(category);
    }
    private CategoryDTO toDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .parentId(category.getParent() != null ? category.getParent().getId() : null)
                .build();
    }
}
```

`main\java\com\cdweb\bookstore\modules\product\service\PublisherService.java`:

```java
package com.cdweb.bookstore.modules.product.service;

import com.cdweb.bookstore.common.exception.ResourceNotFoundException;
import com.cdweb.bookstore.modules.product.dto.PublisherDTO;
import com.cdweb.bookstore.modules.product.model.Publisher;
import com.cdweb.bookstore.modules.product.repository.PublisherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublisherService {

    private final PublisherRepository publisherRepository;

    public Page<PublisherDTO> getAllPublishers(String keyword, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        int pageIndex = Math.max(0, page - 1);
        Pageable pageable = PageRequest.of(pageIndex, size, sort);
        return publisherRepository.searchPublishers(keyword, pageable).map(this::toDTO);
    }

    public List<PublisherDTO> getAllPublishers() {
        return publisherRepository.findAll().stream().map(this::toDTO).toList();
    }

    public PublisherDTO getPublisherById(Long id) {
        Publisher publisher = publisherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy nhà xuất bản với ID: " + id));
        return toDTO(publisher);
    }

    @Transactional
    public PublisherDTO createPublisher(PublisherDTO dto) {
        Publisher publisher = Publisher.builder().name(dto.getName()).description(dto.getDescription()).website(dto.getWebsite()).build();
        return toDTO(publisherRepository.save(publisher));
    }

    @Transactional
    public PublisherDTO updatePublisher(Long id, PublisherDTO dto) {
        Publisher publisher = publisherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy nhà xuất bản với ID: " + id));
        setDtoToEntity(dto, publisher);
        return toDTO(publisherRepository.save(publisher));
    }

    @Transactional
    public void deletePublisher(Long id) {
        Publisher publisher = publisherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy nhà xuất bản với ID: " + id));
        if (!publisher.getBooks().isEmpty()) {
            throw new RuntimeException("Không thể xóa NXB này vì đang liên kết với " + publisher.getBooks().size() + " cuốn sách.");
        }
        publisherRepository.delete(publisher);
    }

    

    private PublisherDTO toDTO(Publisher publisher) {
        return PublisherDTO.builder().id(publisher.getId()).name(publisher.getName()).description(publisher.getDescription()).website(publisher.getWebsite()).build();
    }

    private void setDtoToEntity(PublisherDTO dto, Publisher publisher) {
        if (dto.getName() != null) publisher.setName(dto.getName());
        if (dto.getDescription() != null) publisher.setDescription(dto.getDescription());
        if (dto.getWebsite() != null) publisher.setWebsite(dto.getWebsite());
    }
}
```

`main\java\com\cdweb\bookstore\modules\user\model\PasswordResetOtp.java`:

```java
package com.cdweb.bookstore.modules.user.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "password_reset_otps")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "otp_code", nullable = false)
    private String otpCode;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "expiry_date", nullable = false)
    private Instant expiryDate;

    @Column(nullable = false)
    @Builder.Default
    private boolean used = false;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }

    public boolean isExpired() {
        return Instant.now().isAfter(this.expiryDate);
    }
}

```

`main\java\com\cdweb\bookstore\modules\user\model\RefreshToken.java`:

```java
package com.cdweb.bookstore.modules.user.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(unique = true, nullable = false)
    private String token;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "expiry_date", nullable = false)
    private Instant expiryDate;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }

    public boolean isExpired() {
        return Instant.now().isAfter(this.expiryDate);
    }
}
```

`main\java\com\cdweb\bookstore\modules\user\model\Role.java`:

```java
package com.cdweb.bookstore.modules.user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;   
}
```

`main\java\com\cdweb\bookstore\modules\user\model\User.java`:

```java
package com.cdweb.bookstore.modules.user.model;

import com.cdweb.bookstore.modules.order.model.Address;
import com.cdweb.bookstore.modules.order.model.Cart;
import com.cdweb.bookstore.modules.order.model.Order;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    private Provider provider;   

    @Column(name = "provider_id")
    private String providerId;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private RefreshToken refreshToken;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Cart cart;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Address> addresses = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @Builder.Default
    private List<Order> orders = new ArrayList<>();

    @PrePersist
    void prePersist() {
        this.createdAt = Instant.now();
    }

    public enum Provider {LOCAL, GOOGLE, FACEBOOK}
}
```

`main\java\com\cdweb\bookstore\modules\user\repository\PasswordResetOtpRepository.java`:

```java
package com.cdweb.bookstore.modules.user.repository;

import com.cdweb.bookstore.modules.user.model.PasswordResetOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetOtpRepository extends JpaRepository<PasswordResetOtp, Long> {

    Optional<PasswordResetOtp> findFirstByEmailAndOtpCodeAndUsedFalseOrderByCreatedAtDesc(String email, String otpCode);
}

```

`main\java\com\cdweb\bookstore\modules\user\repository\RefreshTokenRepository.java`:

```java
package com.cdweb.bookstore.modules.user.repository;

import com.cdweb.bookstore.modules.user.model.RefreshToken;
import com.cdweb.bookstore.modules.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(User user);

    void deleteByUser(User user);
}
```

`main\java\com\cdweb\bookstore\modules\user\repository\RoleRepository.java`:

```java
package com.cdweb.bookstore.modules.user.repository;

import com.cdweb.bookstore.modules.user.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}

```

`main\java\com\cdweb\bookstore\modules\user\repository\UserRepository.java`:

```java
package com.cdweb.bookstore.modules.user.repository;

import com.cdweb.bookstore.modules.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.roles WHERE u.email = :email")
    Optional<User> findByEmailWithRoles(String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.roles WHERE u.id = :id")
    Optional<User> findByIdWithRoles(Long id);
}

```

`test\java\com\cdweb\bookstore\BookstoreApplicationTests.java`:

```java
package com.cdweb.bookstore;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BookstoreApplicationTests {

    @Test
    void contextLoads() {
    }

}

```