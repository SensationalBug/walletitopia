import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CategoryCardStyles } from '../styles/GlobalStyles';

interface types {
    _id: string;
    icon_name: string;
    category_name: string;
}

const CategoryCard = ({ _id, icon_name, category_name }: types) => {
    return (
        <TouchableOpacity
            onPress={() => console.log(_id)}
            style={CategoryCardStyles.catBox}>
            <Icon
                size={30}
                name={icon_name}
                style={CategoryCardStyles.catData}
            />
            <Text style={CategoryCardStyles.catData}>{category_name}</Text>
        </TouchableOpacity>
    );
};

export default CategoryCard;
