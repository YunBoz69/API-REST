package com.quest.etna.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.quest.etna.model.Adresse;

@Repository
public interface AdresseRepository extends CrudRepository<Adresse, Integer> {
	
	@Modifying
	@Transactional(readOnly=false)
	@Query("update Adresse a set a.rue = ?2, a.postalCode = ?3, a.city = ?4, a.country = ?5 where a.id = ?1")
	void updateAddressById(@Param("id") Integer id, String rue, String postalCode, String city, String country);
	
	@Query("SELECT t FROM Adresse t WHERE t.id LIKE ?1")
	Adresse getOneById(Integer id);
}
