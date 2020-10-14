package com.quest.etna.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.quest.etna.model.Adresse;
import com.quest.etna.model.JwtUserDetails;
import com.quest.etna.model.User;
import com.quest.etna.repositories.AdresseRepository;
import com.quest.etna.repositories.UserRepository;

@RestController
@RequestMapping(path = "/address")
public class AddressController {

	private final AdresseRepository adresseRepository;

	private final UserRepository userRepository;

	public AddressController(AdresseRepository adresseRepository, UserRepository userRepository) {
		this.adresseRepository = adresseRepository;
		this.userRepository = userRepository;
	}

	@GetMapping("")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> getList() {

		Map<String, String> obj = new HashMap<>();

		if (adresseRepository.findAll() == null) {
			obj.put("Warning", "List of addresses empty!");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(obj);
		}

		JwtUserDetails user = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (user.getRole().toString().equals("ROLE_ADMIN")) {
			return new ResponseEntity<>(adresseRepository.findAll(), HttpStatus.OK);
		} else
			return new ResponseEntity<>(userRepository.findByUsername(user.getUsername()).getAdresses(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> getOneById(@PathVariable("id") Integer id) {

		Adresse address = adresseRepository.getOneById(id);
		Map<String, String> obj = new HashMap<>();

		if (address == null) {
			obj.put("Error", "Address not found !");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(obj);
		}

		JwtUserDetails user = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (userRepository.findByUsername(user.getUsername()).getAdresses().contains(address)
				|| user.getRole().toString().equals("ROLE_ADMIN")) {
			return new ResponseEntity<>(address, HttpStatus.OK);
		} else {
			obj.put("Error", "Not authorized !");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(obj);
		}
	}

	@CrossOrigin
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<?> createAddress(@RequestBody Adresse address) {

		Adresse adresse = new Adresse(address.getRue(), address.getPostalCode(), address.getCity(),
				address.getCountry());
		adresse = adresseRepository.save(adresse);
		
		try {
			JwtUserDetails user = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			User connectedUser = userRepository.findByUsername(user.getUsername());
			
			connectedUser.getAdresses().add(adresse);
			userRepository.save(connectedUser);
		} catch (Exception e) {
			System.out.println("Something went wrong : " + e.getMessage());
		}
		return new ResponseEntity<>(adresse, HttpStatus.OK);
	}

	@CrossOrigin
	@PutMapping("/{id}")
	public ResponseEntity<?> modifyAddress(@PathVariable("id") Integer id, @RequestBody Adresse address) {

		if (adresseRepository.getOneById(id) == null) {
			return new ResponseEntity<>(address ,HttpStatus.NOT_FOUND);
		}

		JwtUserDetails user = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		if (userRepository.findByUsername(user.getUsername()).getAdresses().contains(adresseRepository.getOneById(id))
				|| user.getRole().toString().equals("ROLE_ADMIN")) {
			adresseRepository.updateAddressById(id, address.getRue(), address.getPostalCode(), address.getCity(),
					address.getCountry());
			return ResponseEntity.ok(address);
		}
		return new ResponseEntity<>(address ,HttpStatus.UNAUTHORIZED);
	}
	
	@CrossOrigin
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAddress(@PathVariable("id") Integer id) {


		if (!adresseRepository.existsById(id)) {
			return new ResponseEntity<>(id ,HttpStatus.NOT_FOUND);
		}

		Adresse adresse = adresseRepository.getOneById(id);

		try {
			JwtUserDetails user = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();

			if (userRepository.findByUsername(user.getUsername()).getAdresses().contains(adresse)
					|| user.getRole().toString().equals("ROLE_ADMIN")) {
				adresseRepository.deleteById(id);
				return new ResponseEntity<>(id ,HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(id ,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(id ,HttpStatus.UNAUTHORIZED);
	}

}
