const API_URL = import.meta.env.VITE_APP_API_URL;

export const createProgressInfo = async (email,requestData) => {
    const path = '/api/create-progress/';

    try {
        const response = await fetch(`${API_URL}${path}${email}`,{
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
    } catch (e) {
        console.error('createProgressInfo Error: ', e.message);
        return false;
    }
};

export const getProgressInfo = async (email) => {
    const path = '/api/progress/';

    try {
        const response = await fetch(`${API_URL}${path}${email}`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
    } catch (e) {
        console.error('getProgressInfo Error: ', e.message);
        return false;
    }
};