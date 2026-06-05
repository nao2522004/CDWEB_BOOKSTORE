package com.cdweb.bookstore.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Cấu hình ZaloPay đọc từ application.properties hoặc biến môi trường.
 *
 * Thêm vào application.properties:
 *   zalopay.app-id=2553
 *   zalopay.mac-key=PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL
 *   zalopay.refund-key=kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz
 *   zalopay.create-order-url=https://sb-openapi.zalopay.vn/v2/create
 *   zalopay.query-order-url=https://sb-openapi.zalopay.vn/v2/query
 *   zalopay.server-url=https://your-ngrok-url.ngrok-free.dev
 */
@Component
@ConfigurationProperties(prefix = "zalopay")
@Getter
@Setter
public class ZaloPayProperties {
    private int appId;
    private String macKey;
    private String refundKey;
    private String createOrderUrl = "https://sb-openapi.zalopay.vn/v2/create";
    private String queryOrderUrl  = "https://sb-openapi.zalopay.vn/v2/query";
    /** URL ngrok/public của server backend — dùng để nhận ZaloPay callback */
    private String serverUrl;
}
