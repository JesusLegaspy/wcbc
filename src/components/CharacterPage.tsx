import { useContext, useState } from 'react';
import { CharacterContext } from '../context/characters';
import Navbar from './Navbar';
import CharacterShow from './CharacterShow';
import Menu from './Menu';

export default function CharacterPage() {
  const { characters } = useContext(CharacterContext);
  const [expandId, setExpandId] = useState<number | null>(null);

  const handleClick = (characterId: number) => {
    setExpandId(id => id === characterId ? null : characterId);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4">
        <div className="grid grid-flow-dense grid-cols-3 sm:grid-cols-3 md:grid-cols-4 mt-2 lg:grid-cols-5 gap-4">
          {characters.map((character) =>
            <CharacterShow
              key={character.id}
              character={character}
              handleClick={() => handleClick(character.id)}
              expand={expandId === character.id}
            />)}
        </div>
      </div>
      <Menu />
    </div>
  );
}

