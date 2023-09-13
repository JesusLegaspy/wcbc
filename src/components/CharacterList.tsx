import CharacterShow from './CharacterShow';
import { CharacterContext } from '../context/characters';
import { useContext } from 'react';

const CharacterList = () => {
  const characterContext = useContext(CharacterContext);

  const content = characterContext?.characters?.map(character => {
    return <CharacterShow key={character.id} character={character} />
  });

  return (
    <div className='container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4'> {/* Add margin or padding */}
      <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {content}
      </div>
    </div>
  );
};

export default CharacterList;