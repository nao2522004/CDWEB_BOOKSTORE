package com.cdweb.bookstore.modules.auth.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,       
        long expiresIn,         
        Long userId,
        String name,
        String email
) {}