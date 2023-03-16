package com.xyz.urlshortenersystem.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ShortenUrlRequestDto {
	@NotEmpty
	private String longUrl;
	
	private String shortUrl;

	private LocalDate expiryDate;
}
