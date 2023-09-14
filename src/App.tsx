import { useEffect, useContext, useRef } from 'react';
import { BookContext } from './context/books';
import { CharacterContext } from './context/characters';
import CharaterPage from './components/CharacterPage';

export default function App() {
  const { fetchBooks, books } = useContext(BookContext);
  const { fetchCharactersByIds } = useContext(CharacterContext);

  const fetchBooksRef = useRef(fetchBooks);
  useEffect(() => {
    fetchBooksRef.current?.();
  }, []);

  const fetchCharactersByIdsRef = useRef(fetchCharactersByIds);
  useEffect(() => {
    if (books) {
      const book = books.at(0);
      if (book?.characterIds) fetchCharactersByIdsRef.current?.(book.characterIds);
    }
  }, [books]);

  return (
    <div>
      <CharaterPage />
    </div>
  );
}

