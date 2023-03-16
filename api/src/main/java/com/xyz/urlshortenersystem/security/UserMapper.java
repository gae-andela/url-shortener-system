package com.xyz.urlshortenersystem.security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.xyz.urlshortenersystem.entity.UserAccount;

public class UserMapper {
	public static UserPrincipal userToPrincipal(UserAccount user) {
		List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName())).collect(Collectors.toList());

		return UserPrincipal.builder().username(user.getEmail()).password(user.getPassword()).authorities(authorities)
				.build();
	}
}
