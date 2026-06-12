package com.cdweb.bookstore.modules.payment.model;

import com.cdweb.bookstore.modules.order.model.Order;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

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

    

    @Column(name = "app_trans_id", unique = true, nullable = false)
    private String appTransId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    
    @Column(nullable = false)
    private Long amount;

    
    @Column(name = "order_url", columnDefinition = "TEXT")
    private String orderUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TransactionStatus status = TransactionStatus.PENDING;

    
    @Column(name = "zp_return_code")
    private Integer zpReturnCode;

    
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
        PENDING,    
        SUCCESS,    
        FAILED,     
        CANCELLED   
    }
}
