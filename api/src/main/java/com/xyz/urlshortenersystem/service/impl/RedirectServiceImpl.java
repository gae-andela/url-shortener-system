package com.xyz.urlshortenersystem.service.impl;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xyz.urlshortenersystem.entity.UserUrl;
import com.xyz.urlshortenersystem.event.RedirectEventPublisher;
import com.xyz.urlshortenersystem.exception.RecordNotFoundException;
import com.xyz.urlshortenersystem.repository.UserUrlRepository;
import com.xyz.urlshortenersystem.service.InputConversionService;
import com.xyz.urlshortenersystem.service.RedirectService;

@Service
public class RedirectServiceImpl implements RedirectService {

	@Autowired
	private RedirectEventPublisher redirectEventPublisher;

	@Autowired
	private UserUrlRepository userUrlRepository;

	@Autowired
	private InputConversionService inputConversionService;

	@Override
	public String toLongUrl(String shortUrl) {
		UserUrl userUrl = null;
		var message = "No correspondence for url " + shortUrl;
		if (shortUrl.startsWith(UserUrl.CUSTOM_KEY)) {
			// We are trying to redirect a custom key, then no need to do conversion logic
			// NOTE: We avoid conversion logic in order to eliminate false positive: a
			// custom URL converted
			// to an ID referring another longURL, or not even belonging to current User
			userUrl = userUrlRepository.findByShortUrl(shortUrl)
					.orElseThrow(() -> new RecordNotFoundException(message));
		} else {
			// When not on custom URL, we simply retrieve identifier by applying some
			// conversion logic
			var id = inputConversionService.decode(shortUrl);
			userUrl = userUrlRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(message));
		}
		if (LocalDate.now().isAfter(userUrl.getExpiryDate())) {
			// URL is expired, we should not redirect it anymore
			userUrlRepository.delete(userUrl);
			throw new RecordNotFoundException("Link expired");
		}
		// Notifying that a redirection occurred without blocking current thread
		redirectEventPublisher.publish(userUrl);
		return userUrl.getLongUrl();
	}

}
