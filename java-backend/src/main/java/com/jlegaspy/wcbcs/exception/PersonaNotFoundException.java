package com.jlegaspy.wcbcs.exception;

public class PersonaNotFoundException extends RuntimeException {

  public PersonaNotFoundException(Long id) {
    super("Could not find persona " + id);
  }
}
