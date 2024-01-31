import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import CustomModal from './CustomModal';
import FormTextInput from './FormTextInput';
import { ActivityIndicator } from 'react-native-paper';
import RNBiometrics from 'react-native-simple-biometrics';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from '../../controller/UserContext';
import { LoginBoxStyles } from '../../styles/GlobalStyles';
import PwdRequestContent from '../contents/PwdRequestContent';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginBox = () => {
    const layout = useWindowDimensions();
    const {
        userLogin,
        setUserData,
        userData,
        indicatorVisible,
        useBiometrics,
    }: any = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const biometrics = async () => {
        const canBiometric = await RNBiometrics.canAuthenticate();
        if (canBiometric) {
            try {
                await RNBiometrics.requestBioAuth('Coloque su huella', ' ');
                console.log('si');
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <View
            style={[LoginBoxStyles.container, { height: layout.height - 100 }]}>
            <View style={LoginBoxStyles.loginFormBox}>
                <View style={LoginBoxStyles.logo}>
                    {indicatorVisible ? (
                        <ActivityIndicator
                            hidesWhenStopped
                            animating={indicatorVisible}
                            color="#122e49"
                            size={80}
                        />
                    ) : (
                        <Icon size={80} color="#122e49" name="laugh-squint" />
                    )}
                </View>
                <FormTextInput
                    value={userData.mail}
                    setState={setUserData}
                    fieldName="mail"
                    secureTextEntry={false}
                    placeholder="Correo electrónico"
                />
                <FormTextInput
                    value={userData.password}
                    setState={setUserData}
                    fieldName="password"
                    secureTextEntry={true}
                    placeholder="Contraseña"
                />
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={LoginBoxStyles.forgotTextButton}>
                    <Text style={LoginBoxStyles.forgotText}>
                        Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => userLogin()}
                    style={LoginBoxStyles.submitButton}>
                    <Text style={LoginBoxStyles.submitButtonText}>
                        Iniciar Sesión
                    </Text>
                </TouchableOpacity>
            </View>
            {useBiometrics ? (
                <TouchableOpacity onPress={() => biometrics()}>
                    <Icon name="fingerprint" size={80} color="#122e49" />
                </TouchableOpacity>
            ) : null}
            <Text style={LoginBoxStyles.rightsText}>
                © ITopia 2023, Todos los derechos reservados.
            </Text>
            <CustomModal
                title="Solicitud de cambio"
                content={<PwdRequestContent />}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

export default LoginBox;
