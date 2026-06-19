package com.cdweb.bookstore.modules.order.controller;

import com.cdweb.bookstore.common.ApiResponse;
import com.cdweb.bookstore.modules.order.dto.DashboardStatsResponse;
import com.cdweb.bookstore.modules.order.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStatistics() {
        DashboardStatsResponse stats = adminDashboardService.getDashboardStats();
        return ApiResponse.ok(stats, "Lấy thông tin thống kê dashboard thành công");
    }
}
