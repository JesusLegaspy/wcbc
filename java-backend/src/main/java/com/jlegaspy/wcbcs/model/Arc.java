package com.jlegaspy.wcbcs.model;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Arc {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "arc_seq_generator")
  @SequenceGenerator(name = "arc_seq_generator", sequenceName = "arc_seq", allocationSize = 1)
  private Long id;

  private String title;
  private Integer series;

  public Arc() {
  }

  public Arc(String title, Integer series) {
    this.title = title;
    this.series = series;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Integer getSeries() {
    return series;
  }

  public void setSeries(Integer series) {
    this.series = series;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;

    if (!(o instanceof Arc))
      return false;
    Arc arc = (Arc) o;
    return Objects.equals(this.id, arc.id) && Objects.equals(this.title, arc.title)
        && Objects.equals(this.series, arc.series);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.title, this.series);
  }

  @Override
  public String toString() {
    return String.format("Arc{id=%d, title=%s, series=%d}", this.id, this.title, this.series);
  }
}
