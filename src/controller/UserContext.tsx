import axios from 'axios';
import Toast from 'react-native-toast-message';
import React, { createContext, useState } from 'react';
import URL from '../../URL';

interface props {
    children: JSX.Element;
}

export const UserContext = createContext({});
const UserProvider = ({ children }: props) => {
    // const [currentUser, setCurrentUser] = useState('');
    const [userData, setUserData] = useState({
        mail: '',
        password: '',
        token: '',
    });
    const [newUser, setNewUser] = useState({
        fullName: '',
        mail: '',
        password: '',
        rPassword: '',
        appTerms: false,
    });
    // Funcion para manejar los mensajes de error
    const showToastAlert = (type: string, message: string) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 1200,
        });
    };
    // Funcion para editar un elemento en un useState de tipo {}
    const updStateData = (
        setState: React.Dispatch<React.SetStateAction<any>>,
        value: string,
        fieldName: string,
    ) => {
        setState((prevState: any) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };
    // Funcion para hacer login en la app
    const userLogin = () => {
        axios({
            method: 'post',
            url: `${URL}/users/signin`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                // mail: userData.mail,
                // password: userData.password,
                mail: 'z@z.com',
                password: '1',
            },
        })
            .then(res => {
                console.log(res);
                updStateData(setUserData, res.data.acces_token, 'token');
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    visibilityTime: 1200,
                    text1: 'Credenciales inválidas',
                });
            });
    };
    // Funcion para registrar un nuevo usuario
    const registerNewUser = () => {
        axios({
            method: 'post',
            url: `${URL}/users/createUser`,
            data: {
                mail: newUser.mail,
                password: newUser.password,
                full_name: newUser.fullName,
            },
        })
            .then(res =>
                updStateData(setUserData, res.data.acces_token, 'token'),
            )
            .catch(() => {
                Toast.show({
                    type: 'error',
                    visibilityTime: 1200,
                    text1: 'Favor ingresar un correo válido',
                });
            });
    };
    // Funcion que valida los campos antes de registrar
    const userSignup = () => {
        const { fullName, mail, password, rPassword, appTerms } = newUser;
        if (!fullName || !mail) {
            showToastAlert('error', 'Completar todos los campos');
            return;
        }
        if (!password || !rPassword) {
            showToastAlert('error', 'Favor completar las contraseñas');
            return;
        }
        if (password !== rPassword) {
            showToastAlert('error', 'Las contraseñas deben ser iguales');
            return;
        }
        if (!appTerms) {
            showToastAlert('error', 'Debe aceptar los términos de uso');
            return;
        }
        registerNewUser();
    };
    // Funcion para hacer logout en la app
    const userLogout = (navigation: any, screen: string) => {
        updStateData(setUserData, '', 'mail');
        updStateData(setUserData, '', 'token');
        updStateData(setUserData, '', 'password');
        navigation.navigate(screen);
    };

    return (
        <UserContext.Provider
            value={{
                Toast,
                newUser,
                userData,
                userLogin,
                userSignup,
                userLogout,
                setNewUser,
                setUserData,
                updStateData,
                showToastAlert,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
