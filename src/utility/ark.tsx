import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export interface Ark {
  id: number;
  title: string;
  order: number;
}

export const getArks = async () => {
  try {
    const response = await axios.get<Ark[]>(`${API_BASE_URL}/arks`);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching arks", error);
  }
};

export const getArkById = (id: number) => (
  axios.get<Ark>(`${API_BASE_URL}/arks/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching ark id: ${id}`, error);
    })
);


export const createArk = (title: string, order: number) => (
  axios.post<Ark>(`${API_BASE_URL}/arks`, {
    title,
    order
  })
);

export const editArkById = (ark: Ark) => (
  axios.patch<Ark>(`${API_BASE_URL}/arks/${ark.id}`, ark)
);

export const deleteArkById = (id: number) => {
  axios.delete<Ark>(`${API_BASE_URL}/arks/${id}`)
  return;
};