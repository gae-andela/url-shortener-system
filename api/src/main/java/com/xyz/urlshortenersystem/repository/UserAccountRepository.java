package com.xyz.urlshortenersystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xyz.urlshortenersystem.entity.UserAccount;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long>{
    Optional<UserAccount> findByEmail(String email);    
}
