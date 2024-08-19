import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { CategoryCardStyles } from '../../styles/GlobalStyles';
import { CategoriesContext } from '../../controller/CategoriesContext';

interface types {
    id: number;
    icon_name: string;
    name: string;
    showAlert: any;
}

const CategoryCard = ({ id, icon_name, name }: types) => {
    const { deleteCat }: any = useContext(CategoriesContext);
    const showAlert = () => {
        Alert.alert(
            'Advertencia',
            `Seguro que quieres eliminar la categoría ${name} ?`,
            [
                {
                    text: 'Si',
                    onPress: () => deleteCat(id),
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
            <Text style={CategoryCardStyles.catData}>{name}</Text>
        </TouchableOpacity>
    );
};

export default CategoryCard;
