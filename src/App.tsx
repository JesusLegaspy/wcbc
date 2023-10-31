import { useEffect, useContext } from 'react';
import { BookContext } from './context/books';
import { CharacterContext } from './context/characters';
import { PageContext } from './context/page';

export default function App() {
  const { presentEntry, modalEntry } = useContext(PageContext);
  const { fetchBooks, currBook } = useContext(BookContext);
  const { fetchCharactersByIds } = useContext(CharacterContext);

  useEffect(() => {
    console.debug('App.tsx', 'useEffect:', 'fetchBooks()');
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (currBook) {
      console.debug('App.tsx', 'useEffect:', 'fetchCharactersByIds()', 'dep:', 'fetchCharactersByIds, currBook');
      if (currBook.characterIds) fetchCharactersByIds(currBook.characterIds);
    }
  }, [fetchCharactersByIds, currBook]);


  return (
    <div>
      <presentEntry.component {...presentEntry.properties} />
      {modalEntry}
    </div>
  );
}

