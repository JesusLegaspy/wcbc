import CharacterShow from './CharacterShow';
import { CharacterContext } from '../context/characters';
import { useContext, useState } from 'react';

const CharacterList = () => {
  const { characters } = useContext(CharacterContext);
  const [expandedCharacterId, setExpandedCharacterId] = useState<number | null>(null);

  const handleClick = (characterId: number) => {
    if (expandedCharacterId === characterId) {
      setExpandedCharacterId(null);
    } else {
      setExpandedCharacterId(characterId);
    }
  };

  let content: JSX.Element[] = [];

  characters?.forEach(character => {
    const isExpanded = character.id === expandedCharacterId;
    content.push(
      <CharacterShow
        key={character.id}
        character={character}
        handleClick={() => handleClick(character.id)}
        expand={isExpanded}
      />
    );
    if (isExpanded) {
      content.push(
        <div
          key={"detail-" + character.id}
          className="col-span-3 row-span-1 bg-red-200">
          <img src="https://placekitten.com/600/300" alt="kitty" />
        </div>
      );
    }
  });

  return (
    <div className="container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 mt-2 lg:grid-cols-5 gap-4">
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
};

export default CharacterList;