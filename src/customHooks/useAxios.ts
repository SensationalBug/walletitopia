import axios from 'axios';
import { useState } from 'react';
import URL from '../../URL';

export const useAxios = <genericType = unknown>() => {
    const [data, setData] = useState<genericType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const executeAxios = async (
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
        body?: unknown,
        errorMessage?: string,
        successMessage = 'Operation successful',
    ) => {
        setLoading(true);
        try {
            const response = await axios({
                url: `${URL}${endpoint}`,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: body ? body : null,
            });

            if (!response.data) {
                const errResponse = `HTTP error! Status: ${response.request.status}`;
                setError(errResponse);
                console.log('Error', errorMessage || errResponse, 'error');
                throw new Error(errResponse);
            }

            const result = await response.data;
            setData(result);

            if (method !== 'GET') {
                console.log('Success', successMessage, 'success');
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log('Error', errorMessage || err.message, 'error');
                // console.log(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, executeAxios };
};
