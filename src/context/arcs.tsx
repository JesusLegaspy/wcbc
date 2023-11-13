import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export interface Arc {
  id: number;
  title: string;
  order: number;
}

interface ArcContextType {
  allArcs: readonly Arc[];
  allArcsSortedByOrder: readonly Arc[];
  fetchArcs: () => Promise<void>;
  getArcById: (id: number) => Promise<Arc | undefined>;
  createArc: (title: string, order: number) => Promise<number | undefined>;
  editArc: (arc: Arc) => Promise<void>;
  deleteArcById: (id: number) => void;
}

const startupBookContext: ArcContextType = {
  allArcs: [],
  allArcsSortedByOrder: [],
  fetchArcs: async () => { },
  getArcById: async (id: number) => undefined,
  createArc: async (title: string, order: number) => undefined,
  editArc: async (arc: Arc) => { },
  deleteArcById: (id: number) => { }
}

const ArcContext = createContext<ArcContextType>(startupBookContext);


const ArcProvider = ({ children }: { children?: ReactNode }) => {
  const [allArcs, setAllArcs] = useState<readonly Arc[]>([]);
  const [allArcsSortedByOrder, setAllArcsSortedByOrder] = useState<readonly Arc[]>([]);

  useEffect(() => {
    console.debug('arcs.tsx', 'useEffect', 'setValueArcId', [...allArcs].shift()?.id, 'dep:allArcs');
    setAllArcsSortedByOrder([...allArcs].sort((a, b) => a.order - b.order));
  }, [allArcs])

  const fetchArcs = useCallback(async () => {
    try {
      const response = await axios.get<Arc[]>(`${API_BASE_URL}/arcs`);
      setAllArcs(response.data);
    }
    catch (error) {
      console.error("Error fetching arcs", error);
    }
  }, []);

  const getArcById = async (id: number) => {
    try {
      const response = await axios.get<Arc>(`${API_BASE_URL}/arcs/${id}`);
      return response.data;
    }
    catch (error) {
      console.error(`Error fetching arc id: ${id}`, error);
    }
  };

  const createArc = async (title: string, order: number) => {
    try {
      const response = await axios.post<Arc>(`${API_BASE_URL}/arcs`, {
        title,
        order
      });
      const newArc = response.data;
      setAllArcs((prevArcs) => [...prevArcs, newArc]);
      return newArc.id;
    } catch (error) {
      console.error("Error creating arc", error);
    }
  };

  const editArc = async (arc: Arc) => {
    try {
      const response = await axios.patch<Arc>(`${API_BASE_URL}/arcs/${arc.id}`, arc);
      const updatedArc = response.data;
      setAllArcs((prevArcs) =>
        prevArcs.map((arc) => (arc.id === updatedArc.id ? { ...arc, ...updatedArc } : arc))
      );
    } catch (error) {
      console.error("Error editing arc", error);
    }
  };

  const deleteArcById = (id: number) => {
    try {
      axios.delete<Arc>(`${API_BASE_URL}/arcs/${id}`);
      setAllArcs((prevArcs) => prevArcs.filter((arc) => arc.id !== id));
    } catch (error) {
      console.error("Error deleing arc");
    }
  };

  const contextValue = useMemo(
    () => ({
      allArcs,
      allArcsSortedByOrder,
      fetchArcs,
      getArcById,
      createArc,
      editArc,
      deleteArcById
    }), [allArcs, fetchArcs, allArcsSortedByOrder]);

  return (
    <ArcContext.Provider value={contextValue}>
      {children}
    </ArcContext.Provider>
  );
}

export { ArcProvider, ArcContext }