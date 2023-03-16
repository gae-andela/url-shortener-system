package com.xyz.urlshortenersystem.model;

import org.springframework.context.ApplicationEvent;

import com.xyz.urlshortenersystem.entity.UserUrl;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class RedirectEvent extends ApplicationEvent {

	private static final long serialVersionUID = 1L;
	private UserUrl target; // In a microservice architecture, we will use the ID instead
	private String referrer;
	private String ip;

	public RedirectEvent(Object source, String referrer, String ip, UserUrl target) {
		super(source);
		this.referrer = referrer;
		this.ip = ip;
		this.target = target;
	}
}
