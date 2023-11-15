import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react"
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export interface CharacterOrder {
  characterId: number,
  order: number
}

export interface Chapter {
  id: number,
  chapterNumber: number,
  characterOrders: CharacterOrder[]
}

interface ChapterContextType {
  chapter: Chapter;
  chapters: readonly Chapter[];
  chapterNumber: number;
  fetchChaptersByIds: (ids: number[]) => Promise<void>;
  setChapterNumber: (value: number | ((prevValue: number) => number)) => void;
  prevChapter: () => void;
  nextChapter: () => void;
  addChapter: (duplicate?: boolean) => Promise<Chapter>;
  removeLastChapter: () => Promise<number | undefined>;
  addCharacterOrderToChapter: (characterOrder: CharacterOrder) => Promise<void>;
  editCharacterOrderInChapterByCharacterId: (characterId: number, order: number) => void;
  removeCharacterOrderFromChapter: (characterId: number) => Promise<void>;
  deleteAllCharacterOrdersWithCharacterId: (characterId: number) => Promise<void>;
}

const startupChapter: Chapter = {
  id: -1,
  chapterNumber: 1,
  characterOrders: []
};

const startupChapterContext: ChapterContextType = {
  chapter: startupChapter,
  chapters: [],
  chapterNumber: 1,
  setChapterNumber: () => { },
  prevChapter: () => { },
  nextChapter: () => { },
  fetchChaptersByIds: async () => { },
  addChapter: async () => startupChapter,
  removeLastChapter: async () => -1,
  addCharacterOrderToChapter: async () => { },
  editCharacterOrderInChapterByCharacterId: () => { },
  removeCharacterOrderFromChapter: async () => { },
  deleteAllCharacterOrdersWithCharacterId: async () => { }
}

const ChapterContext = createContext<ChapterContextType>(startupChapterContext);

const ChapterProvider = ({ children }: { children?: ReactNode }) => {
  const [chapter, setChapter] = useState<Chapter>(startupChapter);
  const [chapters, setChapters] = useState<readonly Chapter[]>([]);
  const [chapterNumber, setChapterNumber] = useState<number>(1);

  useEffect(() => {
    const foundChapter = chapters.find(chapter => chapter.chapterNumber === chapterNumber);
    if (foundChapter === undefined) {
      console.debug("Could not set chapter by chapter number");
      return;
    }
    setChapter(foundChapter);
    console.debug("useEffect", "setChapter()", "dep:", "[chapters, chapterNumber]");
  }, [chapters, chapterNumber]);

  const createChapter = async (chapterNumber: number, characterOrders: CharacterOrder[] = []) => {
    try {
      const response = await axios.post<Chapter>(`${API_BASE_URL}/chapters`, {
        chapterNumber,
        characterOrders
      });
      return response.data;
    } catch (error) {
      console.error("Could not create new chapter:", error);
    }
  };

  const fetchChaptersByIds = useCallback(async (ids: number[]) => {
    console.debug('fetchChaptersByIds()', ids);
    try {
      const response = await Promise.all(ids.map((chapterId) => axios.get<Chapter>(`${API_BASE_URL}/chapters/${chapterId}`)));
      const chapters = response
        .map((response) => response.data)
        .sort((a, b) => a.chapterNumber - b.chapterNumber);
      setChapters(chapters);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }, []);

  const prevChapter = useCallback(() => {
    if (chapterNumber <= 1) {
      console.error("Can not set chapter number less than 1");
      return;
    }
    setChapterNumber(prev => prev - 1);
  }, [chapterNumber]);

  const nextChapter = useCallback(() => {
    console.log("next!");
    if (chapterNumber >= chapters.length) {
      console.error("Can not set chapter number greater than max num of chapters");
      return;
    }
    setChapterNumber(prev => prev + 1);
  }, [chapterNumber, chapters.length]);

  const addChapter = useCallback(async (duplicate = false) => {
    const newChapter = await createChapter(
      (chapters.at(-1)?.chapterNumber ?? 0) + 1,
      duplicate ? chapters.at(-1)?.characterOrders : []
    );
    if (newChapter === undefined) {
      console.log("Could not add new chapter");
      return startupChapter;
    }
    setChapters(prevChapters => [...prevChapters, newChapter]);
    return newChapter;
  }, [chapters]);

  const editChapter = async (chapter: Chapter) => {
    try {
      const response = await axios.patch<Chapter>(`${API_BASE_URL}/chapters/${chapter.id}`, chapter);
      const editedChapter = response.data;
      setChapters(prevChapters => prevChapters.map(prevChapter =>
        prevChapter.id === editedChapter.id
          ? { ...prevChapter, ...editedChapter }
          : prevChapter
      ));
      return editedChapter;
    } catch (error) {
      console.error("Error editing chapter", error);
    }
  };

  const removeLastChapter = useCallback(async () => {
    const chapterToDelete = chapters.at(-1);
    if (chapterToDelete === undefined) {
      console.error("Could not removed last chapter");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/chapters/${chapterToDelete.id}`);
      setChapters(prevChapters => prevChapters.filter(chap => chap.id !== chapterToDelete.id));
      return chapterToDelete.id; // for use to update book
    } catch (error) {
      console.error("Could not delete chapter:", error);
    }
  }, [chapters]);

  const addCharacterOrderToChapter = useCallback(async (characterOrder: CharacterOrder) => {
    const editedChapter = await editChapter({
      ...chapter,
      characterOrders: [...chapter.characterOrders, characterOrder]
    });
    if (editedChapter === undefined) {
      console.error("Could not add character order to chapter");
      return;
    }
  }, [chapter]);

  const editCharacterOrderInChapterByCharacterId = useCallback((characterId: number, order: number) => {
    const newCharacterOrders: CharacterOrder[] = chapter.characterOrders.map(charOrder =>
      charOrder.characterId === characterId
        ? { ...charOrder, order }
        : charOrder
    );
    editChapter({ ...chapter, characterOrders: newCharacterOrders });
  }, [chapter]);

  const removeCharacterOrderFromChapter = useCallback(async (characterId: number) => {
    const editedChapter = await editChapter({
      ...chapter,
      characterOrders: chapter.characterOrders
        .filter(charOrder => charOrder.characterId !== characterId)
    });
    if (editedChapter === undefined) {
      console.error("Could not add character order to chapter");
      return;
    }
  }, [chapter]);

  const deleteAllCharacterOrdersWithCharacterId = useCallback(async (characterId: number) => {
    try {
      const response = await axios.get<readonly Chapter[]>(`${API_BASE_URL}/chapters`);
      const allChapters = response.data;

      const chapterEdits: Promise<Chapter | undefined>[] = allChapters
        .filter(chap => chap.characterOrders.some(charOrder => charOrder.characterId === characterId))
        .map(chap => axios.patch<Chapter>(`${API_BASE_URL}/chapters/${chap.id}`, {
          ...chap,
          characterOrders: chap.characterOrders
            .filter(characterOrder => characterOrder.characterId !== characterId)
        }).then(response => response.data)); // 

      await Promise.all(chapterEdits);
      // Need to refresh the chapters 
      const ids = chapters.map(chap => chap.id);
      fetchChaptersByIds(ids);
    } catch (error) {
      console.error("Could not delete all character orders with character ID:", error);
    }
  }, [chapters, fetchChaptersByIds]);

  const contextValue = useMemo(
    () => ({
      chapter,
      chapters,
      chapterNumber,
      createChapter,
      fetchChaptersByIds,
      prevChapter,
      nextChapter,
      setChapterNumber,
      addChapter,
      removeLastChapter,
      addCharacterOrderToChapter,
      editCharacterOrderInChapterByCharacterId,
      removeCharacterOrderFromChapter,
      deleteAllCharacterOrdersWithCharacterId
    }), [addChapter,
    chapter,
    chapters,
    chapterNumber,
    fetchChaptersByIds,
    prevChapter,
    nextChapter,
    removeLastChapter,
    addCharacterOrderToChapter,
    editCharacterOrderInChapterByCharacterId,
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