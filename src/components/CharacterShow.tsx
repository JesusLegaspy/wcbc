import { CSSTransition } from 'react-transition-group'
import { Character } from '../context/characters';
import CharacterDetails from './CharacterDetails';
import '../styles/CharacterShow.css';

interface CharacterShowProps {
  character: Character;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  expand: boolean;
}

const CharacterShow: React.FC<CharacterShowProps> = ({ character, handleClick, expand }) => {

  return (
    <>
      <div onClick={handleClick} className={`z-10 ${expand ? "mb-[-16px] pb-2 bg-blue-200" : ""}`}>
        <h3 className="font-semibold whitespace-nowrap truncate">{character.name}</h3>
        <div className='relative text-gray-300 bg-cyan-300'>
          <img className="object-cover h-200 w-200" src={`https://picsum.photos/seed/${character.id * 10}/400/400`} alt="books" />
        </div>
      </div>
      <CSSTransition in={expand} timeout={500} classNames="detail" unmountOnExit >
        <div className="col-span-full overflow-hidden bg-blue-200 border-2 border-blue-200" >
          <CharacterDetails character={character} />
        </div>
      </CSSTransition>
    </>
  );
};

export default CharacterShow;