const API_URL = import.meta.env.VITE_APP_API_URL;


export const getLoadInfo = async () => {
    const path = '/api/loads';

    try {
        const response = await fetch(`${API_URL}${path}`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
    } catch (e) {
        console.error('getLoadInfo Error: ', e.message);
        return false;
    }
};


export const createLoadInfo = async () => {
    const path = '/api/create-loads';

    try {
        const response = await fetch(`${API_URL}${path}`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
    } catch (e) {
        console.error('createLoadInfo Error: ', e.message);
        return false;
    }
};