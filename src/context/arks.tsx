import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export interface Ark {
  id: number;
  title: string;
  order: number;
}

interface ArkContextType {
  allArks: readonly Ark[];
  fetchArks: () => Promise<void>;
  getArkById: (id: number) => Promise<Ark | undefined>;
  createArk: (title: string, order: number) => Promise<void>;
  editArk: (ark: Ark) => Promise<void>;
  deleteArkById: (id: number) => void;
}

const startupBookContext: ArkContextType = {
  allArks: [],
  fetchArks: async () => { },
  getArkById: async (id: number) => undefined,
  createArk: async (title: string, order: number) => { },
  editArk: async (ark: Ark) => { },
  deleteArkById: (id: number) => { }
}

const ArkContext = createContext<ArkContextType>(startupBookContext);


const ArkProvider = ({ children }: { children?: ReactNode }) => {
  const [allArks, setAllArks] = useState<readonly Ark[]>([]);

  const fetchArks = useCallback(async () => {
    try {
      const response = await axios.get<Ark[]>(`${API_BASE_URL}/arks`);
      setAllArks(response.data);
    }
    catch (error) {
      console.error("Error fetching arks", error);
    }
  }, []);

  const getArkById = async (id: number) => {
    try {
      const response = await axios.get<Ark>(`${API_BASE_URL}/arks/${id}`);
      return response.data;
    }
    catch (error) {
      console.error(`Error fetching ark id: ${id}`, error);
    }
  };

  const createArk = async (title: string, order: number) => {
    try {
      const response = await axios.post<Ark>(`${API_BASE_URL}/arks`, {
        title,
        order
      });
      const newArk = response.data;
      setAllArks((prevArks) => [...prevArks, newArk]);
    } catch (error) {
      console.error("Error creating ark", error);
    }
  };

  const editArk = async (ark: Ark) => {
    try {
      const response = await axios.patch<Ark>(`${API_BASE_URL}/arks/${ark.id}`, ark);
      const updatedArk = response.data;
      setAllArks((prevArks) =>
        prevArks.map((ark) => (ark.id === updatedArk.id ? { ...ark, ...updatedArk } : ark))
      );
    } catch (error) {
      console.error("Error editing ark", error);
    }
  };

  const deleteArkById = (id: number) => {
    try {
      axios.delete<Ark>(`${API_BASE_URL}/arks/${id}`)
      setAllArks((prevArks) => prevArks.filter((ark) => ark.id !== id));
    } catch (error) {
      console.error("Error deleing ark");
    }
  };

  const contextValue = useMemo(
    () => ({
      allArks,
      fetchArks,
      getArkById,
      createArk,
      editArk,
      deleteArkById
    }), [allArks, fetchArks]);

  return (
    <ArkContext.Provider value={contextValue}>
      {children}
    </ArkContext.Provider>
  );
}

export { ArkProvider, ArkContext }