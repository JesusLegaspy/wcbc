import { useEffect, useContext } from 'react';
import { BookContext } from './context/books';
import { CharacterContext } from './context/characters';
import { PageContext } from './context/page';

export default function App() {
  const { presentEntry } = useContext(PageContext);
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

  const content = () => {
    // if (page === Page.Home) return <CharaterPage />
    // if (page === Page.AddCharacter) return <CharacterSelection />
    // if (page === Page.CreateCharacter) return <CharacterCreate />
    // if (page === Page.EditCharacter) return <CharacterEdit />
    // if (page === Page.BookSelection) return <BookSelection />
    // if (page === Page.BookCreate) return <BookCreateOrEdit />
    // return (
    //   <>
    //     <div>
    //       Error. Page {page} not found.
    //     </div>
    //     <button className='bg-sky-500 hover:bg-sky-700 px-2 py-1 rounded-full' onClick={handleClickHome}>
    //       Go home
    //     </button>
    //   </>

    // );
    const props = presentEntry.properties;

    return (
      <presentEntry.component {...props} />
    );
  }

  return (
    <div>
      {content()}
    </div>
  );
}

