import { useEffect, useContext, useState, Fragment } from "react";
import { BookContext } from "../context/books";
import { getArks, Ark } from "../utility/ark";

const BookList = () => {
  const { books } = useContext(BookContext);
  const [arks, setArks] = useState<Ark[] | undefined>();

  useEffect(() => {
    console.log('BookList.tsx', 'useEffect', 'getArks');
    const fetchArks = async () => {
      try {
        const arksFromServer = await getArks();
        setArks(arksFromServer);
      } catch (error) {

        console.error("An error occurred while fetching arks:", error);
      }
    };
    fetchArks();
  }, []);

  const handleClickBook = (id: number) => {

  }

  return (
    <div>
      {arks?.map(ark => (
        <Fragment key={`ark_${ark.id}`}>
          <div className="z-30 sticky top-16 px-4 py-3 flex items-center font-semibold text-slate-900 bg-slate-100 backdrop-blur-sm ring-1 ring-slate-900/10">
            {ark.title}
          </div>
          <div className="divide-y">
            {books.filter(book => book.arkId === ark.id).map(book => (
              <div
                key={`BookListItem_${book.id}`}
                className="p-2 pl-10 text-sm text-slate-900 line-clamp-2"
                onClick={() => handleClickBook(book.id)}
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