package com.quest.etna.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.quest.etna.model.User;
import com.quest.etna.model.User.UserRole;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

	@Query("SELECT t FROM User t WHERE t.username LIKE ?1")
	User findByUsername(String name);
	
	@Query("SELECT t FROM User t WHERE t.id LIKE ?1")
	User getOneById(Integer id);
	
	@Modifying
	@Transactional(readOnly=false)
	@Query("update User a set a.username = ?2, a.password = ?3, a.role = ?4 where a.id = ?1")
	void updateUserById(@Param("id") Integer id, String username, String password, UserRole role);

}
