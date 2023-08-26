import { FAB } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import AccountCard from '../components/AccountCard';
import AccountModal from '../components/AccountModal';
import { toastConfig } from '../styles/ToastStyles';
import { UserContext } from '../controller/UserContext';
import AccountEditModal from '../components/AccountEditModal';
import { AccountContext } from '../controller/AccountsContext';
import { View, StyleSheet, FlatList, Alert } from 'react-native';

const Accounts = () => {
    const { accounts, deleteAccount, accountToDelete }: any =
        useContext(AccountContext);
    const { Toast }: any = useContext(UserContext);
    const [isEditable, setIsEditable] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [selectedAccColor, setSelectedAccColor] = useState('');
    // Funcion para mostrar el alert previo a borrar una cuenta
    const showAlert = () => {
        Alert.alert(
            'Advertencia',
            `Seguro que quieres eliminar la cuenta ${accountToDelete.accountName} ?`,
            [
                {
                    text: 'Si',
                    onPress: () => deleteAccount(),
                },
                {
                    text: 'No',
                    onPress: () => setSelectedAccColor(''),
                },
            ],
        );
    };
    // Funcion para cambiar el color de una cuenta seleccionada
    const selectedAccount = (id: string) => {
        selectedAccColor === id
            ? setSelectedAccColor('')
            : setSelectedAccColor(id);
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={accounts}
                keyExtractor={(item: any) => item._id}
                renderItem={(item: any) => (
                    <AccountCard
                        {...item}
                        setIsEditable={setIsEditable}
                        selectedAccount={selectedAccount}
                        selectedAccColor={selectedAccColor}
                    />
                )}
            />
            <View style={styles.buttonsContainer}>
                {isEditable ? (
                    <View style={styles.FABContainer}>
                        <FAB
                            icon="trash-can-outline"
                            color="#fff"
                            style={[styles.FABStyle, styles.FABDelete]}
                            onPress={() => {
                                showAlert();
                                setIsEditable(false);
                            }}
                        />
                        <View style={styles.FABEdit}>
                            <FAB
                                icon="window-close"
                                color="#fff"
                                style={[styles.FABStyle, styles.FABCancel]}
                                onPress={() => {
                                    setSelectedAccColor('');
                                    setIsEditable(false);
                                }}
                            />
                            <FAB
                                icon="square-edit-outline"
                                color="#fff"
                                style={[styles.FABStyle, styles.FABEditButton]}
                                onPress={() => {
                                    setModalEditVisible(true);
                                }}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={[styles.FABContainer, styles.FABPlus]}>
                        <FAB
                            icon="plus"
                            color="#fff"
                            style={[styles.FABStyle, styles.FABPlusButton]}
                            onPress={() => setModalVisible(true)}
                        />
                    </View>
                )}
            </View>
            <AccountModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <AccountEditModal
                setIsEditable={setIsEditable}
                modalVisible={modalEditVisible}
                setModalVisible={setModalEditVisible}
                setSelectedAccColor={setSelectedAccColor}
            />
            <Toast config={toastConfig} />
        </View>
    );
};

export default Accounts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cuentaContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#1F9FD0',
        justifyContent: 'space-between',
    },
    dataContainer: {
        width: '70%',
    },
    cuentaName: {
        color: '#fff',
        fontSize: 30,
    },
    cuentaType: {
        color: '#fff',
        marginBottom: 10,
    },
    banco: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        right: 0,
        bottom: 0,
        width: '100%',
        position: 'absolute',
    },
    FABContainer: {
        margin: 10,
        borderRadius: 10,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    FABEdit: {
        flexDirection: 'row',
    },
    FABPlus: {
        justifyContent: 'flex-end',
    },
    FABStyle: {
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    FABPlusButton: {
        backgroundColor: '#122e49',
    },
    FABDelete: {
        backgroundColor: '#F24C3D',
    },
    FABCancel: {
        backgroundColor: '#b3b329',
    },
    FABEditButton: {
        backgroundColor: '#1F8A70',
    },
});
