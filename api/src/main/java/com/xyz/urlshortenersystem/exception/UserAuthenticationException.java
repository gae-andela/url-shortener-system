package com.xyz.urlshortenersystem.exception;

import org.springframework.security.core.AuthenticationException;

public class UserAuthenticationException extends AuthenticationException {
	private static final long serialVersionUID = 1L;

	public UserAuthenticationException(String msg) {
		super(msg);
	}
}
