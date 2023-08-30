import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GastosContext } from '../controller/GastosContext';
import { CategoryCardStyles } from '../styles/GlobalStyles';

const HomeCategoryButton = ({ _id, category_name, icon_name }: any) => {
    const { setNewGasto }: any = useContext(GastosContext);
    const { updStateData }: any = useContext(UserContext);

    return (
        <TouchableOpacity
            style={CategoryCardStyles.catBox}
            onPress={() => updStateData(setNewGasto, _id, 'id_categoria')}>
            <Icon
                size={20}
                name={icon_name}
                style={CategoryCardStyles.catData}
            />
            <Text style={CategoryCardStyles.catData}>{category_name}</Text>
        </TouchableOpacity>
    );
};

export default HomeCategoryButton;
