package com.xyz.urlshortenersystem.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.xyz.urlshortenersystem.dto.SignInRequestDto;
import com.xyz.urlshortenersystem.dto.SignUpRequestDto;
import com.xyz.urlshortenersystem.dto.UserAccountDto;
import com.xyz.urlshortenersystem.entity.UserAccount;
import com.xyz.urlshortenersystem.model.UserToken;
import com.xyz.urlshortenersystem.service.AuthenticationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	AuthenticationService authenticationService;

	@GetMapping("who")
	@ResponseStatus(HttpStatus.OK)
	UserAccountDto who() {
		return modelMapper.map(authenticationService.who(), UserAccountDto.class);
	}

	@PostMapping("sign-up")
	@ResponseStatus(HttpStatus.CREATED)
	UserToken signUp(@RequestBody @Valid SignUpRequestDto dto) {
		return authenticationService.signUp(modelMapper.map(dto, UserAccount.class));
	}

	@PostMapping("sign-in")
	@ResponseStatus(HttpStatus.OK)
	UserToken signIn(@RequestBody @Valid SignInRequestDto dto) {
		return authenticationService.signIn(dto.getEmail(), dto.getPassword());
	}
}
