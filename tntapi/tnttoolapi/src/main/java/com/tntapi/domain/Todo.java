package com.tntapi.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Todo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "name of the Todo Task is required")
	@Size(min = 5,max = 20,message = "It should be between 5 to 20 characters")
	private String name;
	@Column(unique = true, updatable = false, nullable = false)
	private String taskIdentifier;
	@NotBlank(message = "Detail of the Todo Task is required")
	@Size(min = 50,max = 250, message = "It should be between 50 to 250 characters")
	private String detail;
	@Column(nullable = false)
	private String assignedTo;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date dueDateAndTime;
	private int priority;
	private String status;
	@Size(min = 10,max = 150,message = "It should be between 10 to 150 characters")
	private String comment;
	@Column(updatable = false, nullable = false)
	private String teamCode;
	
	//add userCode
	@Column(updatable = false, nullable = false)
	private String userCode;
	

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name="user_id",updatable =false , nullable = false)
	@JsonIgnore
	private User user;



	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getTeamCode() {
		return teamCode;
	}

	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTaskIdentifier() {
		return taskIdentifier;
	}

	public void setTaskIdentifier(String taskIdentifier) {
		this.taskIdentifier = taskIdentifier;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	public Date getDueDateAndTime() {
		return dueDateAndTime;
	}

	public void setDueDateAndTime(Date dueDateAndTime) {
		this.dueDateAndTime = dueDateAndTime;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
}
