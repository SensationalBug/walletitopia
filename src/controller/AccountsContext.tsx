import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface props {
    children: JSX.Element;
}

export const AccContext = createContext({});

const AccProvider = ({ children }: props) => {
    const URL = 'http://45.77.161.230:3000';
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAcc();
    }, []);

    const getAcc = () => {
        axios({
            method: 'get',
            url: `${URL}/cuenta`,
        })
            .then(res => setAccounts(res.data))
            .catch(err => console.log(err));
    };

    return (
        <AccContext.Provider value={{ accounts }}>
            {children}
        </AccContext.Provider>
    );
};

export default AccProvider;
