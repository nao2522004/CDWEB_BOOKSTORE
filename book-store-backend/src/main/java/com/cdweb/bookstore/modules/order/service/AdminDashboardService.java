package com.cdweb.bookstore.modules.order.service;

import com.cdweb.bookstore.modules.order.dto.DashboardStatsResponse;
import com.cdweb.bookstore.modules.order.repository.OrderRepository;
import com.cdweb.bookstore.modules.product.repository.BookRepository;
import com.cdweb.bookstore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();
        long totalOrders = orderRepository.count();
        long totalBooks = bookRepository.count();
        long totalUsers = userRepository.count();

        // Status counts
        List<Object[]> statusCountsRaw = orderRepository.countOrdersByStatus();
        Map<String, Long> statusCounts = new HashMap<>();
        for (Object[] row : statusCountsRaw) {
            if (row[0] != null) {
                statusCounts.put(row[0].toString(), ((Number) row[1]).longValue());
            }
        }

        // Monthly revenue
        List<DashboardStatsResponse.MonthlyRevenue> monthlyRevenue = orderRepository.getMonthlyRevenueForLast6Months()
                .stream()
                .map(proj -> new DashboardStatsResponse.MonthlyRevenue(
                        proj.getMonth(),
                        proj.getRevenue(),
                        proj.getOrderCount()
                ))
                .collect(Collectors.toList());

        // Top Selling Books
        List<DashboardStatsResponse.TopBook> topBooks = bookRepository.getTopSellingBooks()
                .stream()
                .map(proj -> new DashboardStatsResponse.TopBook(
                        proj.getBookId(),
                        proj.getTitle(),
                        proj.getCoverUrl(),
                        proj.getTotalSoldQuantity()
                ))
                .collect(Collectors.toList());

        return new DashboardStatsResponse(
                totalRevenue,
                totalOrders,
                totalBooks,
                totalUsers,
                statusCounts,
                monthlyRevenue,
                topBooks
        );
    }
}
