package com.xyz.urlshortenersystem.service;

import java.time.LocalDate;
import java.util.List;

import com.xyz.urlshortenersystem.entity.UserUrl;
import com.xyz.urlshortenersystem.entity.UserUrlStats;

public interface UserUrlService {

	/**
	 * Apply shortening logic to a given URL
	 * 
	 * @param longUrl    original URL to shorten
	 * @param expiryDate expiration date (after this date, data will be removed)
	 * @param shortUrl   when user request for a custom URL
	 */
	UserUrl toShortUrl(String longUrl, LocalDate expiryDate, String shortUrl);

	/**
	 * Remove UserUrl from database
	 * 
	 * @param id
	 */
	void delete(long id);

	/**
	 * Get all current user UserUrl
	 * 
	 * @return
	 */
	List<UserUrl> getUserUrls();

	/**
	 * Get all saved stats info for a given UserUrl
	 * 
	 * @param id
	 * @return
	 */
	List<UserUrlStats> getUserUrlsStats(long id);
}
