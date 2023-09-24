import CharacterShow from './CharacterShow';
import { CharacterContext } from '../context/characters';
import { useContext, useState, useEffect } from 'react';

const CharacterList = () => {
  const { characters } = useContext(CharacterContext);
  const [expandedCharacterId, setExpandedCharacterId] = useState<number | null>(null);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const [numColumns, setNumColumns] = useState<number>(3);

  const updateColumns = () => {
    const width = window.innerWidth;

    if (width >= 1024) {
      setNumColumns(5);
    } else if (width >= 768) {
      setNumColumns(4);
    } else {
      setNumColumns(3);
    }
  };

  useEffect(() => {
    updateColumns();
    const resizeObserver = new ResizeObserver(updateColumns);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();  // Cleanup observer on unmount
  }, []);


  const handleClick = (characterId: number, idx: number) => {
    if (expandedCharacterId === characterId) {
      setExpandedCharacterId(null);
      setDetailIndex(null);
    } else {
      setExpandedCharacterId(characterId);
      setDetailIndex(idx + numColumns - (idx % numColumns) - 1);
    }
  };

  let content: JSX.Element[] = [];
  characters?.forEach((character, idx) => {
    const isExpanded = character.id === expandedCharacterId;
    content.push(
      <CharacterShow
        key={character.id}
        character={character}
        handleClick={() => handleClick(character.id, idx)}
        expand={isExpanded}
      />
    );
    if (idx === detailIndex) {
      content.push(
        <div
          key={"detail-" + character.id}
          className={`col-span-3 md:col-span-4 lg:col-span-5 row-span-1 bg-blue-200 border-2 border-blue-200`}>
          <img src="https://placekitten.com/600/300" alt="kitty" />
        </div>
      );
    }
  });

  return (
    <div className="container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 mt-2 lg:grid-cols-5 gap-4">
        {content}
      </div>
    </div>
  );
};

export default CharacterList;