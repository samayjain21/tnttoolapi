package com.tntapi.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tntapi.domain.Todo;
import com.tntapi.service.MapValidationErrorService;
import com.tntapi.service.TodoService;

@RestController
@RequestMapping("/api/todo")
@CrossOrigin
public class TodoController {

	@Autowired
	private TodoService todoService;
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{user_id}")
	public ResponseEntity<?> addTodoTask(@Valid @RequestBody Todo todo, BindingResult result,
			@PathVariable String user_id){
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if(errorMap!= null) {
			return errorMap;
		}
		Todo newTodo = todoService.createTodoTask(todo, user_id);
		return new ResponseEntity<Todo> (newTodo, HttpStatus.CREATED);
	}
}
