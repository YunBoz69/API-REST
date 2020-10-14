package com.quest.etna.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Adresse implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@NotEmpty(message = "La rue ne peut pas être vide!")
	@Column(name = "rue", length = 100, nullable = false)
	private String rue;

	@NotEmpty(message = "Le code postale ne peut pas être vide!")
	@Column(name = "postalCode", length = 30, nullable = false)
	private String postalCode;
	
	@NotEmpty(message = "La ville ne peut pas être vide!")
	@Column(name = "city", length = 50, nullable = false)
	private String city;
	
	@NotEmpty(message = "Le pays ne peut pas être vide!")
	@Column(name = "country", length = 50, nullable = false)
	private String country;	
	
	@CreationTimestamp
	@Column(name = "creationDate")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date creationDate;

	@UpdateTimestamp
	@Column(name = "updateDate")
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date updatedDate;

	public Adresse() {

	}

	public Adresse(String rue, String postalCode, String city, String country) {
		super();
		this.rue = rue;
		this.postalCode = postalCode;
		this.city = city;
		this.country = country;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRue() {
		return rue;
	}

	public void setRue(String rue) {
		this.rue = rue;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	@Override
	public String toString() {
		return "Adresse [id=" + id + ", rue=" + rue + ", postalCode=" + postalCode + ", city=" + city
				+ ", country=" + country + ", creationDate=" + creationDate + ", updatedDate="
				+ updatedDate + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((city == null) ? 0 : city.hashCode());
		result = prime * result + ((country == null) ? 0 : country.hashCode());
		result = prime * result + ((creationDate == null) ? 0 : creationDate.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((postalCode == null) ? 0 : postalCode.hashCode());
		result = prime * result + ((updatedDate == null) ? 0 : updatedDate.hashCode());
		result = prime * result + ((rue == null) ? 0 : rue.hashCode());
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
		Adresse other = (Adresse) obj;
		if (city == null) {
			if (other.city != null)
				return false;
		} else if (!city.equals(other.city))
			return false;
		if (country == null) {
			if (other.country != null)
				return false;
		} else if (!country.equals(other.country))
			return false;
		if (creationDate == null) {
			if (other.creationDate != null)
				return false;
		} else if (!creationDate.equals(other.creationDate))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (postalCode == null) {
			if (other.postalCode != null)
				return false;
		} else if (!postalCode.equals(other.postalCode))
			return false;
		if (updatedDate == null) {
			if (other.updatedDate != null)
				return false;
		} else if (!updatedDate.equals(other.updatedDate))
			return false;
		if (rue == null) {
			return other.rue == null;
		} else return rue.equals(other.rue);
	}
	
	
}
