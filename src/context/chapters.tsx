import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react"
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface PersonaImportance {
  personaId: number,
  importance: number
}

export interface Chapter {
  id: number,
  chapterNumber: number,
  personaImportances: PersonaImportance[]
}

interface ChapterContextType {
  chapter: Chapter;
  chapters: readonly Chapter[];
  chapterNumber: number;
  createChapter: (chapterNumber: number, personaImportances: PersonaImportance[]) => Promise<Chapter | undefined>;
  fetchChaptersByIds: (ids: number[]) => Promise<void>;
  setChapterNumber: (value: number | ((prevValue: number) => number)) => void;
  prevChapter: () => void;
  nextChapter: () => void;
  addChapter: (duplicate?: boolean) => Promise<Chapter>;
  removeLastChapter: () => Promise<number | undefined>;
  addPersonaImportanceToChapter: (personaImportance: PersonaImportance) => Promise<void>;
  editPersonaImportanceInChapterByPersonaId: (personaId: number, importance: number) => void;
  removePersonaImportanceFromChapter: (personaId: number) => Promise<void>;
  deleteAllPersonaImportancesWithPersonaId: (personaId: number) => Promise<void>;
}

const startupChapter: Chapter = {
  id: -1,
  chapterNumber: 1,
  personaImportances: []
};

const startupChapterContext: ChapterContextType = {
  chapter: startupChapter,
  chapters: [],
  chapterNumber: 1,
  createChapter: async () => startupChapter,
  setChapterNumber: () => { },
  prevChapter: () => { },
  nextChapter: () => { },
  fetchChaptersByIds: async () => { },
  addChapter: async () => startupChapter,
  removeLastChapter: async () => -1,
  addPersonaImportanceToChapter: async () => { },
  editPersonaImportanceInChapterByPersonaId: () => { },
  removePersonaImportanceFromChapter: async () => { },
  deleteAllPersonaImportancesWithPersonaId: async () => { }
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

  const createChapter = async (chapterNumber: number, personaImportances: PersonaImportance[] = []) => {
    try {
      const response = await axios.post<Chapter>(`${API_BASE_URL}/chapters`, {
        chapterNumber,
        personaImportances
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
      console.error("Error fetching personas:", error);
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
      duplicate ? chapters.at(-1)?.personaImportances : []
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

  const addPersonaImportanceToChapter = useCallback(async (personaImportance: PersonaImportance) => {
    const editedChapter = await editChapter({
      ...chapter,
      personaImportances: [...chapter.personaImportances, personaImportance]
    });
    if (editedChapter === undefined) {
      console.error("Could not add persona importance to chapter");
      return;
    }
  }, [chapter]);

  const editPersonaImportanceInChapterByPersonaId = useCallback((personaId: number, importance: number) => {
    const newPersonaImportances: PersonaImportance[] = chapter.personaImportances.map(charImportance =>
      charImportance.personaId === personaId
        ? { ...charImportance, importance }
        : charImportance
    );
    editChapter({ ...chapter, personaImportances: newPersonaImportances });
  }, [chapter]);

  const removePersonaImportanceFromChapter = useCallback(async (personaId: number) => {
    const editedChapter = await editChapter({
      ...chapter,
      personaImportances: chapter.personaImportances
        .filter(charImportance => charImportance.personaId !== personaId)
    });
    if (editedChapter === undefined) {
      console.error("Could not add persona importance to chapter");
      return;
    }
  }, [chapter]);

  const deleteAllPersonaImportancesWithPersonaId = useCallback(async (personaId: number) => {
    try {
      const response = await axios.get<readonly Chapter[]>(`${API_BASE_URL}/chapters`);
      const allChapters = response.data;

      const chapterEdits: Promise<Chapter | undefined>[] = allChapters
        .filter(chap => chap.personaImportances.some(charImportance => charImportance.personaId === personaId))
        .map(chap => axios.patch<Chapter>(`${API_BASE_URL}/chapters/${chap.id}`, {
          ...chap,
          personaImportances: chap.personaImportances
            .filter(personaImportance => personaImportance.personaId !== personaId)
        }).then(response => response.data)); // 

      await Promise.all(chapterEdits);
      // Need to refresh the chapters 
      const ids = chapters.map(chap => chap.id);
      fetchChaptersByIds(ids);
    } catch (error) {
      console.error("Could not delete all persona importances with persona ID:", error);
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
      addPersonaImportanceToChapter,
      editPersonaImportanceInChapterByPersonaId,
      removePersonaImportanceFromChapter,
      deleteAllPersonaImportancesWithPersonaId
    }), [addChapter,
    chapter,
    chapters,
    chapterNumber,
    fetchChaptersByIds,
    prevChapter,
    nextChapter,
    removeLastChapter,
    addPersonaImportanceToChapter,
    editPersonaImportanceInChapterByPersonaId,
    removePersonaImportanceFromChapter,
    deleteAllPersonaImportancesWithPersonaId
  ]);

  return (
    <ChapterContext.Provider value={contextValue}>
      {children}
    </ChapterContext.Provider>
  );
}

export { ChapterProvider, ChapterContext }