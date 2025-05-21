// import axios from 'axios'; // Removed axios
import Toast from 'react-native-toast-message';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAxios } from '../customHooks/useAxios'; // Removed useAxios
import { showToastAlert } from '../utils/toast';
import { clearFields } from '../utils/clearFields';

interface props {
    children: JSX.Element;
}

const USERS_STORAGE_KEY = '@app_users_data'; // More specific key
const SESSION_STORAGE_KEY = '@app_session_data';

const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

export const UserContext = createContext({});
const UserProvider = ({ children }: props) => {
    const [currentUser, setCurrentUser] = useState<any>(null); // State for logged in user
    const [isLoading, setIsLoading] = useState(false); // Local loading state
    const [resetSlider, setResetSlider] = useState(false);
    const [useBiometrics, setUseBiometrics] = useState(false);
    const [isLocalData, setIsLocalData] = useState(false); // To track if session data is loaded

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

    // Load session on component mount
    useEffect(() => {
        const loadSession = async () => {
            setIsLoading(true);
            try {
                const sessionJson = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
                if (sessionJson) {
                    const sessionUser = JSON.parse(sessionJson);
                    setCurrentUser(sessionUser);
                    setIsLocalData(true);
                } else {
                    setIsLocalData(false);
                }
            } catch (e) {
                console.error("Failed to load session", e);
                showToastAlert('error', 'Failed to load session');
                setIsLocalData(false);
            } finally {
                setIsLoading(false);
            }
        };
        loadSession();
    }, []);

    // Funcion para hacer login en la app
    const userLogin = async (userNameOrEmail: string, password: string) => {
        setIsLoading(true);
        try {
            const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            const users = usersJson ? JSON.parse(usersJson) : [];
            const foundUser = users.find(
                (u: any) =>
                    (u.userName === userNameOrEmail || u.email === userNameOrEmail) &&
                    u.password === password,
            );

            if (foundUser) {
                await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(foundUser));
                setCurrentUser(foundUser);
                setIsLocalData(true); // User session is now loaded
                showToastAlert('success', 'Login successful');
                return foundUser;
            } else {
                showToastAlert('error', 'Invalid credentials');
                return null;
            }
        } catch (e) {
            console.error("Login error", e);
            showToastAlert('error', 'Login failed');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Funcion para registrar un nuevo usuario
    const registerNewUser = async () => {
        // Validation is handled by userSignup, so proceed with registration
        setIsLoading(true);
        try {
            const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            let users = usersJson ? JSON.parse(usersJson) : [];

            if (users.find((u: any) => u.userName === newUser.userName || u.email === newUser.email)) {
                showToastAlert('error', 'Username or email already exists');
                setIsLoading(false);
                return;
            }

            const userToSave = {
                id: generateId(),
                full_name: newUser.full_name,
                userName: newUser.userName,
                email: newUser.email,
                password: newUser.password, // Storing password directly
                user_icon_name: 'user',
            };

            users.push(userToSave);
            await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

            // Automatically log in the new user
            await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userToSave));
            setCurrentUser(userToSave);
            setIsLocalData(true); // User session is now loaded

            clearFields(setNewUser, [
                'full_name',
                'userName',
                'password',
                'passwordConfirm',
                'email',
                'appTerms',
            ]);
            showToastAlert('success', 'User registered successfully');
        } catch (e) {
            console.error("Registration error", e);
            showToastAlert('error', 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Funcion que valida los campos antes de registrar
    const userSignup = () => {
        const { full_name, userName, email, password, passwordConfirm, appTerms } = newUser;
        if (!full_name || !email || !userName) {
            showToastAlert('error', 'Completar todos los campos');
            return;
        }
        if (!password || !passwordConfirm) {
            showToastAlert('error', 'Favor completar las contraseñas');
            return;
        }
        if (password.length < 8) {
            showToastAlert('error', 'La contraseña debe tener al menos 8 caracteres');
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
    const userLogout = async (navigation: any, screen: string) => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
            setCurrentUser(null);
            setIsLocalData(false); // User session is cleared
            if (navigation && screen) {
                navigation.navigate(screen);
            }
            showToastAlert('success', 'Logout successful');
        } catch (e) {
            console.error("Logout error", e);
            showToastAlert('error', 'Logout failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Funcion para validar la clave antes de cambiarla (UI validation)
    const validatePassword = () => {
        return new Promise<void>((resolve, reject) => { // Explicitly typed Promise
            const { oldPwd, newPwd, reNewPwd } = changePassword;
            if (!oldPwd || !newPwd || !reNewPwd) {
                showToastAlert('error', 'Completar todos los campos de contraseña');
                reject('Missing fields');
                return;
            }
            if (newPwd.length < 8) {
                showToastAlert('error', 'La nueva contraseña debe tener al menos 8 caracteres');
                reject('Password too short');
                return;
            }
            if (newPwd !== reNewPwd) {
                showToastAlert('error', 'Las nuevas contraseñas no coinciden');
                reject('Passwords do not match');
                return;
            }
            resolve(); // Resolve with void
        });
    };

    // Funcion para cambiar la clave
    const changePwd = async () => {
        if (!currentUser) {
            showToastAlert('error', 'No user logged in');
            return;
        }
        // First validate passwords with the validatePassword function for UI feedback
        try {
            await validatePassword(); // This will show toasts for basic errors
        } catch (error) {
            // Validation failed, toast already shown by validatePassword or handled there
            return;
        }

        setIsLoading(true);
        try {
            const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            let users = usersJson ? JSON.parse(usersJson) : [];
            const userIndex = users.findIndex((u: any) => u.id === currentUser.id);

            if (userIndex === -1) {
                showToastAlert('error', 'User not found');
                setIsLoading(false);
                return;
            }
            
            if (users[userIndex].password !== changePassword.oldPwd) {
                showToastAlert('error', 'La contraseña antigua no coincide');
                setIsLoading(false);
                return;
            }

            users[userIndex].password = changePassword.newPwd;
            await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

            // Update current user session (password changed)
            const updatedUser = { ...users[userIndex] };
            await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);

            clearFields(setChangePassword, ['oldPwd', 'newPwd', 'reNewPwd']);
            showToastAlert('success', 'Contraseña cambiada exitosamente');
        } catch (e) {
            console.error("Change password error", e);
            showToastAlert('error', 'Error al cambiar la contraseña');
        } finally {
            setIsLoading(false);
        }
    };

    // Funcion para cambiar la clave desde fuera (Mocked)
    const reqChangePassword = (mail: any) => {
        console.log('reqChangePassword called with:', mail);
        showToastAlert(
            'info',
            'Funcionalidad no disponible en modo local.',
            // 'Password reset instructions would be sent here if connected to a server.',
        );
        return Promise.resolve('ok'); // Keep promise structure if called
    };

    // Funcion para editar los datos del usuario
    const editUserName = async (newName: string) => {
        if (!currentUser) {
            showToastAlert('error', 'No user logged in');
            return;
        }
        if (!newName.trim()) {
            showToastAlert('error', 'El nombre no puede estar vacío');
            return;
        }
        setIsLoading(true);
        try {
            const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            let users = usersJson ? JSON.parse(usersJson) : [];
            const userIndex = users.findIndex((u: any) => u.id === currentUser.id);

            if (userIndex === -1) {
                showToastAlert('error', 'User not found');
                // setIsLoading(false); // Already in finally block
                return;
            }

            users[userIndex].full_name = newName;
            await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

            const updatedUser = { ...users[userIndex] };
            await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);

            showToastAlert('success', 'Nombre de usuario actualizado');
        } catch (e) {
            console.error("Edit username error", e);
            showToastAlert('error', 'Error al actualizar el nombre');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider
            value={{
                Toast, // Toast object
                newUser, // State for new user form
                setNewUser, // Setter for new user form
                userLogin, // Login function
                userSignup, // Signup function (validation + registration)
                userLogout, // Logout function
                currentUser, // Current logged-in user object
                isLoading, // Loading state indicator
                showToastAlert, // Utility to show toasts
                resetSlider, // State for slider reset
                setResetSlider, // Setter for slider reset state
                changePassword, // State for change password form fields
                setChangePassword, // Setter for change password form
                validatePassword, // Function to validate password fields (UI checks)
                changePwd, // Function to execute password change
                reqChangePassword, // Function for requesting password change (mocked)
                editUserName, // Function to edit username
                useBiometrics, // State for biometrics usage
                setUseBiometrics, // Setter for biometrics state
                isLocalData, // Flag indicating if local data/session was loaded
                setIsLocalData, // Setter for isLocalData (if needed by consumers)
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
