package com.xyz.urlshortenersystem.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.urlshortenersystem.service.RedirectService;

@RestController
@RequestMapping("/api/xyz")
public class RedirectController {

	@Autowired
	RedirectService redirectService;

	@GetMapping(value = "{shortUrl}")
	@Cacheable(value = "urls", key = "#shortUrl", sync = true)
	ResponseEntity<Void> getAndRedirect(@PathVariable String shortUrl) {
		var url = redirectService.toLongUrl(shortUrl);
		return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(url)).build();
	}
}
