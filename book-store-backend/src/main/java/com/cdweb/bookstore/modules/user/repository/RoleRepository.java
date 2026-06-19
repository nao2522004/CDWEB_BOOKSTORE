package com.cdweb.bookstore.modules.user.repository;

import com.cdweb.bookstore.modules.user.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
