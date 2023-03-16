package com.xyz.urlshortenersystem.dto;

import lombok.Data;

@Data
public class UserTokenDto {
    private String accessToken;
    private String refreshToken;
}
