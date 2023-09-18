import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormTextInput from '../customComponents/FormTextInput';
import { GastosContext } from '../../controller/GastosContext';
import { CatContext } from '../../controller/CategoriesContext';
import { AddGastoModalStyles } from '../../styles/GlobalStyles';
import { View, Modal, FlatList, TouchableOpacity } from 'react-native';
import HomeCategoryButton from '../customComponents/HomeCategoryButton';

const AddGastoModal = ({ modalVisible, setModalVisible }: any) => {
    const { setNewGasto, validateAddGasto, clearNewGastos }: any =
        useContext(GastosContext);
    const { categories }: any = useContext(CatContext);
    const [selectedId, setSelectedId] = useState('');
    return (
        <Modal transparent={true} animationType="slide" visible={modalVisible}>
            <View style={AddGastoModalStyles.modalContainer}>
                <View style={AddGastoModalStyles.modalView}>
                    <View style={AddGastoModalStyles.formBox}>
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
                        <View style={AddGastoModalStyles.categoriesContainer}>
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
                    <View style={AddGastoModalStyles.buttonGroup}>
                        <TouchableOpacity
                            style={[
                                AddGastoModalStyles.button,
                                AddGastoModalStyles.buttonClose,
                            ]}
                            onPress={() => {
                                clearNewGastos();
                                setSelectedId('');
                                setModalVisible(false);
                            }}>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                AddGastoModalStyles.button,
                                AddGastoModalStyles.buttonSave,
                            ]}
                            onPress={() => {
                                validateAddGasto().then(() => {
                                    setSelectedId('');
                                    setModalVisible(false);
                                });
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
