package com.xyz.urlshortenersystem.service.impl;

import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import com.xyz.urlshortenersystem.service.InputConversionService;

import lombok.NonNull;

@Service
public class InputConversionServiceImpl implements InputConversionService {
	/**
	 * Here we have every possible characters we will use for a given URL
	 */
	private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private static final char[] ALLOWED_CHARACTERS = ALPHABET.toCharArray();
	private static int BASE_LENGTH = ALLOWED_CHARACTERS.length;

	@Override
	public String encode(long input) {
		if (input == 0) {
			// No need to go further
			return String.valueOf(ALLOWED_CHARACTERS[0]);
		}
		var encodedString = new StringBuilder();
		while (input > 0) {
			// This is nothing more than a Base conversion
			encodedString.append(ALLOWED_CHARACTERS[(int) (input % BASE_LENGTH)]);
			input /= BASE_LENGTH;
		}
		return encodedString.reverse().toString();
	}

	@Override
	public long decode(@NonNull String input) {
		var characters = input.toCharArray();
		var length = characters.length;
		// We must do opposite operations executed when encoding
		return IntStream.range(0, length)
				.mapToLong(i -> ALPHABET.indexOf(characters[i]) * (long) Math.pow(BASE_LENGTH, length - i - 1)).sum();
	}

}
