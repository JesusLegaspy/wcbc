package com.jlegaspy.wcbcs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jlegaspy.wcbcs.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
