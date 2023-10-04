import { useContext, useRef, useEffect } from "react";
import { CharacterContext, Character } from "../context/characters";
import { BookContext } from "../context/books";
import { PageContext } from "../context/page";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import "../styles/CharacterList.css";

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
    let dragStartX = 0;
    let lastDragPosition = 0;

    const handleDragStart = (e: DraggableEvent) => {
      if (e instanceof MouseEvent) {
        dragStartX = e.clientX;
      }
    };

    const handleDragStop = (e: DraggableEvent, data: DraggableData, characterId: number) => {
      const dragDistance = data.x - dragStartX; // Calculate the distance dragged


      // If drag distance is minimal and the last drag position was the starting point, consider it a click
      if (Math.abs(dragDistance) < 10 && lastDragPosition === 0) {
        handleClickAddCharacter(characterId);
      }

      lastDragPosition = data.x; // Update the last drag position
    };

    for (const character of characters) {
      content.push(
        <div className="relative w-full">
          <button
            className="z-0 absolute top-1 right-1 bottom-1 w-24 bg-red-500 flex justify-center items-center text-white"
            onClick={() => {
              console.log('Delete Click!');
            }}
          >
            Delete
          </button>
          <div className="z-10 bg-white">
            <Draggable
              axis="x"
              bounds={{ left: -100, right: 0 }}
              key={character.id}
              onStart={handleDragStart}
              onStop={(e, data) => handleDragStop(e, data, character.id)}
            >
              <div
                className="flex items-center gap-4 p-4 bg-white hover:bg-slate-50"
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={`https://picsum.photos/seed/${character.id * 10}/100/100`}
                  alt={`Profile pic of ${character.name}`}
                />
                <strong className="text-slate-900 text-sm font-medium">{character.name}</strong>
              </div>
            </Draggable>
          </div>
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
      <div key={key} className="z-30 sticky top-16 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10">
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