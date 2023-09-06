import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import { toastConfig } from '../styles/ToastStyles';
import React, { useContext, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { CategoryStyles } from '../styles/GlobalStyles';
import { UserContext } from '../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CatContext } from '../controller/CategoriesContext';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ModalCategoryIcons from '../components/ModalCategoryIcons';
const Categories = () => {
    const layout = useWindowDimensions();
    const {
        categories,
        newCategoy,
        setNewCategory,
        selectedCatIcon,
        validateCatInput,
        setSelectedCatIcon,
    }: any = useContext(CatContext);
    const { updStateData }: any = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <View>
                <View style={CategoryStyles.catInputContainer}>
                    <TextInput
                        maxLength={20}
                        value={newCategoy.name}
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
                    onPress={() => validateCatInput()}
                    style={CategoryStyles.addCatButton}>
                    <Text style={CategoryStyles.addCatButtonText}>
                        Agregar nueva categoría
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: layout.height - 270 }}>
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
            <Toast config={toastConfig} />
        </View>
    );
};

export default Categories;
