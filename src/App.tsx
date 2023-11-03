import { useEffect, useContext } from 'react';
import { PageContext } from './context/page';
import { BookContext } from './context/books';
import { ChapterContext } from './context/chapters';
import { CharacterContext } from './context/characters';


export default function App() {
  const { presentEntry, modalEntry } = useContext(PageContext);
  const { fetchBooks, currBook } = useContext(BookContext);
  const { fetchChaptersByIds, setCurrChapterById } = useContext(ChapterContext);
  const { fetchCharactersByIds } = useContext(CharacterContext);

  useEffect(() => {
    console.debug('App.tsx', 'useEffect:', 'fetchBooks()');
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (currBook === undefined) return;
    if (currBook.chapterIds === undefined) return;
    fetchChaptersByIds(currBook.chapterIds);

    const chapterId = currBook.chapterIds.at(0);
    if (chapterId === undefined) return;
    setCurrChapterById(chapterId);

    // if (currBook.characterIds) fetchCharactersByIds(currBook.characterIds);
    console.debug('App.tsx', 'useEffect:', 'fetchChapterById()', 'dep:', 'fetchCharactersByIds, currBook');
  }, [fetchCharactersByIds, currBook]);


  return (
    <div>
      <presentEntry.component {...presentEntry.properties} />
      {modalEntry}
    </div>
  );
}

