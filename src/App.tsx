import { useEffect, useContext, useState } from 'react';
import { BookContext } from './context/books';
import { CharacterContext } from './context/characters';
import CharaterPage from './components/CharacterPage';

export default function App() {
  const bookContext = useContext(BookContext);
  const characterContext = useContext(CharacterContext);

  useEffect(() => {
    if (!bookContext) {
      console.error('Unexpected error');
      return;
    }
    bookContext.fetchBooks();
  }, []);

  useEffect(() => {
    if (bookContext?.books) {
      const book = bookContext.books.at(0);
      if (book?.characterIds) characterContext?.fetchCharactersByIds(book.characterIds);
    }
  }, [bookContext?.books]);

  return (
    <div>
      <CharaterPage />
    </div>
  );
}

