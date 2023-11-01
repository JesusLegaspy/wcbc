import { useEffect, useContext, Fragment } from "react";
import { BookContext } from "../context/books";
import { ArkContext } from "../context/arks";
import { PageContext } from "../context/page";
import ListItem from "./ListItem";
import BookCreateOrEdit from "./BookCreateOrEdit";
import ModalConfirm from './ModalConfirm';
import ListArk from "./ListArk";

const BookList = () => {
  const { books, setCurrBookId, deleteBookById } = useContext(BookContext);
  const { goHome, setComponent, setModal, clearModal } = useContext(PageContext);
  const { fetchArks, allArksSortedByOrder } = useContext(ArkContext);

  useEffect(() => {
    console.debug('BookList.tsx', 'useEffect', 'getArks');
    fetchArks();
  }, [fetchArks]);

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
      {allArksSortedByOrder?.map(ark => (
        <Fragment key={`ark_${ark.id}`}>
          <ListArk ark={ark} className="z-30" />
          <div className="divide-y">
            {books.filter(book => book.arkId === ark.id).map(book => (
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