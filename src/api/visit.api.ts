import axios from "axios";
import { VisitData } from "../types/visit.types";

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