
import { Character, CharacterContext } from '../context/characters';
import ListItem from './ListItem';
import { PageContext } from '../context/page';
import { useContext } from 'react';
import { BookContext } from '../context/books';
import CharacterEdit from './CharacterEdit';
import ModalConfirm from './ModalConfirm';


const CharacterSection = ({ characters }: { characters: Character[] }) => {
  const { setComponent, setModal, clearModal } = useContext(PageContext);
  const { deleteCharacterById } = useContext(CharacterContext);
  const { addCharacterById, removeCharacterByIdFromAllBooks } = useContext(BookContext);
  const { goHome } = useContext(PageContext);

  const handleClickEditCharacter = (id: number) => {
    const selectedCharacter = characters.find(character => character.id === id);
    if (!selectedCharacter) {
      console.error("Could not edit character");
      return;
    }
    setComponent(CharacterEdit, { character: selectedCharacter });
  }

  const handleDeleteCharacter = (id: number) => {
    const character = characters.find(character => character.id === id);
    if (!character) {
      console.error("Could not find character");
      return;
    }
    setModal(() => (
      <ModalConfirm
        message={`Delete ${character.name} from all books?`}
        cancelAction={clearModal}
        acceptAction={() => {
          deleteCharacterById(id);
          removeCharacterByIdFromAllBooks(id);
          clearModal();
        }}
      />
    ));
  };

  const handleClickAddCharacter = (id: number) => {
    addCharacterById(id);
    goHome();
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
    </>
  );
}

export default CharacterSection;