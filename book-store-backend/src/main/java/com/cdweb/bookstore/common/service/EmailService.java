package com.cdweb.bookstore.common.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendOtpEmail(String to, String otp) {
        log.info("=== [OTP SYSTEM] Preparing to send OTP '{}' to email: {} ===", otp, to);
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("[Bookstore] Mã OTP khôi phục mật khẩu");
            message.setText("Xin chào,\n\n"
                    + "Mã OTP khôi phục mật khẩu của bạn là: " + otp + "\n\n"
                    + "Mã này có hiệu lực trong vòng 5 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.\n\n"
                    + "Trân trọng,\n"
                    + "Bookstore Team");
            mailSender.send(message);
            log.info("=== [OTP SYSTEM] Sent OTP email successfully to {} ===", to);
        } catch (Exception e) {
            log.error("=== [OTP SYSTEM] Failed to send email via SMTP: {}. Showing OTP here for development/testing: {} ===", e.getMessage(), otp);
        }
    }
}
