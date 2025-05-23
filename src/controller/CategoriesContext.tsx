import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';
import { icons as DEFAULT_CATEGORY_ICONS_FROM_FILE } from '../../text/icons'; // Imported from src/text/icons.js

interface props {
    children: JSX.Element;
}

const CATEGORIES_STORAGE_KEY = '@app_categories_data';
// const CATEGORY_ICONS_STORAGE_KEY = '@app_category_icons_data'; // Not used as icons are hardcoded/imported

const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

// Map imported icons to the desired structure
const DEFAULT_CATEGORY_ICONS = DEFAULT_CATEGORY_ICONS_FROM_FILE.map((icon: any) => ({
    id: String(icon._id), // Ensure id is a string
    name: icon.IconName,
}));

export const CategoriesContext = createContext({});

const CategoriesProvider = ({ children }: props) => {
    const { showToastAlert, updStateData }: any = useContext(UserContext); // updStateData is used
    const [categories, setCategories] = useState<any[]>([]); // Explicitly type as any[] or a specific interface
    const [catIcons, setCatIcons] = useState<any[]>([]); // Explicitly type
    const [isLoading, setIsLoading] = useState(false); // Local loading state
    const [selectedCatIcon, setSelectedCatIcon] = useState('chevron-down');
    const [newCategoy, setNewCategory] = useState({
        name: '',
        iconName: '',
    });

    // Funcion para obtener los iconos de las categorias a seleccionar
    const getCatIcons = useCallback(() => {
        setCatIcons(DEFAULT_CATEGORY_ICONS);
    }, []);

    // Funcion para obtener todas las categorias
    const getCat = useCallback(async () => {
        setIsLoading(true);
        try {
            const catJson = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
            setCategories(catJson ? JSON.parse(catJson) : []);
        } catch (e) {
            console.error("Failed to load categories", e);
            setCategories([]); // Set to empty array on error
            showToastAlert('error', 'Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    }, [showToastAlert]);

    // Funcion para agregar una nueva categoria
    const addCat = async () => {
        setIsLoading(true);
        try {
            const currentCategoriesJson = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
            let currentCategories = currentCategoriesJson ? JSON.parse(currentCategoriesJson) : [];
            
            const categoryToAdd = {
                id: generateId(),
                category_name: newCategoy.name,
                icon_name: newCategoy.iconName,
            };
            currentCategories.push(categoryToAdd);
            await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(currentCategories));
            
            setCategories(currentCategories); // Update state

            setSelectedCatIcon('chevron-down');
            updStateData(setNewCategory, '', 'name'); // Use updStateData from UserContext
            updStateData(setNewCategory, '', 'iconName');
            showToastAlert('success', 'Categoría agregada');
        } catch (e) {
            console.error("Failed to add category", e);
            showToastAlert('error', 'Failed to add category');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Funcion para validar el campo categoria
    const validateCatInput = async () => { // Made async to await addCat
        const { name, iconName } = newCategoy;
        if (name === '') {
            showToastAlert('error', 'Inserta un nombre para la categoría');
            return;
        }
        if (iconName === 'chevron-down' || !iconName) {
            showToastAlert('error', 'Selecciona un icono');
            return;
        }
        await addCat(); // Await the async addCat function
        // No need for resolve('ok') if not returning a promise explicitly
    };

    // Funcion para borrar una categoria
    const deleteCat = async (catId: string) => {
        setIsLoading(true);
        try {
            const currentCategoriesJson = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
            let currentCategories = currentCategoriesJson ? JSON.parse(currentCategoriesJson) : [];
            const updatedCategories = currentCategories.filter((cat: any) => cat.id !== catId);
            await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updatedCategories));

            setCategories(updatedCategories); // Update state
            showToastAlert('success', 'La categoria ha sido eliminada'); // Changed to success
        } catch (e) {
            console.error("Failed to delete category", e);
            showToastAlert('error', 'Failed to delete category');
        } finally {
            setIsLoading(false);
        }
    };

    // UseEffect que obtiene las categorias y los iconos
    useEffect(() => {
        getCat();
        getCatIcons();
    }, [getCat, getCatIcons]);

    return (
        <CategoriesContext.Provider
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
                isLoading, // Provide isLoading state
            }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
