import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GastosContext } from '../../controller/GastosContext';
import { CategoryCardStyles } from '../../styles/GlobalStyles';

const colors = {
    selected: '#184980',
    noSelected: '#20a5d8',
};

const HomeCategoryButton = ({
    _id,
    category_name,
    icon_name,
    selectedId,
    setSelectedId,
}: any) => {
    const { setNewGasto }: any = useContext(GastosContext);
    const { updStateData }: any = useContext(UserContext);

    const makeSelected = (id: string) => {
        selectedId === id ? setSelectedId(null) : setSelectedId(id);
    };
    return (
        <TouchableOpacity
            disabled={selectedId === _id ? true : false}
            style={[
                CategoryCardStyles.catBox,
                {
                    backgroundColor:
                        selectedId === _id
                            ? colors.selected
                            : colors.noSelected,
                },
            ]}
            onPress={() => {
                makeSelected(_id);
                updStateData(setNewGasto, _id, 'id_categoria');
            }}>
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
