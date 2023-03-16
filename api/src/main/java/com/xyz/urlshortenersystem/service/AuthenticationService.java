package com.xyz.urlshortenersystem.service;

import com.xyz.urlshortenersystem.entity.UserAccount;
import com.xyz.urlshortenersystem.model.UserToken;

public interface AuthenticationService {

	/**
	 * Get currently authenticated user account
	 */
	UserAccount who();

	/**
	 * Register a new user in database
	 * 
	 * @param user
	 */
	UserToken signUp(UserAccount user);

	/**
	 * Authenticate an existing user against its credentials
	 * 
	 * @param email
	 * @param password
	 */
	UserToken signIn(String email, String password);
}
