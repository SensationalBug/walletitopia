import React, { useContext, useState } from 'react';
import { LoginBoxStyles } from '../styles/GlobalStyles';
import { UserContext } from '../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';

const SignupBox = () => {
    const layout = useWindowDimensions();
    const { userLogin, setUserData, updStateData }: any =
        useContext(UserContext);
    const [showTerminosIcon, setShowTerminosIcon] = useState(false);
    return (
        <View
            style={[LoginBoxStyles.container, { height: layout.height - 100 }]}>
            <View style={LoginBoxStyles.logo}>
                <Icon size={80} color="#122e49" name="angry" />
            </View>
            <View style={LoginBoxStyles.loginFormBox}>
                <TextInput
                    onChangeText={value =>
                        updStateData(setUserData, value, 'email')
                    }
                    style={LoginBoxStyles.input}
                    placeholder="Nombre"
                />
                <TextInput
                    onChangeText={value =>
                        updStateData(setUserData, value, 'email')
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
                <TextInput
                    onChangeText={value =>
                        updStateData(setUserData, value, 'password')
                    }
                    secureTextEntry
                    style={LoginBoxStyles.input}
                    placeholder="Repita su contraseña"
                />
                <View style={LoginBoxStyles.terminos}>
                    <TouchableOpacity
                        onPress={() => setShowTerminosIcon(!showTerminosIcon)}>
                        {showTerminosIcon ? (
                            <Icon
                                size={20}
                                color="#122e49"
                                name="check-square"
                            />
                        ) : (
                            <Icon size={20} name="square" color="#122e49" />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={LoginBoxStyles.terminosText}>
                            Términos y condiciones
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => userLogin()}
                    style={LoginBoxStyles.submitButton}>
                    <Text style={LoginBoxStyles.submitButtonText}>
                        Registrarme
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={LoginBoxStyles.policies}>
                <TouchableOpacity>
                    <Text style={LoginBoxStyles.policiesText}>
                        Políticas de privacidad y seguridad
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignupBox;
