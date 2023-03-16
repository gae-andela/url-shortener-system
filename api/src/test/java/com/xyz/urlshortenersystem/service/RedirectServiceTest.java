package com.xyz.urlshortenersystem.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;

import com.xyz.urlshortenersystem.entity.UserAccount;
import com.xyz.urlshortenersystem.entity.UserUrl;
import com.xyz.urlshortenersystem.exception.RecordNotFoundException;
import com.xyz.urlshortenersystem.repository.UserAccountRepository;
import com.xyz.urlshortenersystem.repository.UserUrlRepository;

@SpringBootTest
@ActiveProfiles(profiles = "test")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class RedirectServiceTest {
	final String USERNAME = "xyz@test.com";

	@Autowired
	private RedirectService redirectService;

	@Autowired
	private UserUrlRepository userUrlRepository;

	@Autowired
	private UserAccountRepository userAccountRepository;

	@Test
	void testToShortUrl() {
		var longUrl = "https://google.com";
		var shortUrl = UserUrl.CUSTOM_KEY + "testMe";
		var user = UserAccount.builder().email(USERNAME).password(USERNAME).firstName("John").lastName("DOE").build();
		userAccountRepository.save(user);
		var userUrl = UserUrl.builder().id(1L).longUrl(longUrl).shortUrl(shortUrl).expiryDate(LocalDate.now().plusDays(2))
				.owner(user).build();

		assertThrows(RecordNotFoundException.class, () -> redirectService.toLongUrl(shortUrl));
		userUrl = userUrlRepository.save(userUrl);

		assertEquals(longUrl, redirectService.toLongUrl(shortUrl));

		userUrl.setExpiryDate(LocalDate.now().plusDays(-1));
		userUrl = userUrlRepository.save(userUrl);
		assertThrows(RecordNotFoundException.class, () -> redirectService.toLongUrl(shortUrl));
	}

}
