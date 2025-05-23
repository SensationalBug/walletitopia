import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext'; // Assuming showToastAlert and updStateData are still from here

interface props {
    children: JSX.Element;
}

// Helper function for generating unique IDs
const generateId = () => `acc_id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

// AsyncStorage key
const ACCOUNTS_STORAGE_KEY = '@app_accounts_data';

export const AccountContext = createContext({});

const AccountProvider = ({ children }: props) => {
    // Removed 'data' from UserContext as token is no longer needed for API calls
    const { showToastAlert, updStateData }: any = useContext(UserContext); 
    const [accounts, setAccounts] = useState<any[]>([]); // Explicitly type if possible
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const [newAccountData, setNewAccountData] = useState({
        accountType: '',
        accountName: '',
        accountAmount: '', // Keep as string for input, parse on save
    });
    const [accountToEditData, setAccountToEditData] = useState({
        accountId: '',
        accountType: '',
        accountEditName: '',
        accountEditAmount: '', // Keep as string for input, parse on save
    });

    // clearFields remains the same as it's a local utility
    const clearFields = (
        setFunction: any,
        Type: string,
        Name: string,
        Amount: string,
    ) => {
        updStateData(setFunction, '', Type);
        updStateData(setFunction, '', Name);
        updStateData(setFunction, '', Amount); // Reset to empty string for input
    };
    
    // accountIcon remains the same
    const accountIcon = (icon: string): any => {
        switch (icon) {
            case 'Efectivo': return 'dollar';
            case 'Cuenta corriente': return 'bank';
            case 'Cuenta de ahorros': return 'money';
            case 'Tarjeta de crédito': return 'credit-card';
            default: return 'question-circle'; // Default icon
        }
    };

    // formatter remains the same
    const formatter = new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP',
    });

    // Funcion para obtener todas las cuentas
    const getAccounts = useCallback(async () => {
        setIsLoading(true);
        try {
            const accountsJson = await AsyncStorage.getItem(ACCOUNTS_STORAGE_KEY);
            setAccounts(accountsJson ? JSON.parse(accountsJson) : []);
        } catch (error) {
            console.error("Failed to load accounts from storage", error);
            setAccounts([]);
            showToastAlert('error', 'Error al cargar las cuentas');
        } finally {
            setIsLoading(false);
        }
    }, [showToastAlert]); // Added showToastAlert as a dependency if it's used inside

    // Funcion para añadir cuentas (internal, called by validateAddAccount)
    const addAccountInternal = async () => {
        setIsLoading(true);
        try {
            const currentAccountsJson = await AsyncStorage.getItem(ACCOUNTS_STORAGE_KEY);
            let currentAccounts = currentAccountsJson ? JSON.parse(currentAccountsJson) : [];
            
            const accountToAdd = {
                id: generateId(), // Generate unique ID
                acc_name: newAccountData.accountName,
                monto_inicial: parseFloat(String(newAccountData.accountAmount)) || 0,
                tipo_de_cuenta: newAccountData.accountType,
                fecha_de_creacion: new Date().toISOString(), // Use current ISO date string
            };
            
            currentAccounts.push(accountToAdd);
            await AsyncStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(currentAccounts));
            
            await getAccounts(); // Refresh state from storage
            clearFields(
                setNewAccountData,
                'accountType',
                'accountName',
                'accountAmount',
            );
            showToastAlert('success', 'Cuenta agregada');
        } catch (error) {
            console.error("Failed to add account", error);
            showToastAlert('error', 'Error al agregar la cuenta');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Funcion para validar los campos antes de agregar la cuenta
    const validateAddAccount = async () => { // Made async
        const { accountName, accountAmount, accountType } = newAccountData;
        if (!accountName || !accountAmount || !accountType) {
            showToastAlert('error', 'Completar todos los campos');
            return;
        }
        // Basic amount validation (optional, can be more complex)
        if (isNaN(parseFloat(String(accountAmount))) || parseFloat(String(accountAmount)) < 0) {
            showToastAlert('error', 'Monto inválido');
            return;
        }
        await addAccountInternal(); // Await the async internal function
    };

    // Funcion para borrar cuentas
    const deleteAccount = async (id: string) => {
        setIsLoading(true);
        try {
            const currentAccountsJson = await AsyncStorage.getItem(ACCOUNTS_STORAGE_KEY);
            let currentAccounts = currentAccountsJson ? JSON.parse(currentAccountsJson) : [];
            const updatedAccounts = currentAccounts.filter((acc: any) => acc.id !== id);
            
            await AsyncStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updatedAccounts));
            
            await getAccounts(); // Refresh state
            showToastAlert('success', 'Cuenta eliminada');
        } catch (error) {
            console.error("Failed to delete account", error);
            showToastAlert('error', 'Error al eliminar la cuenta');
        } finally {
            setIsLoading(false);
        }
    };

    // Funcion para editar cuentas
    const editAccount = async () => {
        setIsLoading(true);
        const { accountId, accountType, accountEditName, accountEditAmount } = accountToEditData;

        if (!accountEditName || !accountEditAmount || !accountType || !accountId) {
             showToastAlert('error', 'Completar todos los campos para editar.');
             setIsLoading(false);
             return;
        }
        if (isNaN(parseFloat(String(accountEditAmount))) || parseFloat(String(accountEditAmount)) < 0) {
            showToastAlert('error', 'Monto inválido para editar');
            setIsLoading(false);
            return;
        }

        try {
            const currentAccountsJson = await AsyncStorage.getItem(ACCOUNTS_STORAGE_KEY);
            let currentAccounts = currentAccountsJson ? JSON.parse(currentAccountsJson) : [];
            const accountIndex = currentAccounts.findIndex((acc: any) => acc.id === accountId);

            if (accountIndex !== -1) {
                const updatedAccount = {
                    ...currentAccounts[accountIndex],
                    acc_name: accountEditName,
                    monto_inicial: parseFloat(String(accountEditAmount)) || 0,
                    tipo_de_cuenta: accountType,
                    // fecha_de_modificacion: new Date().toISOString(), // Optionally add modification date
                };
                currentAccounts[accountIndex] = updatedAccount;
                await AsyncStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(currentAccounts));
                
                await getAccounts(); // Refresh state
                clearFields(
                    setAccountToEditData,
                    'accountType',
                    'accountEditName',
                    'accountEditAmount',
                );
                 // Also clear accountId from edit form state
                updStateData(setAccountToEditData, '', 'accountId');
                showToastAlert('success', 'Cuenta editada');
            } else {
                showToastAlert('error', 'Cuenta no encontrada para editar');
            }
        } catch (error) {
            console.error("Failed to edit account", error);
            showToastAlert('error', 'Error al editar la cuenta');
        } finally {
            setIsLoading(false);
        }
    };

    // UseEffect que trae todas las cuentas al abrir la app
    useEffect(() => {
        getAccounts();
    }, [getAccounts]); // getAccounts is memoized with useCallback

    return (
        <AccountContext.Provider
            value={{
                accounts,
                getAccounts, // async
                newAccountData, // Added to allow controlled inputs
                setNewAccountData,
                validateAddAccount, // async
                formatter,
                deleteAccount, // async
                editAccount, // async
                accountToEditData, // Added to allow controlled inputs
                setAccountToEditData,
                accountIcon,
                isLoading, // Added isLoading
            }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
