package com.quest.etna.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.quest.etna.model.JwtUserDetails;

@Service
public class UserPermission {

	
	public boolean isSameUser(Integer id , Authentication authentication ) {
		JwtUserDetails details = (JwtUserDetails) authentication.getPrincipal(); 
		return 	details.isSameUser(id) ;
	}
}
