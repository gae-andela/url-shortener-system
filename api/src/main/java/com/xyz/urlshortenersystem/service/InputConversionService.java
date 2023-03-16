package com.xyz.urlshortenersystem.service;

public interface InputConversionService {

	/**
	 * Encode a given number to a unique (for that number) string
	 * 
	 * @param input
	 * @return corresponding string
	 */
	String encode(long input);

	/**
	 * Retrieve number from a given string
	 * 
	 * @param input
	 * @return corresponding number if valid string
	 */
	long decode(String input);
}
