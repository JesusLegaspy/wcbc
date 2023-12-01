import axios from "axios";
import { createContext, useState, ReactNode, useMemo, useCallback } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://wcbc-app.onrender.com';

export interface Persona {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

interface PersonaContextType {
  personas: readonly Persona[];
  allPersonas: readonly Persona[];
  fetchPersonasByIds: (ids: number[]) => Promise<void>;
  fetchAllPersonas: () => Promise<void>;
  createPersona: (bookId: number, name: string, description: string, imageUrl: string) => Promise<number | undefined>;
  editPersonaById: (id: number, data: Persona) => Promise<void>;
  deletePersonaById: (id: number) => void;
}

const startupPersona: Persona = {
  id: -1,
  name: '...',
  description: '...',
  image: '...',
}

const startupPersonaContext: PersonaContextType = {
  personas: [startupPersona],
  allPersonas: [startupPersona],
  fetchPersonasByIds: async () => { },
  fetchAllPersonas: async () => { },
  createPersona: async () => { return undefined },
  editPersonaById: async () => { },
  deletePersonaById: () => { }
}

const PersonaContext = createContext<PersonaContextType>(startupPersonaContext);

const PersonaProvider = ({ children }: { children?: ReactNode }) => {
  const [personas, setPersonas] = useState<readonly Persona[]>([]);
  const [allPersonas, setAllPersonas] = useState<readonly Persona[]>([]);

  const fetchPersonasByIds = useCallback(async (ids: number[]) => {
    console.debug('fetchPersonasByIds()', ids);
    try {
      const response = await Promise.all(ids.map((personaId) => axios.get<Persona>(`${API_BASE_URL}/personas/${personaId}`)));
      const personas = response.map((response) => response.data);
      setPersonas(personas);
    } catch (error) {
      console.error("Error fetching personas:", error);
    }
  }, []);

  const fetchAllPersonas = async () => {
    try {
      const response = await axios.get<Persona[]>(`${API_BASE_URL}/personas`);
      setAllPersonas(response.data);
    } catch (error) {
      console.error("Error fetching all personas:", error);
    }
  };


  const createPersona = useCallback(async (bookId: number, name: string, description: string, imageUrl: string = '') => {
    try {
      const response = await axios.post<Persona>(`${API_BASE_URL}/personas`, {
        name,
        description,
        image: imageUrl,
      });
      const newPersona = response.data;
      return newPersona.id;

    } catch (error) {
      console.error("Error creating persona:", error);
    }
  }, []);

  const editPersonaById = async (id: number, data: Persona) => {
    try {
      const response = await axios.put<Persona>(`${API_BASE_URL}/personas/${id}`, data);
      const editedPersona = response.data;
      setPersonas((prevPersonas) => prevPersonas.map((persona) => (persona.id === id ? editedPersona : persona)));
    } catch (error) {
      console.error("Error editing persona:", error);
    }
  };

  const deletePersonaById = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/personas/${id}`);
      setAllPersonas((prevPersonas) => prevPersonas.filter((persona) => persona.id !== id));
    } catch (error) {
      console.error("Error deleting persona:", error);
    }
  };

  const contextValue = useMemo(
    () => ({
      personas,
      allPersonas,
      fetchPersonasByIds,
      fetchAllPersonas,
      createPersona,
      editPersonaById,
      deletePersonaById
    }), [personas, createPersona, allPersonas, fetchPersonasByIds]);

  return (
    <PersonaContext.Provider value={contextValue}>
      {children}
    </PersonaContext.Provider>
  );
}

export { PersonaProvider, PersonaContext };