import { Button, TextInput } from 'react-native-paper';
import { UserContext } from '../../controller/UserContext';
import React, { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const EnableBiometrics = ({ setModalFingerVisible }: any) => {
    const [userFingerData, setUserFingerData] = useState({
        userEmail: '',
        userPwd: '',
    });
    const [data, setData] = useState('checkbox-blank-outline');
    const {
        useBiometrics,
        setUseBiometrics,
        updStateData,
        isLocalData,
        setIsLocalData,
    }: any = useContext(UserContext);
    const styles = StyleSheet.create({
        contentView: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        textinputView: {
            display: useBiometrics ? 'flex' : 'none',
        },
        checkBoxView: {
            alignItems: 'center',
        },
        checkBoxText: {
            color: '#fff',
        },
        checkBoxButton: {
            color: '#fff',
            borderRadius: 5,
            marginVertical: 10,
            backgroundColor: '#bf1313',
        },
        textInput: {
            paddingLeft: 5,
        },
    });
    const deleteData = () => {
        Alert.alert(
            'Advertencia',
            'Seguro que quieres desactivar el inicio con huella?',
            [
                {
                    text: 'No',
                },
                {
                    text: 'Si',
                    onPress: () => {
                        setModalFingerVisible(false);
                        setIsLocalData(false);
                    },
                },
            ],
        );
    };
    useEffect(() => {
        if (isLocalData) {
            setData('checkbox-marked-outline');
        } else {
            if (useBiometrics) {
                setData('eye-outline');
            } else {
                setData('checkbox-blank-outline');
            }
        }
    }, [isLocalData, useBiometrics]);
    return (
        <View style={styles.contentView}>
            {!isLocalData ? (
                <View style={styles.textinputView}>
                    <TextInput
                        style={styles.textInput}
                        value={userFingerData.userEmail}
                        onChangeText={value =>
                            updStateData(setUserFingerData, value, 'userEmail')
                        }
                        mode="outlined"
                        placeholder="Correo electrónico"
                    />
                    <TextInput
                        style={styles.textInput}
                        value={userFingerData.userPwd}
                        onChangeText={value =>
                            updStateData(setUserFingerData, value, 'userPwd')
                        }
                        mode="outlined"
                        secureTextEntry
                        placeholder="Contraseña"
                    />
                    <Button
                        mode="contained"
                        style={styles.checkBoxButton}
                        onPress={() =>
                            saveData().then(() => {
                                updStateData(
                                    setUserFingerData,
                                    '',
                                    'userEmail',
                                );
                                updStateData(setUserFingerData, '', 'userPwd');
                                setModalFingerVisible(false);
                                setIsLocalData(true);
                            })
                        }>
                        Guardar datos de huella
                    </Button>
                </View>
            ) : (
                <View>
                    <Button
                        mode="contained"
                        style={styles.checkBoxButton}
                        onPress={() => deleteData()}>
                        Desactivar huella
                    </Button>
                </View>
            )}
            <View style={styles.checkBoxView}>
                <TouchableOpacity
                    onPress={() => setUseBiometrics(!useBiometrics)}>
                    <Icon name={data} color={'#fff'} size={60} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EnableBiometrics;
