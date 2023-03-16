package com.xyz.urlshortenersystem.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;

import com.xyz.urlshortenersystem.entity.UserAccount;
import com.xyz.urlshortenersystem.entity.UserUrl;
import com.xyz.urlshortenersystem.exception.RecordNotFoundException;
import com.xyz.urlshortenersystem.exception.UserAuthenticationException;
import com.xyz.urlshortenersystem.repository.UserAccountRepository;

@SpringBootTest
@ActiveProfiles(profiles = "test")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserUrlServiceTest {
	final String USERNAME = "xyz@test.com";

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserUrlService userUrlService;

	@Autowired
	private UserAccountRepository userAccountRepository;

	@Test
	@WithMockUser(value = USERNAME)
	void testToShortUrl() {
		saveUser();
		var url1 = userUrlService.toShortUrl("https://google.com", null, null);
		var url2 = userUrlService.toShortUrl("https://twitter.com", LocalDate.now().plusDays(4), null);
		var url3 = userUrlService.toShortUrl("https://andela.com", null, "custom");

		assertNotEquals(url1.getShortUrl(), url2.getShortUrl());
		assertEquals(url3.getShortUrl(), UserUrl.CUSTOM_KEY + "custom");
	}

	@Test
	@WithMockUser(value = USERNAME)
	void testDelete() {
		assertThrows(UserAuthenticationException.class, () -> userUrlService.delete(1L));
		saveUser();
		userUrlService.delete(1L); // Nothing even with non existent ID

		var newUserUrl = userUrlService.toShortUrl("https://google.com", null, null);
		userUrlService.delete(newUserUrl.getId());
	}

	@Test
	@WithMockUser(value = USERNAME)
	void testGetUserUrlsStats() {
		assertThrows(UserAuthenticationException.class, () -> userUrlService.getUserUrlsStats(1L));
		saveUser();
		assertThrows(RecordNotFoundException.class, () -> userUrlService.getUserUrlsStats(1L));
		var userUrl = userUrlService.toShortUrl("https://google.com", null, null);
		userUrlService.getUserUrlsStats(userUrl.getId());
	}

	@Test
	@WithMockUser(value = USERNAME)
	void testGetUserUrls() {
		assertThrows(UserAuthenticationException.class, () -> userUrlService.getUserUrls());
		saveUser();
		userUrlService.getUserUrls();
	}

	void saveUser() {
		userAccountRepository.save(UserAccount.builder().email(USERNAME).password(passwordEncoder.encode(USERNAME))
				.firstName("John").lastName("DOE").build());
	}

}
