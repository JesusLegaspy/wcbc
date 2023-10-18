import { Character } from "../context/characters";
import CharacterCardDraggable from "./CharacterCardDraggable";

const CharactersSectionDraggable = ({ characters }: { characters: Character[] }) => {
  return (
    <>
      {
        characters.map(character => (
          <CharacterCardDraggable character={character} />
        ))
      }
    </>
  );
}

export default CharactersSectionDraggable;