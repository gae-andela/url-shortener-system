package com.xyz.urlshortenersystem.event;

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
		var event = new RedirectEvent(this, request.getRemoteHost(), request.getRemoteAddr(), userUrl);
		applicationEventPublisher.publishEvent(event);
	}
}
