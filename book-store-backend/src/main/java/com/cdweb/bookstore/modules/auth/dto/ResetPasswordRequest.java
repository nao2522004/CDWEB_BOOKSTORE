package com.cdweb.bookstore.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
        @NotBlank(message = "Email không được để trống")
        @Email(message = "Định dạng email không hợp lệ")
        String email,

        @NotBlank(message = "Mã OTP không được để trống")
        @Size(min = 6, max = 6, message = "Mã OTP phải có đúng 6 ký tự")
        String otpCode,

        @NotBlank(message = "Mật khẩu mới không được để trống")
        @Size(min = 6, max = 20, message = "Mật khẩu mới phải từ 6 đến 20 ký tự")
        String newPassword
) {
}
