import { useContext, useRef, useEffect } from "react";
import { CharacterContext, Character } from "../context/characters";
import { BookContext } from "../context/books";
import { PageContext } from "../context/page";

const CharacterList = () => {
  const { allCharacters, fetchAllCharacters, characters } = useContext(CharacterContext);
  const { addCharacterById } = useContext(BookContext);
  const { goHome } = useContext(PageContext);

  const fetchAllCharactersRef = useRef(fetchAllCharacters);
  useEffect(() => {
    fetchAllCharactersRef.current?.();
  }, []);

  type CharactersGroup = {
    [key: string]: Character[]
  };

  const currCharacterIds = new Set(characters.map(c => c.id));

  const sorted = allCharacters
    .filter(character => !currCharacterIds.has(character.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Dictionary - key of first letter, value of names having the same first letter
  const characterDictionary = sorted.reduce<CharactersGroup>((characterDictionary, character) => {
    const key: string = character.name.charAt(0).toUpperCase();
    characterDictionary[key] = characterDictionary[key] || [];
    characterDictionary[key].push(character);
    return characterDictionary;
  }, {});

  const handleClickAddCharacter = (id: number) => {
    addCharacterById(id);
    goHome();
  }

  const charactersSection = (characters: Character[]) => {
    const content = [];
    for (const character of characters) {
      content.push(
        <div
          key={character.id}
          className="flex items-center gap-4 p-4 hover:bg-slate-50"
          onClick={() => handleClickAddCharacter(character.id)}
        >
          <img className="w-12 h-12 rounded-full" src={`https://picsum.photos/seed/${character.id * 10}/100/100`} alt={`Profile pic of ${character.name}`} />
          <strong className="text-slate-900 text-sm font-medium">{character.name}</strong>
        </div>
      );
    }
    return content;
  }

  // Create sections of charcters grouped with the same first letter.
  // key - first letter
  // value - array of characters with the same first letter
  let content = [];
  for (const [key, value] of Object.entries(characterDictionary)) {
    content.push(
      <div key={key} className="sticky top-16 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10">
        {key}
      </div>
    );
    content.push(
      <div key={key + "divider"} className="divide-y">
        {charactersSection(value)}
      </div>
    );
  }

  return (
    <div className="p-4">
      {content}
    </div>
  );
}

export default CharacterList;