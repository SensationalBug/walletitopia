import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';

interface props {
    children: JSX.Element;
}

interface NewGastoData { // Renamed from 'types' for clarity
    id_cuenta: string;
    tipo_gasto: number; // 0 for expense, 1 for income (assuming)
    id_categoria: string;
    concepto: string;
    monto: string; // Input is string, will be parsed to number
    fecha_de_creacion?: string; // Made optional as it can be set on save
}

// AsyncStorage key
const GASTOS_STORAGE_KEY = '@app_gastos_data';

// ID Generator
const generateId = () => `gasto_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

export const GastosContext = createContext({});

const GastosProvider = ({ children }: props) => {
    const { showToastAlert }: any = useContext(UserContext); // Removed userData as it's not used for local storage auth
    const [gastos, setGastos] = useState<any[]>([]); // Holds gastos for the currently viewed account
    const [isLoading, setIsLoading] = useState(false);
    const [newGasto, setNewGasto] = useState<NewGastoData>({
        id_cuenta: '',
        tipo_gasto: 0,
        id_categoria: '',
        concepto: '',
        monto: '',
        // fecha_de_creacion is not set here, will default to new Date().toISOString() if not provided
    });

    // Funcion para limpiar los newGastos
    const clearNewGastos = () => {
        setNewGasto({
            id_cuenta: '',
            tipo_gasto: 0,
            id_categoria: '',
            concepto: '',
            monto: '',
            // fecha_de_creacion: '', // Resetting if needed, or let it be undefined
        });
    };

    // Funcion para obtener los gastos por cuenta
    const getGastosByAccountId = async (
        id_cuenta: string,
        navigation?: any, // Optional navigation parameters
        screen?: string,
    ) => {
        setIsLoading(true);
        try {
            const gastosJson = await AsyncStorage.getItem(GASTOS_STORAGE_KEY);
            const allGastos = gastosJson ? JSON.parse(gastosJson) : [];
            const accountGastos = allGastos.filter((g: any) => g.id_cuenta === id_cuenta);
            setGastos(accountGastos);
            if (navigation && screen) {
                navigation.navigate(screen, { accountId: id_cuenta, updatedGastos: accountGastos }); // Pass filtered data
            }
        } catch (e) {
            console.error("Failed to load expenses by account", e);
            setGastos([]);
            showToastAlert('error', 'Failed to load expenses');
            if (navigation && screen) {
                 // Navigate even on error, perhaps with empty data or an error flag
                navigation.navigate(screen, { accountId: id_cuenta, updatedGastos: [] });
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Funcion para agregar un gasto (called by validateAddGasto)
    const addGastoInternal = async () => {
        setIsLoading(true);
        try {
            const allGastosJson = await AsyncStorage.getItem(GASTOS_STORAGE_KEY);
            let allGastos = allGastosJson ? JSON.parse(allGastosJson) : [];
            
            const gastoToAdd = {
                id: generateId(), // Unique ID for the expense itself
                id_cuenta: newGasto.id_cuenta,
                tipo_gasto: newGasto.tipo_gasto,
                id_categoria: newGasto.id_categoria,
                concepto: newGasto.concepto,
                monto: parseInt(newGasto.monto, 10), // Ensure monto is a number
                fecha_de_creacion: newGasto.fecha_de_creacion || new Date().toISOString(),
            };

            allGastos.push(gastoToAdd);
            await AsyncStorage.setItem(GASTOS_STORAGE_KEY, JSON.stringify(allGastos));
            
            clearNewGastos();
            showToastAlert('success', 'Gasto agregado');
            // Optionally, refresh the view if currently on an account details page
            if (newGasto.id_cuenta) {
                 getGastosByAccountId(newGasto.id_cuenta); // Refresh for current account
            }
        } catch (e) {
            console.error("Failed to add expense", e);
            showToastAlert('error', 'Failed to add expense');
            // clearNewGastos(); // Keep fields for correction or clear as preferred
        } finally {
            setIsLoading(false);
        }
    };

    // Funcion para validar los campos al agregar un gasto
    const validateAddGasto = async () => { // Made async
        const { concepto, monto, id_categoria, id_cuenta } = newGasto;
        if (!concepto || !monto || !id_categoria || !id_cuenta) { // Added id_cuenta check
            showToastAlert('error', 'Complete todos los campos, incluyendo la cuenta');
            return;
        }
        await addGastoInternal(); // Call the internal async function
    };

    // Funcion para borrar gasto
    const deleteGasto = async (id_gasto: string, id_cuenta: string) => {
        setIsLoading(true);
        try {
            const allGastosJson = await AsyncStorage.getItem(GASTOS_STORAGE_KEY);
            let allGastos = allGastosJson ? JSON.parse(allGastosJson) : [];
            const updatedGastos = allGastos.filter((g: any) => g.id !== id_gasto);
            
            await AsyncStorage.setItem(GASTOS_STORAGE_KEY, JSON.stringify(updatedGastos));
            showToastAlert('success', 'Gasto eliminado');
            // Refresh the list for the given account
            await getGastosByAccountId(id_cuenta); // Removed navigation params as it might not be available here directly
        } catch (e) {
            console.error("Failed to delete expense", e);
            showToastAlert('error', 'Failed to delete expense');
        } finally {
            setIsLoading(false);
        }
    };

    // Funcion para editar un gasto
    const editGastoById = async (
        id: string, // This is gasto.id
        concepto: string,
        monto: number,
        id_categoria: string,
        id_cuenta: string, // Account ID to refresh gastos list after edit
    ) => {
        setIsLoading(true);
        try {
            const allGastosJson = await AsyncStorage.getItem(GASTOS_STORAGE_KEY);
            let allGastos = allGastosJson ? JSON.parse(allGastosJson) : [];
            const gastoIndex = allGastos.findIndex((g: any) => g.id === id);

            if (gastoIndex !== -1) {
                // Update the specific gasto
                allGastos[gastoIndex] = {
                    ...allGastos[gastoIndex], // Preserve other fields like id, id_cuenta, tipo_gasto, fecha_de_creacion
                    concepto,
                    monto,
                    id_categoria,
                };
                await AsyncStorage.setItem(GASTOS_STORAGE_KEY, JSON.stringify(allGastos));
                showToastAlert('success', 'Gasto actualizado');
                // Refresh the list for the given account
                await getGastosByAccountId(id_cuenta); // Removed navigation params
            } else {
                showToastAlert('error', 'Gasto no encontrado para editar');
            }
        } catch (e) {
            console.error("Failed to edit expense", e);
            showToastAlert('error', 'Failed to edit expense');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GastosContext.Provider
            value={{
                gastos, // List of gastos for the current account
                setNewGasto, // To update the newGasto state from input forms
                newGasto, // The current newGasto state (added for completeness if needed by consumers)
                getGastosByAccountId,
                validateAddGasto, // This now calls the internal addGastoInternal
                clearNewGastos,
                deleteGasto,
                editGastoById,
                isLoading, // Loading state for UI feedback
            }}>
            {children}
        </GastosContext.Provider>
    );
};

export default GastosProvider;
