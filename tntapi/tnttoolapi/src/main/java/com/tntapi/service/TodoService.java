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

	public Todo createTodoTask(Todo todo, String user_id) {
		try {
			User user = userRepository.findUserByUserCode(user_id);
			todo.setAssignedTo(user.getName());
			Integer userTaskSequence = user.getTaskSequence();
			userTaskSequence++;
			user.setTaskSequence(userTaskSequence);
			todo.setTaskIdentifier(user.getUserCode() + "-" + userTaskSequence);
			todo.setUser(user);
			return todoRepository.save(todo);
		} catch (Exception ex) {
			throw new UserNotFoundException("team member does not exists");

		}

	}
}
