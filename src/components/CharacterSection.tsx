
import { Character, CharacterContext } from '../context/characters';
import ListItem from './ListItem';
import { PageContext } from '../context/page';
import { useContext, useState } from 'react';
import { BookContext } from '../context/books';
import CharacterEdit from './CharacterEdit';
import ModalConfirm from './ModalConfirm';


const CharacterSection = ({ characters }: { characters: Character[] }) => {
  const { setComponent } = useContext(PageContext);
  const { deleteCharacterById, setCurrentCharacter } = useContext(CharacterContext);
  const { addCharacterById, removeCharacterByIdFromAllBooks } = useContext(BookContext);
  const { goHome } = useContext(PageContext);
  const [isModalDeleteAlive, setIsModalDeleteAlive] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>();

  const handleClickEditCharacter = (id: number) => {
    const selectedCharacter = characters.find(character => character.id === id);
    if (!selectedCharacter) {
      console.error("Could not edit character");
      return;
    }
    setCurrentCharacter(selectedCharacter);
    setComponent(CharacterEdit, {});
  }

  const handleDeleteCharacter = (id: number) => {
    const character = characters.find(character => character.id === id);
    if (!character) {
      console.error("Could not find character");
      return;
    }
    setSelectedCharacter(character);
    setIsModalDeleteAlive(true);
  }

  const handleClickAddCharacter = (id: number) => {
    addCharacterById(id);
    goHome();
  }

  const handleModalDeleteCharacter = (id: number) => {
    deleteCharacterById(id);
    removeCharacterByIdFromAllBooks(id);
    setIsModalDeleteAlive(false);
  }

  return (
    <>
      {
        characters.map((character: Character) => (
          // <CharacterCard key={character.id} character={character} />
          <ListItem
            id={character.id}
            key={`listitem_${character.id}`}
            iconUrl={character.image ?? ''}
            title={character.name}
            description={character.description ?? ''}
            callbackEdit={handleClickEditCharacter}
            callbackDelete={handleDeleteCharacter}
            callbackSelect={handleClickAddCharacter} />
        ))
      }
      {isModalDeleteAlive &&
        <ModalConfirm
          message={`Delete ${selectedCharacter?.name} from all books?`}
          cancelAction={() => setIsModalDeleteAlive(false)}
          acceptAction={() => {
            if (!selectedCharacter) return;
            handleModalDeleteCharacter(selectedCharacter.id);
          }}
        />}
    </>
  );
}

export default CharacterSection;