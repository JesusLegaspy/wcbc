import { ReactNode, createContext, useState, useMemo } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3001";

export interface Book {
  id: number;
  title?: string;
  image?: string;
  characterIds?: number[];
}

interface BookContextType {
  books: readonly Book[];
  currBookId: number;
  setCurrBookId: React.Dispatch<React.SetStateAction<number>>;
  fetchBooks: () => Promise<void>;
  createBook: (title: string) => Promise<void>;
  editBook: (data: Book) => Promise<void>;
  deleteBookById: (id: number) => Promise<void>;
  removeCharacterById: (id: number) => Promise<void>;
}

const BookContext = createContext<BookContextType | null>(null);

const BookProvider = ({ children }: { children?: ReactNode }) => {
  const [books, setBooks] = useState<readonly Book[]>([]);
  const [currBookId, setCurrBookId] = useState<number>(0);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(`${API_BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const createBook = async (title: string) => {
    try {
      const data = {
        title: title,
        image: "",
      };
      const response = await axios.post<Book>(`${API_BASE_URL}/books`, data)
      const newBook = response.data;
      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      console.error("Error creating Book:", error);
    }
  };

  const editBook = async (data: Book) => {
    try {
      const response = await axios.patch<Book>(`${API_BASE_URL}/books/${currBookId}`, data);
      const editedBook = response.data;
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === currBookId ? { ...book, ...editedBook } : book))
      );
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  const deleteBookById = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const removeCharacterById = async (id: number) => {
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
    editBook({ id: currBookId, characterIds: characterIds });
  }

  const contextValue = useMemo(
    () => ({
      books,
      currBookId,
      setCurrBookId,
      fetchBooks,
      createBook,
      editBook,
      deleteBookById,
      removeCharacterById
    }), [books]);

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
