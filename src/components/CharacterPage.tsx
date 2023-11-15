import { useContext, useEffect, useState } from 'react';
import { ChapterContext } from '../context/chapters';
import { Character, CharacterContext } from '../context/characters';
import Navbar from './Navbar';
import CharacterShow from './CharacterShow';
import Menu, { SortOrder } from './Menu';

export default function CharacterPage() {
  const { chapter } = useContext(ChapterContext);
  const { characters } = useContext(CharacterContext);
  const [expandId, setExpandId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Importance);
  const [sortedCharacters, setSortedCharacters] = useState<readonly Character[]>([]);

  useEffect(() => {
    setSortedCharacters(
      characters.map(char => (
        {
          ...char,
          importance: chapter.characterOrders.find(charOrder => charOrder.characterId === char.id)?.order
        }))
        .sort((a, b) => {
          if (sortOrder === SortOrder.Ascending) {
            return a.name.localeCompare(b.name);
          }
          if (sortOrder === SortOrder.Descending) {
            return b.name.localeCompare(a.name);
          }
          if (sortOrder === SortOrder.Importance) {
            if (a.importance === undefined || b.importance === undefined) {
              console.error("Could not order by importance");
              return -1;
            }
            return a.importance - b.importance;
          }
          return -1;
        })
    );
  }, [characters, chapter, sortOrder]);

  const handleClick = (characterId: number) => {
    setExpandId(id => id === characterId ? null : characterId);
  };

  const handleSortOrder = (order: SortOrder) => {
    setSortOrder(order);
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4">
        <div className="grid grid-flow-dense grid-cols-3 sm:grid-cols-3 md:grid-cols-4 mt-2 lg:grid-cols-5 gap-4">
          {sortedCharacters.map((character) =>
            <CharacterShow
              key={character.id}
              character={character}
              handleClick={() => handleClick(character.id)}
              expand={expandId === character.id}
            />)}
        </div>
      </div>
      <Menu sortFunction={handleSortOrder} />
    </div>
  );
}

