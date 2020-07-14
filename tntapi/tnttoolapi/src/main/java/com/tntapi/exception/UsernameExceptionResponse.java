package com.tntapi.exception;

public class UsernameExceptionResponse {

	private String username;

	public UsernameExceptionResponse(String username) {
		super();
		this.username = username;
	}

	public String getUserCode() {
		return username;
	}

	public void setUserCode(String username) {
		this.username = username;
	}
	
	
	
}
