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