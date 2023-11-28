package com.jlegaspy.wcbcs.exception;

public class ChapterNotFoundException extends RuntimeException {

  public ChapterNotFoundException(Long id) {
    super("Could not find chapter " + id);
  }
}
