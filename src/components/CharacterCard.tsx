
import { useContext, useState } from "react";
import { CharacterContext, Character } from "../context/characters";
import { BookContext } from "../context/books";
import { PageContext, Page } from "../context/page";
import ModalConfirm from "./ModalConfirm";
import { LiaTrashAltSolid } from "react-icons/lia";
import { TbEdit } from "react-icons/tb";


const CharacterCard = ({ character }: { character: Character }) => {
  const { setPage } = useContext(PageContext);
  const { deleteCharacterById, setCurrentCharacter } = useContext(CharacterContext);
  const { addCharacterById } = useContext(BookContext);
  const { goHome } = useContext(PageContext);
  const [isModalDeleteAlive, setIsModalDeleteAlive] = useState<boolean>(false);

  const handleClickEditCharacter = (id: number) => {
    setCurrentCharacter(character);
    setPage(Page.EditCharacter);
  }

  const handleDeleteCharacter = (id: number) => {
    deleteCharacterById(id);
    // removeCharacterById(id);
    setIsModalDeleteAlive(false);
  }

  const handleClickAddCharacter = (id: number) => {
    addCharacterById(id);
    goHome();
  }

  return (
    <>
      <div
        key={"section_" + character.id}
        className="group z-10 flex items-center w-full hover:bg-slate-50"
        onClick={() => handleClickAddCharacter(character.id)}
      >
        <div className="flex items-center gap-4 p-4">
          <img
            className="w-12 h-12 rounded-full"
            src={`https://picsum.photos/seed/${character.id * 10}/100/100`}
            alt={`Profile pic of ${character.name}`}
          />
          <strong className="text-slate-900 text-sm font-medium line-clamp-2">{character.name}</strong>
        </div>
        <div className="grow font-thin text-sm line-clamp-2">
          {character.description}
        </div>
        <button
          className="invisible group-hover:visible flex p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            handleClickEditCharacter(character.id);
          }}
        >
          <TbEdit />
        </button>
        <button
          className="invisible group-hover:visible flex p-2 mr-3 rounded-full hover:bg-slate-200 text-slate-500 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalDeleteAlive(true);
          }}
        >
          <LiaTrashAltSolid />
        </button>
      </div>
      {isModalDeleteAlive &&
        <ModalConfirm
          message={`Delete ${character.name} from all books?`}
          cancelAction={() => setIsModalDeleteAlive(false)}
          acceptAction={() => handleDeleteCharacter(character.id)}
        />}
    </>
  );
}

export default CharacterCard;