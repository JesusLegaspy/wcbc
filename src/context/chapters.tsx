import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export interface CharacterOrder {
  characterId: number,
  order: number
}

export interface Chapter {
  id: number,
  prevId: number | null,
  nextId: number | null,
  characterOrders: CharacterOrder[]
}

interface ChapterContextType {
  chapter: Chapter | undefined | null;
  createChapter: () => Promise<Chapter | undefined>;
  fetchChapterById: (id: number) => Promise<void>;
  nextChapter: () => void;
  prevChapter: () => void;
  addChapter: () => Promise<void>;
  editCharacterOrders: (characterOrders: CharacterOrder[]) => void;
  removeLastChapter: () => Promise<void>;
  addCharacterOrderToChapter: (characterOrder: CharacterOrder) => Promise<void>;
  removeCharacterOrderFromChapter: (characterId: number) => Promise<void>;
  deleteAllCharacterOrdersWithCharacterId: (characterId: number) => Promise<void>;
}


const startupChapterContext: ChapterContextType = {
  chapter: undefined,
  createChapter: async () => ({ id: -1, prevId: null, nextId: null, characterOrders: [] }),
  fetchChapterById: async () => { },
  nextChapter: () => { },
  prevChapter: () => { },
  addChapter: async () => { },
  editCharacterOrders: () => { },
  removeLastChapter: async () => { },
  addCharacterOrderToChapter: async () => { },
  removeCharacterOrderFromChapter: async () => { },
  deleteAllCharacterOrdersWithCharacterId: async () => { }
}

const ChapterContext = createContext<ChapterContextType>(startupChapterContext);

const ChapterProvider = ({ children }: { children?: ReactNode }) => {
  const [chapter, setChapter] = useState<Chapter | undefined | null>();

  const createChapter = async () => {
    try {
      const response = await axios.post<Chapter>(`${API_BASE_URL}/chapters`, {
        prevId: null,
        nextId: null,
        characterOrders: []
      });
      return response.data;
    } catch (error) {
      console.error("Could not create new chapter:", error);
    }
  }

  const fetchChapterById = useCallback(async (id: number | null) => {
    if (id === null) {
      setChapter(null);
      return;
    }
    const aChapter = await getChapterById(id);
    setChapter(aChapter);
  }, []);

  const getChapterById = async (id: number) => {
    try {
      const response = await axios.get<Chapter>(`${API_BASE_URL}/chapters/${id}`);
      return (response.data);
    } catch (error) {
      console.error("Error getting chapters:", error);
    }
  }

  const nextChapter = useCallback(() => {
    if (chapter?.nextId !== undefined)
      fetchChapterById(chapter.nextId);
  }, [fetchChapterById, chapter?.nextId]);

  const prevChapter = useCallback(() => {
    if (chapter?.prevId !== undefined)
      fetchChapterById(chapter.prevId);
  }, [fetchChapterById, chapter?.prevId]);

  const addChapter = useCallback(async () => {
    try {
      if (chapter === undefined || chapter == null) {
        console.error("Cannot add new chapter");
        return;
      }

      const newChapter = await axios.post<Chapter>(`${API_BASE_URL}/chapters`, {
        prevId: chapter.prevId,
        nextId: chapter.nextId,
        characterOrders: []
      }).then(response => response.data);

      const chapterCopy = structuredClone(chapter);
      chapterCopy.nextId = newChapter.id;

      const editedChapter = await editChapter(chapterCopy);
      setChapter(editedChapter);
    } catch (error) {
      console.log("Could not add new chapter:", error);
    }
  }, [chapter]);

  const editChapter = async (chapter: Chapter) => {
    try {
      const response = await axios.patch<Chapter>(`${API_BASE_URL}/chapters/${chapter.id}`, chapter);
      return response.data;
    } catch (error) {
      console.error("Error editing chapter", error);
    }
  }

  const editCharacterOrders = useCallback((characterOrders: CharacterOrder[]) => {
    if (chapter === undefined || chapter == null) {
      console.error("Can not edit character order");
      return;
    }

    const chapterCopy = structuredClone(chapter);
    chapterCopy.characterOrders = characterOrders;
    editChapter(chapterCopy);
  }, [chapter]);

  const removeLastChapter = useCallback(async () => {
    if (chapter === undefined || chapter == null) {
      console.error("Can not remove last chapter");
      return;
    }

    // Walk the linked list to the last element.
    let currChapter = chapter;
    while (currChapter.nextId !== null) {
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
  }, [chapter, fetchChapterById]);

  const deleteChapterById = (id: number) => {
    try {
      axios.delete(`${API_BASE_URL}/chapters/${id}`);
    } catch (error) {
      console.error("Could not delete chapter:", error);
    }
  };

  const addCharacterOrderToChapter = useCallback(async (characterOrder: CharacterOrder) => {
    if (chapter === undefined || chapter == null) {
      console.error("Could not add characterOrder to chapter");
      return;
    }
    const newCharOrder = [...chapter.characterOrders, characterOrder];
    const chapterCopy = structuredClone(chapter);
    chapterCopy.characterOrders = newCharOrder;
    const editedChapter = await editChapter(chapterCopy);
    setChapter(editedChapter);
  }, [chapter]);

  const removeCharacterOrderFromChapter = useCallback(async (characterId: number) => {
    if (chapter === undefined || chapter == null) {
      console.error("Could not remove character from chapter");
      return;
    }

    const editedCharacterOrders = chapter.characterOrders
      .filter(charOrder => charOrder.characterId !== characterId);
    const chapterCopy = structuredClone(chapter);
    chapterCopy.characterOrders = editedCharacterOrders;
    const newChapter = await editChapter(chapterCopy);
    setChapter(newChapter);

  }, [chapter]);

  const deleteAllCharacterOrdersWithCharacterId = useCallback(async (characterId: number) => {
    try {
      const response = await axios.get<readonly Chapter[]>(`${API_BASE_URL}/chapters`);
      const allChapters = response.data;

      const chapterEdits: Promise<Chapter | undefined>[] = allChapters.map(chapter => {
        const editedCharOrder = chapter.characterOrders
          .filter(characterOrder => characterOrder.characterId !== characterId);
        const chapterCopy = structuredClone(chapter);
        chapterCopy.characterOrders = editedCharOrder;
        return editChapter(chapterCopy);
      });

      Promise.all(chapterEdits);
    } catch (error) {
      console.error("Could not delete all character orders with character ID:", error);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      chapter,
      createChapter,
      fetchChapterById,
      nextChapter,
      prevChapter,
      addChapter,
      editCharacterOrders,
      removeLastChapter,
      addCharacterOrderToChapter,
      removeCharacterOrderFromChapter,
      deleteAllCharacterOrdersWithCharacterId
    }), [addChapter,
    chapter,
    editCharacterOrders,
    fetchChapterById,
    nextChapter,
    prevChapter,
    removeLastChapter,
    addCharacterOrderToChapter,
    removeCharacterOrderFromChapter,
    deleteAllCharacterOrdersWithCharacterId
  ]);

  return (
    <ChapterContext.Provider value={contextValue}>
      {children}
    </ChapterContext.Provider>
  );
}

export { ChapterProvider, ChapterContext }