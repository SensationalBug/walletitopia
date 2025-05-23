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
import { clearFields } from '../../utils/clearFields';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginBox = () => {
    const layout = useWindowDimensions();
    const { data, userLogin, isLocalData, loading }: any =
        useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({
        userNameOrEmail: '',
        password: '',
    });
    const biometrics = async () => {
        const canBiometric = await RNBiometrics.canAuthenticate();
        if (canBiometric) {
            try {
                await RNBiometrics.requestBioAuth('Coloque su huella', ' ');
                userLogin();
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
                    {loading ? (
                        <ActivityIndicator
                            hidesWhenStopped
                            animating={loading}
                            color="#122e49"
                            size={80}
                        />
                    ) : (
                        <Icon size={80} color="#122e49" name="laugh-squint" />
                    )}
                </View>
                <FormTextInput
                    value={userData.userNameOrEmail}
                    setState={setUserData}
                    fieldName="userNameOrEmail"
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
                    onPress={() =>
                        userLogin(
                            userData.userNameOrEmail,
                            userData.password,
                        ).then(() =>
                            clearFields(setUserData, [
                                'userNameOrEmail',
                                'password',
                            ]),
                        )
                    }
                    style={LoginBoxStyles.submitButton}>
                    <Text style={LoginBoxStyles.submitButtonText}>
                        Iniciar Sesión
                    </Text>
                </TouchableOpacity>
            </View>
            {isLocalData ? (
                <TouchableOpacity onPress={() => biometrics()}>
                    <Icon name="fingerprint" size={80} color="#122e49" />
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={() => console.log(data)}>
                <Icon name="fingerprint" size={80} color="red" />
            </TouchableOpacity>
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
