package com.quest.etna.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class User implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@NotNull
	@Column(name = "username", nullable = false, unique = true)
	private String username;

	@NotNull
	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "role")
	@Enumerated(EnumType.STRING)
	private UserRole role = UserRole.ROLE_USER;

	@OneToMany
    @JoinColumn(name="id_user")
    private Set<Adresse> adresses;
	
	@CreationTimestamp
	@Column(name = "creationDate")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date creationDate;

	@UpdateTimestamp
	@Column(name = "updatedDate")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date updatedDate;

	public enum UserRole {
		ROLE_USER, ROLE_ADMIN
	}

	public User() {
	}

	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public User(Integer id, String username, String password, UserRole role) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}
	
	public User(Integer id, @NotNull String username, @NotNull String password, UserRole role, Set<Adresse> adresses,
			Date creationDate, Date updatedDate) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
		this.adresses = adresses;
		this.creationDate = creationDate;
		this.updatedDate = updatedDate;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		if (!username.isEmpty()) {
			this.username = username;
		}
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		if (!password.isEmpty()) {
			this.password = password;
		}
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}
	
	public Set<Adresse> getAdresses() {
		return adresses;
	}

	public void setAdresses(Set<Adresse> adresses) {
		this.adresses = adresses;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", role=" + role + ", creationDate=" + creationDate
				+ ", updatedDate=" + updatedDate + "]";
	}

	@Override
	public int hashCode() {
		final Integer prime = 31;
		Integer result = 1;
		result = prime * result + ((creationDate == null) ? 0 : creationDate.hashCode());
		result = prime * result + id;
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
		result = prime * result + ((updatedDate == null) ? 0 : updatedDate.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (creationDate == null) {
			if (other.creationDate != null)
				return false;
		} else if (!creationDate.equals(other.creationDate))
			return false;
		if (id != other.id)
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (role != other.role)
			return false;
		if (updatedDate == null) {
			if (other.updatedDate != null)
				return false;
		} else if (!updatedDate.equals(other.updatedDate))
			return false;
		if (username == null) {
			return other.username == null;
		} else return username.equals(other.username);
	}

}
