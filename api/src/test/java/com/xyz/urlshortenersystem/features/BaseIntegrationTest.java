package com.xyz.urlshortenersystem.features;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootContextLoader;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.Option;
import com.xyz.urlshortenersystem.UrlShortenerSystemApplication;

import io.cucumber.spring.CucumberContextConfiguration;
import lombok.Getter;

@CucumberContextConfiguration
@ActiveProfiles(profiles = "integration")
@ContextConfiguration(classes = UrlShortenerSystemApplication.class, loader = SpringBootContextLoader.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class BaseIntegrationTest {
	static ResponseResults latestResponse = null;
	static String latestToken = null;

	@Autowired
	private TestRestTemplate rest;

	@LocalServerPort
	protected int randomServerPort;

	protected RestTemplate restTemplate;

	String absoluteUrl(String path) {
		return String.format("http://localhost:%d/%s", randomServerPort, path);
	}

	void setUp() {
		var requestFactory = new SimpleClientHttpRequestFactory();
		requestFactory.setOutputStreaming(false);
		var bufferingFactory = new BufferingClientHttpRequestFactory(requestFactory);
		restTemplate = rest.getRestTemplate();
		restTemplate.setRequestFactory(bufferingFactory);
		restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

		latestResponse = null;
		latestToken = null;
	}

	void executeGet(String url) throws IOException {
		final var requestCallback = requestCallback(null);
		final var errorHandler = new ResponseResultErrorHandler();
		restTemplate.setErrorHandler(errorHandler);
		latestResponse = restTemplate.execute(url, HttpMethod.GET, requestCallback, response -> {
			if (errorHandler.hasError(response)) {
				return errorHandler.getResults();
			}
			return new ResponseResults(response);
		});
	}

	void executeDelete(String url) throws IOException {
		final var requestCallback = requestCallback(null);
		final var errorHandler = new ResponseResultErrorHandler();
		restTemplate.setErrorHandler(errorHandler);
		latestResponse = restTemplate.execute(url, HttpMethod.DELETE, requestCallback, response -> {
			if (errorHandler.hasError(response)) {
				return errorHandler.getResults();
			}
			return new ResponseResults(response);
		});
	}

	void executePost(String url, Object body) throws IOException {
		final var requestCallback = requestCallback(body);
		final var errorHandler = new ResponseResultErrorHandler();
		restTemplate.setErrorHandler(errorHandler);
		latestResponse = restTemplate.execute(url, HttpMethod.POST, requestCallback, response -> {
			if (errorHandler.hasError(response)) {
				return errorHandler.getResults();
			}
			return new ResponseResults(response);
		});
	}

	RequestCallback requestCallback(final Object body) {
		return clientHttpRequest -> {
			clientHttpRequest.getHeaders().add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			if (body != null) {
				ObjectMapper mapper = new ObjectMapper();
				mapper.writeValue(clientHttpRequest.getBody(), body);
			}
			if (latestToken != null) {
				clientHttpRequest.getHeaders().add(HttpHeaders.AUTHORIZATION, "Bearer " + latestToken);
			}
		};
	}

	String valueOrPath(final String value) {
		if (latestResponse == null || !value.contains("response.")) {
			return value;
		}
		var path = value.replace("response.", "");
		var json = JsonPath.using(Configuration.defaultConfiguration().setOptions(Option.DEFAULT_PATH_LEAF_TO_NULL)).parse(latestResponse.getBody());
		return json.read(path).toString();
	}

	private class ResponseResultErrorHandler implements ResponseErrorHandler {
		@Getter
		private ResponseResults results = null;
		private boolean hadError = false;

		@Override
		public boolean hasError(ClientHttpResponse response) throws IOException {
			hadError = response.getStatusCode().value() >= 400;
			return hadError;
		}

		@Override
		public void handleError(ClientHttpResponse response) throws IOException {
			results = new ResponseResults(response);
		}
	}
}
