import { Button, TextInput } from 'react-native-paper';
import { UserContext } from '../../controller/UserContext';
import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            height: '100%',
            justifyContent: 'flex-end',
        },
        textinputView: {
            height: '80%',
            display: useBiometrics ? 'flex' : 'none',
        },
        checkBoxView: {
            height: '20%',
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
    });
    const saveData = () => {
        return new Promise(async resolve => {
            await AsyncStorage.setItem('userEmail', userFingerData.userEmail);
            await AsyncStorage.setItem('userPwd', userFingerData.userPwd);
            resolve('ok');
        });
    };
    const get = async () => {
        const res = await AsyncStorage.getItem('userEmail');
        console.log(res);
        console.log(isLocalData);
    };
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
                        AsyncStorage.removeItem('userEmail');
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
                        value={userFingerData.userEmail}
                        onChangeText={value =>
                            updStateData(setUserFingerData, value, 'userEmail')
                        }
                        mode="outlined"
                        placeholder="Correo electrónico"
                    />
                    <TextInput
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
                    <Button style={styles.checkBoxButton} onPress={() => get()}>
                        GET
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
                    <Button style={styles.checkBoxButton} onPress={() => get()}>
                        GET
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
