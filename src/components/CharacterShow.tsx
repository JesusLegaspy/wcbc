import CharacterEdit from './CharacterEdit';
import { HiXCircle, HiPencilSquare } from 'react-icons/hi2';
import { CharacterContext, Character } from '../context/characters';
import { BookContext } from '../context/books';
import { useContext, useState } from 'react';

const CharacterShow = ({ character }: { character: Character }) => {
  const characterContext = useContext(CharacterContext);
  const bookContext = useContext(BookContext);
  const [showEdit, setShowEdit] = useState(false);

  const handleClickEdit = () => {
    setShowEdit(!showEdit);
  }

  const handleClickDelete = () => {
    if (!bookContext) throw new Error('Could not delete Character.');
    bookContext.removeCharacterById(character.id);
  }

  return (
    <div>
      <h3 className="font-semibold">{character.name}</h3>
      <div className='relative text-gray-300 bg-cyan-300'>
        <div className="absolute top-2 right-7 hover:text-gray-400">
          <button onClick={handleClickEdit}><HiPencilSquare /></button>
        </div>
        <div className="absolute top-2 right-2 hover:text-gray-400">
          <button onClick={handleClickDelete}><HiXCircle /></button>
        </div>
        <img className="object-cover h-300 w-200" src={`https://picsum.photos/seed/${character.id * 10}/600/400`} alt="books" />
      </div>
      {character.description}
      {showEdit && (<CharacterEdit character={character} setShowEdit={setShowEdit} />)}
    </div>
  );
};

export default CharacterShow;