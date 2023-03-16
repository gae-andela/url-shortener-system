package com.xyz.urlshortenersystem.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles(profiles = "test")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class NextIdServiceTest {
	@Autowired
	private NextIdService nextIdService;

	@Test
	void testNextId() {
		var value = nextIdService.nextId();
		assertTrue(value > 0);
		assertEquals(value + 1, nextIdService.nextId());
	}

}
