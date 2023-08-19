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
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CatContext } from '../controller/CategoriesContext';
import ModalCategoryIcons from '../components/ModalCategoryIcons';
import { UserContext } from '../controller/UserContext';
const Categories = () => {
    const { categories, addCat, setNewCategry }: any = useContext(CatContext);
    const { updStateData }: any = useContext(UserContext);
    const layout = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <View>
                <View style={CategoryStyles.catInputContainer}>
                    <TextInput
                        maxLength={20}
                        style={CategoryStyles.catNameInput}
                        placeholder="Agregar nueva categoría"
                        onChangeText={value =>
                            updStateData(setNewCategry, value, 'name')
                        }
                    />
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={CategoryStyles.addCatIcon}>
                        <Icon name="500px" size={40} color="#000" />
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
            />
        </View>
    );
};

export default Categories;
