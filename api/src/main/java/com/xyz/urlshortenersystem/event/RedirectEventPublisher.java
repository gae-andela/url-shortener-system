package com.xyz.urlshortenersystem.event;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.xyz.urlshortenersystem.entity.UserUrl;
import com.xyz.urlshortenersystem.model.RedirectEvent;

@Component
public class RedirectEventPublisher {
	@Autowired
	private ApplicationEventPublisher applicationEventPublisher;

	/**
	 * Notify that a redirection occurred on a given URL
	 */
	public void publish(final UserUrl userUrl) {
		var request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		var referrer = Optional.ofNullable(request.getHeader("Referer")).orElse(request.getRemoteHost());
		var event = new RedirectEvent(this, referrer, request.getRemoteAddr(), userUrl);
		applicationEventPublisher.publishEvent(event);
	}
}
