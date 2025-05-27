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

// Define the structure for a category
interface Category {
    id: string;
    category_name: string;
    icon_name: string;
    isDefault?: boolean;
}

const CATEGORIES_STORAGE_KEY = '@app_categories_data';
const generateId = () => `id_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

// Map imported icons to the desired structure for icon selection UI
const DEFAULT_CATEGORY_ICONS = DEFAULT_CATEGORY_ICONS_FROM_FILE.map((icon: any) => ({
    id: String(icon._id),
    name: icon.IconName,
}));

// 1. Define Default Categories Array
const DEFAULT_CATEGORIES_DATA: Category[] = [
    { id: 'default_cat_0', category_name: 'Alimentación', icon_name: 'food', isDefault: true },
    { id: 'default_cat_1', category_name: 'Transporte', icon_name: 'car', isDefault: true },
    { id: 'default_cat_2', category_name: 'Vivienda', icon_name: 'home', isDefault: true },
    { id: 'default_cat_3', category_name: 'Salud', icon_name: 'medical-bag', isDefault: true }, // Using 'medical-bag' from FontAwesome 5 via MaterialCommunityIcons
    { id: 'default_cat_4', category_name: 'Educación', icon_name: 'school', isDefault: true },
    { id: 'default_cat_5', category_name: 'Entretenimiento', icon_name: 'filmstrip', isDefault: true }, // or 'movie-open'
    { id: 'default_cat_6', category_name: 'Ropa y Accesorios', icon_name: 'tshirt-crew', isDefault: true }, // or 'hanger'
    { id: 'default_cat_7', category_name: 'Ahorros', icon_name: 'piggy-bank', isDefault: true },
    { id: 'default_cat_8', category_name: 'Otros', icon_name: 'shape-outline', isDefault: true }, // or 'dots-horizontal'
];


export const CategoriesContext = createContext({});

const CategoriesProvider = ({ children }: props) => {
    const { showToastAlert, updStateData }: any = useContext(UserContext);
    const [categories, setCategories] = useState<Category[]>([]); // Use Category interface
    const [catIcons, setCatIcons] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCatIcon, setSelectedCatIcon] = useState('chevron-down');
    const [newCategoy, setNewCategory] = useState({
        name: '',
        iconName: '',
    });

    const getCatIcons = useCallback(() => {
        setCatIcons(DEFAULT_CATEGORY_ICONS);
    }, []);

    // 2. Modify getCat Function for Seeding Defaults
    const getCat = useCallback(async () => {
        setIsLoading(true);
        try {
            const catJson = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
            let storedCategories: Category[] = catJson ? JSON.parse(catJson) : [];
            let categoriesModified = false;

            // Ensure all default categories are present
            DEFAULT_CATEGORIES_DATA.forEach(defaultCat => {
                if (!storedCategories.find((cat: Category) => cat.id === defaultCat.id)) {
                    storedCategories.push(defaultCat);
                    categoriesModified = true;
                }
            });

            if (categoriesModified) {
                await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(storedCategories));
            }
            
            setCategories(storedCategories);
        } catch (e) {
            console.error("Failed to load categories", e);
            // Fallback to default data if storage fails completely or is corrupted
            setCategories(DEFAULT_CATEGORIES_DATA); 
            showToastAlert('error', 'Failed to load categories, showing defaults.');
        } finally {
            setIsLoading(false);
        }
    }, [showToastAlert]);

    // 4. Review addCat Function (ensure isDefault is not set, or is false)
    const addCat = async () => {
        setIsLoading(true);
        try {
            const currentCategoriesJson = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
            let currentCategories: Category[] = currentCategoriesJson ? JSON.parse(currentCategoriesJson) : [];
            
            const categoryToAdd: Category = { // Explicitly use Category interface
                id: generateId(),
                category_name: newCategoy.name,
                icon_name: newCategoy.iconName,
                isDefault: false, // Explicitly set user-added categories as not default
            };
            currentCategories.push(categoryToAdd);
            await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(currentCategories));
            
            setCategories(currentCategories);

            setSelectedCatIcon('chevron-down');
            updStateData(setNewCategory, '', 'name');
            updStateData(setNewCategory, '', 'iconName');
            showToastAlert('success', 'Categoría agregada');
        } catch (e) {
            console.error("Failed to add category", e);
            showToastAlert('error', 'Failed to add category');
        } finally {
            setIsLoading(false);
        }
    };
    
    const validateCatInput = async () => {
        const { name, iconName } = newCategoy;
        if (name === '') {
            showToastAlert('error', 'Inserta un nombre para la categoría');
            return;
        }
        if (iconName === 'chevron-down' || !iconName) {
            showToastAlert('error', 'Selecciona un icono');
            return;
        }
        await addCat();
    };

    // 3. Modify deleteCat Function to Prevent Deleting Defaults
    const deleteCat = async (catId: string) => {
        setIsLoading(true); // Set loading true at the beginning
        try {
            const currentCategoriesJson = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
            let currentCategories: Category[] = currentCategoriesJson ? JSON.parse(currentCategoriesJson) : [];
            const categoryToDelete = currentCategories.find((cat: Category) => cat.id === catId);

            if (categoryToDelete && categoryToDelete.isDefault) {
                showToastAlert('error', 'Las categorías predeterminadas no se pueden eliminar.');
                setIsLoading(false); // Reset loading state
                return;
            }

            // Proceed with deletion if not default
            const updatedCategories = currentCategories.filter((cat: Category) => cat.id !== catId);
            await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updatedCategories));

            setCategories(updatedCategories);
            showToastAlert('success', 'Categoría eliminada exitosamente.');
        } catch (e) {
            console.error("Failed to delete category", e);
            showToastAlert('error', 'Error al eliminar la categoría');
        } finally {
            setIsLoading(false);
        }
    };

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
                isLoading,
            }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
