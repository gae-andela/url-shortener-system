package com.xyz.urlshortenersystem.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserToken {
	private String accessToken;
	// TODO: Deal with refreshToken
	private String refreshToken;
}
