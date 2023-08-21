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

    const getAccounts = useCallback(() => {
        axios({
            method: 'get',
            url: `${URL}/cuenta`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(res => setAccounts(res.data))
            .catch(err => console.log(err));
    }, [userData.token]);
    useEffect(() => {
        userData.token ? getAccounts() : null;
    }, [getAccounts, userData.token]);
    return (
        <AccountContext.Provider value={{ accounts, getAccounts }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
