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

/**
 * Xử lý thông tin user sau khi Google xác thực thành công.
 *
 * Luồng: Google callback → Spring Security → CustomOAuth2UserService
 * → Tìm user theo email
 * → Nếu chưa có: tạo mới với provider=GOOGLE
 * → Nếu đã có LOCAL: liên kết (link) account
 * → Trả về OAuth2User để Spring Security tiếp tục xử lý
 */
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
        String providerId = (String) attributes.get("sub"); // Google unique ID

        log.info("Google OAuth2 login: email={}", email);

        User user = userRepository.findByEmail(email)
                .map(existing -> updateGoogleInfo(existing, providerId, avatarUrl))
                .orElseGet(() -> createGoogleUser(email, name, avatarUrl, providerId));

        // Trả về OAuth2User với email làm nameAttributeKey
        Map<String, Object> enrichedAttributes = new java.util.HashMap<>(attributes);
        enrichedAttributes.put("userId", user.getId());
        enrichedAttributes.put("localEmail", email);

        return new DefaultOAuth2User(
                List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_USER")),
                enrichedAttributes,
                "email" // nameAttributeKey
        );
    }

    /**
     * Tạo user mới từ tài khoản Google.
     */
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

    /**
     * Cập nhật thông tin Google cho user đã tồn tại (link account).
     * Nếu user đăng ký LOCAL trước rồi dùng Google login cùng email → link tự động.
     */
    private User updateGoogleInfo(User existing, String providerId, String avatarUrl) {
        if (existing.getProvider() == User.Provider.LOCAL) {
            log.info("Link Google account cho user LOCAL: {}", existing.getEmail());
        }
        // Cập nhật providerId và avatar nếu chưa có
        if (existing.getProviderId() == null) {
            existing.setProviderId(providerId);
        }
        if (existing.getAvatarUrl() == null && avatarUrl != null) {
            existing.setAvatarUrl(avatarUrl);
        }
        return userRepository.save(existing);
    }
}
