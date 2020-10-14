package com.quest.etna.model;

import com.quest.etna.model.User.UserRole;

public class UserDetails {

	protected String username;
	UserRole role;

	UserDetails() {
	}

	public UserDetails(String username, UserRole role) {
		super();
		this.username = username;
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}
}
