import axios from "axios";
import { VisitData, VisitResponse } from "../types/visit.types";

const API_URL = process.env.REACT_APP_API;

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
        exp: visit.authorization.exp? new Date(visit.authorization.exp) : undefined,
      },
      registry: visit.registry? {
        ...visit.registry,
        entry: visit.registry.entry? {
          ...visit.registry.entry,
          date: visit.registry.entry.date? new Date(visit.registry.entry.date) : undefined,
        } : undefined,
        exit: visit.registry.exit? {
          ...visit.registry.exit,
          date: visit.registry.entry.date? new Date(visit.registry.exit.date) : undefined,
        } : undefined
      } : undefined,
    }))
    return visits;
  }catch(error: any){
    console.error(`Error al obtener los datos de la visita`, error);
    throw error;
  }
}

export const getAllVisits = async (): Promise<VisitResponse[]> => {
  try {
    const response = await axios.get<VisitResponse[]>("http://localhost:8000/api/visits");

    // Optional: normalize the date formats
    return response.data.map((visit: any) => ({
      ...visit,
      createdAt: new Date(visit.createdAt),
      updatedAt: new Date(visit.updatedAt),
      authorization: {
        ...visit.authorization,
        date: new Date(visit.authorization.date),
        exp: visit.authorization.exp ? new Date(visit.authorization.exp) : undefined,
      },
      registry: visit.registry ? {
        ...visit.registry,
        entry: visit.registry.entry ? {
          ...visit.registry.entry,
          date: visit.registry.entry.date ? new Date(visit.registry.entry.date) : undefined,
        } : undefined,
        exit: visit.registry.exit ? {
          ...visit.registry.exit,
          date: visit.registry.exit.date ? new Date(visit.registry.exit.date) : undefined,
        } : undefined
      } : undefined,
    }));
  } catch (error) {
    console.error(`Error al obtener todas las visitas.`, error);
    throw error;
  }
};