package com.xyz.urlshortenersystem.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xyz.urlshortenersystem.service.NextIdService;

import jakarta.persistence.EntityManager;

@Service
public class NextIdServiceImpl implements NextIdService {

	@Autowired
	private EntityManager entityManager;

	@Override
	public long nextId() {
		return Long.parseLong(
				entityManager.createNativeQuery("SELECT nextval('user_url_id_seq')").getSingleResult().toString());
	}

}
