import axios from 'axios';
import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react';
import { UserContext } from './UserContext';
import URL from '../../URL';

interface props {
    children: JSX.Element;
}

export const AccountContext = createContext({});

const AccountProvider = ({ children }: props) => {
    const { userData, showToastAlert }: any = useContext(UserContext);
    const [accounts, setAccounts] = useState([]);
    const [editAccountData, setEditAccountData] = useState<any>([]);
    const [accountToDelete, setAccountToDelete] = useState({
        id: '',
        accountName: '',
    });
    const [newAccountData, setNewAccountData] = useState({
        accountType: '',
        accountName: '',
        accountAmount: '',
    });
    const [accountToEditData, setAccountToEditData] = useState({
        accountType: '',
        accountEditName: '',
        accountEditAmount: '',
    });
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
            .catch(err => console.log(err));
    }, [userData.token]);
    // Funcion para obtener por ID
    const getAccountById = (id: string) => {
        axios({
            method: 'get',
            url: `${URL}/cuentas/${id}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(res => setEditAccountData(res.data))
            .catch(err => console.log(err));
    };
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
                fecha_de_creacion: 'fecha',
            },
        })
            .then(() => {
                getAccounts();
            })
            .catch(() => showToastAlert('error', 'Completa todos los campos'));
    };
    // Funcion para borrar cuentas
    const deleteAccount = () => {
        axios({
            method: 'delete',
            url: `${URL}/cuentas/${accountToDelete.id}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(() => getAccounts())
            .catch(err => console.log(err));
    };
    // Funcion para editar cuentas
    const editAccount = () => {
        const { accountType, accountEditName, accountEditAmount }: any =
            accountToEditData;
        axios({
            method: 'patch',
            url: `${URL}/cuentas/${editAccountData.id}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            data: {
                acc_name: accountEditName,
                monto_inicial: accountEditAmount,
                tipo_de_cuenta: accountType,
                fecha_de_creacion: '',
            },
        })
            .then(() => {
                getAccounts();
                setAccountToEditData({
                    accountType: '',
                    accountEditName: '',
                    accountEditAmount: '',
                });
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
                addAccount,
                formatter,
                deleteAccount,
                accountToDelete,
                setAccountToDelete,
                editAccount,
                setEditAccountData,
                getAccountById,
                editAccountData,
                setAccountToEditData,
                accountIcon,
            }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
