package com.tntapi.exception;

public class TeamIdExceptionResponse {

	private String teamCode;
	 public TeamIdExceptionResponse(String teamCode) {
		 super();
		 this.setTeamCode(teamCode);
	 }
	public String getTeamCode() {
		return teamCode;
	}
	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}
	
	 
	 
	 
}
