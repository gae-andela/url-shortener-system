package com.xyz.urlshortenersystem.dto;

import lombok.Data;

@Data
public class UserUrlStatsDto {
    private Long id;
    private String ip;
    private String referrer;
}
