// import axios from 'axios';
import Toast from 'react-native-toast-message';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAxios } from '../customHooks/useAxios';
import { showToastAlert } from '../utils/toast';
import { clearFields } from '../utils/clearFields';

interface props {
    children: JSX.Element;
}

export const UserContext = createContext({});
const UserProvider = ({ children }: props) => {
    const { data, /*error,*/ loading, executeAxios } = useAxios();
    const [resetSlider, setResetSlider] = useState(false);
    const [useBiometrics, setUseBiometrics] = useState(false);
    const [isLocalData, setIsLocalData] = useState(false);
    const [newUser, setNewUser] = useState({
        full_name: '',
        userName: '',
        email: '',
        password: '',
        passwordConfirm: '',
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

    // Funcion para hacer login en la app
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userLogin = (userNameOrEmail: string, password: string) => {
        return new Promise(async resolve => {
            await executeAxios(
                '/auth/login',
                'POST',
                {
                    // userNameOrEmail: userNameOrEmail,
                    // password: password,
                    userNameOrEmail: 'pedro',
                    password: '11111111',
                },
                'Credenciales Inválidas',
            );
            resolve('ok');
        });
    };

    // Funcion para registrar un nuevo usuario
    const registerNewUser = async () => {
        await executeAxios(
            '/app-user',
            'POST',
            {
                full_name: newUser.full_name,
                user_icon_name: 'user',
                userName: newUser.userName,
                password: newUser.password,
                passwordConfirm: newUser.passwordConfirm,
                email: newUser.email,
            },
            'Completa los campos',
            'Usuario Creado',
        ).then((res: any) => {
            clearFields(setNewUser, [
                'full_name',
                'userName',
                'password',
                'passwordConfirm',
                'email',
            ]);
            userLogin(res.userName, res.password);
        });
    };

    // Funcion que valida los campos antes de registrar
    const userSignup = () => {
        const { full_name, email, password, passwordConfirm, appTerms } =
            newUser;
        if (!full_name || !email) {
            showToastAlert('error', 'Completar todos los campos');
            return;
        }
        if (!password || !passwordConfirm) {
            showToastAlert('error', 'Favor completar las contraseñas');
            return;
        }
        if (password !== passwordConfirm) {
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
        // axios({
        //     method: 'patch',
        //     url: `${URL}/users/change-password`,
        //     headers: {
        //         Authorization: `Bearer ${userData.token}`,
        //     },
        //     data: {
        //         oldPassword: changePassword.oldPwd,
        //         newPassword: changePassword.newPwd,
        //     },
        // })
        //     .then(() => {
        //         clearPwdFields();
        //         showToastAlert('success', 'Nice, la contraseña se ha cambiado');
        //     })
        //     .catch(() => {
        //         clearPwdFields();
        //         showToastAlert(
        //             'error',
        //             'Oh no! la contrasena antigua no coincide',
        //         );
        //     });
    };

    // Funcion para cambiar la clave desde fuera
    const reqChangePassword = (mail: any) => {
        return new Promise(async (resolve: any) => {
            await executeAxios(
                '/users/req-reset-password',
                'PATCH',
                {
                    email: mail.reqEmail,
                },
                'Credenciales Inválidas',
                'Correo enviado',
            );
            resolve('ok');
            // axios({
            //     method: 'patch',
            //     url: `${URL}/users/req-reset-password`,
            //     data: {
            //         email: mail.reqEmail,
            //     },
            // })
            //     .then(res => {
            //         resolve(res);
            //         Toast.show({
            //             type: 'success',
            //             visibilityTime: 1200,
            //             text1: 'Correo enviado',
            //         });
            //         setIndicatorVisible(false);
            //     })
            //     .catch(err => {
            //         reject(err);
            //         setIndicatorVisible(false);
            //     });
        });
    };

    // Funcion para editar los datos del usuario
    // const editUserName = (id: string, newName: string) => {
    //     // axios({
    //     //     method: 'patch',
    //     //     url: `${URL}/users/${id}`,
    //     //     data: {
    //     //         full_name: newName,
    //     //     },
    //     // })
    //     //     .then(() => updStateData(setUserData, newName, 'full_name'))
    //     //     .catch(err => console.log(err));
    // };

    return (
        <UserContext.Provider
            value={{
                Toast,
                newUser,
                userLogin,
                userSignup,
                userLogout,
                setNewUser,
                showToastAlert,
                resetSlider,
                setResetSlider,
                setChangePassword,
                validatePassword,
                changePassword,
                reqChangePassword,
                changePwd,
                // editUserName,
                useBiometrics,
                setUseBiometrics,
                isLocalData,
                setIsLocalData,
                data,
                loading,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
