package com.xyz.urlshortenersystem.features;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.http.client.ClientHttpResponse;

import lombok.Getter;

@Getter
public class ResponseResults {
	private final ClientHttpResponse response;
	private final String body;
	private final int statusCode;

	ResponseResults(final ClientHttpResponse response) throws IOException {
		this.response = response;
		this.statusCode = response.getStatusCode().value();
		try (final var bodyInputStream = response.getBody()) {
			this.body = new String(bodyInputStream.readAllBytes(), StandardCharsets.UTF_8);
		}
	}
}
