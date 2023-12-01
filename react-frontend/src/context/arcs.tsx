import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://wcbc-app.onrender.com';

export interface Arc {
  id: number;
  title: string;
  series: number;
}

interface ArcContextType {
  allArcs: readonly Arc[];
  allArcsSortedBySeries: readonly Arc[];
  fetchArcs: () => Promise<void>;
  getArcById: (id: number) => Promise<Arc | undefined>;
  createArc: (title: string, series: number) => Promise<number | undefined>;
  editArc: (arc: Arc) => Promise<void>;
  deleteArcById: (id: number) => void;
}

const startupBookContext: ArcContextType = {
  allArcs: [],
  allArcsSortedBySeries: [],
  fetchArcs: async () => { },
  getArcById: async (id: number) => undefined,
  createArc: async (title: string, series: number) => undefined,
  editArc: async (arc: Arc) => { },
  deleteArcById: (id: number) => { }
}

const ArcContext = createContext<ArcContextType>(startupBookContext);


const ArcProvider = ({ children }: { children?: ReactNode }) => {
  const [allArcs, setAllArcs] = useState<readonly Arc[]>([]);
  const [allArcsSortedBySeries, setAllArcsSortedBySeries] = useState<readonly Arc[]>([]);

  useEffect(() => {
    console.debug('arcs.tsx', 'useEffect', 'setValueArcId', [...allArcs].shift()?.id, 'dep:allArcs');
    setAllArcsSortedBySeries([...allArcs].sort((a, b) => a.series - b.series));
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

  const createArc = async (title: string, series: number) => {
    try {
      const response = await axios.post<Arc>(`${API_BASE_URL}/arcs`, {
        title,
        series
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
      const response = await axios.put<Arc>(`${API_BASE_URL}/arcs/${arc.id}`, arc);
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
      allArcsSortedBySeries,
      fetchArcs,
      getArcById,
      createArc,
      editArc,
      deleteArcById
    }), [allArcs, fetchArcs, allArcsSortedBySeries]);

  return (
    <ArcContext.Provider value={contextValue}>
      {children}
    </ArcContext.Provider>
  );
}

export { ArcProvider, ArcContext }