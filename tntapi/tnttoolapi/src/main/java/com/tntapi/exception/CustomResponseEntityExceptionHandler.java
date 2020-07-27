package com.tntapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleTeamIdException(TeamIdException ex, WebRequest request){
		TeamIdExceptionResponse exceptionResponse = new TeamIdExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object> (exceptionResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleTeamNotFoundException(TeamNotFoundException ex, WebRequest request){
		TeamNotFoundExceptionResponse exceptionResponse = new TeamNotFoundExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object> (exceptionResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex, WebRequest request){
		UserNotFoundExceptionResponse exceptionResponse = new UserNotFoundExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> handleTodoNotFoundException(TodoNotFoundException ex, WebRequest request){
		TodoNotFoundExceptionResponse exceptionResponse = new TodoNotFoundExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleDueDateAndTimeException(DueDateAndTimeException ex, WebRequest request){
		DueDateAndTimeExceptionResponse exceptionResponse = new DueDateAndTimeExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponse, HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler
	public final ResponseEntity<Object> handleUsernameException(UsernameException ex, WebRequest request){
		UsernameExceptionResponse exceptionResponse = new UsernameExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> PasswordDidNotMatchException(PasswordDidNotMatchException ex, WebRequest request){
		PasswordDidNotMatchExceptionResponse exceptionResponse = new PasswordDidNotMatchExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object>(exceptionResponse, HttpStatus.BAD_REQUEST);
	}

}
