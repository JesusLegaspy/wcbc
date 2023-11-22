import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group'
import { Persona } from '../context/personas';
import PersonaDetails from './PersonaDetails';
import "../styles/PersonaShow.css";

interface PersonaShowProps {
  persona: Persona;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  expand: boolean;
}

const PersonaShow: React.FC<PersonaShowProps> = ({ persona, handleClick, expand }) => {
  const ref = useRef(null);

  return (
    <>
      <div onClick={handleClick} className={`z-10 ${expand ? "mb-[-16px] pb-2 bg-blue-200" : ""}`}>
        <h3 className="font-semibold whitespace-nowrap truncate">{persona.name}</h3>
        <div className='relative text-gray-300 bg-cyan-300'>
          <img className="object-cover h-200 w-200" src={`https://picsum.photos/seed/${persona.id * 10}/400/400`} alt="books" />
        </div>
      </div>
      <CSSTransition nodeRef={ref} in={expand} timeout={500} classNames="detail" unmountOnExit >
        <div className="col-span-full overflow-hidden bg-blue-200 border-2 border-blue-200" >
          <PersonaDetails persona={persona} />
        </div>
      </CSSTransition>
    </>
  );
};

export default PersonaShow;