package com.jlegaspy.wcbcs.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jlegaspy.wcbcs.exception.PersonaNotFoundException;
import com.jlegaspy.wcbcs.model.Persona;
import com.jlegaspy.wcbcs.repository.PersonaRepository;

@RestController
public class PersonaController {
  private final PersonaRepository repository;

  PersonaController(PersonaRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/personas")
  List<Persona> all() {
    return repository.findAll();
  }

  @PostMapping("/personas")
  Persona newPersona(@RequestBody Persona newPersona) {
    return repository.save(newPersona);
  }

  @GetMapping("/personas/{id}")
  Persona one(@PathVariable Long id) {
    return repository.findById(id).orElseThrow(() -> new PersonaNotFoundException(id));
  }

  @PutMapping("/personas/{id}")
  Persona replacePersona(@RequestBody Persona newPersona, @PathVariable Long id) {
    return repository.findById(id).map(persona -> {
      persona.setName(newPersona.getName());
      persona.setDescription(newPersona.getDescription());
      persona.setImage(newPersona.getImage());
      return repository.save(persona);
    }).orElseGet(() -> {
      newPersona.setId(id);
      return repository.save(newPersona);
    });
  }

  @DeleteMapping("/personas/{id}")
  void deletePersona(@PathVariable Long id) {
    repository.deleteById(id);
  }
}
