package com.jlegaspy.wcbcs.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class PersonaImportance {
  private Long personaId;
  private Integer importance;

  public PersonaImportance() {
  }

  public PersonaImportance(Long personaId, Integer importance) {
    this.personaId = personaId;
    this.importance = importance;
  }

  public Long getPersonaId() {
    return personaId;
  }

  public void setPersonaId(Long personaId) {
    this.personaId = personaId;
  }

  public Integer getImportance() {
    return importance;
  }

  public void setImportance(Integer importance) {
    this.importance = importance;
  }
}
