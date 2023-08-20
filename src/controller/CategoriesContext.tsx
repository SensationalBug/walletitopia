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
    const { userData, showToastAlert, updStateData }: any =
        useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [catIcons, setCatIcons] = useState([]);
    const [selectedCatIcon, setSelectedCatIcon] = useState('chevron-down');
    const [newCategoy, setNewCategory] = useState({
        name: '',
        iconName: '',
    });
    // Funcion para obtener todas las categorias
    const getCat = useCallback(() => {
        axios({
            method: 'get',
            url: `${URL}/categoria`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(res => setCategories(res.data))
            .catch(err => console.log('Categoria', err));
    }, [userData.token]);
    // Funcion para agregar una nueva categoria
    const addCat = () => {
        axios({
            method: 'post',
            url: `${URL}/categoria`,
            data: {
                category_name: newCategoy.name,
                icon_name: newCategoy.iconName,
            },
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(() => {
                getCat();
                setSelectedCatIcon('chevron-down');
                updStateData(setNewCategory, '', 'name');
                updStateData(setNewCategory, '', 'iconName');
                showToastAlert('success', 'Categoría agregada');
            })
            .catch(err => console.log(err));
    };
    // Funcion para validar el campo categoria
    const validateCatInput = () => {
        const { name, iconName } = newCategoy;
        if (name === '') {
            showToastAlert('error', 'Inserta un nombre para la categoría');
            return;
        }
        if (iconName === 'chevron-down' || !iconName) {
            showToastAlert('error', 'Selecciona un icono');
            return;
        }
        addCat();
    };
    // Funcion para borrar una categoria
    const deleteCat = (catId: string) => {
        axios({
            method: 'delete',
            url: `${URL}/categoria/${catId}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(() => getCat())
            .catch(() =>
                showToastAlert('error', 'Esto es una categoría por defecto'),
            );
        // console.log(catId);
    };
    // Funcion para obtener los iconos de las categorias a seleccionar
    const getCatIcons = useCallback(() => {
        axios({
            method: 'get',
            url: `${URL}/categoria/Icon`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(res => setCatIcons(res.data))
            .catch(err => console.log(err));
    }, [userData.token]);
    // UseEffect que obtiene las categorias y los iconos
    useEffect(() => {
        userData.token ? (getCat(), getCatIcons()) : null;
    }, [userData.token, getCat, getCatIcons]);

    return (
        <CatContext.Provider
            value={{
                getCat,
                catIcons,
                deleteCat,
                categories,
                newCategoy,
                setNewCategory,
                selectedCatIcon,
                validateCatInput,
                setSelectedCatIcon,
            }}>
            {children}
        </CatContext.Provider>
    );
};

export default CatProvider;
