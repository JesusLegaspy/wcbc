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
  const { chapterNumber, chapters, prevChapter, nextChapter, addChapter } = useContext(ChapterContext);

  const handleClickPrevChapter = () => {
    prevChapter();
  }

  const handleClickAddCharacter = () => {
    setComponent(CharacterSelection, {});
  }

  const handleClickBookList = () => {
    setComponent(BookSelection, {});
  }

  const handleClickNextChapter = () => {
    nextChapter();
  };

  const handleClickAddChapter = () => {
    const modalDuplicate = () => (<ModalConfirm
      message={"Duplicate current chapter?"}
      cancelButtonText="No"
      cancelAction={() => {
        addChapter();
        nextChapter();
        clearModal();
      }}
      acceptAction={() => {
        addChapter(true);
        nextChapter();
        clearModal();
      }}
    />);

    const modalNewChapter = () => (
      <ModalConfirm
        message={`Add new chapter to ${currBook?.title}?`}
        cancelAction={clearModal}
        acceptAction={() => setModal(modalDuplicate)}
      />
    );
    setModal(modalNewChapter);
  };

  return (
    <div className="z-20 fixed bottom-0 left-0 right-0 border-t bg-gray-100">
      <div className="container mx-auto max-w-screen-xl">
        <ul className="flex flex-row justify-center items-center h-16">
          <li className="p-3 flex justify-center items-center">
            <button onClick={() => handleClickPrevChapter()}>
              {
                // todo: stop buttons from shifting
                1 < chapterNumber &&
                <TbChevronLeftPipe className="text-4xl" />
              }
            </button>
          </li>
          <li className="p-3 flex justify-center items-center">
            <button onClick={() => handleClickAddCharacter()}>
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
            {
              chapterNumber < chapters.length
                ? <button onClick={() => handleClickAddChapter()}>
                  <PiBatteryPlusThin className="text-4xl" />
                </button>
                : <button onClick={() => handleClickNextChapter()}>
                  <TbChevronRightPipe className="text-4xl" />
                </button>
            }
          </li>
        </ul>
      </div>
    </div>

  );
}

export default Menu;