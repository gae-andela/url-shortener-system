package com.xyz.urlshortenersystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xyz.urlshortenersystem.entity.UserRole;
import com.xyz.urlshortenersystem.enumeration.RoleName;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
	Optional<UserRole> findByName(RoleName name);
}
