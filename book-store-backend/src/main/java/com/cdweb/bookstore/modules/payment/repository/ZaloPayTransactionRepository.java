package com.cdweb.bookstore.modules.payment.repository;

import com.cdweb.bookstore.modules.payment.model.ZaloPayTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ZaloPayTransactionRepository extends JpaRepository<ZaloPayTransaction, Long> {

    Optional<ZaloPayTransaction> findByAppTransId(String appTransId);

    Optional<ZaloPayTransaction> findTopByOrderIdOrderByCreatedAtDesc(Long orderId);
}
