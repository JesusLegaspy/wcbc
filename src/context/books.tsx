import { ReactNode, createContext, useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3001";

export interface Book {
  id: number;
  title: string;
  arkId: number;
  order: number;
  image?: string;
  chapterIds: number[];
}

interface BookContextType {
  books: readonly Book[];
  currBook: Book | undefined;
  currBookId: number;
  setCurrBookId: React.Dispatch<React.SetStateAction<number>>;
  fetchBooks: () => Promise<void>;
  createBook: (title: string, arkId: number, order: number) => Promise<void>;
  editBook: (data: Book) => Promise<void>;
  deleteBookById: (id: number) => Promise<void>;
  addChapterIdToBook: (id: number) => void;
  removeChapterIdToBook: (id: number) => void;
}

const startupBookContext: BookContextType = {
  books: [],
  currBook: undefined,
  currBookId: 0,
  setCurrBookId: () => { },
  fetchBooks: async () => { },
  createBook: async () => { },
  editBook: async () => { },
  deleteBookById: async () => { },
  addChapterIdToBook: () => { },
  removeChapterIdToBook: () => { }
}

const BookContext = createContext<BookContextType>(startupBookContext);

const BookProvider = ({ children }: { children?: ReactNode }) => {
  const [books, setBooks] = useState<readonly Book[]>([]);
  const [currBookId, setCurrBookId] = useState<number>(0);
  const [currBook, setCurrBook] = useState<Book | undefined>();

  useEffect(() => {
    console.debug('books.tsx', 'useEffect', 'setCurrentBook', 'Dep:', 'currBookId, books');
    setCurrBook(books.find(book => book.id === currBookId));
  }, [currBookId, books]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get<readonly Book[]>(`${API_BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  const createBook = async (title: string, arkId: number, order: number) => {
    try {
      const data = {
        title,
        arkId,
        order,
        chapterId: [],
        image: "",
      };
      const response = await axios.post<Book>(`${API_BASE_URL}/books`, data);
      const newBook = response.data;
      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      console.error("Error creating Book:", error);
    }
  };

  const editBook = useCallback(async (data: Book) => {
    try {
      const response = await axios.patch<Book>(`${API_BASE_URL}/books/${data.id}`, data);
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
