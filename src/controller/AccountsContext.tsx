import axios from 'axios';
import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react';
import URL from '../../URL';
import { UserContext } from './UserContext';

interface props {
    children: JSX.Element;
}

// Funcion que trae la Hora
const creationDate = () => {
    const date = new Date();
    return date;
};

export const AccountContext = createContext({});

const AccountProvider = ({ children }: props) => {
    const { userData, showToastAlert, updStateData }: any =
        useContext(UserContext);
    const [accounts, setAccounts] = useState([]);
    const [newAccountData, setNewAccountData] = useState({
        accountType: '',
        accountName: '',
        accountAmount: 0,
    });
    const [accountToEditData, setAccountToEditData] = useState({
        accountId: '',
        accountType: '',
        accountEditName: '',
        accountEditAmount: 0,
    });
    const clearFields = (
        setFunction: any,
        Type: string,
        Name: string,
        Amount: string,
    ) => {
        updStateData(setFunction, '', Type);
        updStateData(setFunction, '', Name);
        updStateData(setFunction, 0, Amount);
    };
    // Funcion que retorna el icono de la cuenta correspondiente
    const accountIcon = (icon: string): any => {
        switch (icon) {
            case 'Efectivo':
                return 'dollar';
            case 'Cuenta corriente':
                return 'bank';
            case 'Cuenta de ahorros':
                return 'money';
            case 'Tarjeta de crédito':
                return 'credit-card';
        }
    };
    // Funcion para formatear el dinero
    const formatter = new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP',
    });
    // Funcion para obtener todas las cuentas
    const getAccounts = useCallback(() => {
        axios({
            method: 'get',
            url: `${URL}/cuentas`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(res => setAccounts(res.data))
            .catch(() => setAccounts([]));
    }, [userData.token]);
    // Funcion para añadir cuentas
    const addAccount = () => {
        const { accountName, accountAmount, accountType } = newAccountData;
        axios({
            method: 'post',
            url: `${URL}/cuentas`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            data: {
                acc_name: accountName,
                monto_inicial: accountAmount,
                tipo_de_cuenta: accountType,
                fecha_de_creacion: creationDate(),
            },
        })
            .then(() => {
                getAccounts();
                clearFields(
                    setNewAccountData,
                    'accountType',
                    'accountName',
                    'accountAmount',
                );
                showToastAlert('success', 'Cuenta agregada');
            })
            .catch(err => console.log(err));
    };
    // Funcion para validar los campos antes de agregar la cuenta
    const validateAddAccount = () => {
        return new Promise(resolve => {
            const { accountName, accountAmount, accountType } = newAccountData;
            if (!accountName || !accountAmount || !accountType) {
                showToastAlert('error', 'Completar todos los campos');
                return;
            }
            addAccount();
            resolve('ok');
        });
    };
    // Funcion para borrar cuentas
    const deleteAccount = (id: string) => {
        axios({
            method: 'delete',
            url: `${URL}/cuentas/${id}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(() => {
                getAccounts();
                showToastAlert('success', 'Cuenta eliminada');
            })
            .catch(err => console.log(err));
    };
    // Funcion para editar cuentas
    const editAccount = () => {
        const {
            accountId,
            accountType,
            accountEditName,
            accountEditAmount,
        }: any = accountToEditData;
        axios({
            method: 'patch',
            url: `${URL}/cuentas/${accountId}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            data: {
                acc_name: accountEditName,
                monto_inicial: accountEditAmount,
                tipo_de_cuenta: accountType,
                fecha_de_creacion: creationDate(),
            },
        })
            .then(() => {
                if (accountType || accountEditName || accountEditAmount) {
                    getAccounts();
                    clearFields(
                        setAccountToEditData,
                        'accountType',
                        'accountEditName',
                        'accountEditAmount',
                    );
                    // clearFields2();
                    showToastAlert('success', 'Cuenta editada');
                }
            })
            .catch(err => console.log(err));
    };
    // UseEffect que trae todas las cuentas al abrir la app
    useEffect(() => {
        userData.token ? getAccounts() : null;
    }, [getAccounts, userData.token]);
    return (
        <AccountContext.Provider
            value={{
                accounts,
                getAccounts,
                setNewAccountData,
                validateAddAccount,
                formatter,
                deleteAccount,
                editAccount,
                setAccountToEditData,
                accountIcon,
            }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
