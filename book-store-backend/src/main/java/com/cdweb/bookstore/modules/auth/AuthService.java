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
                .map(r -> (GrantedAuthority) new SimpleGrantedAuthority(r.getName())).toList();
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