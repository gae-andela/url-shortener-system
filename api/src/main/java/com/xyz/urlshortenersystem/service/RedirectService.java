package com.xyz.urlshortenersystem.service;

public interface RedirectService {

	/**
	 * Get long URL by doing a database lookup with ID from short URL
	 * 
	 * @param shortUrl
	 */
	String toLongUrl(String shortUrl);
}
