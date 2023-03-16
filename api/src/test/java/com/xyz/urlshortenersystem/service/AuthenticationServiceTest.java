package com.xyz.urlshortenersystem.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;

import com.xyz.urlshortenersystem.entity.UserAccount;
import com.xyz.urlshortenersystem.entity.UserRole;
import com.xyz.urlshortenersystem.enumeration.RoleName;
import com.xyz.urlshortenersystem.exception.BadRequestException;
import com.xyz.urlshortenersystem.exception.UserAuthenticationException;
import com.xyz.urlshortenersystem.repository.UserAccountRepository;
import com.xyz.urlshortenersystem.repository.UserRoleRepository;

@SpringBootTest
@ActiveProfiles(profiles = "test")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class AuthenticationServiceTest {
	final String USERNAME = "xyz@test.com";

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private UserAccountRepository userAccountRepository;

	@Autowired
	private AuthenticationService authenticationService;

	@Test
	void testSignUp() {
		var user = UserAccount.builder().email(USERNAME).password(USERNAME).firstName("John").lastName("DOE").build();
		assertThrows(RuntimeException.class, () -> authenticationService.signUp(user));

		userRoleRepository.save(UserRole.builder().name(RoleName.USER).build());
		assertNotNull(authenticationService.signUp(user));

		assertThrows(BadRequestException.class, () -> authenticationService.signUp(user));
	}

	@Test
	void testSignIn() {
		var user = UserAccount.builder().email(USERNAME).password(passwordEncoder.encode(USERNAME)).firstName("John")
				.lastName("DOE").build();
		assertThrows(UserAuthenticationException.class, () -> authenticationService.signIn(USERNAME, USERNAME));

		userAccountRepository.save(user);

		assertNotNull(authenticationService.signIn(USERNAME, USERNAME));

		assertThrows(UserAuthenticationException.class, () -> authenticationService.signIn(USERNAME, "BAD"));
	}
}
