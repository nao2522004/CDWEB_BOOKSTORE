package com.cdweb.bookstore.modules.order.dto;

public interface TopBookProjection {
    Long getBookId();
    String getTitle();
    String getCoverUrl();
    Long getTotalSoldQuantity();
}
