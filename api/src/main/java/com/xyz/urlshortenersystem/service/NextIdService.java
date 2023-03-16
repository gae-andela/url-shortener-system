package com.xyz.urlshortenersystem.service;

public interface NextIdService {

	/**
	 * Get next available ID of UserUrl. Whenever this method is called, it will
	 * return new value (even in an error situation)
	 */
	long nextId();
}
