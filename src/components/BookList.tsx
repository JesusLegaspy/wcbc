import { useEffect, useContext, Fragment } from "react";
import { BookContext } from "../context/books";
import { ArcContext } from "../context/arcs";
import { PageContext } from "../context/page";
import ListItem from "./ListItem";
import BookCreateOrEdit from "./BookCreateOrEdit";
import ModalConfirm from './ModalConfirm';
import ListArc from "./ListArc";

const BookList = () => {
  const { books, setCurrBookId, deleteBookById } = useContext(BookContext);
  const { goHome, setComponent, setModal, clearModal } = useContext(PageContext);
  const { fetchArcs, allArcsSortedByOrder } = useContext(ArcContext);

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
          deleteBookById(id);
          clearModal();
        }}
      />
    ));
  }

  return (
    <div>
      {allArcsSortedByOrder?.map(arc => (
        <Fragment key={`arc_${arc.id}`}>
          <ListArc arc={arc} className="z-30" />
          <div className="divide-y">
            {books.filter(book => book.arcId === arc.id)
              .sort((a, b) => a.order - b.order)
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