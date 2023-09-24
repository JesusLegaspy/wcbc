import { useContext, useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CharacterShow from './CharacterShow';
import CharacterDetails from './CharacterDetails';
import { CharacterContext } from '../context/characters';
import "../styles/CharacterGrid.css";

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
        <CSSTransition
          key={"detail-" + character.id}
          timeout={300}
          classNames="detail"
        >
          <CharacterDetails character={character} />
        </CSSTransition>
      );
    }
  });

  return (
    <div className="container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 mt-2 lg:grid-cols-5 gap-4">
        <TransitionGroup component={null}>
          {content}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default CharacterList;