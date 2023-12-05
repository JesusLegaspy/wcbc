import { ReactNode, createContext, useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://wcbc.app';

export interface Book {
  id: number;
  title: string;
  arcId: number;
  series: number;
  image?: string;
  chapterIds: number[];
}

interface BookContextType {
  books: readonly Book[];
  currBook: Book | undefined;
  currBookId: number | undefined;
  setCurrBookId: React.Dispatch<React.SetStateAction<number | undefined>>;
  fetchBooks: () => Promise<void>;
  createBook: (title: string, arcId: number, series: number) => Promise<Book | undefined>;
  editBook: (data: Book) => Promise<void>;
  deleteBookById: (id: number) => Promise<void>;
  addChapterIdToBook: (id: number) => void;
  removeChapterIdToBook: (id: number) => void;
}

const startupBookContext: BookContextType = {
  books: [],
  currBook: undefined,
  currBookId: undefined,
  setCurrBookId: () => { },
  fetchBooks: async () => { },
  createBook: async () => undefined,
  editBook: async () => { },
  deleteBookById: async () => { },
  addChapterIdToBook: () => { },
  removeChapterIdToBook: () => { }
}

const BookContext = createContext<BookContextType>(startupBookContext);

const BookProvider = ({ children }: { children?: ReactNode }) => {
  const [books, setBooks] = useState<readonly Book[]>([]);
  const [currBookId, setCurrBookId] = useState<number | undefined>(undefined);
  const [currBook, setCurrBook] = useState<Book | undefined>();

  useEffect(() => {
    console.debug('books.tsx', 'useEffect', 'setCurrentBook', 'Dep:', 'currBookId, books');
    if (currBookId === undefined) {
      setCurrBook(books.at(0));
    } else {
      setCurrBook(books.find(book => book.id === currBookId));
    }
  }, [currBookId, books]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get<readonly Book[]>(`${API_BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  const createBook = async (title: string, arcId: number, series: number) => {
    try {
      const data = {
        title,
        arcId,
        series,
        chapterId: [],
        image: "",
      };
      const response = await axios.post<Book>(`${API_BASE_URL}/books`, data);
      const newBook = response.data;
      setBooks((prevBooks) => [...prevBooks, newBook]);
      return newBook;
    } catch (error) {
      console.error("Error creating Book:", error);
    }
  };

  const editBook = useCallback(async (data: Book) => {
    try {
      const response = await axios.put<Book>(`${API_BASE_URL}/books/${data.id}`, data);
      const editedBook = response.data;
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === data.id ? { ...book, ...editedBook } : book))
      );
    } catch (error) {
      console.error("Error editing book:", error);
    }
  }, []);

  const deleteBookById = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const addChapterIdToBook = useCallback((id: number) => {
    if (currBook === undefined) {
      console.error("Can not add chapter to no book");
      return;
    }
    editBook({ ...currBook, chapterIds: [...currBook.chapterIds, id] });
  }, [currBook, editBook]);

  const removeChapterIdToBook = useCallback((id: number) => {
    if (currBook === undefined) {
      console.error("Can not add chapter to no book");
      return;
    }
    editBook({ ...currBook, chapterIds: currBook.chapterIds.filter(chapId => chapId !== id) });
  }, [currBook, editBook]);

  const contextValue = useMemo(
    () => ({
      books,
      currBookId,
      currBook,
      setCurrBookId,
      fetchBooks,
      createBook,
      editBook,
      deleteBookById,
      addChapterIdToBook,
      removeChapterIdToBook
    }), [books,
    currBook,
    currBookId,
    editBook,
    fetchBooks,
    addChapterIdToBook,
    removeChapterIdToBook
  ]);

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
