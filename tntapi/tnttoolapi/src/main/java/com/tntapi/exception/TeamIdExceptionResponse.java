package com.tntapi.exception;

public class TeamIdExceptionResponse {

	private String teamCode;
	 public TeamIdExceptionResponse(String teamCode) {
		 super();
		 this.teamCode =teamCode;
	 }
	public String getTeamId() {
		return teamCode;
	}
	public void setTeamId(String teamCode) {
		this.teamCode = teamCode;
	}
	 
	 
	 
}
