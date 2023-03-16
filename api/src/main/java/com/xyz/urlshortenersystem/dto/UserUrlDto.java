package com.xyz.urlshortenersystem.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserUrlDto {
    private Long id;
    private String longUrl;
    private String shortUrl;
    private LocalDate createDate;
    private LocalDate expiryDate;
}
