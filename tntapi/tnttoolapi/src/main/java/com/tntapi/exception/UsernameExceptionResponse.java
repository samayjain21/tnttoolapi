package com.tntapi.exception;

public class UsernameExceptionResponse {

	private String username;

	public UsernameExceptionResponse(String userCode) {
		super();
		this.username = userCode;
	}

	public String getUserCode() {
		return username;
	}

	public void setUserCode(String userCode) {
		this.username = userCode;
	}
	
	
	
}
