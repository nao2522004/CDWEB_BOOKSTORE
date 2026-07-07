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
        String expectedMac = hmacSha256(zaloPayProperties.getRefundKey(), data);
        return expectedMac.equalsIgnoreCase(mac);
    }
}
