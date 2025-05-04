import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchUsersByRole = async (role: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/role/${role}`);
    console.log(`Se obtuvieron los datos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${role} users:`, error);
    throw error;
  }
};

export const fetchResidentsWithApartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/residents`);
    console.log(`Se obtuvieron los datos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching residents:', error);
    throw error;
  }
};