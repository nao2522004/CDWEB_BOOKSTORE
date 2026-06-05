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

/**
 * Sau khi Google xác thực thành công:
 * 1. Lấy user từ DB (đã upsert bởi CustomOAuth2UserService)
 * 2. Tạo Access Token + Refresh Token
 * 3. Redirect về frontend kèm access_token trong query string
 *
 * Frontend URL nhận token:
 * http://localhost:3000/auth/callback?token=xxx&userId=yyy
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class GoogleOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    /** URL frontend xử lý callback — đổi thành domain thực khi deploy */
    private static final String FRONTEND_REDIRECT_URL = "http://localhost:3000/auth/callback";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // userId được inject bởi CustomOAuth2UserService
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

        // Build Authentication object với roles để tạo JWT
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(r -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + r.getName()))
                .toList();
        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getEmail(), null, authorities);

        // Tạo JWT
        String accessToken = jwtService.buildAccessToken(auth, user);
        String refreshToken = jwtService.createOrRotateRefreshToken(user);

        // Set refresh token vào HttpOnly Cookie
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
