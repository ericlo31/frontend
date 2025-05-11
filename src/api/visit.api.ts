import axios from "axios";
import { VisitData, VisitResponse } from "../types/visit.types";

const API_URL = "http://localhost:8000/api";

export const authorizeVisit = async (data: VisitData) => {
  try{
    const response = await axios.post(`${API_URL}/visits/authorize`, data);
    console.log(`Se obtubieron los datos`);
    return response.data;
  }catch(error: any){
    console.error(`Error autorizando la visita`, error);
    throw error;
  }
};

export const getVisitsByResidentId = async (id: string): Promise<VisitResponse[]> => {
  try {
    const response = await axios.get<VisitResponse[]>(`${API_URL}/visits/resident/${id}`);
    const visits = response.data.map((visit: any) => ({
      ...visit,
      createdAt: new Date(visit.createdAt),
      updatedAt: new Date(visit.updatedAt),
      authorization: {
        ...visit.authorization,
        date: new Date(visit.authorization.date),
        exp: new Date(visit.authorization.exp),
      },
      registry: visit.registry? {
        ...visit.registry,
        entryDate: visit.registry.entryDate? new Date(visit.registry.entryDate) : undefined,
        exitDate: visit.registry.exitDate? new Date(visit.registry.exitDate) : undefined,
      } : undefined,
    }))
    return visits;
  }catch(error: any){
    console.error(`Error al obtener los datos de la visita`, error);
    throw error;
  }
}