package com.xyz.urlshortenersystem.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiError {
	private LocalDateTime timestamp;
    private String message;
    private List<String> errors;
}
