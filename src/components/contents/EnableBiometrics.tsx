import React, { useContext } from 'react';
import { UserContext } from '../../controller/UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EnableBiometrics = () => {
    const { useBiometrics, setUseBiometrics }: any = useContext(UserContext);
    return (
        <View>
            <View>
                <TouchableOpacity
                    onPress={() => setUseBiometrics(!useBiometrics)}>
                    <Icon name="fingerprint" color={'#fff'} size={80} />
                </TouchableOpacity>
                <Text style={{ color: useBiometrics ? '#fff' : 'red' }}>
                    Habilitar
                </Text>
            </View>
        </View>
    );
};

export default EnableBiometrics;
