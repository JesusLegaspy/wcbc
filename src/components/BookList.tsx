import { useEffect, useRef, useContext } from "react";
import { BookContext } from "../context/books"

const BookList = () => {
  const { fetchBooks } = useContext(BookContext);

  const fetchAllBooksRef = useRef(fetchBooks);
  useEffect(() => {
    fetchAllBooksRef.current?.();
  }, []);

  const booksDictionary = null;

  return (
    <div>
      Book List
    </div>
  );
}

export default BookList;