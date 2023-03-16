package com.xyz.urlshortenersystem.service.impl;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.xyz.urlshortenersystem.entity.UserAccount;
import com.xyz.urlshortenersystem.enumeration.RoleName;
import com.xyz.urlshortenersystem.exception.BadRequestException;
import com.xyz.urlshortenersystem.exception.UserAuthenticationException;
import com.xyz.urlshortenersystem.model.UserToken;
import com.xyz.urlshortenersystem.repository.UserAccountRepository;
import com.xyz.urlshortenersystem.repository.UserRoleRepository;
import com.xyz.urlshortenersystem.security.JwtProvider;
import com.xyz.urlshortenersystem.service.AuthenticationService;
import com.xyz.urlshortenersystem.service.UserAccountService;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserAccountService userAccountService;

	@Autowired
	private UserAccountRepository userAccountRepository;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public UserAccount who() {
		return userAccountService.getCurrentUser();
	}

	@Override
	public UserToken signUp(final UserAccount user) {
		// 1- Verify inputs: user existence, role configuration, etc...
		userAccountRepository.findByEmail(user.getEmail()).ifPresent(u -> {
			throw new BadRequestException("Email already exists");
		});
		var role = userRoleRepository.findByName(RoleName.USER)
				.orElseThrow(() -> new RuntimeException("Configurations missing"));

		// 2- Encrypting password and saving user to database
		final var rawPassword = user.getPassword();
		user.setPassword(passwordEncoder.encode(rawPassword));
		user.setRoles(Arrays.asList(role));
		var savedUser = userAccountRepository.save(user);
		return getToken(savedUser, rawPassword);
	}

	@Override
	public UserToken signIn(final String email, final String password) {
		// 1- Check for given user
		var user = userAccountRepository.findByEmail(email.toLowerCase())
				.orElseThrow(() -> new UserAuthenticationException("Invalid username/password"));

		// 2- Testing provided password with registered one
		if (!passwordEncoder.matches(password, user.getPassword())) {
			throw new UserAuthenticationException("Invalid username/password");
		}
		return getToken(user, password);
	}

	private UserToken getToken(final UserAccount user, final String rawPassword) {
		var authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), rawPassword));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		return UserToken.builder().accessToken(jwtProvider.generateToken(authentication)).build();
	}
}
