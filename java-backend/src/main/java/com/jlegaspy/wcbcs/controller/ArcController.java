package com.jlegaspy.wcbcs.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jlegaspy.wcbcs.model.Arc;
import com.jlegaspy.wcbcs.repository.ArcRepository;
import com.jlegaspy.wcbcs.exception.ArcNotFoundException;

@RestController
public class ArcController {
  private final ArcRepository repository;

  ArcController(ArcRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/arcs")
  List<Arc> all() {
    return repository.findAll();
  }

  @PostMapping("/arcs")
  Arc newArc(@RequestBody Arc newArc) {
    return repository.save(newArc);
  }

  @GetMapping("/arcs/{id}")
  Arc one(@PathVariable Long id) {
    return repository.findById(id).orElseThrow(() -> new ArcNotFoundException(id));
  }

  @PutMapping("/arcs/{id}")
  Arc replaceArc(@RequestBody Arc newArc, @PathVariable Long id) {

    return repository.findById(id).map(arc -> {
      arc.setTitle(newArc.getTitle());
      arc.setSeries(newArc.getSeries());
      return repository.save(arc);
    }).orElseGet(() -> {
      newArc.setId(id);
      return repository.save(newArc);
    });
  }

  @DeleteMapping("/arcs/{id}")
  void deleteArc(@PathVariable Long id) {
    repository.deleteById(id);
  }
}
