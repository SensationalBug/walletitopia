import {
    View,
    Modal,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { GastosContext } from '../../controller/GastosContext';
import { CatContext } from '../../controller/CategoriesContext';
import HomeCategoryButton from '../customComponents/HomeCategoryButton';

const HomeDetailEditModal = ({
    data,
    selectedId,
    setSelectedId,
    modalVisible,
    setModalVisible,
}: any) => {
    const { _id, concepto, monto, id_cuenta } = data;
    const { editGastoById }: any = useContext(GastosContext);
    const [editGasto, setEditGasto] = useState({
        concepto: '',
        monto: '',
    });

    const { categories }: any = useContext(CatContext);
    // const { setResetSlider }: any = useContext(UserContext);
    return (
        <Modal transparent={true} animationType="slide" visible={modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.formBox}>
                        <View>
                            <FormTextInput
                                setState={setEditGasto}
                                textColor="#fff"
                                fieldName="concepto"
                                secureTextEntry={false}
                                placeholder={concepto}
                            />
                            <FormTextInput
                                keyboardType="numeric"
                                setState={setEditGasto}
                                textColor="#fff"
                                fieldName="monto"
                                secureTextEntry={false}
                                placeholder={`${monto}`}
                            />
                        </View>
                        <View style={styles.categoriesContainer}>
                            <FlatList
                                numColumns={3}
                                data={categories}
                                renderItem={({ item }: any) => (
                                    <HomeCategoryButton
                                        {...item}
                                        selectedId={selectedId}
                                        setSelectedId={setSelectedId}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setSelectedId('');
                                // setResetSlider(true);
                                setModalVisible(false);
                            }}>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={() => {
                                editGastoById(
                                    _id,
                                    editGasto.concepto,
                                    editGasto.monto,
                                    selectedId,
                                    id_cuenta,
                                );
                                // .then(() => {
                                setSelectedId('');
                                // setResetSlider(true);
                                setModalVisible(false);
                                // });
                            }}>
                            <Icon name="check" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default HomeDetailEditModal;

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalView: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#122e49',
        justifyContent: 'space-between',
    },
    formBox: {
        margin: 10,
    },
    categoriesContainer: {
        height: 250,
        marginTop: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        width: '45%',
        height: 40,
        padding: 5,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F24C3D',
    },
    buttonClose: {
        backgroundColor: '#F24C3D',
    },
    buttonSave: {
        backgroundColor: '#1F8A70',
    },
});
