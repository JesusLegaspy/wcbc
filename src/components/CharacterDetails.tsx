import { useState, useContext } from "react";
import ModalConfirm from "./ModalConfirm";
import { Character, CharacterContext } from "../context/characters";
import { BookContext } from "../context/books";
import { MdPlaylistRemove } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { PageContext, Page } from "../context/page";


const CharacterDetails = ({ character }: { character: Character }) => {
  const { setPage } = useContext(PageContext);
  const { removeCharacterByIdFromCurrentBook } = useContext(BookContext);
  const { setCurrentCharacter } = useContext(CharacterContext);
  const [isDeleteModalAlive, setIsDeleteModalAlive] = useState<boolean>(false);

  const handleClick = () => {
    setIsDeleteModalAlive(true);
  };

  const handleDelete = () => {
    removeCharacterByIdFromCurrentBook(character.id);
    setIsDeleteModalAlive(false);
  }

  const handleEdit = () => {
    setCurrentCharacter(character);
    setPage(Page.EditCharacter);
  }

  return (
    <div
      key={"detail-" + character.id}
      className={`col-span-3 md:col-span-4 lg:col-span-5 row-span-1 bg-blue-200 border-2 border-blue-200`}>
      <div className="h-36 px-1 relative">
        <p className="line-clamp-5">
          {character.description}
        </p>
        <button>
          <TbEdit
            className="absolute bottom-1 right-7 text-xl text-gray-800 p rounded-full hover:bg-slate-200"
            onClick={handleEdit}
          />
        </button>
        <button>
          <MdPlaylistRemove
            className="absolute bottom-1 right-1 text-xl text-gray-800 p rounded-full hover:bg-slate-200"
            onClick={handleClick}
          />
        </button>
      </div>
      {/* <img src="https://placekitten.com/600/300" alt="kitty" /> */}
      {isDeleteModalAlive
        && <ModalConfirm
          message="Would you like to remove this character?"
          cancelAction={() => setIsDeleteModalAlive(false)}
          acceptAction={handleDelete}
        />}
    </div>
  );
}

export default CharacterDetails