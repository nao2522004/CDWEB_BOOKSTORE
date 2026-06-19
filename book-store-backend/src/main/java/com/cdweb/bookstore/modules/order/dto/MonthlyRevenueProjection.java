package com.cdweb.bookstore.modules.order.dto;

import java.math.BigDecimal;

public interface MonthlyRevenueProjection {
    String getMonth();
    BigDecimal getRevenue();
    Long getOrderCount();
}
