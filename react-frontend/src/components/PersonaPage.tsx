import { useContext, useEffect, useState } from 'react';
import { ChapterContext } from '../context/chapters';
import { Persona, PersonaContext } from '../context/personas';
import NavbarTop from './NavbarTop';
import PersonaShow from './PersonaShow';
import MenuBottom, { SortOrder } from './NavbarBottom';

export default function PersonaPage() {
  const { chapter } = useContext(ChapterContext);
  const { personas } = useContext(PersonaContext);
  const [expandId, setExpandId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Importance);
  const [sortedPersonas, setSortedPersonas] = useState<readonly Persona[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [valueFilter, setValueFilter] = useState<string>('');

  useEffect(() => {
    setSortedPersonas(
      personas
        .filter(char => {
          if (showFilter === false) return true;
          return char.name.toLocaleUpperCase().includes(valueFilter.toUpperCase());
        })
        .map(char => (
          {
            ...char,
            importance: chapter.personaImportances.find(persImp => persImp.personaId === char.id)?.importance
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
              console.debug("Could not order by importance"); // suppressed
              return -1;
            }
            return a.importance - b.importance;
          }
          return -1;
        })
    );
  }, [personas, chapter, sortOrder, valueFilter, showFilter]);



  const handleClick = (personaId: number) => {
    setExpandId(id => id === personaId ? null : personaId);
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
      <NavbarTop />
      <div className="container mx-auto max-w-screen-xl px-4 pt-16 pb-16 lg:pt-4 lg:pb-4">
        <div className="grid grid-flow-dense grid-cols-3 sm:grid-cols-3 md:grid-cols-4 mt-2 lg:grid-cols-5 gap-4">
          {sortedPersonas.map((persona) =>
            <PersonaShow
              key={persona.id}
              persona={persona}
              handleClick={() => handleClick(persona.id)}
              expand={expandId === persona.id}
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
      <MenuBottom sortFunction={handleSortOrder} handleFilterClick={() => handleShowFilter()} />
    </div>
  );
}
