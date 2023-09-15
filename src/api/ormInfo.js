const API_URL = import.meta.env.VITE_APP_API_URL;
export const getORMInfo = async (email) => {
    const path = '/api/orm/';

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
        console.error('getORMInfo Error: ', e.message);
        return false;
    }
};

export const createORMInfo = async (email, requestData) => {
    const path = '/api/create-orm/';

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
        console.error('createORMInfo Error: ', e.message);
        return false;
    }
};

export const deleteORMInfo = async (requestData) => {
    const path = '/api/delete-orm';

    try {
        const response = await fetch(`${API_URL}${path}`,{
            method: "DELETE",
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: requestData,
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response;
    } catch (e) {
        console.error('deleteORMInfo Error: ', e.message);
        return false;
    }
};