import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export interface Ark {
  id: number;
  title: string;
  order: number;
}

const getArks = axios.get<Ark>(`${API_BASE_URL}/arks`);

const getArkById = (id: number) => (
  axios.get<Ark>(`${API_BASE_URL}/arks/${id}`)
);


const createArk = (title: string, order: number) => (
  axios.post<Ark>(`${API_BASE_URL}/arks`, {
    title,
    order
  })
);

const editArkById = (ark: Ark) => (
  axios.patch<Ark>(`${API_BASE_URL}/arks/${ark.id}`, ark)
);

const deleteArkById = (id: number) => {
  axios.delete<Ark>(`${API_BASE_URL}/arks/${id}`)
  return;
};

export { getArks, getArkById, createArk, editArkById, deleteArkById };