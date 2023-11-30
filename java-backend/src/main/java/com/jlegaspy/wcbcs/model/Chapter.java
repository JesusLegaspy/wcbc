package com.jlegaspy.wcbcs.model;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Chapter {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chapter_seq_generator")
  @SequenceGenerator(name = "chapter_seq_generator", sequenceName = "chapter_seq", allocationSize = 1)
  private Long id;
  private Integer chapterNumber;

  @ElementCollection
  private List<PersonaImportance> personaImportances;

  public Chapter() {
  }

  public Chapter(Integer chapterNumber, List<PersonaImportance> personaImportances) {
    this.chapterNumber = chapterNumber;
    this.personaImportances = personaImportances;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getChapterNumber() {
    return chapterNumber;
  }

  public void setChapterNumber(Integer chapterNumber) {
    this.chapterNumber = chapterNumber;
  }

  public List<PersonaImportance> getPersonaImportances() {
    return personaImportances;
  }

  public void setPersonaImportances(List<PersonaImportance> personaImportances) {
    this.personaImportances = personaImportances;
  }
}
