// import axios from 'axios';
import React, {
    // useEffect,
    // useContext,
    // useCallback,
    createContext,
    useState,
} from 'react';
import { database } from '../db/db.scripts';

// import URL from '../../URL';
// import { UserContext } from './UserContext';

interface props {
    children: JSX.Element;
}

// Funcion que trae la Hora
// const creationDate = () => {
//     const date = new Date();
//     return date;
// };

export const AccountContext = createContext({});

const AccountProvider = ({ children }: props) => {
    // const { data, showToastAlert, updStateData }: any = useContext(UserContext);
    const [accounts, setAccounts] = useState([]);
    // const [newAccountData, setNewAccountData] = useState({
    //     accountType: '',
    //     accountName: '',
    //     accountAmount: 0,
    // });
    // const [accountToEditData, setAccountToEditData] = useState({
    //     accountId: '',
    //     accountType: '',
    //     accountEditName: '',
    //     accountEditAmount: 0,
    // });
    // const clearFields = (
    //     setFunction: any,
    //     Type: string,
    //     Name: string,
    //     Amount: string,
    // ) => {
    //     updStateData(setFunction, '', Type);
    //     updStateData(setFunction, '', Name);
    //     updStateData(setFunction, 0, Amount);
    // };

    // Funcion para formatear el dinero
    const formatter = new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP',
    });

    const getAccounts = () => {
        database.transaction(
            tx => {
                tx.executeSql('SELECT * from products', [], (_, results) => {
                    const len = results.rows._array;
                    setAccounts(len);
                });
            },
            error => {
                console.error('Transaction error:', error);
            },
        );
    };

    const dropTables = () => {
        database.transaction(txn => {
            txn.executeSql('DROP TABLE IF EXISTS products;');
            txn.executeSql('DROP TABLE IF EXISTS categories;');
            txn.executeSql('DROP TABLE IF EXISTS transactions;');
            txn.executeSql('DROP TABLE IF EXISTS product_icons;');
            txn.executeSql('DROP TABLE IF EXISTS transaction_icons;');
            txn.executeSql('DROP TABLE IF EXISTS category_icons;');
        });
    };

    return (
        <AccountContext.Provider
            value={{
                accounts,
                getAccounts,
                formatter,
                dropTables,
            }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
