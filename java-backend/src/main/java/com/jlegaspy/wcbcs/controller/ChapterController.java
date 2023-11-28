package com.jlegaspy.wcbcs.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jlegaspy.wcbcs.exception.ChapterNotFoundException;
import com.jlegaspy.wcbcs.model.Chapter;
import com.jlegaspy.wcbcs.repository.ChapterRepository;

@RestController
public class ChapterController {
  private final ChapterRepository repository;

  ChapterController(ChapterRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/chapters")
  List<Chapter> all() {
    return repository.findAll();
  }

  @PostMapping("/chapters")
  Chapter newChapter(@RequestBody Chapter newChapter) {
    return repository.save(newChapter);
  }

  @GetMapping("/chapters/{id}")
  Chapter one(@PathVariable Long id) {
    return repository.findById(id).orElseThrow(() -> new ChapterNotFoundException(id));
  }

  @PutMapping("/chapters/{id}")
  Chapter replaceChapter(@RequestBody Chapter newChapter, @PathVariable Long id) {
    return repository.findById(id).map(chapter -> {
      chapter.setChapterNumber(newChapter.getChapterNumber());
      chapter.setPersonaImportances(newChapter.getPersonaImportances());
      return repository.save(chapter);
    }).orElseGet(() -> {
      newChapter.setId(id);
      return repository.save(newChapter);
    });
  }

  @DeleteMapping("/chapters/{id}")
  void deleteChapter(@PathVariable Long id) {
    repository.deleteById(id);
  }
}
