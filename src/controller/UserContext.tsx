import axios from 'axios';
import URL from '../../URL';
import Toast from 'react-native-toast-message';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface props {
    children: JSX.Element;
}

export const UserContext = createContext({});
const UserProvider = ({ children }: props) => {
    const [resetSlider, setResetSlider] = useState(false);
    const [useBiometrics, setUseBiometrics] = useState(false);
    const [isLocalData, setIsLocalData] = useState(false);
    const [indicatorVisible, setIndicatorVisible] = useState(false);
    const [userData, setUserData] = useState({
        mail: AsyncStorage.getItem('userEmail') || '',
        password: AsyncStorage.getItem('userPwd') || '',
        token: '',
        full_name: '',
        user_email: '',
    });
    const [newUser, setNewUser] = useState({
        fullName: '',
        mail: '',
        password: '',
        rPassword: '',
        appTerms: false,
    });
    const [changePassword, setChangePassword] = useState({
        oldPwd: '',
        newPwd: '',
        reNewPwd: '',
    });
    const getData = useCallback(async () => {
        const result = await AsyncStorage.getItem('userEmail');
        if (result !== null) {
            setIsLocalData(true);
        } else {
            setIsLocalData(false);
        }
        console.log(result);
    }, []);
    useEffect(() => {
        getData();
    }, [getData, isLocalData]);
    // Funcion para limpiar los campos del login
    const clearLoginFields = () => {
        updStateData(setUserData, '', 'mail');
        updStateData(setUserData, '', 'password');
    };
    // Funcion para limpiar los campos del login
    const clearRegisterFields = () => {
        updStateData(setNewUser, '', 'fullName');
        updStateData(setNewUser, '', 'mail');
        updStateData(setNewUser, '', 'password');
        updStateData(setNewUser, '', 'rPassword');
        updStateData(setNewUser, false, 'appTerms');
    };
    // Funcion para borrar los campos de la clave
    const clearPwdFields = () => {
        updStateData(setChangePassword, '', 'oldPwd');
        updStateData(setChangePassword, '', 'newPwd');
        updStateData(setChangePassword, '', 'reNewPwd');
    };
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
        value: any,
        fieldName: string,
    ) => {
        setState((prevState: any) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };
    // Funcion para hacer login en la app
    const userLogin = () => {
        setIndicatorVisible(true);
        axios({
            method: 'post',
            url: `${URL}/users/signin`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                // mail: userData.mail,
                // password: userData.password,
                mail: 'breidydl@gmail.com',
                password: '111111112',
            },
            timeout: 2000,
        })
            .then((res: any) => {
                clearLoginFields();
                updStateData(setUserData, res.data.acces_token, 'token');
                updStateData(setUserData, res.data.full_name, 'full_name');
                updStateData(setUserData, res.data.user_email, 'user_email');
                setIndicatorVisible(false);
            })
            .catch((err: any) => {
                // Toast.show({
                //     type: 'error',
                //     visibilityTime: 1200,
                //     text1:
                //         err.response?.status === 401
                //             ? 'Credenciales Inválidas'
                //             : err.message,
                // });
                // setIndicatorVisible(false);
                updStateData(setUserData, 'acces_token', 'token');
                updStateData(setUserData, 'full_name', 'full_name');
                updStateData(setUserData, err.message, 'user_email');
                setIndicatorVisible(false);
            });
    };
    // Funcion para registrar un nuevo usuario
    const registerNewUser = () => {
        setIndicatorVisible(true);
        axios({
            method: 'post',
            url: `${URL}/users/createUser`,
            data: {
                mail: newUser.mail,
                password: newUser.password,
                full_name: newUser.fullName,
                user_icon_name: '',
            },
        })
            .then(res => {
                clearRegisterFields();
                setIndicatorVisible(false);
                updStateData(setUserData, res.data.acces_token, 'token');
            })
            .catch(() => {
                setIndicatorVisible(false);
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
    // Funcion para cambiar la clave
    const validatePassword = () => {
        return new Promise(resolve => {
            const { newPwd, reNewPwd } = changePassword;
            if (newPwd.length < 8) {
                return;
            }
            if (newPwd !== reNewPwd) {
                return;
            }
            resolve('ok');
        });
    };
    const changePwd = () => {
        axios({
            method: 'patch',
            url: `${URL}/users/change-password`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            data: {
                oldPassword: changePassword.oldPwd,
                newPassword: changePassword.newPwd,
            },
        })
            .then(() => {
                clearPwdFields();
                showToastAlert('success', 'Nice, la contraseña se ha cambiado');
            })
            .catch(() => {
                clearPwdFields();
                showToastAlert(
                    'error',
                    'Oh no! la contrasena antigua no coincide',
                );
            });
    };
    // Funcion para cambiar la clave desde fuera
    const reqChangePassword = (mail: any) => {
        return new Promise((resolve, reject) => {
            setIndicatorVisible(true);
            axios({
                method: 'patch',
                url: `${URL}/users/req-reset-password`,
                data: {
                    email: mail.reqEmail,
                },
            })
                .then(res => {
                    resolve(res);
                    Toast.show({
                        type: 'success',
                        visibilityTime: 1200,
                        text1: 'Correo enviado',
                    });
                    setIndicatorVisible(false);
                })
                .catch(err => {
                    reject(err);
                    setIndicatorVisible(false);
                });
        });
    };
    // Funcion para editar los datos del usuario
    const editUserName = (id: string, newName: string) => {
        axios({
            method: 'patch',
            url: `${URL}/users/${id}`,
            data: {
                full_name: newName,
            },
        })
            .then(() => updStateData(setUserData, newName, 'full_name'))
            .catch(err => console.log(err));
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
                resetSlider,
                setResetSlider,
                setChangePassword,
                validatePassword,
                changePassword,
                clearPwdFields,
                reqChangePassword,
                changePwd,
                editUserName,
                indicatorVisible,
                useBiometrics,
                setUseBiometrics,
                isLocalData,
                setIsLocalData,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
