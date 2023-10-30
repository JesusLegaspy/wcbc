import { useEffect, useContext, Fragment } from "react";
import { BookContext } from "../context/books";
import { ArkContext } from "../context/arks";
import { Page, PageContext } from "../context/page";
import ListItem from "./ListItem";

const BookList = () => {
  const { books, setCurrBookId } = useContext(BookContext);
  const { setPage } = useContext(PageContext);
  const { fetchArks, allArksSortedByOrder } = useContext(ArkContext);

  useEffect(() => {
    console.debug('BookList.tsx', 'useEffect', 'getArks');
    fetchArks();
  }, [fetchArks]);

  const handleClickBook = (id: number) => {
    setCurrBookId(id);
    setPage(Page.Home);
  }

  const handleClickEdit = (id: number) => {
    console.log('Edit');
  }

  const handleClickDelete = (id: number) => {
    console.log('Delete');
  }

  return (
    <div>
      {allArksSortedByOrder?.map(ark => (
        <Fragment key={`ark_${ark.id}`}>
          <div className="z-30 sticky top-16 px-4 py-3 flex items-center font-semibold text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10">
            {ark.title}
          </div>
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