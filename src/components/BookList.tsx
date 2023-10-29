import { useEffect, useContext, Fragment } from "react";
import { BookContext, Book } from "../context/books";
import { ArkContext } from "../context/arks";
import { Page, PageContext } from "../context/page";

const BookList = () => {
  const { books, setCurrBookId } = useContext(BookContext);
  const { setPage } = useContext(PageContext);
  const { fetchArks, allArksSortedByOrder } = useContext(ArkContext);

  useEffect(() => {
    console.debug('BookList.tsx', 'useEffect', 'getArks');
    fetchArks();
  }, [fetchArks]);

  const handleClickBook = (book: Book) => {
    setCurrBookId(book.id);
    setPage(Page.Home);
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
              <div
                key={`BookListItem_${book.id}`}
                className="p-2 pl-10 text-sm text-slate-900 line-clamp-2 hover:bg-slate-50 hover:text-black"
                onClick={() => handleClickBook(book)}
              >
                {book.title}
              </div>
            ))}
          </div>
        </Fragment>
      ))}

    </div>
  );
}

export default BookList;