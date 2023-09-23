import { Character } from '../context/characters';

interface CharacterShowProps {
  character: Character;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  expand: boolean;
}

const CharacterShow: React.FC<CharacterShowProps> = ({ character, handleClick, expand }) => {

  return (
    <div onClick={handleClick} className={expand ? "col-span-3 row-span-2" : ""}>
      <h3 className="font-semibold whitespace-nowrap truncate">{character.name}</h3>
      <div className='relative text-gray-300 bg-cyan-300'>
        <img className="object-cover h-200 w-200" src={`https://picsum.photos/seed/${character.id * 10}/400/400`} alt="books" />
      </div>
    </div>
  );
};

export default CharacterShow;