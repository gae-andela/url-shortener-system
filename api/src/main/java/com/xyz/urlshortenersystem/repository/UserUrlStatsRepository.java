package com.xyz.urlshortenersystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xyz.urlshortenersystem.entity.UserUrlStats;

@Repository
public interface UserUrlStatsRepository extends JpaRepository<UserUrlStats, Long> {
	List<UserUrlStats> findByTargetId(long targetId);
}
