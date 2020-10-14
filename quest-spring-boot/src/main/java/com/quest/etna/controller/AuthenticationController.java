package com.quest.etna.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.quest.etna.config.JwtTokenUtil;
import com.quest.etna.config.JwtUserDetailsService;
import com.quest.etna.model.User;
import com.quest.etna.model.UserDetails;
import com.quest.etna.repositories.UserRepository;
import com.quest.etna.request.JwtRequest;
import com.quest.etna.response.JwtResponse;

@RestController
public class AuthenticationController {

	private final UserRepository userRepository;

	private final AuthenticationManager authenticationManager;

	private final JwtTokenUtil jwtTokenUtil;

	private final JwtUserDetailsService jwtUserDetailsService;

	private final PasswordEncoder passwordEncoder;

	public AuthenticationController(UserRepository userRepository, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, JwtUserDetailsService jwtUserDetailsService, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.authenticationManager = authenticationManager;
		this.jwtTokenUtil = jwtTokenUtil;
		this.jwtUserDetailsService = jwtUserDetailsService;
		this.passwordEncoder = passwordEncoder;
	}

	@CrossOrigin
	@PostMapping("/register")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		if (userRepository.findByUsername(user.getUsername()) != null) {
			Map<String, String> obj = new HashMap<>();
			obj.put("Error", "Username already used");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(obj);
		}
		User finalUser = new User(user.getUsername(), passwordEncoder.encode(user.getPassword()));
		userRepository.save(finalUser);
		return new ResponseEntity<>(new UserDetails(finalUser.getUsername(), finalUser.getRole()),
				HttpStatus.CREATED);
	}

	@CrossOrigin
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {

		final Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
						authenticationRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		final String token = jwtTokenUtil
				.generateToken(jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername()));

		return ResponseEntity.ok(new JwtResponse(token));
	}

	@CrossOrigin
	@RequestMapping(value = "/checkUsernameAvailability", method = RequestMethod.GET)
	public Boolean checkUsernameAvailability(@RequestParam(value = "username") String username) {
		return userRepository.findByUsername(username) == null;
	}

	@CrossOrigin
	@RequestMapping(value = "/me", method = RequestMethod.GET)
	@ResponseBody
	public User me() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
			return userRepository.findByUsername(((org.springframework.security.core.userdetails.UserDetails) auth.getPrincipal()).getUsername());
		}
		return null;
	}
}
