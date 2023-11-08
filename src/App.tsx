import { useEffect, useContext } from 'react';
import { PageContext } from './context/page';
import { BookContext } from './context/books';
import { ChapterContext } from './context/chapters';
import { CharacterContext } from './context/characters';


export default function App() {
  const { presentEntry, modalEntry } = useContext(PageContext);
  const { fetchBooks, currBook } = useContext(BookContext);
  const { fetchChaptersByIds, chapter } = useContext(ChapterContext);
  const { fetchCharactersByIds } = useContext(CharacterContext);

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

  // Get Characters
  useEffect(() => {
    if (chapter === undefined || chapter === null) return;
    const characterIds = chapter.characterOrders.map(charOrder => charOrder.characterId);
    fetchCharactersByIds(characterIds);
    console.debug('useEffect()', 'fetchCharactersByIds:', characterIds);
  }, [chapter, fetchCharactersByIds]);

  return (
    <div>
      <presentEntry.component {...presentEntry.properties} />
      {modalEntry}
    </div>
  );
}

