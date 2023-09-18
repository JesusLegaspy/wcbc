import { useEffect, useContext, useRef } from 'react';
import { BookContext } from './context/books';
import { CharacterContext } from './context/characters';
import { Page, PageContext } from './context/page';
import CharaterPage from './components/CharacterPage';
import CharacterAdd from './components/CharacterAdd';
import CharacterCreate from './components/CharacterCreate';

export default function App() {
  const { page, setPage } = useContext(PageContext);
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

  const handleClickHome = () => {
    setPage(Page.Home);
  }

  const content = () => {
    if (page === Page.Home) return <CharaterPage />
    if (page === Page.AddCharacter) return <CharacterAdd />
    if (page === Page.CreateCharacter) return <CharacterCreate />
    return (
      <>
        <div>
          Error. Page {page} not found.
        </div>
        <button className='bg-sky-500 hover:bg-sky-700 px-2 py-1 rounded-full' onClick={handleClickHome}>
          Go home
        </button>
      </>

    );
  }

  return (
    <div>
      {content()}
    </div>
  );
}

