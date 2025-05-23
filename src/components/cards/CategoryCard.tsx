import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { CategoryCardStyles } from '../../styles/GlobalStyles';
import { CatContext } from '../../controller/CategoriesContext';

interface types {
    _id: string;
    icon_name: string;
    category_name: string;
    showAlert: any;
}

const CategoryCard = ({ _id, icon_name, category_name }: types) => {
    const { deleteCat }: any = useContext(CatContext);
    const showAlert = () => {
        Alert.alert(
            'Advertencia',
            `Seguro que quieres eliminar la categoría ${category_name} ?`,
            [
                {
                    text: 'Si',
                    onPress: () => deleteCat(_id),
                },
                {
                    text: 'No',
                },
            ],
        );
    };
    return (
        <TouchableOpacity
            onLongPress={() => showAlert()}
            style={CategoryCardStyles.catBox}>
            <Icon
                size={35}
                name={icon_name}
                style={CategoryCardStyles.catData}
            />
            <Text style={CategoryCardStyles.catData}>{category_name}</Text>
        </TouchableOpacity>
    );
};

export default CategoryCard;
