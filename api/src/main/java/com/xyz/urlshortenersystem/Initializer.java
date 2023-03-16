package com.xyz.urlshortenersystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@Component
public class Initializer {

	@Autowired
	private EntityManager entityManager;

	@Transactional
	@EventListener(ApplicationReadyEvent.class)
	public void runAfterStartup() {
		// We're creating the sequence that will be used for getting UserUrl IDs.
		Query query = entityManager.createNativeQuery(
				"CREATE SEQUENCE IF NOT EXISTS \"user_url_id_seq\" MINVALUE 1 MAXVALUE 999999999 INCREMENT BY 1 START WITH 1 NOCACHE NOCYCLE");
		query.executeUpdate();
	}

}
