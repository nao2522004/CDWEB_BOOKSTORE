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

/**
 * SecurityConfig — HTTP security, CORS, OAuth2 login.
 *
 * JWT beans (JwtEncoder/JwtDecoder/JwtAuthenticationConverter) đã được tách
 * sang JwtConfig để tránh circular dependency:
 *   SecurityConfig → GoogleOAuth2SuccessHandler → JwtService → JwtEncoder
 *   → (trước đây định nghĩa trong SecurityConfig) → CYCLE
 *
 * Giờ JwtConfig độc lập, SecurityConfig nhận JwtDecoder/JwtAuthenticationConverter
 * qua method injection trong securityFilterChain().
 *
 * @Lazy trên GoogleOAuth2SuccessHandler để Spring khởi tạo nó sau,
 * tránh trường hợp vẫn còn phụ thuộc vòng (dự phòng).
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    /**
     * @Lazy: khởi tạo GoogleOAuth2SuccessHandler sau khi tất cả các bean khác
     * đã sẵn sàng, đảm bảo JwtService (phụ thuộc JwtEncoder từ JwtConfig)
     * được inject đúng thứ tự.
     */
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

    /**
     * JwtDecoder và JwtAuthenticationConverter được inject qua parameter
     * (không phải field) để Spring giải quyết sau khi JwtConfig đã khởi tạo.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtDecoder jwtDecoder,
            JwtAuthenticationConverter jwtAuthenticationConverter) throws Exception {
        // @formatter:off
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            // OAuth2 flow cần session tạm thời trong suốt redirect — IF_REQUIRED
            // API calls vẫn stateless vì dùng JWT Bearer token
            .sessionManagement(s -> s
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .authorizeHttpRequests(auth -> auth

                // ── PUBLIC ──────────────────────────────────────────────────
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers(HttpMethod.GET, "/books/**", "/categories/**",
                        "/authors/**", "/publishers/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/books/**", "/categories/**",
                        "/authors/**", "/publishers/**").permitAll()

                // ZaloPay callback — ZaloPay server gọi trực tiếp, không có JWT
                // Bảo mật qua xác thực MAC chữ ký trong ZaloPayPaymentService
                .requestMatchers(HttpMethod.POST, "/payment/zalopay/callback").permitAll()

                // ── ADMIN ────────────────────────────────────────────────────
                .requestMatchers("/admin/**").hasRole("ADMIN")

                // ── USER (đã đăng nhập) ───────────────────────────────────────
                .requestMatchers("/cart/**").authenticated()
                .requestMatchers("/orders/**").authenticated()
                .requestMatchers("/coupons/preview").authenticated()
                .requestMatchers("/payment/**").authenticated()
                .requestMatchers("/addresses/**").authenticated()

                .anyRequest().authenticated()
            )
            // ── JWT Resource Server (cho API calls) ──────────────────────────
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .decoder(jwtDecoder)
                    .jwtAuthenticationConverter(jwtAuthenticationConverter)
                )
            )
            // ── Google OAuth2 Login ───────────────────────────────────────────
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

    /** RestTemplate dùng cho ZaloPay API calls */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
