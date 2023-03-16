package com.xyz.urlshortenersystem.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SignInRequestDto {
    @NotEmpty
    private String email;
    
    @NotEmpty
    private String password;
    
}
