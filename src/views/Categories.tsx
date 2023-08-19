import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import React, { useContext, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { CategoryStyles } from '../styles/GlobalStyles';
import { UserContext } from '../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CatContext } from '../controller/CategoriesContext';
import ModalCategoryIcons from '../components/ModalCategoryIcons';
const Categories = () => {
    const layout = useWindowDimensions();
    const { categories, addCat, setNewCategory }: any = useContext(CatContext);
    const { updStateData }: any = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCatIcon, setSelectedCatIcon] = useState('chevron-down');
    return (
        <View>
            <View>
                <View style={CategoryStyles.catInputContainer}>
                    <TextInput
                        maxLength={20}
                        style={CategoryStyles.catNameInput}
                        placeholder="Agregar nueva categoría"
                        onChangeText={value =>
                            updStateData(setNewCategory, value, 'name')
                        }
                    />
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={CategoryStyles.addCatIcon}>
                        <Icon name={selectedCatIcon} size={30} color="#000" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => addCat()}
                    style={CategoryStyles.addCatButton}>
                    <Text style={CategoryStyles.addCatButtonText}>
                        Agregar nueva categoría
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: layout.height - 245 }}>
                <Text style={CategoryStyles.catListMainTitle}>
                    Categorias disponibles
                </Text>
                <FlatList
                    numColumns={3}
                    data={categories}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <CategoryCard {...item} />}
                />
            </View>
            <ModalCategoryIcons
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setSelectedCatIcon={setSelectedCatIcon}
            />
        </View>
    );
};

export default Categories;
