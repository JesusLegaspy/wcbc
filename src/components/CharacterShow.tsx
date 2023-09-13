import { Character } from '../context/characters';

const CharacterShow = ({ character }: { character: Character }) => {

  return (
    <div>
      <h3 className="font-semibold whitespace-nowrap truncate">{character.name}</h3>
      <div className='relative text-gray-300 bg-cyan-300'>
        <img className="object-cover h-200 w-200" src={`https://picsum.photos/seed/${character.id * 10}/400/400`} alt="books" />
      </div>
    </div>
  );
};

export default CharacterShow;