package com.cdweb.bookstore.modules.order.repository;

import com.cdweb.bookstore.modules.order.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("""
            SELECT DISTINCT o FROM Order o
            LEFT JOIN FETCH o.items oi
            LEFT JOIN FETCH oi.book
            WHERE o.user.id = :userId
            ORDER BY o.createdAt DESC
            """)
    List<Order> findByUserIdWithItems(@Param("userId") Long userId);

    @Query("""
            SELECT o FROM Order o
            LEFT JOIN FETCH o.items oi
            LEFT JOIN FETCH oi.book
            LEFT JOIN FETCH o.coupon
            WHERE o.id = :orderId
            """)
    Optional<Order> findByIdWithItems(@Param("orderId") Long orderId);

    @Query(value = """
            SELECT DISTINCT o FROM Order o
            LEFT JOIN FETCH o.items oi
            LEFT JOIN FETCH oi.book
            LEFT JOIN FETCH o.user
            ORDER BY o.createdAt DESC
            """, countQuery = "SELECT COUNT(o) FROM Order o")
    Page<Order> findAllWithItems(Pageable pageable);

    @Query(value = """
            SELECT DISTINCT o FROM Order o
            LEFT JOIN FETCH o.items oi
            LEFT JOIN FETCH oi.book
            LEFT JOIN FETCH o.user
            WHERE o.status = :status
            """, countQuery = "SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Page<Order> findAllByStatusWithItems(@Param("status") Order.OrderStatus status, Pageable pageable);

    @Query(value = "SELECT COALESCE(SUM(o.total_amount), 0) FROM orders o WHERE o.status = 'DELIVERED'", nativeQuery = true)
    java.math.BigDecimal calculateTotalRevenue();

    @Query(value = "SELECT o.status as status, COUNT(o.id) as count FROM orders o GROUP BY o.status", nativeQuery = true)
    List<Object[]> countOrdersByStatus();

    @Query(value = "SELECT DATE_FORMAT(o.created_at, '%Y-%m') AS month, " +
                   "SUM(o.total_amount) AS revenue, " +
                   "COUNT(o.id) AS orderCount " +
                   "FROM orders o " +
                   "WHERE o.status = 'DELIVERED' " +
                   "GROUP BY DATE_FORMAT(o.created_at, '%Y-%m') " +
                   "ORDER BY month DESC LIMIT 6", nativeQuery = true)
    List<com.cdweb.bookstore.modules.order.dto.MonthlyRevenueProjection> getMonthlyRevenueForLast6Months();
}