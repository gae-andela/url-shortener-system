package com.xyz.urlshortenersystem.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles(profiles = "test")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class InputConversionServiceTest {
	@Autowired
	private InputConversionService inputConversionService;

	@Test
	void testEncode() {
		assertEquals("k", inputConversionService.encode(10));
		assertEquals("a", inputConversionService.encode(0));
		assertEquals("fkv6", inputConversionService.encode(1231440));
	}

	@Test
	void testDecode() {
		assertEquals(10, inputConversionService.decode("k"));
		assertThrows(NullPointerException.class, () -> inputConversionService.decode(null));
	}
}
