
import CharacterCard from './CharacterCard';
import { Character } from '../context/characters';


const CharacterSection = ({ characters }: { characters: Character[] }) => {

  return (
    <>
      {
        characters.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
    </>
  );
}

export default CharacterSection;