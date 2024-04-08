import axios from 'axios';
import URL from '../../URL';
import { useState } from 'react';
import { showToastAlert } from '../utils/toast';

export const useAxios = <genericType = unknown>() => {
    const [data, setData] = useState<genericType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const executeAxios = (
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
        body?: unknown,
        errorMessage?: string,
        successMessage = 'Operation successful',
    ) => {
        return new Promise(async resolve => {
            setLoading(true);
            try {
                const response = await axios({
                    url: `${URL}${endpoint}`,
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 2000,
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
                    showToastAlert('success', successMessage);
                }
                resolve(result);
            } catch (err) {
                if (err instanceof Error) {
                    showToastAlert('error', errorMessage || err.message);
                    console.log(err);
                }
            } finally {
                setLoading(false);
            }
        });
    };

    return { data, error, loading, executeAxios };
};
