import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'; // Assuming Toast is still used for showToastAlert
import { showToastAlert } from '../utils/toast'; // Assuming showToastAlert is still needed
import { clearFields } from '../utils/clearFields'; // May or may not be needed

interface props {
    children: JSX.Element;
}

const BIOMETRIC_ENABLED_KEY = '@app_biometric_enabled_flag';

// generateId might not be needed if no user-specific data is generated locally anymore
// const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

export const UserContext = createContext({});

const UserProvider = ({ children }: props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [resetSlider, setResetSlider] = useState(false); // Kept if UI related and independent
    const [isBiometricProtectionEnabled, setIsBiometricProtectionEnabled] = useState(false);

    // Load biometric flag on mount
    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            try {
                const flagJson = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY);
                if (flagJson !== null) {
                    setIsBiometricProtectionEnabled(JSON.parse(flagJson));
                }
            } catch (e) {
                console.error("Failed to load biometric flag", e);
                showToastAlert('error', 'Failed to load biometric setting');
                // Keep default false on error
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, []);

    // Function to toggle biometric protection
    const toggleBiometricProtection = async () => {
        setIsLoading(true);
        const newState = !isBiometricProtectionEnabled;
        try {
            await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, JSON.stringify(newState));
            setIsBiometricProtectionEnabled(newState);
            showToastAlert('success', `Biometric protection ${newState ? 'enabled' : 'disabled'}`);
        } catch (e) {
            console.error("Failed to toggle biometric protection", e);
            showToastAlert('error', 'Failed to update biometric setting');
        } finally {
            setIsLoading(false);
        }
    };
    
    // old changePassword state, related to old auth, keeping it commented if other parts of app might use it
    // but ideally should be removed if not used.
    // const [changePassword, setChangePassword] = useState({
    //     oldPwd: '',
    //     newPwd: '',
    //     reNewPwd: '',
    // });


    // clearFields might still be useful for other forms, so keeping it in context if used elsewhere.
    // If not, it can be removed from context value too.
    // For now, assuming showToastAlert and Toast are still used.

    return (
        <UserContext.Provider
            value={{
                Toast, // If still used globally via context
                isLoading,
                showToastAlert, // If still used globally via context
                resetSlider,
                setResetSlider,
                isBiometricProtectionEnabled,
                toggleBiometricProtection,
                // clearFields, // Expose if needed by other parts of the app that use forms
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
