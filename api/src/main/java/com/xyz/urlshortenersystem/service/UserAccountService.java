package com.xyz.urlshortenersystem.service;

import com.xyz.urlshortenersystem.entity.UserAccount;

public interface UserAccountService {
	/**
	 * Get currently authenticated user
	 */
	UserAccount getCurrentUser();
}
