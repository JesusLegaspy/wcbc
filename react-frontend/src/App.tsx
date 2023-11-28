import { useEffect, useContext } from 'react';
import { PageContext } from './context/page';
import { BookContext } from './context/books';
import { ChapterContext } from './context/chapters';
import { PersonaContext } from './context/personas';


export default function App() {
  const { presentEntry, modalEntry } = useContext(PageContext);
  const { fetchBooks, currBook } = useContext(BookContext);
  const { fetchChaptersByIds, chapter } = useContext(ChapterContext);
  const { fetchPersonasByIds } = useContext(PersonaContext);

  // Get book
  useEffect(() => {
    fetchBooks();
    console.debug('useEffect()', 'fetchBooks()');
  }, [fetchBooks]);

  // Get chapter
  useEffect(() => {
    if (currBook === undefined) return;
    if (currBook.chapterIds === undefined) return;
    fetchChaptersByIds(currBook.chapterIds);
    console.debug('useEffect()', 'fetchChaptersByIds:', currBook.chapterIds);
  }, [fetchChaptersByIds, currBook]);

  // Get Personas
  useEffect(() => {
    if (chapter === undefined || chapter === null) return;
    const personaIds = chapter.personaImportances.map(persImp => persImp.personaId);
    fetchPersonasByIds(personaIds);
    console.debug('useEffect()', 'fetchPersonasByIds:', personaIds);
  }, [chapter, fetchPersonasByIds]);

  return (
    <div>
      <presentEntry.component {...presentEntry.properties} />
      {modalEntry}
    </div>
  );
}

