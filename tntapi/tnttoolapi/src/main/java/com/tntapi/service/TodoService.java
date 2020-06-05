package com.tntapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tntapi.domain.Todo;
import com.tntapi.domain.User;
import com.tntapi.exception.UserNotFoundException;
import com.tntapi.repository.TodoRepository;
import com.tntapi.repository.UserRepository;

@Service
public class TodoService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TodoRepository todoRepository;

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
		//checking team code and user team code is same 
		if (!team_id.equals(user.getTeamCode())) {
			throw new UserNotFoundException(
					"user code '" + user_id + "' does not match with team code '" + team_id + "'");
		}
		return todoRepository.save(todo);
	}
}
