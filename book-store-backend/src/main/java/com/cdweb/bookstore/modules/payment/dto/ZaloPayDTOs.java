package com.cdweb.bookstore.modules.payment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

//  Request / Response DTOs cho ZaloPay API 

/**
 * Response từ ZaloPay khi tạo đơn hàng (/v2/create).
 */
@Data
class ZaloPayCreateResponse {
    /** 1 = thành công, các mã khác = lỗi */
    @JsonProperty("return_code")
    private int returnCode;

    @JsonProperty("return_message")
    private String returnMessage;

    @JsonProperty("sub_return_code")
    private int subReturnCode;

    @JsonProperty("sub_return_message")
    private String subReturnMessage;

    /** URL thanh toán ZaloPay — chuyển hướng user đến đây */
    @JsonProperty("order_url")
    private String orderUrl;

    /** Token định danh đơn hàng phía ZaloPay */
    @JsonProperty("zp_trans_token")
    private String zpTransToken;

    /** URL thanh toán qua app ZaloPay */
    @JsonProperty("order_token")
    private String orderToken;
}

/**
 * Response từ ZaloPay khi query trạng thái đơn (/v2/query).
 */
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

    /** 1 = đã thanh toán, 2 = đang xử lý, -49 = chưa thanh toán */
    @JsonProperty("is_processing")
    private boolean isProcessing;

    @JsonProperty("amount")
    private long amount;

    @JsonProperty("discount_amount")
    private long discountAmount;

    @JsonProperty("zp_trans_id")
    private long zpTransId;
}

/**
 * Payload từ ZaloPay Callback gửi về server sau khi user thanh toán thành công.
 * ZaloPay POST body: data + mac
 */
@Data
class ZaloPayCallbackPayload {
    private String data;
    private String mac;
    private int type;
}

/**
 * Nội dung bên trong field "data" của Callback (sau khi parse JSON).
 */
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

/**
 * Response trả về cho ZaloPay sau khi xử lý callback.
 * ZaloPay yêu cầu return_code = 1 nếu server đã xử lý thành công.
 */
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