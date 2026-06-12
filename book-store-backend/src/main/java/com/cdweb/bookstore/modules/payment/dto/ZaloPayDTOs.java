package com.cdweb.bookstore.modules.payment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
class ZaloPayCreateResponse {
    
    @JsonProperty("return_code")
    private int returnCode;

    @JsonProperty("return_message")
    private String returnMessage;

    @JsonProperty("sub_return_code")
    private int subReturnCode;

    @JsonProperty("sub_return_message")
    private String subReturnMessage;

    
    @JsonProperty("order_url")
    private String orderUrl;

    
    @JsonProperty("zp_trans_token")
    private String zpTransToken;

    
    @JsonProperty("order_token")
    private String orderToken;
}

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

    
    @JsonProperty("is_processing")
    private boolean isProcessing;

    @JsonProperty("amount")
    private long amount;

    @JsonProperty("discount_amount")
    private long discountAmount;

    @JsonProperty("zp_trans_id")
    private long zpTransId;
}

@Data
class ZaloPayCallbackPayload {
    private String data;
    private String mac;
    private int type;
}

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