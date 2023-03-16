package com.xyz.urlshortenersystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xyz.urlshortenersystem.entity.UserUrl;

@Repository
public interface UserUrlRepository extends JpaRepository<UserUrl, Long> {
	Optional<UserUrl> findByShortUrl(String shortUrl);

	List<UserUrl> findByOwnerId(long ownerId);

	void deleteByIdAndOwnerId(long id, long ownerId);
}
