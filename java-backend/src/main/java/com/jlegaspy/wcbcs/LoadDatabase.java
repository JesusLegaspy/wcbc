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
        Arc newArc = ArcRepository.save(new Arc("The Prophesies Begin", 1));
        log.info("Preloading " + newArc);

        Persona newPersona = new Persona("Rusty", "Flame-colored young tom.", "");
        log.info("Preloading " + personaRepository.save(newPersona));

        ArrayList<PersonaImportance> personaImportance = new ArrayList<PersonaImportance>();
        personaImportance.add(new PersonaImportance(newPersona.getId(), 3));
        Chapter newChapter = new Chapter(1, personaImportance);
        log.info("Preloading " + chapterRepository.save(newChapter));

        Book newBook = new Book("Into the Wild", newArc.getId(), 1, "path",
            new ArrayList<Long>(Arrays.asList(newChapter.getId())));
        log.info("Preloading " + bookRepository
            .save(newBook));
      }
    };
  }
}
