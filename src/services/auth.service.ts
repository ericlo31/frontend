import axios from "axios";

const TOKEN_KEY = 'auth_token';

// Method para incluir el token en la request
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};


export const getAuthToken = () : string => {
    const header: string = axios.defaults.headers.common['Authorization'] as string;

    if(!header) return ' ';

    const token: string[] = header.split(' ');

    if(token.length !== 2 || token[0] !== 'Bearer') {
        throw new Error('El token es inválido');
    }

    return token[1];
}

export const saveToken = async (token: string): Promise<void> => {
    try {
        await localStorage.setItem(TOKEN_KEY, token);
    }catch(error){
        console.error('Error guardando el token', error);
    }
}

export const loadToken = async (): Promise<string | null> => {
    try {
        return await localStorage.getItem(TOKEN_KEY) as string;
    }catch(error){
        console.error('Error cargando el token', error);
        return null;
    }
}

export const delToken = async (): Promise<void> => {
        await localStorage.clear();
}