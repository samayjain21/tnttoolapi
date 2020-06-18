package com.tntapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tntapi.domain.Team;
import com.tntapi.domain.User;
import com.tntapi.exception.TeamNotFoundException;
import com.tntapi.exception.UserNotFoundException;
import com.tntapi.exception.UsernameException;
import com.tntapi.repository.TeamRepository;
import com.tntapi.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TeamRepository teamRepository;

	public User addUser(String teamCode, User user) {
		try {
			// find team
			Team team = teamRepository.findByTeamCode(teamCode);
			// setting team to user
			user.setTeam(team);
			// setting team code to user
			user.setTeamCode(teamCode);

			// generating userCode with teamCode and userSequence
			Integer userSequence = team.getUserSequence();
			userSequence++;
			team.setUserSequence(userSequence);
			user.setUserCode(user.getTeamCode() + "-" + userSequence);
			// setting user as team lead if role is specified as that
			if (user.getRole() == 2) {
				if (team.getTeamLead() == null) {
					team.setTeamLead(user.getName());
					team.setTeamLeadCode(user.getUserCode());
				} else {
					String teamLeadCode = team.getTeamLeadCode();
					User teamLead = findUserbyUcode(teamCode, teamLeadCode);
					teamLead.setRole(1);
					team.setTeamLead(user.getName());
					team.setTeamLeadCode(user.getUserCode());
				}
			}

			return userRepository.save(user);
		} catch (NullPointerException ex) {
			throw new TeamNotFoundException("team does not exist");
		} catch (Exception e) {
			throw new UsernameException("username already exist");
		}

	}

	public User findUserbyUcode(String teamCode, String userCode) {
		// finding team
		Team team = teamRepository.findByTeamCode(teamCode);
		// if team not found
		if (team == null) {
			throw new TeamNotFoundException("team with team code '" + teamCode + "' does not exist");
		}
		// finding user
		User user = userRepository.findUserByUserCode(userCode);
		// if user not found
		if (user == null) {
			throw new UserNotFoundException("User not found");
		}
		// if team code does not match with user team code
		if (!user.getTeamCode().equals(teamCode)) {
			throw new UserNotFoundException(
					"user code '" + userCode + "' does not match with team code '" + teamCode + "'");
		}
		return user;
	}

	public List<User> findUserList(String teamCode) {
		// find the team
		Team team = teamRepository.findByTeamCode(teamCode);
		// team not found
		if (team == null) {
			throw new TeamNotFoundException("team with team code '" + teamCode + "' does not exist");
		}
		return userRepository.findByTeamCode(teamCode);
	}

	public User updateByUserCode(User updateUser, String team_id, String user_id) {
		// find the user
		User user = findUserbyUcode(team_id, user_id);
		Team team = teamRepository.findByTeamCode(team_id);
		//if role is changing from team lead to team member
		if ((user.getRole() == 2) && (updateUser.getRole() == 1)) {
			team.setTeamLead(null);
			team.setTeamLeadCode(null);
		}
		// mapping new user to old user for updating
		user = updateUser;

		// setting team Lead in team if user role is assign as team lead (i.e. 2)
		if (updateUser.getRole() == 2) {
			if (team.getTeamLead() == null) {
				team.setTeamLead(user.getName());
				team.setTeamLeadCode(user.getUserCode());
			} else {
				String teamLeadCode = team.getTeamLeadCode();
				User teamLead = findUserbyUcode(team_id, teamLeadCode);
				teamLead.setRole(1);
				team.setTeamLead(user.getName());
				team.setTeamLeadCode(user.getUserCode());
			}
		}
		// save user
		return userRepository.save(user);
	}

	public void deleteUser(String team_id, String user_id) {

		// finding the user
		User user = findUserbyUcode(team_id, user_id);

		// getting the team details from user
		Team team = user.getTeam();

		if (user.getRole() == 2) {
			team.setTeamLead(null);
			team.setTeamLeadCode(null);
		}
		// Getting the list of users in the team
		List<User> users = team.getUsers();

		// removing the user from the list of users
		users.remove(user);

		// saving the team
		teamRepository.save(team);

		// deleting the user from repository
		userRepository.delete(user);
	}

	public User userLoginCheck(String username, String password) {
		User user = userRepository.findUserByUsername(username);
		if (user == null) {
			throw new UserNotFoundException("username does not exists");
		}
		if (!user.getPassword().equals(password)) {
			throw new UserNotFoundException("worng password");
		}
		return user;
	}
	
	public Iterable<User> listAllUsers() {
		return userRepository.findAll();
	}
}
