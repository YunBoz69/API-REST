package com.quest.etna.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.quest.etna.model.JwtUserDetails;
import com.quest.etna.model.User;
import com.quest.etna.repositories.UserRepository;

@RestController
@RequestMapping(path = "/user")
public class UserController {
	
	private final PasswordEncoder passwordEncoder;

	private final UserRepository userRepository;

	public UserController(PasswordEncoder passwordEncoder, UserRepository userRepository) {
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
	}

	@CrossOrigin
	@GetMapping("")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> getList() {
		return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> getOneById(@PathVariable("id") Integer id) {

		User user = userRepository.getOneById(id);
		Map<String, String> obj = new HashMap<>();

		if (user == null) {
			obj.put("Error", "User not found !");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(obj);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@CrossOrigin
	@PutMapping()
	public ResponseEntity<?> modifyUser(@RequestBody User user) {
		
		Map<String, String> obj = new HashMap<>();
		if (!userRepository.findById(user.getId()).isPresent()) {
			obj.put("Error", "User not found!");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(obj);
		}

		JwtUserDetails connectedUser = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();

		if (connectedUser.getRole().toString().equals("ROLE_ADMIN")) {
			userRepository.updateUserById(user.getId(), user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getRole());
			obj.put("Message", "User updated!");
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(obj);
		}
		
		if (connectedUser.getUsername().equals(user.getUsername())) {
			userRepository.updateUserById(user.getId(), user.getUsername(), passwordEncoder.encode(user.getPassword()), connectedUser.getRole());
			obj.put("Message", "User updated!");
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(obj);
		}
		obj.put("Error", "Unauthorized");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(obj);
	}

	@CrossOrigin
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {

		Map<String, String> obj = new HashMap<>();

		if (!userRepository.existsById(id)) {
			obj.put("Message", "User not found !");
			return ResponseEntity.status(HttpStatus.OK).body(obj);
		}

		try {
			JwtUserDetails user = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			if (user.getUsername().equals(userRepository.getOneById(id).getUsername())
					|| user.getRole().toString().equals("ROLE_ADMIN")) {
				userRepository.deleteById(id);
				obj.put("Message", "User deleted!");
				return ResponseEntity.status(HttpStatus.OK).body(obj);
			}
		} catch (Exception e) {
			obj.put("Error", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(obj);
		}
		obj.put("Error", "Unauthorized");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(obj);
	}
}
