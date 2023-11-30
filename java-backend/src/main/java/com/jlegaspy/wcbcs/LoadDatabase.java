package com.jlegaspy.wcbcs;

import java.util.ArrayList;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.jlegaspy.wcbcs.model.Arc;
import com.jlegaspy.wcbcs.model.Book;
import com.jlegaspy.wcbcs.model.Chapter;
import com.jlegaspy.wcbcs.model.PersonaImportance;
import com.jlegaspy.wcbcs.model.Persona;
import com.jlegaspy.wcbcs.repository.ArcRepository;
import com.jlegaspy.wcbcs.repository.BookRepository;
import com.jlegaspy.wcbcs.repository.ChapterRepository;
import com.jlegaspy.wcbcs.repository.PersonaRepository;

@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Value("${preload.database}")
  private boolean preloadDatabase;

  @Bean
  CommandLineRunner initBookDatabase(ArcRepository ArcRepository, BookRepository bookRepository,
      ChapterRepository chapterRepository, PersonaRepository personaRepository) {
    return args -> {

      if (preloadDatabase) {
        log.info("Preloading " + ArcRepository.save(new Arc("The Prophesies Begin", 1)));

        log.info("Preloading " + bookRepository
            .save(new Book("Harry Potter", Long.valueOf(1), 1, "path", new ArrayList<Long>(Arrays.asList(1L)))));

        ArrayList<PersonaImportance> personaImportance = new ArrayList<PersonaImportance>();
        personaImportance.add(new PersonaImportance(1L, 3));
        log.info("Preloading " + chapterRepository.save(new Chapter(1, personaImportance)));

        log.info("Preloading " + personaRepository.save(new Persona("Ariawing", "Black and white cat", "")));

      }
    };
  }
}
