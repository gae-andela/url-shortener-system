package com.xyz.urlshortenersystem.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xyz.urlshortenersystem.entity.UserUrl;
import com.xyz.urlshortenersystem.entity.UserUrlStats;
import com.xyz.urlshortenersystem.exception.BadRequestException;
import com.xyz.urlshortenersystem.exception.RecordNotFoundException;
import com.xyz.urlshortenersystem.exception.UserAuthenticationException;
import com.xyz.urlshortenersystem.repository.UserUrlRepository;
import com.xyz.urlshortenersystem.repository.UserUrlStatsRepository;
import com.xyz.urlshortenersystem.service.InputConversionService;
import com.xyz.urlshortenersystem.service.NextIdService;
import com.xyz.urlshortenersystem.service.UserAccountService;
import com.xyz.urlshortenersystem.service.UserUrlService;

@Service
public class UserUrlServiceImpl implements UserUrlService {
	@Autowired
	private NextIdService nextIdService;

	@Autowired
	private UserAccountService userAccountService;

	@Autowired
	private UserUrlRepository userUrlRepository;

	@Autowired
	private UserUrlStatsRepository userUrlStatsRepository;

	@Autowired
	private InputConversionService inputConversionService;

	@Override
	public UserUrl toShortUrl(String longUrl, LocalDate expiryDate, String shortUrl) {
		// 1- If no custom expiration date, we will set one by default
		var safeDate = expiryDate == null ? LocalDate.now().plusDays(50) : expiryDate;
		var id = nextIdService.nextId();
		var owner = userAccountService.getCurrentUser();

		if (shortUrl != null) {
			// If short URL isn't empty, the user requested a custom URL.
			// We don't need to convert the identifier (but we'll consume it)
			// But we'll allow the URL only if available
			shortUrl = UserUrl.CUSTOM_KEY + shortUrl;
			userUrlRepository.findByShortUrl(shortUrl).ifPresent(u -> {
				throw new BadRequestException("Given URL is already used");
			});
		} else {
			shortUrl = inputConversionService.encode(id);
		}
		var userUrl = UserUrl.builder().id(id).longUrl(longUrl).shortUrl(shortUrl).expiryDate(safeDate).owner(owner)
				.build();
		return userUrlRepository.save(userUrl);
	}

	@Override
	public List<UserUrl> getUserUrls() {
		var owner = userAccountService.getCurrentUser();
		return userUrlRepository.findByOwnerId(owner.getId());
	}

	@Override
	public List<UserUrlStats> getUserUrlsStats(long id) {
		var owner = userAccountService.getCurrentUser();
		var userUrl = userUrlRepository.findById(id)
				.orElseThrow(() -> new RecordNotFoundException("Unknown userUrl ID"));
		if (!userUrl.getOwner().getId().equals(owner.getId())) {
			throw new UserAuthenticationException("Invalid operation for user");
		}
		return userUrlStatsRepository.findByTargetId(id);
	}

	@Override
	@Transactional
	public void delete(long id) {
		var user = userAccountService.getCurrentUser();
		userUrlRepository.deleteByIdAndOwnerId(id, user.getId());
	}
}
