import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    Keyboard,
} from 'react-native';
import { toastConfig } from '../styles/ToastStyles';
import { CategoryStyles } from '../styles/GlobalStyles';
import { UserContext } from '../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalIcons from '../components/modals/ModalIcons';
import React, { useContext, useState, useRef } from 'react';
import CategoryCard from '../components/cards/CategoryCard';
import { CategoriesContext } from '../controller/CategoriesContext';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Categories = () => {
    const layout = useWindowDimensions();
    const flatList = useRef<FlatList<any>>(null);
    const {
        getCat,
        catIcons,
        categories,
        newCategoy,
        setNewCategory,
        selectedCatIcon,
        validateCatInput,
        setSelectedCatIcon,
    }: any = useContext(CategoriesContext);
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
                        onPress={() => {
                            setModalVisible(true);
                            // Esto hace que el teclado se cierre
                            Keyboard.dismiss();
                        }}
                        style={CategoryStyles.addCatIcon}>
                        <Icon name={selectedCatIcon} size={30} color="#000" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        // validateCatInput().then(() => {
                        //     Keyboard.dismiss();
                        //     setTimeout(
                        //         () => flatList?.current?.scrollToEnd(),
                        //         200,
                        //     );
                        // })
                        getCat()
                    }
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
                    ref={flatList}
                    numColumns={3}
                    // data={data}
                    data={categories}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <CategoryCard {...item} />}
                />
            </View>
            <ModalIcons
                icons={catIcons}
                // icons={icons}
                setFuction={setNewCategory}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setSelectedIcon={setSelectedCatIcon}
            />
            <Toast config={toastConfig} />
        </View>
    );
};

export default Categories;
