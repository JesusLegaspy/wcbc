import { ChangeEventHandler, useContext, useEffect, useState } from 'react';
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
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [valueFilter, setValueFilter] = useState<string>('');

  useEffect(() => {
    setSortedCharacters(
      characters
        .filter(char => {
          if (showFilter === false) return true;
          return char.name.toLocaleUpperCase().includes(valueFilter.toUpperCase());
        })
        .map(char => (
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
  }, [characters, chapter, sortOrder, valueFilter, showFilter]);



  const handleClick = (characterId: number) => {
    setExpandId(id => id === characterId ? null : characterId);
  };

  const handleSortOrder = (order: SortOrder) => {
    setSortOrder(order);
  }

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueFilter(e.target.value);
  }

  const handleShowFilter = () => {
    setValueFilter('');
    setShowFilter(prev => !prev);
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
      {showFilter &&
        <div className='z-20 fixed bottom-16 left-0 right-0 h-16 p-4 flex justify-center bg-white border-t border-grey-200'>
          <input type="text"
            className='h-8 text-xl w-full sm:w-96 mx-auto border border-gray-300 rounded-md px-2'
            id="filter"
            name="filter"
            placeholder='Search...'
            value={valueFilter}
            onChange={handleFilter}
          />
        </div>
      }
      <Menu sortFunction={handleSortOrder} handleFilterClick={() => handleShowFilter()} />
    </div>
  );
}
