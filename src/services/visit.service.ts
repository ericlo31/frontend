import { VisitData } from "../types/visit.types";

export const transformFormtoVisitData = async (name: string, email: string, document: string, resident: string, reason: string): Promise<VisitData> => {

    try{
        
        const data: VisitData = {
            name: name,
            email: email,
            document: document,
            resident: resident,
            visitImage: '',
            vehicleImage: '',
            reason: reason? reason : undefined,
        };

    return data;

    }catch(error: any){
        console.log('Se produjo un error verificando el usuario autenticado', error);
        throw error;
    }
    

}