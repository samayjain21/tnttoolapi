package com.tntapi.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tntapi.domain.Team;
import com.tntapi.service.MapValidationErrorService;
import com.tntapi.service.TeamService;

@RestController
@RequestMapping("/api/team")
public class TeamController {
	
	@Autowired
	private TeamService teamService;
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("")
	public ResponseEntity<?> saveTeam(@Valid @RequestBody Team team, BindingResult result){
		ResponseEntity<?> errorMap =mapValidationErrorService.mapValidateError(result);
		if(errorMap !=null) {
			return errorMap;
		}
		
		Team newTeam =teamService.saveOrUpdate(team);
		return new ResponseEntity<Team> (newTeam,HttpStatus.CREATED);
	}

}
