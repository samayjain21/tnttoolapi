package com.tntapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tntapi.domain.Team;
import com.tntapi.domain.Todo;
import com.tntapi.domain.User;
import com.tntapi.exception.TeamNotFoundException;
import com.tntapi.exception.TodoNotFoundException;
import com.tntapi.exception.UserNotFoundException;
import com.tntapi.repository.TeamRepository;
import com.tntapi.repository.TodoRepository;
import com.tntapi.repository.UserRepository;

@Service
public class TodoService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TodoRepository todoRepository;
	@Autowired
	private TeamRepository teamRepository;
	public Todo createTodoTask(Todo todo, String user_id, String team_id) {
		//finding user
		User user = userRepository.findUserByUserCode(user_id);
		//if user not found
		if (user == null) {
			throw new UserNotFoundException("team member does not exists");
		}
		//assigning user to todo task
		todo.setAssignedTo(user.getName());
		//assigning taskIdentifier to todo task
		Integer userTaskSequence = user.getTaskSequence();
		userTaskSequence++;
		user.setTaskSequence(userTaskSequence);
		todo.setTaskIdentifier(user.getUserCode() + "-" + userTaskSequence);
		//setting user to todo task
		todo.setUser(user);
		todo.setTeamCode(user.getTeamCode());
		//checking team code and user team code is same 
		if (!team_id.equals(user.getTeamCode())) {
			throw new UserNotFoundException(
					"user code '" + user_id + "' does not match with team code '" + team_id + "'");
		}
		return todoRepository.save(todo);
	}
	
	public List<Todo> findAllTodoTask (String teamCode) {
		// find the team
		Team team = teamRepository.findByTeamCode(teamCode);
		// team not found
		if (team == null) {
			throw new TeamNotFoundException("team with team code '" + teamCode + "' does not exist");
		}
		return todoRepository.findTodoByTeamCode(teamCode);
	}
	
	public Todo findTodoByTaskSequence(String team_id, String user_id, String task_id) {
		Team team =teamRepository.findByTeamCode(team_id);
		if(team == null) {
			throw new TeamNotFoundException("team not found");
		}
		User user = userRepository.findUserByUserCode(user_id);
		if(user == null) {
			throw new UserNotFoundException("user not found");
		}
		Todo todo = todoRepository.findTodoByTaskIdentifier(task_id);
		if(todo == null) {
			throw new TodoNotFoundException("task not found");
		}
		
		if(!team_id.equals(user.getTeamCode()) || !user.getTeamCode().equals(todo.getTeamCode())) {
			throw new TodoNotFoundException("task team Code and user Team code does not match");
		}
		return todo;
	}

	public Todo updateBytaskSequence(Todo updatedTodo , String team_id, String user_id, String task_id) {
		Todo todo = findTodoByTaskSequence(team_id, user_id, task_id);
		todo =updatedTodo;
		return todoRepository.save(todo);
				
	}
	
	public void deleteTodo(String user_id, String task_id) {
		User user = userRepository.findUserByUserCode(user_id);
		if(user == null) {
			throw new UserNotFoundException("user not found");
		}
		Todo todo = todoRepository.findTodoByTaskIdentifier(task_id);
		if(todo == null) {
			throw new TodoNotFoundException("task not found");
		}
		List<Todo> todos = user.getTodos();
		todos.remove(todo);
		userRepository.save(user);
		todoRepository.delete(todo);
	}
}
