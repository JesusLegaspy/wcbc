package com.jlegaspy.wcbcs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jlegaspy.wcbcs.model.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long> {

}
