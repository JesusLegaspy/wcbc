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

export enum SortOrder {
  Importance,
  Ascending,
  Descending
};

interface MenuProps {
  sortFunction?: (order: SortOrder) => void;
};

const Menu: React.FC<MenuProps> = ({ sortFunction }) => {
  const { setComponent, setModal, clearModal } = useContext(PageContext);
  const { currBook, addChapterIdToBook, removeChapterIdToBook } = useContext(BookContext);
  const { chapterNumber, chapters, prevChapter, nextChapter, setChapterNumber, addChapter } = useContext(ChapterContext);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Importance);

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
          <li className="p-3 flex justify-center items-center text-4xl">
            <button onClick={() => handleClickSort()}>
              {order === SortOrder.Ascending && <TbSortAscendingLetters />}
              {order === SortOrder.Descending && <TbSortDescendingLetters />}
              {order === SortOrder.Importance && <BiSortDown />}
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
                ? <button onClick={() => handleClickNextChapter()}>
                  <TbChevronRightPipe className="text-4xl" />
                </button>
                : <button onClick={() => handleClickAddChapter()}>
                  <PiBatteryPlusThin className="text-4xl" />
                </button>
            }
          </li>
        </ul>
      </div>
    </div>

  );
}

export default Menu;