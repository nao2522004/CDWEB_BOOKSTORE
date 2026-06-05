package com.cdweb.bookstore.modules.payment.model;

import com.cdweb.bookstore.modules.order.model.Order;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Lưu trữ thông tin giao dịch ZaloPay tương ứng với mỗi đơn hàng.
 * Một đơn hàng có thể có nhiều lần thử thanh toán (retry).
 */
@Entity
@Table(name = "zalopay_transactions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ZaloPayTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Mã giao dịch duy nhất gửi lên ZaloPay.
     * Format: yymmdd_orderId_timestamp  (VD: 260605_12345_1717573380000)
     */
    @Column(name = "app_trans_id", unique = true, nullable = false)
    private String appTransId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    /** Số tiền giao dịch (VNĐ) */
    @Column(nullable = false)
    private Long amount;

    /** URL redirect ZaloPay trả về để chuyển user vào trang thanh toán */
    @Column(name = "order_url", columnDefinition = "TEXT")
    private String orderUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TransactionStatus status = TransactionStatus.PENDING;

    /** Mã trạng thái trả về từ ZaloPay (-49, 1, ...) */
    @Column(name = "zp_return_code")
    private Integer zpReturnCode;

    /** zp_trans_id từ callback ZaloPay (ID giao dịch phía ZaloPay) */
    @Column(name = "zp_trans_id")
    private String zpTransId;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    void prePersist() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public enum TransactionStatus {
        PENDING,    // Đã tạo đơn, chờ user thanh toán
        SUCCESS,    // ZaloPay callback thành công
        FAILED,     // Thanh toán thất bại / hết hạn
        CANCELLED   // User huỷ
    }
}
