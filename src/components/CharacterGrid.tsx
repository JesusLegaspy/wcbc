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
  }

  const content = characters?.map(character => {
    const isExpanded = character.id === expandedCharacterId;
    return (
      <CharacterShow
        key={character.id}
        character={character}
        handleClick={() => handleClick(character.id)}
        expand={isExpanded}
      />
    );
  });

  return (
    <div className='container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4'>
      <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 mt-2 lg:grid-cols-5 gap-4'>
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