package com.tntapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tntapi.domain.Team;
import com.tntapi.exception.TeamIdException;
import com.tntapi.repository.TeamRepository;

@Service
public class TeamService {
	
	@Autowired
	private TeamRepository teamRepository;
	
	public Team saveOrUpdate (Team team) {
		try {
			team.setTeamCode(team.getTeamCode().toUpperCase());
		return teamRepository.save(team);
	}catch(Exception e) {
		throw new TeamIdException("Team Id already Exists");
		}
	}
	
	public Iterable<Team> listAllTeams(){
		return teamRepository.findAll();
		}
}
