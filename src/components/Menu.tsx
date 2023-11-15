import { useContext, useState } from "react";
import { PageContext } from "../context/page";
import { BookContext } from "../context/books";
import { ChapterContext } from "../context/chapters";
import CharacterSelection from "./CharacterSelection";
import BookSelection from "./BookSelection";
import ModalConfirm from "./ModalConfirm";
import { BiBook, BiSortDown } from "react-icons/bi";
import { TbChevronLeftPipe, TbChevronRightPipe, TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { PiBatteryPlusThin, PiCat } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

export enum SortOrder {
  Importance,
  Ascending,
  Descending
};

interface MenuProps {
  sortFunction?: (order: SortOrder) => void;
  handleFilterClick?: () => void;
};

const Menu: React.FC<MenuProps> = ({ sortFunction, handleFilterClick }) => {
  const { setComponent, setModal, clearModal } = useContext(PageContext);
  const { currBook, addChapterIdToBook, removeChapterIdToBook } = useContext(BookContext);
  const { chapterNumber, chapters, prevChapter, nextChapter, setChapterNumber, addChapter, chapter } = useContext(ChapterContext);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Importance);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClickPrevChapter = () => {
    prevChapter();
  }

  const handleClickAddCharacter = () => {
    setComponent(CharacterSelection, {});
  }

  const handleClickBookList = () => {
    setComponent(BookSelection, {});
  }

  const handleClickSort = () => {
    setOrder(prevOrder => {
      let newOrder: SortOrder = SortOrder.Importance;
      if (prevOrder === SortOrder.Ascending) newOrder = SortOrder.Descending;
      if (prevOrder === SortOrder.Descending) newOrder = SortOrder.Importance;
      if (prevOrder === SortOrder.Importance) newOrder = SortOrder.Ascending;

      if (sortFunction !== undefined) {
        sortFunction(newOrder);
      }
      return newOrder;
    });
  }

  const handleClickNextChapter = () => {
    nextChapter();
  };

  const handleClickAddChapter = () => {
    if (currBook === undefined) {
      console.error("Could not add chapter to empty book");
      return;
    }

    const addNewChapter = async (duplicate: boolean = false) => {
      const newChapter = await addChapter(duplicate);
      addChapterIdToBook(newChapter.id);
      setChapterNumber(newChapter.chapterNumber);
      clearModal();
    }

    const modalDuplicate = () => (<ModalConfirm
      message={"Duplicate current chapter?"}
      cancelButtonText="No"
      cancelAction={() => addNewChapter()}
      acceptAction={() => addNewChapter(true)}
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

  const handleClickMenu = () => {
    setShowMenu(prev => !prev);
  }

  const handleClickDeleteChapter = () => {
    setModal(() => <ModalConfirm
      message={`Delete chapter ${chapter.chapterNumber}?`}
      cancelAction={() => clearModal()}
      acceptAction={() => {
        removeChapterIdToBook(chapter.id);
        prevChapter();
        clearModal();
        setShowMenu(false);
      }} />)
  };

  return (
    <>
      {
        showMenu &&
        <div className="z-30 fixed bottom-16 left-0 bg-gray-200">
          <ul className="flex flex-col space-y-2">
            <li className="hover:bg-gray-300 w-full p-2 px-6">
              <button onClick={() => handleClickDeleteChapter()}>
                Delete chapter {chapterNumber}
              </button>
            </li>
          </ul>
        </div>
      }
      <div className="z-20 fixed bottom-0 left-0 right-0 border-t bg-gray-100">
        <div className="container mx-auto max-w-screen-xl">
          {
            chapterNumber === chapters.length &&
            <span className={`fixed bottom-3 left-4  ${showMenu ? 'text-gray-900' : 'text-gray-500'}}`}>
              <button onClick={() => handleClickMenu()}>
                <RxHamburgerMenu className="text-3xl" />
              </button>
            </span>
          }
          <ul className="flex flex-row justify-center items-center space-x-4 h-16 text-4xl">
            <li className="flex justify-center items-center">
              <button onClick={() => { if (1 < chapterNumber) handleClickPrevChapter() }}>
                {<TbChevronLeftPipe className={1 < chapterNumber ? "" : "invisible"} />}
              </button>
            </li>
            <li className="flex justify-center items-center">
              <button onClick={() => handleClickAddCharacter()}>
                <PiCat />
              </button>
            </li>
            <li className="flex justify-center items-center">
              <button onClick={() => handleClickBookList()}>
                <BiBook />
              </button>
            </li>
            <li className="flex justify-center items-center text-4xl">
              <button onClick={() => handleClickSort()}>
                {order === SortOrder.Ascending && <TbSortAscendingLetters />}
                {order === SortOrder.Descending && <TbSortDescendingLetters />}
                {order === SortOrder.Importance && <BiSortDown />}
              </button>
            </li>
            <li className="flex justify-center items-center">
              <button onClick={() => handleFilterClick?.()}>
                <FiSearch />
              </button>
            </li>
            <li className="flex justify-center items-center">
              {
                chapterNumber < chapters.length
                  ? <button onClick={() => handleClickNextChapter()}>
                    <TbChevronRightPipe />
                  </button>
                  : <button onClick={() => handleClickAddChapter()}>
                    <PiBatteryPlusThin />
                  </button>
              }
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;