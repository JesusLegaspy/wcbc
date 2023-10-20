
import { useContext, useState, useRef } from "react";
import { CharacterContext, Character } from "../context/characters";
import { BookContext } from "../context/books";
import { PageContext, Page } from "../context/page";
import ModalConfirm from "./ModalConfirm";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

const CharacterCard = ({ character }: { character: Character }) => {
  const { deleteCharacterById, setCurrentCharacter } = useContext(CharacterContext);
  const { addCharacterById } = useContext(BookContext);
  const { goHome, setPage } = useContext(PageContext);
  const [isModalDeleteAlive, setIsModalDeleteAlive] = useState<boolean>(false);
  const [xPosition, setXPosition] = useState<number>(0);
  const nodeRef = useRef(null);

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

  let dragStartX = 0;
  const handleDragStart = (e: DraggableEvent) => {
    if (e instanceof MouseEvent) {
      dragStartX = e.clientX;
    }
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData, characterId: number) => {
    const dragDistance = data.x - dragStartX; // Calculate the distance dragged
    // todo: I think there's access to previous position so it may be better to use that
    const wasOpen = xPosition === -148;

    setXPosition(xPos => {
      if (dragDistance < -74) {
        return -148;
      }
      return 0;
    });

    // If drag distance is minimal and the last drag position was the starting point, consider it a click
    if (Math.abs(dragDistance) < 10 && !wasOpen) {
      handleClickAddCharacter(characterId);
    }
  };

  return (
    <>
      <div key={"draggy_" + character.id} className="relative w-full">
        <div className="z-0 absolute top-1 right-1 bottom-1 w-36 flex items-center">
          <button
            className="bg-amber-300 w-16 h-12 flex justify-center items-center text-white"
            onClick={() => handleClickEditCharacter(character.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 w-20 h-12 flex justify-center items-center text-white"
            onClick={() => setIsModalDeleteAlive(true)}
          >
            Delete
          </button>
        </div>
        <Draggable
          nodeRef={nodeRef}
          position={{ x: xPosition || 0, y: 0 }}
          axis="x"
          bounds={{ left: -148, right: 0 }}
          onStart={handleDragStart}
          onStop={(e, data) => handleDragStop(e, data, character.id)}
        >
          <div ref={nodeRef} className="z-10 flex items-center gap-4 p-4 bg-white hover:bg-slate-50">
            <img
              className="w-12 h-12 rounded-full"
              src={`https://picsum.photos/seed/${character.id * 10}/100/100`}
              alt={`Profile pic of ${character.name}`}
            />
            <strong className="text-slate-900 text-sm font-medium">{character.name}</strong>
            <div className="font-thin text-sm line-clamp-2">
              {character.description}
            </div>
          </div>
        </Draggable>
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