import axios from "axios";

const TOKEN_KEY = 'auth_token';
const REMEMBER_KEY = 'auth_remember';

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

export const saveRememberMe = (remember: string) => {
    localStorage.setItem(REMEMBER_KEY, remember);
}

export const loadRememberMe = () => {
    return localStorage.getItem(REMEMBER_KEY) as string;
}

export const delRememberMe = () => {
    localStorage.removeItem(REMEMBER_KEY);
}

export const saveToken = (token: string) => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    }catch(error){
        console.error('Error guardando el token', error);
    }
}

export const loadToken = (): string | null => {
    try {
        return localStorage.getItem(TOKEN_KEY) as string;
    }catch(error){
        console.error('Error cargando el token', error);
        return null;
    }
}

export const delToken = () => {
        localStorage.removeItem(TOKEN_KEY);
}