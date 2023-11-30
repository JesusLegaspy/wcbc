import { useEffect, useContext, Fragment } from "react";
import { PageContext } from "../context/page";
import { ArcContext } from "../context/arcs";
import { BookContext } from "../context/books";
import { ChapterContext } from "../context/chapters";
import ListItem from "./ListItem";
import BookCreateOrEdit from "./BookCreateOrEdit";
import ModalConfirm from './ModalConfirm';
import ListArc from "./ListArc";

const BookList = () => {
  const { goHome, setComponent, setModal, clearModal } = useContext(PageContext);
  const { fetchArcs, allArcsSortedBySeries } = useContext(ArcContext);
  const { books, setCurrBookId, deleteBookById } = useContext(BookContext);
  const { deleteChapterById } = useContext(ChapterContext);


  useEffect(() => {
    console.debug('BookList.tsx', 'useEffect', 'getArcs');
    fetchArcs();
  }, [fetchArcs]);

  const handleClickBook = (id: number) => {
    setCurrBookId(id);
    goHome();
  }

  const handleClickEdit = (id: number) => {
    const book = books.find(book => book.id === id);
    if (book === undefined) {
      console.error("Cannot edit book");
      return;
    }
    setComponent(BookCreateOrEdit, { book });
  }

  const handleClickDelete = (id: number) => {
    const book = books.find(book => book.id === id);
    if (book === undefined) {
      console.error("Cannot edit book");
      return;
    }
    setModal(() => (
      <ModalConfirm
        message={`Delete ${book.title}?`}
        cancelAction={clearModal}
        acceptAction={() => {
          Promise.all(book.chapterIds.map(chId => deleteChapterById(chId))).then(() => {
            deleteBookById(book.id);
            clearModal();
          });
        }}
      />
    ));
  }

  return (
    <div>
      {allArcsSortedBySeries?.map(arc => (
        <Fragment key={`arc_${arc.id}`}>
          <ListArc arc={arc} className="z-30" />
          <div className="divide-y">
            {books.filter(book => book.arcId === arc.id)
              .sort((a, b) => a.series - b.series)
              .map(book => (
                <ListItem
                  id={book.id}
                  key={`listitem_book_${book.id}`}
                  iconUrl={''}
                  title={book.title}
                  description={''}
                  callbackEdit={handleClickEdit}
                  callbackDelete={handleClickDelete}
                  callbackSelect={handleClickBook}
                />
              ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default BookList;