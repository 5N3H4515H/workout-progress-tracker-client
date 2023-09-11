const API_URL = import.meta.env.VITE_APP_API_URL;
export const getExerciseInfo = async (email,requestData) => {
    const path = '/api/exercises/';

    try {
        const response = await fetch(`${API_URL}${path}${email}`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: requestData,
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
    } catch (e) {
        console.error('getExerciseInfo Error: ', e.message);
        return false;
    }
};