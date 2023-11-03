import { useContext, useRef, useEffect, Fragment, useMemo } from "react";
import { CharacterContext, Character } from "../context/characters";
import { PageContext } from "../context/page";
import { BookContext } from "../context/books";
import CharacterCreateOrEdit from './CharacterCreateOrEdit';
import ModalConfirm from './ModalConfirm';
import ListItem from "./ListItem";

const CharacterList = () => {
  const { allCharacters, fetchAllCharacters, characters } = useContext(CharacterContext);
  const { setComponent, setModal, clearModal } = useContext(PageContext);
  const { deleteCharacterById } = useContext(CharacterContext);
  // const { addCharacterById, removeCharacterByIdFromAllBooks } = useContext(BookContext);
  const { goHome } = useContext(PageContext);

  const fetchAllCharactersRef = useRef(fetchAllCharacters);
  console.debug('CharacterList', 'useEffect', 'fetchAllCharacters');
  useEffect(() => {
    fetchAllCharactersRef.current?.();
  }, []);

  const handleClickEditCharacter = (character: Character) => {
    setComponent(CharacterCreateOrEdit, { character: character });
  }

  const handleDeleteCharacter = (character: Character) => {
    setModal(() => (
      <ModalConfirm
        message={`Delete ${character.name} from all books?`}
        cancelAction={clearModal}
        acceptAction={() => {
          deleteCharacterById(character.id);
          // removeCharacterByIdFromAllBooks(character.id);
          clearModal();
        }}
      />
    ));
  };

  const handleClickAddCharacter = (character: Character) => {
    // addCharacterById(character.id);
    goHome();
  }

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
            {
              characters.map((character: Character) => (
                <ListItem
                  id={character.id}
                  key={`listitem_${character.id}`}
                  iconUrl={character.image ?? ''}
                  title={character.name}
                  description={character.description ?? ''}
                  callbackEdit={() => handleClickEditCharacter(character)}
                  callbackDelete={() => handleDeleteCharacter(character)}
                  callbackSelect={() => handleClickAddCharacter(character)} />
              ))
            }
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default CharacterList;