import { useContext, useState } from 'react';
import CharacterShow from './CharacterShow';
import { CharacterContext } from '../context/characters';

const CharacterGrid = () => {
  const { characters } = useContext(CharacterContext);
  const [expandId, setExpandId] = useState<number | null>(null);

  const handleClick = (characterId: number) => {
    setExpandId(id => id === characterId ? null : characterId);
  };

  const content = characters.map((character) =>
    <CharacterShow
      key={character.id}
      character={character}
      handleClick={() => handleClick(character.id)}
      expand={expandId === character.id}
    />
  );

  return (
    <div className="container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4">
      <div className="grid grid-flow-dense grid-cols-3 sm:grid-cols-3 md:grid-cols-4 mt-2 lg:grid-cols-5 gap-4">
        {content}
      </div>
    </div>
  );
};

export default CharacterGrid;