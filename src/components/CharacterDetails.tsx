import { useState } from "react";
import ModalDelete from "./ModalDelete";
import { Character } from "../context/characters";
import { LiaTrashAltSolid } from "react-icons/lia";
import { TbEdit } from "react-icons/tb";


const CharacterDetails = ({ character }: { character: Character }) => {
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

  const handleDelete = () => {
    setIsConfirmDelete(true);
  };

  return (
    <div
      key={"detail-" + character.id}
      className={`col-span-3 md:col-span-4 lg:col-span-5 row-span-1 bg-blue-200 border-2 border-blue-200`}>
      <div className="h-36 px-1 relative">
        <p>
          {character.description}
        </p>
        <button>
          <TbEdit className="absolute bottom-1 right-7 text-xl text-gray-800 p rounded-full hover:bg-slate-200" />
        </button>
        <button>
          <LiaTrashAltSolid
            className="absolute bottom-1 right-1 text-xl text-gray-800 p rounded-full hover:bg-slate-200"
            onClick={handleDelete}
          />
        </button>
      </div>
      {/* <img src="https://placekitten.com/600/300" alt="kitty" /> */}
      {isConfirmDelete && <ModalDelete />}
    </div>
  );
}

export default CharacterDetails