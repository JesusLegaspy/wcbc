package com.jlegaspy.wcbcs.exception;

public class ArcNotFoundException extends RuntimeException {

  public ArcNotFoundException(Long id) {
    super("Could not find arc " + id);
  }
}