import axios from "axios";
import {
  AuthorizedResponse,
  VisitData,
  VisitResponse,
} from "../types/visit.types";
import { ReportData, ReportResponse } from "../types/report.types";

const API_URL = process.env.REACT_APP_API;

export const authorizeVisit = async (
  data: VisitData
): Promise<AuthorizedResponse> => {
  try {
    const response = await axios.post<AuthorizedResponse>(
      `${API_URL}/visits/authorize`,
      data
    );
    console.log(`Se autorizó la visita correctamente`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error autorizando la visita`, error);
    throw error;
  }
};

export const getVisitsByResidentId = async (
  id: string
): Promise<VisitResponse[]> => {
  try {
    const response = await axios.get<VisitResponse[]>(
      `${API_URL}/visits/resident/${id}`
    );
    const visits = response.data.map((visit: any) => ({
      ...visit,
      createdAt: new Date(visit.createdAt),
      updatedAt: new Date(visit.updatedAt),
      authorization: {
        ...visit.authorization,
        date: new Date(visit.authorization.date),
        exp: visit.authorization.exp
          ? new Date(visit.authorization.exp)
          : undefined,
      },
      registry: visit.registry
        ? {
            ...visit.registry,
            entry: visit.registry.entry
              ? {
                  ...visit.registry.entry,
                  date: visit.registry.entry.date
                    ? new Date(visit.registry.entry.date)
                    : undefined,
                }
              : undefined,
            exit: visit.registry.exit
              ? {
                  ...visit.registry.exit,
                  date: visit.registry.entry.date
                    ? new Date(visit.registry.exit.date)
                    : undefined,
                }
              : undefined,
          }
        : undefined,
    }));
    return visits;
  } catch (error: any) {
    console.error(`Error al obtener los datos de la visita`, error);
    throw error;
  }
};

export const getAllVisits = async (): Promise<VisitResponse[]> => {
  try {
    const response = await axios.get<VisitResponse[]>(`${API_URL}/visits`);

    // Optional: normalize the date formats
    return response.data.map((visit: any) => ({
      ...visit,
      createdAt: new Date(visit.createdAt),
      updatedAt: new Date(visit.updatedAt),
      authorization: {
        ...visit.authorization,
        date: new Date(visit.authorization.date),
        exp: visit.authorization.exp
          ? new Date(visit.authorization.exp)
          : undefined,
      },
      registry: visit.registry
        ? {
            ...visit.registry,
            entry: visit.registry.entry
              ? {
                  ...visit.registry.entry,
                  date: visit.registry.entry.date
                    ? new Date(visit.registry.entry.date)
                    : undefined,
                }
              : undefined,
            exit: visit.registry.exit
              ? {
                  ...visit.registry.exit,
                  date: visit.registry.exit.date
                    ? new Date(visit.registry.exit.date)
                    : undefined,
                }
              : undefined,
          }
        : undefined,
    }));
  } catch (error) {
    console.error(`Error al obtener todas las visitas.`, error);
    throw error;
  }
};

export const sendVisitNotificationEmail = async (id: string): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/visits/notify/${id}`);
    console.log(
      `Se enviaron los correos de notificación exitosamente: `,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`Ocurrió un error al enviar la notificación: `, error);
    throw error;
  }
};

export const getReport = async (data: ReportData): Promise<ReportResponse> => {
  try {
    const params = new URLSearchParams();
    
    params.append('start', data.start.toISOString());
    
    if (data.end) {
      params.append('end', data.end.toISOString());
    }

    if (data.resident) {
      params.append('resident', data.resident);
    }

    if (data.guard) {
      params.append('guard', data.guard);
    }

    const response = await axios.get<ReportResponse>(
      `${API_URL}/visits/report`,
      { params }
    );
    
    console.log(`Se ha generado el reporte exitosamente`);
    return response.data;
  } catch (error) {
    console.error(`Ocurrió un error al generar el reporte`, error);
    throw error;
  }
};
