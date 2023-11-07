import { useContext } from "react";
import { PageContext } from "../context/page";
import { BookContext } from "../context/books";
import { ChapterContext } from "../context/chapters";
import CharacterSelection from "./CharacterSelection";
import BookSelection from "./BookSelection";
import ModalConfirm from "./ModalConfirm";
import { BiBook } from "react-icons/bi";
import { TbSortDescending2, TbChevronLeftPipe, TbChevronRightPipe } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { PiBatteryPlusThin, PiCat } from "react-icons/pi";

const Menu = () => {
  const { setComponent, setModal, clearModal } = useContext(PageContext);
  const { currBook } = useContext(BookContext);
  const { prevChapter, nextChapter, chapter, addChapter } = useContext(ChapterContext);

  const handleClickPrevChapter = () => {
    console.log('prev');
    prevChapter();
  }

  const handleClickAdd = () => {
    setComponent(CharacterSelection, {});
  }

  const handleClickBookList = () => {
    setComponent(BookSelection, {});
  }

  const handleClickNextChapter = () => {
    if (chapter?.nextId === null) {
      setModal(() => (
        <ModalConfirm
          message={`Add new chapter to ${currBook?.title}?`}
          cancelAction={clearModal}
          acceptAction={() => {
            addChapter();
            nextChapter();
            clearModal();
          }}
        />
      ));
    } else {
      nextChapter();
    }
  }

  return (
    <div className="z-20 fixed bottom-0 left-0 right-0 border-t bg-gray-100">
      <div className="container mx-auto max-w-screen-xl">
        <ul className="flex flex-row justify-center items-center h-16">
          <li className="p-3 flex justify-center items-center">
            <button onClick={() => handleClickPrevChapter()}>
              {
                // todo: stop buttons from shifting
                chapter?.prevId !== null &&
                <TbChevronLeftPipe className="text-4xl" />
              }
            </button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button onClick={() => handleClickAdd()}>
              <PiCat className="text-4xl" />
            </button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button onClick={() => handleClickBookList()}>
              <BiBook className="text-4xl" />
            </button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button>
              <TbSortDescending2 className="text-4xl" />
            </button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button>
              <FiSearch className="text-4xl" />
            </button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button onClick={() => handleClickNextChapter()}>
              {
                chapter?.nextId === null
                  ? <PiBatteryPlusThin className="text-4xl" />
                  : <TbChevronRightPipe className="text-4xl" />
              }
            </button>
          </li>
        </ul>
      </div>
    </div>

  );
}

export default Menu;