package com.xyz.urlshortenersystem.interceptor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.xyz.urlshortenersystem.exception.BadRequestException;
import com.xyz.urlshortenersystem.exception.RecordNotFoundException;
import com.xyz.urlshortenersystem.exception.UserAuthenticationException;
import com.xyz.urlshortenersystem.model.ApiError;

import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiError> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

		var fieldErrors = ex.getBindingResult().getFieldErrors().stream()
				.map(field -> field.getField() + ", " + field.getDefaultMessage()).collect(Collectors.toList());

		var globalErrors = ex.getBindingResult().getGlobalErrors().stream()
				.map(field -> field.getObjectName() + ", " + field.getDefaultMessage()).collect(Collectors.toList());
		var errors = new ArrayList<String>();
		errors.addAll(globalErrors);
		errors.addAll(fieldErrors);

		var err = ApiError.builder().timestamp(LocalDateTime.now()).message("Validation Errors").errors(errors).build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}

	@ExceptionHandler({ BadRequestException.class, ConstraintViolationException.class })
	public ResponseEntity<ApiError> handleBadRequestException(BadRequestException ex) {
		return handleGenericException(ex, "Bad Inputs Received", HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(RecordNotFoundException.class)
	public ResponseEntity<ApiError> handleResourceNotFoundException(RecordNotFoundException ex) {
		return handleGenericException(ex, "Record Not Found", HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(UserAuthenticationException.class)
	public ResponseEntity<ApiError> handleUserAuthenticationException(UserAuthenticationException ex) {
		return handleGenericException(ex, "Authentication Error", HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiError> handleException(Exception ex) {
		return handleGenericException(ex, "An Unexpected Error Occurred", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private <T extends Exception> ResponseEntity<ApiError> handleGenericException(T ex, String message,
			HttpStatus status) {
		var details = Arrays.asList(ex.getMessage());
		var err = ApiError.builder().timestamp(LocalDateTime.now()).message(message).errors(details).build();
		return ResponseEntity.status(status).body(err);
	}

}
