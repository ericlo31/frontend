import { getAuthenticatedUser } from "../api/auth.api";
import { VisitData } from "../types/visit.types";

export const transformFormtoVisitData = async (name: string, document: string, reason: string): Promise<VisitData> => {

    try{
        /*
        Verifico al usuario autenticado para colocarlo como el residente
        que autoriza la visita.
        */
        const logedUser = await getAuthenticatedUser(); // Es necesario implementar Login para que funcione correctamente
        
        const data: VisitData = {
            name: name,
            document: document,
            resident: logedUser._id,
            visitImage: 'https://ejemplo.com/foto.jpg', // De momento se guardaran las imagenes con este placeholder
            vehicleImage: 'https://ejemplo.com/foto.jpg',
            reason: reason? reason : undefined,
        };

    return data;

    }catch(error: any){
        console.log('Se produjo un error verificando el usuario autenticado', error);
        throw error;
    }
    

}