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
