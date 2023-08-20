import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

interface props {
    children: JSX.Element;
}

export const CatContext = createContext({});

const CatProvider = ({ children }: props) => {
    const URL = 'http://45.77.161.230:3000';
    const { userData }: any = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [catIcons, setCatIcons] = useState([]);
    const [newCategoy, setNewCategory] = useState({
        name: '',
        iconName: '',
    });

    const getCat = useCallback(() => {
        axios({
            method: 'get',
            url: `${URL}/categoria`,
            headers: {
                Authorization: `Bearer ${userData.token.accessToken}`,
            },
        })
            .then(res => setCategories(res.data))
            .catch(err => console.log('Categoria', err));
    }, [userData.token.accessToken]);

    const addCat = () => {
        axios({
            method: 'post',
            url: `${URL}/categoria`,
            data: {
                category_name: newCategoy.name,
                icon_name: newCategoy.iconName,
            },
            headers: {
                Authorization: `Bearer ${userData.token.accessToken}`,
            },
        })
            .then(() => getCat())
            .catch(err => console.log(err));
        // console.log(newCategoy);
    };

    const getCatIcons = useCallback(() => {
        axios({
            method: 'get',
            url: `${URL}/categoria/Icon`,
            headers: {
                Authorization: `Bearer ${userData.token.accessToken}`,
            },
        })
            .then(res => setCatIcons(res.data))
            .catch(err => console.log(err));
    }, [userData.token.accessToken]);

    useEffect(() => {
        getCat();
        getCatIcons();
    }, [getCat, getCatIcons]);

    return (
        <CatContext.Provider
            value={{
                categories,
                getCat,
                addCat,
                catIcons,
                setNewCategory,
            }}>
            {children}
        </CatContext.Provider>
    );
};

export default CatProvider;
