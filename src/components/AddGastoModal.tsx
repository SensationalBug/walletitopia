import React, { useContext } from 'react';
import FormTextInput from './FormTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Modal,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { GastosContext } from '../controller/GastosContext';
import { CatContext } from '../controller/CategoriesContext';
import HomeCategoryButton from './HomeCategoryButton';

const AddGastoModal = ({ modalVisible, setModalVisible, resetSlider }: any) => {
    const { setNewGasto, addGasto }: any = useContext(GastosContext);
    const { categories }: any = useContext(CatContext);
    return (
        <Modal transparent={true} animationType="slide" visible={modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.formBox}>
                        <View>
                            <FormTextInput
                                setState={setNewGasto}
                                textColor="#fff"
                                fieldName="concepto"
                                secureTextEntry={false}
                                placeholder="Concepto"
                            />
                            <FormTextInput
                                keyboardType="numeric"
                                setState={setNewGasto}
                                textColor="#fff"
                                fieldName="monto"
                                secureTextEntry={false}
                                placeholder="Monto"
                            />
                        </View>
                        {/* <View style={{ backgroundColor: 'red', paddingTop: 15, paddingHorizontal: 10 }}>
                            <Text>Tipo de gasto</Text>
                        </View> */}
                        <View style={styles.categoriesContainer}>
                            <FlatList
                                numColumns={3}
                                data={categories}
                                renderItem={({ item }: any) => (
                                    <HomeCategoryButton {...item} />
                                )}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                resetSlider();
                                setModalVisible(!modalVisible);
                                setNewGasto({
                                    id_cuentas: '',
                                    tipo_gastos: '',
                                    id_categoria: '',
                                    concepto: '',
                                    monto: 0,
                                    fecha_de_creacion: '',
                                });
                            }}>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => addGasto()}>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={() => {
                                resetSlider();
                                setModalVisible(!modalVisible);
                            }}>
                            <Icon name="check" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddGastoModal;

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalView: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
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
        marginVertical: 20,
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
