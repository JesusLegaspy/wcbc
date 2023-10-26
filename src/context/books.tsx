import { ReactNode, createContext, useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3001";

export interface Book {
  id: number;
  arkId: number;
  title: string;
  image?: string;
  characterIds?: number[];
}

interface BookContextType {
  books: readonly Book[];
  currBookId: number;
  currBook: Book | undefined;
  setCurrBookId: React.Dispatch<React.SetStateAction<number>>;
  fetchBooks: () => Promise<void>;
  createBook: (title: string) => Promise<void>;
  editBook: (data: Book) => Promise<void>;
  deleteBookById: (id: number) => Promise<void>;
  removeCharacterById: (id: number) => Promise<void>;
  addCharacterById: (id: number) => void;
}

const startupBookContext: BookContextType = {
  books: [],
  currBookId: 0,
  currBook: undefined,
  setCurrBookId: () => { },
  fetchBooks: async () => { },
  createBook: async () => { },
  editBook: async () => { },
  deleteBookById: async () => { },
  removeCharacterById: async () => { },
  addCharacterById: () => { },
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

  const createBook = async (title: string) => {
    try {
      const data = {
        title: title,
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
      const response = await axios.patch<Book>(`${API_BASE_URL}/books/${currBookId}`, data);
      const editedBook = response.data;
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === currBookId ? { ...book, ...editedBook } : book))
      );
    } catch (error) {
      console.error("Error editing book:", error);
    }
  }, [currBookId]);

  const deleteBookById = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const removeCharacterById = useCallback(async (id: number) => {
    const currentBook = books.at(currBookId);

    if (!currentBook) {
      console.error("Unexpected error. Current book not found");
      return;
    }
    if (!currentBook.characterIds) {
      console.error("Unexpected error. No characterIds exist on current book.");
      return;
    }

    const index = currentBook.characterIds.indexOf(id);

    if (index < 0) {
      console.error("Could not remove character from book. Character ID not found in book.");
      return;
    }

    const characterIds = [...currentBook.characterIds];
    characterIds.splice(index, 1);
    editBook({ id: currBookId, characterIds: characterIds, arkId: currentBook.arkId, title: currentBook.title });
  }, [books, currBookId, editBook]);

  const addCharacterById = useCallback((id: number) => {
    if (!currBook) {
      console.error("Unexpected error. Current book not found");
      return;
    }
    editBook({ id: currBookId, characterIds: [...currBook.characterIds ?? [], id], arkId: currBook.arkId, title: currBook.title });
  }, [currBook, currBookId, editBook]);



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
      removeCharacterById,
      addCharacterById
    }), [books, currBook, currBookId, editBook, removeCharacterById, addCharacterById, fetchBooks]);

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
