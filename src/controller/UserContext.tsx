import axios from 'axios';
import URL from '../../URL';
import Toast from 'react-native-toast-message';
import React, { createContext, useState } from 'react';

interface props {
    children: JSX.Element;
}

export const UserContext = createContext({});
const UserProvider = ({ children }: props) => {
    const [resetSlider, setResetSlider] = useState(false);
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
    const [changePassword, setChangePassword] = useState({
        oldPwd: '',
        newPwd: '',
        reNewPwd: '',
    });
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
                password: '2',
            },
        })
            .then(res =>
                updStateData(setUserData, res.data.acces_token, 'token'),
            )
            .catch(() => {
                Toast.show({
                    type: 'error',
                    visibilityTime: 1200,
                    text1: 'Credenciales invalidas',
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
    // Funcion para cambiar la clave
    const validatePassword = () => {
        const { oldPwd, newPwd, reNewPwd } = changePassword;
        if (!oldPwd || !newPwd || !reNewPwd) {
            console.log('Complete todos los campos');
            return;
        }
        if (newPwd !== reNewPwd) {
            console.log('Las contraseñas no son iguales');
            return;
        }
        changePwd();
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
            .then(() => clearPwdFields())
            .catch(err => console.log(err.response.data.message));
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
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
