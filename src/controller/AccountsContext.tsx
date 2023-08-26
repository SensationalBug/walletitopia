import axios from 'axios';
import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react';
import { UserContext } from './UserContext';

interface props {
    children: JSX.Element;
}

export const AccountContext = createContext({});

const AccountProvider = ({ children }: props) => {
    const URL = 'http://45.77.161.230:3000';
    const { userData }: any = useContext(UserContext);
    const [accounts, setAccounts] = useState([]);
    const [newAccountData, setNewAccountData] = useState({
        accountType: '',
        accountName: '',
        accountAmount: '',
    });
    // Funcion para formatear el dinero
    const formatter = new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP',
    });
    // Funcion para obtener las cuentas
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
            }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
