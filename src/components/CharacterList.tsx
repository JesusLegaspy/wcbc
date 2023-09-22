import { useContext, useRef, useEffect } from "react";
import { CharacterContext, Character } from "../context/characters";

const CharacterList = () => {
  const { allCharacters, fetchAllCharacters } = useContext(CharacterContext);

  const fetchAllCharactersRef = useRef(fetchAllCharacters);
  useEffect(() => {
    fetchAllCharactersRef.current?.();
  }, []);

  type CharactersGroup = {
    [key: string]: Character[]
  };

  const sorted = [...allCharacters].sort((a, b) => a.name.localeCompare(b.name));

  const result = sorted.reduce<CharactersGroup>((result, character) => {
    const key: string = character.name.charAt(0).toUpperCase();
    result[key] = result[key] || [];
    result[key].push(character);
    return result;
  }, {});

  const populate = (characters: Character[]) => {
    const content = [];
    for (const character of characters) {
      content.push(
        <div key={character.id} className="flex items-center gap-4 p-4">
          <img className="w-12 h-12 rounded-full" src={`https://picsum.photos/seed/${character.id * 10}/100/100`} alt={`Profile pic of ${character.name}`} />
          <strong className="text-slate-900 text-sm font-medium">{character.name}</strong>
        </div>
      );
    }
    return content;
  }

  let content = [];
  for (const [key, value] of Object.entries(result)) {
    content.push(
      <div key={key} className="sticky top-16 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10">
        {key}
      </div>
    );
    content.push(
      <div key={key + "divider"} className="divide-y">
        {populate(value)}
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