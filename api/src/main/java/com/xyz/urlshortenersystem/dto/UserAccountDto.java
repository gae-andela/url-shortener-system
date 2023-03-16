package com.xyz.urlshortenersystem.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserAccountDto {
	private Long id;
	private String email;
	private String firstName;
	private String lastName;
	private LocalDate createDate;
}
