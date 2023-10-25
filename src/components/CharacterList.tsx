import { useContext, useRef, useEffect, Fragment, useMemo } from "react";
import { CharacterContext, Character } from "../context/characters";
import CharacterSection from "./CharacterSection";
import CharactersSectionDraggable from "./CharacterSectionDraggable";

import "../styles/CharacterList.css";


const CharacterList = () => {
  const { allCharacters, fetchAllCharacters, characters } = useContext(CharacterContext);

  const fetchAllCharactersRef = useRef(fetchAllCharacters);
  console.log('CharacterList', 'useEffect', 'fetchAllCharacters');
  useEffect(() => {
    fetchAllCharactersRef.current?.();
  }, []);

  type CharactersGroup = {
    [key: string]: Character[]
  };

  const getUnusedCharacters = () => {
    // todo: think about getting ids from book instead
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

    return characterDictionary;
  }

  const unusedCharacters = useMemo(getUnusedCharacters, [characters, allCharacters]);

  return (
    <div className="p-4">
      {Object.entries(unusedCharacters).map(([letter, characters]) => (
        <Fragment key={letter}>
          <div className="z-30 sticky top-16 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10">
            {letter}
          </div>
          <div className="divide-y">
            <div className="lg:hidden">
              <CharactersSectionDraggable characters={characters} />
            </div>
            <div className="hidden lg:block">
              <CharacterSection characters={characters} />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default CharacterList;