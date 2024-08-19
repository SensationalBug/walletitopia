import Toast from 'react-native-toast-message';
import React, { createContext, useEffect, useState } from 'react';
import { showToastAlert } from '../utils/toast';

interface props {
    children: JSX.Element;
}

export const UserContext = createContext({});
const UserProvider = ({ children }: props) => {
    const [resetSlider, setResetSlider] = useState(false);
    const [useBiometrics, setUseBiometrics] = useState(false);
    const [isLocalData, setIsLocalData] = useState(false);

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

    return (
        <UserContext.Provider
            value={{
                Toast,
                showToastAlert,
                resetSlider,
                setResetSlider,
                useBiometrics,
                setUseBiometrics,
                isLocalData,
                setIsLocalData,
                updStateData,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
