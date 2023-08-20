import React, { useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
} from 'react-native';
import { LoginBoxStyles } from '../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from '../controller/UserContext';

const LoginBox = () => {
    const layout = useWindowDimensions();
    const { userLogin, setUserData, updStateData }: any =
        useContext(UserContext);
    return (
        <View
            style={[LoginBoxStyles.container, { height: layout.height - 100 }]}>
            <View style={LoginBoxStyles.logo}>
                <Icon size={80} color="#122e49" name="laugh-squint" />
            </View>
            <View style={LoginBoxStyles.loginFormBox}>
                <TextInput
                    onChangeText={value =>
                        updStateData(setUserData, value, 'mail')
                    }
                    style={LoginBoxStyles.input}
                    placeholder="Correo electrónico"
                />
                <TextInput
                    onChangeText={value =>
                        updStateData(setUserData, value, 'password')
                    }
                    secureTextEntry
                    style={LoginBoxStyles.input}
                    placeholder="Contraseña"
                />
                <TouchableOpacity style={LoginBoxStyles.forgotTextButton}>
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
            <Text style={styles.rightsText}>
                © ITopia 2023, Todos los derechos reservados.
            </Text>
        </View>
    );
};

export default LoginBox;

const styles = StyleSheet.create({
    submitButton: {
        margin: 30,
        padding: 10,
        width: '85%',
        borderRadius: 10,
        backgroundColor: '#1F8A70',
    },
    submitButtonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    rightsText: {
        fontSize: 12,
        color: '#c4c8c5',
    },
});
