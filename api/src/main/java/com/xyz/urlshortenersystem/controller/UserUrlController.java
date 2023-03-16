package com.xyz.urlshortenersystem.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.urlshortenersystem.dto.ShortenUrlRequestDto;
import com.xyz.urlshortenersystem.dto.UserUrlDto;
import com.xyz.urlshortenersystem.dto.UserUrlStatsDto;
import com.xyz.urlshortenersystem.service.UserUrlService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/urls")
public class UserUrlController {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	UserUrlService userUrlService;

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping()
	UserUrlDto toShortUrl(@RequestBody @Valid ShortenUrlRequestDto dto) {
		var userUrl = userUrlService.toShortUrl(dto.getLongUrl(), dto.getExpiryDate(), dto.getShortUrl());
		return modelMapper.map(userUrl, UserUrlDto.class);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping(value = "{id}")
	void delete(@PathVariable long id) {
		userUrlService.delete(id);
	}

	@GetMapping()
	List<UserUrlDto> getUserUrls() {
		return modelMapper.map(userUrlService.getUserUrls(), new TypeToken<List<UserUrlDto>>() {
		}.getType());
	}

	@GetMapping(value = "{id}/stats")
	List<UserUrlStatsDto> getUserUrlsStats(@PathVariable long id) {
		return modelMapper.map(userUrlService.getUserUrlsStats(id), new TypeToken<List<UserUrlStatsDto>>() {
		}.getType());
	}
}
