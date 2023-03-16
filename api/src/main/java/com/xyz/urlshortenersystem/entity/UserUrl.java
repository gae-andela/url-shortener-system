package com.xyz.urlshortenersystem.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_url")
@EntityListeners(AuditingEntityListener.class)
public class UserUrl {
	public static final String CUSTOM_KEY = "cust.";
	public static final String SEQUENCE_NAME = "user_url_id_seq";

	@Id
	@Column(nullable = false)
	// NOTE: We're not generating value here since we'll need theses IDs for generating short URL
	private Long id;

	@Column(nullable = false)
	private String longUrl;

	@Column(nullable = false, unique = true)
	private String shortUrl;

	@CreatedDate
	@Column(nullable = false)
	private LocalDate createDate;

	@Column(nullable = false)
	private LocalDate expiryDate;

	@ManyToOne
	@JoinColumn(nullable = false)
	private UserAccount owner;
}
