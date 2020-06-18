package com.tntapi.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tntapi.domain.User;
import com.tntapi.service.MapValidationErrorService;
import com.tntapi.service.UserService;

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping("/{team_id}")
	public ResponseEntity<?> addTeamMemberToTeam(@Valid @RequestBody User user, BindingResult result,
			@PathVariable String team_id) {
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if (errorMap != null) {
			return errorMap;
		}
		User newUser = userService.addUser(team_id, user);
		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
	}
	
	@GetMapping("/{team_id}/{user_id}")
	public ResponseEntity<?> getUser(@PathVariable String team_id,@PathVariable String user_id){
		User user = userService.findUserbyUcode(team_id, user_id);
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}

	@GetMapping("{team_id}")
	public Iterable<User> getUsers(@PathVariable String team_id){
		return userService.findUserList(team_id);
	}
	
	@PatchMapping("/{team_id}/{user_id}")
	public ResponseEntity<?> updateUser(@Valid @RequestBody User user,@PathVariable String team_id,
			@PathVariable String user_id, BindingResult result){
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if(errorMap != null) {
			return errorMap;
		}
		User updateUser = userService.updateByUserCode(user, team_id, user_id);
		return new ResponseEntity<User>(updateUser,HttpStatus.OK);
	}
	
	@DeleteMapping("/{team_id}/{user_id}")
	public ResponseEntity<?> delteUser(@PathVariable String team_id,@PathVariable String user_id){
		userService.deleteUser(team_id, user_id);
		return new ResponseEntity<String>("User successfully removed",HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user){
		User loggedInUser = userService.userLoginCheck(user.getUsername(), user.getPassword());
		return new ResponseEntity<User>(loggedInUser,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public Iterable<User> findAllUsers() {
		return userService.listAllUsers();
	}
}
