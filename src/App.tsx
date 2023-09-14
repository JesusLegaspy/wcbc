import { useEffect, useContext, useRef } from 'react';
import { BookContext } from './context/books';
import { CharacterContext } from './context/characters';
import { Page, PageContext } from './context/page';
import CharaterPage from './components/CharacterPage';
import CharacterCreate from './components/CharacterCreate';

export default function App() {
  const { page } = useContext(PageContext);
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

  const content = () => {
    if (page == Page.Home) return <CharaterPage />
    if (page == Page.AddCharacter) return <CharacterCreate />
    return (
      <div>
        Error
      </div>
    );
  }

  return (
    <div>
      {content()}
    </div>
  );
}

