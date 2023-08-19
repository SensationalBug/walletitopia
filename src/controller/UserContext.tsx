import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

interface props {
    children: JSX.Element;
}

const UserProvider = ({ children }: props) => {
    const URL = 'http://45.77.161.230:3000';
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        token: '',
    });
    const updStateData = (
        setState: Function,
        value: string,
        fieldName: string,
    ) => {
        setState((prevState: any) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };
    const userLogin = () => {
        // axios({
        //     method: 'post',
        //     url: `${URL}/users/signin`,
        //     data: {
        //         // correo: userData.email,
        //         // password: userData.password,
        //         correo: 'string',
        //         password: 'string',
        //     },
        // })
        //     .then(res => updStateData(setUserData, res.data, 'token'))
        //     .catch(err => console.log(err.response.data.message));
        console.log(userData);
    };
    return (
        <UserContext.Provider
            value={{
                userData,
                userLogin,
                setUserData,
                updStateData,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
