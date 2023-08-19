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
    const [newCategoy, setNewCategry] = useState({
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
    useEffect(() => {
        getCat();
    }, [getCat]);

    // const addCat = (category_name: string, icon_name: string) => {
    const addCat = () => {
        // axios({
        //     method: 'post',
        //     url: `${URL}/categoria`,
        //     data: {
        //         category_name: category_name,
        //         icon_name: icon_name,
        //     },
        // })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
        console.log(newCategoy);
    };

    const getCatIcons = () => {
        axios({
            method: 'get',
            url: `${URL}/categoria/Icon`,
            headers: {
                Authorization: `Bearer ${userData.token.accessToken}`,
            },
        })
            .then(res => setCatIcons(res.data))
            .catch(err => console.log(err));
    };

    return (
        <CatContext.Provider
            value={{
                categories,
                getCat,
                addCat,
                catIcons,
                getCatIcons,
                setNewCategry,
            }}>
            {children}
        </CatContext.Provider>
    );
};

export default CatProvider;
