package com.xyz.urlshortenersystem.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.xyz.urlshortenersystem.entity.UserAccount;
import com.xyz.urlshortenersystem.exception.UserAuthenticationException;
import com.xyz.urlshortenersystem.repository.UserAccountRepository;
import com.xyz.urlshortenersystem.service.UserAccountService;

@Service
public class UserAccountServiceImpl implements UserAccountService {

	@Autowired
	private UserAccountRepository userAccountRepository;

	@Override
	public UserAccount getCurrentUser() {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null) {
			throw new UserAuthenticationException("No authenticated user");
		}
		return userAccountRepository.findByEmail(authentication.getName())
				.orElseThrow(() -> new UserAuthenticationException("Invalid username"));
	}

}
