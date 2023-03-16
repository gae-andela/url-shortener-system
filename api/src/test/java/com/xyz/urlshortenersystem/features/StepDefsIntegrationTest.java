package com.xyz.urlshortenersystem.features;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Map;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.Option;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
 
public class StepDefsIntegrationTest extends BaseIntegrationTest {

	@Given("the server is up")
	public void the_server_is_up() throws Throwable {
		super.setUp();
	}

	// -------------------------------------------------------------------------
	// WHEN
	// -------------------------------------------------------------------------
	@When("the client get current user")
	public void the_client_get_current_user() throws Throwable {
		executeGet(absoluteUrl("/api/auth/who"));
	}

	@When("the client register with")
	public void the_client_register(Map<String, Object> payload) throws Throwable {
		executePost(absoluteUrl("/api/auth/sign-up"), payload);
	}
	
	@When("the client sign in with")
	public void the_client_sign_in(Map<String, Object> payload) throws Throwable {
		executePost(absoluteUrl("/api/auth/sign-in"), payload);
	}

	@When("the client shorten url with")
	public void the_client_shorten_url(Map<String, Object> payload) throws Throwable {
		executePost(absoluteUrl("/api/urls"), payload);
	}

	@When("the client removes url with ID {string}")
	public void the_client_remove_url(String id) throws Throwable {
		executeDelete(absoluteUrl(String.format("/api/urls/%s", valueOrPath(id))));
	}

	@When("the client fetch urls")
	public void the_client_fetch_urls() throws Throwable {
		executeGet(absoluteUrl("/api/urls"));
	}

	@When("the client fetch stats of urls {string}")
	public void the_client_fetch_stats_of_urls(String id) throws Throwable {
		executeGet(absoluteUrl(String.format("/api/urls/%s/stats", valueOrPath(id))));
	}

	@When("the client browses short url {string}")
	public void the_client_browses_short_url(String shortUrl) throws Throwable {
		executeGet(absoluteUrl(String.format("/api/xyz/%s", valueOrPath(shortUrl))));
	}
	
	@When("the client remove token")
	public void the_client_remove_token() throws Throwable {
		latestToken = null;
	}

	// -------------------------------------------------------------------------
	// THEN
	// -------------------------------------------------------------------------
	@Then("the client receives status code of {int}")
	public void the_client_receives_status_code_of(int statusCode) throws Throwable {
		assertEquals("Invalid status received",
				statusCode, latestResponse.getStatusCode());
	}
	
	@Then("the client receives body field {string} of {string}")
	public void the_client_receives_body_field_of(String path, String value) throws Throwable {
		var json = JsonPath
				.parse(latestResponse.getBody());
		assertEquals("Invalid body received",
				value, json.read(path).toString());
	}
	
	@Then("the client receives body field {string} is null {string}")
	public void the_client_receives_body_field_is_null(String path, String rawBoolean) throws Throwable {
		var value = Boolean.valueOf(rawBoolean);
		var json = JsonPath.using(Configuration.defaultConfiguration().setOptions(Option.DEFAULT_PATH_LEAF_TO_NULL)).parse(latestResponse.getBody());
		assertEquals("Invalid body received",
				value, null == json.read(path) );
	}
	
	@Then("the client register token")
	public void the_client_register_token() throws Throwable {
		var json = JsonPath.parse(latestResponse.getBody());
		var token = json.read("accessToken");
		assertTrue("Expected non empty token",
				token != null && !token.toString().isEmpty());
		latestToken = token.toString();
	}
}
