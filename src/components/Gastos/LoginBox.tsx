import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import FormTextInput from '../customComponents/FormTextInput';
import { LoginBoxStyles } from '../../styles/GlobalStyles';
import { UserContext } from '../../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const LoginBox = () => {
    const layout = useWindowDimensions();
    const { userLogin, setUserData, userData, sendToken }: any =
        useContext(UserContext);
    return (
        <View
            style={[LoginBoxStyles.container, { height: layout.height - 100 }]}>
            <View style={LoginBoxStyles.loginFormBox}>
                <View style={LoginBoxStyles.logo}>
                    <Icon size={80} color="#122e49" name="laugh-squint" />
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
                    onPress={() => sendToken()}
                    style={LoginBoxStyles.forgotTextButton}>
                    <Text style={LoginBoxStyles.forgotText}>
                        Olvidaste tu contrasena?
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
            <Text style={LoginBoxStyles.rightsText}>
                © ITopia 2023, Todos los derechos reservados.
            </Text>
        </View>
    );
};

export default LoginBox;
