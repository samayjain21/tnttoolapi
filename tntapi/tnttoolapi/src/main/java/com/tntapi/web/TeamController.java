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

import com.tntapi.domain.Team;
import com.tntapi.domain.User;
import com.tntapi.service.MapValidationErrorService;
import com.tntapi.service.TeamService;

@RestController
@RequestMapping("/api/team")
@CrossOrigin
public class TeamController {

	@Autowired
	private TeamService teamService;
	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping("")
	public ResponseEntity<?> saveTeam(@Valid @RequestBody Team team, BindingResult result) {
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if (errorMap != null) {
			return errorMap;
		}
		Team newTeam = teamService.saveOrUpdate(team);
		return new ResponseEntity<Team>(newTeam, HttpStatus.CREATED);
	}

	@GetMapping("/all")
	public Iterable<Team> getTeams() {
		return teamService.listAllTeams();
	}

	@GetMapping("/{team_id}")
	public ResponseEntity<?> getTeam(@PathVariable String team_id) {
		Team team = teamService.findTeam(team_id);
		return new ResponseEntity<Team>(team, HttpStatus.OK);
	}

	@DeleteMapping("/{team_id}")
	public ResponseEntity<?> deleteTeam(@PathVariable String team_id) {
		teamService.deleteTeam(team_id);
		return new ResponseEntity<String>("team successfully removed", HttpStatus.OK);
	}

	@PatchMapping("/{team_id}")
	public ResponseEntity<?> updateTeam(@Valid @RequestBody Team team, @PathVariable String team_id,
			BindingResult result) {
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if (errorMap != null) {
			return errorMap;
		}
		Team updatedTeam = teamService.updateTeam(team_id, team);
		return new ResponseEntity<Team>(updatedTeam, HttpStatus.OK);
	}
}
