import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export interface CharacterOrder {
  characterId: number,
  order: number
}

export interface Chapter {
  id: number,
  bookId: number, // sanity check
  prevId: number,
  nextId: number,
  characterOrder: CharacterOrder[]
}

interface ChapterContextType {
  chapter: Chapter | undefined;
  fetchChapterById: (id: number) => Promise<void>;
  nextChapter: () => void;
  prevChapter: () => void;
  addChapter: (bookId: number) => Promise<void>;
  editCharacterOrder: (characterOrdre: CharacterOrder[]) => void;
  removeLastChapter: () => Promise<void>;
}


const startupChapterContext: ChapterContextType = {
  chapter: undefined,
  fetchChapterById: async (id: number) => { },
  nextChapter: () => { },
  prevChapter: () => { },
  addChapter: async (bookId: number) => { },
  editCharacterOrder: (characterOrdrer: CharacterOrder[]) => { },
  removeLastChapter: async () => { }
}

const ChapterContext = createContext<ChapterContextType>(startupChapterContext);

const ChapterProvider = ({ children }: { children?: ReactNode }) => {
  const [chapter, setChapter] = useState<Chapter | undefined>();

  const fetchChapterById = async (id: number | undefined) => {
    if (id === undefined) {
      setChapter(undefined);
      return;
    }
    const aChapter = await getChapterById(id);
    setChapter(aChapter);
  }

  const getChapterById = async (id: number) => {
    try {
      const response = await axios.get<Chapter>(`${API_BASE_URL}/chapters/${id}`);
      return (response.data);
    } catch (error) {
      console.error("Error getting chapters:", error);
    }
  }

  const nextChapter = () => {
    if (chapter?.nextId !== undefined)
      fetchChapterById(chapter.nextId);
  };

  const prevChapter = () => {
    if (chapter?.prevId !== undefined)
      fetchChapterById(chapter.prevId);
  };

  const addChapter = async (bookId: number) => {
    try {
      if (chapter === undefined) {
        console.error("Cannot add new chapter");
        return;
      }

      const newChapter = await axios.post<Chapter>(`${API_BASE_URL}/chapters`, {
        bookId,
        prevId: chapter.prevId,
        nextId: chapter.nextId,
        characterOrder: []
      }).then(response => response.data);

      const chapterCopy = structuredClone(chapter);
      chapterCopy.nextId = newChapter.id;

      const editedChapter = await editChapter(chapterCopy);
      setChapter(editedChapter);
    } catch (error) {
      console.log("Could not add new chapter:", error);
    }
  };

  const editChapter = async (chapter: Chapter) => {
    try {
      const response = await axios.patch<Chapter>(`${API_BASE_URL}/chapter/${chapter.id}`, chapter);
      return response.data;
    } catch (error) {
      console.error("Error editing chapter", error);
    }
  }

  const editCharacterOrder = (characterOrder: CharacterOrder[]) => {
    if (chapter === undefined) {
      console.error("Can not edit character order");
      return;
    }

    const chapterCopy = structuredClone(chapter);
    chapterCopy.characterOrder = characterOrder;
    editChapter(chapterCopy);
  };

  const removeLastChapter = async () => {
    if (chapter === undefined) {
      console.error("Can not remove last chapter");
      return;
    }

    // Walk the linked list to the last element.
    let currChapter = chapter;
    while (!isNaN(currChapter.nextId)) {
      const potentialChapter = await getChapterById(currChapter.nextId);
      if (potentialChapter === undefined) {
        console.error("Could not remove last chapter");
        return;
      }
      currChapter = potentialChapter;
    }

    // If user is viewing the last chapter,
    // then set the chapter to previous
    // even undefined (which suggests only
    // one chapter existed).
    if (chapter.id === currChapter.id) {
      const secondToLastId = currChapter.prevId;
      fetchChapterById(secondToLastId);
    }

    deleteChapterById(currChapter.id);
  };

  const deleteChapterById = (id: number) => {
    try {
      axios.delete(`${API_BASE_URL}/chapter/${id}`);
    } catch (error) {
      console.error("Could not delete chapter:", error);
    }
  }

  const contextValue = useMemo(
    () => ({
      chapter,
      fetchChapterById,
      nextChapter,
      prevChapter,
      addChapter,
      editCharacterOrder,
      removeLastChapter
    }), []);

  return (
    <ChapterContext.Provider value={contextValue}>
      {children}
    </ChapterContext.Provider>
  );
}

export { ChapterProvider, ChapterContext }