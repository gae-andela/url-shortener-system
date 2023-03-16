package com.xyz.urlshortenersystem.event;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.xyz.urlshortenersystem.Initializer;
import com.xyz.urlshortenersystem.entity.UserAccount;
import com.xyz.urlshortenersystem.entity.UserRole;
import com.xyz.urlshortenersystem.entity.UserUrl;
import com.xyz.urlshortenersystem.entity.UserUrlStats;
import com.xyz.urlshortenersystem.enumeration.RoleName;
import com.xyz.urlshortenersystem.repository.UserAccountRepository;
import com.xyz.urlshortenersystem.repository.UserRoleRepository;
import com.xyz.urlshortenersystem.repository.UserUrlRepository;
import com.xyz.urlshortenersystem.repository.UserUrlStatsRepository;
import com.xyz.urlshortenersystem.service.InputConversionService;
import com.xyz.urlshortenersystem.service.NextIdService;

/**
 * 
 * The purpose of this class is to populate database with some data Helpful for
 * demo
 */
@Component
@Profile("!test")
public class DemoDataListener extends Initializer {

	private static final String[] URLS = { "https://google.com", "https://twitter.com", "https://stackoverflow.com/" };

	@Autowired
	private NextIdService nextIdService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserUrlRepository userUrlRepository;
	@Autowired
	private UserRoleRepository userRoleRepository;
	@Autowired
	private UserAccountRepository userAccountRepository;
	@Autowired
	private UserUrlStatsRepository userUrlStatsRepository;
	@Autowired
	private InputConversionService inputConversionService;

	@EventListener(ApplicationReadyEvent.class)
	public void runAfterStartup() {
		super.runAfterStartup();
		var roles = initUserRoles();
		var user = initUserAccount(roles);
		var userUrls = initUserUrls(user);
		initUserUrlStats(userUrls.get(0));
	}

	private List<UserRole> initUserRoles() {
		var existingRoles = userRoleRepository.findAll().stream().map((r) -> r.getName()).collect(Collectors.toList());
		var toCreate = Arrays.stream(RoleName.values()).filter((r) -> !existingRoles.contains(r))
				.map((r) -> UserRole.builder().name(r).build()).collect(Collectors.toList());
		return userRoleRepository.saveAll(toCreate);
	}

	private UserAccount initUserAccount(List<UserRole> roles) {
		var user = UserAccount.builder().firstName("John").lastName("DOE").email("root@xyz.com")
				.password(passwordEncoder.encode("root")).roles(roles).build();
		return userAccountRepository.save(user);
	}

	private List<UserUrl> initUserUrls(UserAccount userAccount) {
		var expiryDate = LocalDate.now().plusDays(50);
		return Stream.of(URLS).map((url) -> {
			var id = nextIdService.nextId();
			var userUrl = UserUrl.builder().id(id).longUrl(url).expiryDate(expiryDate)
					.shortUrl(inputConversionService.encode(id)).owner(userAccount).build();
			return userUrlRepository.save(userUrl);
		}).collect(Collectors.toList());
	}

	private void initUserUrlStats(UserUrl userUrl) {
		Stream.of(URLS).forEach((url) -> {
			var userUrlStats = IntStream.range(0, 10)
					.mapToObj((i) -> UserUrlStats.builder().ip("0.0.0.0").referrer(url).target(userUrl).build())
					.collect(Collectors.toList());
			userUrlStatsRepository.saveAll(userUrlStats);
		});
	}
}
