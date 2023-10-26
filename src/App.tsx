import { useEffect, useContext } from 'react';
import { BookContext } from './context/books';
import { CharacterContext } from './context/characters';
import { Page, PageContext } from './context/page';
import CharaterPage from './components/CharacterPage';
import CharacterSelection from './components/CharacterSelection';
import CharacterCreate from './components/CharacterCreate';
import CharacterEdit from './components/CharacterEdit';
import BookSelection from './components/BookSelection';

export default function App() {
  const { page, setPage } = useContext(PageContext);
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

  const handleClickHome = () => {
    setPage(Page.Home);
  }

  const content = () => {
    if (page === Page.Home) return <CharaterPage />
    if (page === Page.AddCharacter) return <CharacterSelection />
    if (page === Page.CreateCharacter) return <CharacterCreate />
    if (page === Page.EditCharacter) return <CharacterEdit />
    if (page === Page.BookSelection) return <BookSelection />
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

