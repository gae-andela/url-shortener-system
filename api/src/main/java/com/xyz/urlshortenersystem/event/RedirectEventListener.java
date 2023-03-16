package com.xyz.urlshortenersystem.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.xyz.urlshortenersystem.entity.UserUrlStats;
import com.xyz.urlshortenersystem.model.RedirectEvent;
import com.xyz.urlshortenersystem.repository.UserUrlStatsRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RedirectEventListener implements ApplicationListener<RedirectEvent> {

	@Autowired
	private UserUrlStatsRepository userUrlStatsRepository;

	@Override
	public void onApplicationEvent(RedirectEvent event) {
		try {
			// Every single time an user use one of our links, we want to save some stats
			// data
			userUrlStatsRepository.save(UserUrlStats.builder().ip(event.getIp()).referrer(event.getReferrer())
					.target(event.getTarget()).build());
		} catch (Exception ex) {
			log.error("Failed to register stats for event because of error: {}", ex);
		}
	}
}
