import { useContext } from "react";
import { PageContext } from "../context/page";
import { BookContext } from "../context/books";
import { Character } from "../context/characters";
import CharacterCreateOrEdit from "./CharacterCreateOrEdit";
import ModalConfirm from "./ModalConfirm";
import { MdPlaylistRemove } from "react-icons/md";
import { TbEdit } from "react-icons/tb";


const CharacterDetails = ({ character }: { character: Character }) => {
  const { setComponent, setModal, clearModal } = useContext(PageContext);
  // const { removeCharacterByIdFromCurrentBook } = useContext(BookContext);

  const handleClickRemove = () => {
    setModal(() =>
      <ModalConfirm
        message="Would you like to remove this character?"
        cancelAction={clearModal}
        acceptAction={() => {
          // removeCharacterByIdFromCurrentBook(character.id);
          clearModal();
        }}
      />)
  };

  const handleEdit = () => {
    setComponent(CharacterCreateOrEdit, { character });
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
            onClick={handleClickRemove}
          />
        </button>
      </div>
      {/* <img src="https://placekitten.com/600/300" alt="kitty" /> */}

    </div>
  );
}

export default CharacterDetails