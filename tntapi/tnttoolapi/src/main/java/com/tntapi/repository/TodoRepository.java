package com.tntapi.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tntapi.domain.Todo;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long>{
	
	Todo findTodoByTaskIdentifier(String todoTask_id);

	
	List<Todo> findTodoByTeamCode(String team_id);

}
