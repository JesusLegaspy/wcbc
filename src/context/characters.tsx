import axios from "axios";
import { createContext, useState, ReactNode, useMemo, useCallback } from "react";

const API_BASE_URL = "http://localhost:3001";

export interface Character {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

interface CharacterContextType {
  currentCharacter: Character;
  characters: readonly Character[];
  allCharacters: readonly Character[];
  setCurrentCharacter: (id: Character) => void;
  fetchCharactersByIds: (ids: number[]) => Promise<void>;
  fetchAllCharacters: () => Promise<void>;
  createCharacter: (bookId: number, name: string, description: string, imageUrl: string) => Promise<number | undefined>;
  editCharacterById: (id: number, data: Character) => Promise<void>;
  deleteCharacterById: (id: number) => void;
}

const startupCharacter: Character = {
  id: -1,
  name: '...',
  description: '...',
  image: '...',
}

const startupCharacterContext: CharacterContextType = {
  currentCharacter: startupCharacter,
  characters: [startupCharacter],
  allCharacters: [startupCharacter],
  setCurrentCharacter: () => { },
  fetchCharactersByIds: async () => { },
  fetchAllCharacters: async () => { },
  createCharacter: async () => { return undefined },
  editCharacterById: async () => { },
  deleteCharacterById: () => { }
}

const CharacterContext = createContext<CharacterContextType>(startupCharacterContext);

const CharacterProvider = ({ children }: { children?: ReactNode }) => {
  const [currentCharacter, setCurrCharacter] = useState<Character>(startupCharacter);
  const [characters, setCharacters] = useState<readonly Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<readonly Character[]>([]);

  const fetchCharactersByIds = useCallback(async (ids: number[]) => {
    console.debug('fetchCharactersByIds()', ids);
    try {
      const response = await Promise.all(ids.map((characterId) => axios.get<Character>(`${API_BASE_URL}/characters/${characterId}`)));
      const characters = response.map((response) => response.data);
      setCharacters(characters);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }, []);

  const fetchAllCharacters = async () => {
    try {
      const response = await axios.get<Character[]>(`${API_BASE_URL}/characters`);
      setAllCharacters(response.data);
    } catch (error) {
      console.error("Error fetching all characters:", error);
    }
  };

  const setCurrentCharacter = (character: Character) => {
    setCurrCharacter(character);
  };

  const createCharacter = useCallback(async (bookId: number, name: string, description: string, imageUrl: string = '') => {
    try {
      const response = await axios.post<Character>(`${API_BASE_URL}/characters/`, {
        name,
        description,
        image: imageUrl,
      });
      const newCharacter = response.data;
      return newCharacter.id;

      // const bookResponse = await axios.get<Book>(`${API_BASE_URL}/books/${bookId}`);
      // const currentCharactersIds = bookResponse.data.characterIds || [];
      // await editBook({ id: bookId, characterIds: [...currentCharactersIds, newCharacter.id] });

      // setCharacters([...characters, newCharacter]);
    } catch (error) {
      console.error("Error creating character:", error);
    }
  }, []);

  const editCharacterById = async (id: number, data: Character) => {
    try {
      const response = await axios.patch<Character>(`${API_BASE_URL}/characters/${id}`, data);
      const editedCharacter = response.data;
      setCharacters((prevCharacters) => prevCharacters.map((character) => (character.id === id ? editedCharacter : character)));
    } catch (error) {
      console.error("Error editing character:", error);
    }
  };

  const deleteCharacterById = async (id: number) => {
    // todo: Need to delete character in all books
    try {
      await axios.delete(`${API_BASE_URL}/characters/${id}`);
      setAllCharacters((prevCharacters) => prevCharacters.filter((character) => character.id !== id));
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  const contextValue = useMemo(
    () => ({
      currentCharacter,
      setCurrentCharacter,
      characters,
      allCharacters,
      fetchCharactersByIds,
      fetchAllCharacters,
      createCharacter,
      editCharacterById,
      deleteCharacterById
    }), [characters, createCharacter, allCharacters, currentCharacter, fetchCharactersByIds]);

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
}

export { CharacterProvider, CharacterContext };