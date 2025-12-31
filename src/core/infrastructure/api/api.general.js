
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getWithFilter = async (endpoint, filter) => {    
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            body: JSON.stringify(filter),
        });
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getWithFilter:', error);
        throw error;
    }
};

export const getData = async (endpoint) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
        });
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getData:', error);
        throw error;
    }
};