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
