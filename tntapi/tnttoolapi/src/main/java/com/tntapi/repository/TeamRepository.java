package com.tntapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tntapi.domain.Team;

@Repository
public interface TeamRepository extends CrudRepository<Team, Long>{
	

}
