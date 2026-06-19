package com.cdweb.bookstore.modules.order.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public record DashboardStatsResponse(
    BigDecimal totalRevenue,
    long totalOrders,
    long totalBooks,
    long totalUsers,
    Map<String, Long> orderStatusCounts,
    List<MonthlyRevenue> monthlyRevenue,
    List<TopBook> topSellingBooks
) {
    public record MonthlyRevenue(
        String month,
        BigDecimal revenue,
        long orderCount
    ) {}

    public record TopBook(
        Long bookId,
        String title,
        String coverUrl,
        long totalSoldQuantity
    ) {}
}
