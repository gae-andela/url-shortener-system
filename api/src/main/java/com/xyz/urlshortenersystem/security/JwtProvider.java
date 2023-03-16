package com.xyz.urlshortenersystem.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtProvider {

	@Value("${app.jwtSecret}")
	private String jwtSecret;

	@Value("${app.jwtExpirationInMs}")
	private int jwtExpirationInMs;

	public String generateToken(Authentication authentication) {
		var now = new Date();
		var expiryDate = new Date(now.getTime() + jwtExpirationInMs);
		return Jwts.builder().setSubject(authentication.getName()).setIssuedAt(new Date()).setExpiration(expiryDate)
				.signWith(getKey()).compact();
	}

	public String getUserUsernameFromJWT(String token) {
		return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String authToken) {
		try {
			Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(authToken);
			return true;
		} catch (Exception ex) {
			log.error("An error occurred, ", ex);
			return false;
		}
	}

	private Key getKey() {
		return Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(jwtSecret));
	}
}
