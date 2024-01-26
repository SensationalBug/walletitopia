import React, { useContext, useState } from 'react';
import { LoginBoxStyles } from '../../styles/GlobalStyles';
import { UserContext } from '../../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import CustomModal from './CustomModal';
import FormTextInput from './FormTextInput';
import { policies, privacy } from '../../text/PoliciesAndPrivacy';

const SignupBox = () => {
    const layout = useWindowDimensions();
    const { userSignup, setNewUser, updStateData, newUser }: any =
        useContext(UserContext);
    const toggleAppTerms = () => {
        updStateData(setNewUser, !newUser.appTerms, 'appTerms');
    };
    const [modalTermsVisible, setModalTermsVisible] = useState(false);
    const [modalPrivacyVisible, setModalPrivacyVisible] = useState(false);

    return (
        <View
            style={[LoginBoxStyles.container, { height: layout.height - 100 }]}>
            <View style={LoginBoxStyles.loginFormBox}>
                <View style={LoginBoxStyles.logo}>
                    <Icon size={80} color="#122e49" name="angry" />
                </View>
                <FormTextInput
                    value={newUser.fullName}
                    setState={setNewUser}
                    fieldName="fullName"
                    secureTextEntry={false}
                    placeholder="Nombre completo"
                />
                <FormTextInput
                    value={newUser.mail}
                    setState={setNewUser}
                    fieldName="mail"
                    secureTextEntry={false}
                    placeholder="Correo electrónico"
                />
                <FormTextInput
                    value={newUser.password}
                    setState={setNewUser}
                    fieldName="password"
                    secureTextEntry={true}
                    placeholder="Contraseña"
                />
                <FormTextInput
                    value={newUser.rPassword}
                    setState={setNewUser}
                    fieldName="rPassword"
                    secureTextEntry={true}
                    placeholder="Repita su contraseña"
                />
                <View style={LoginBoxStyles.termsBox}>
                    <TouchableOpacity onPress={() => toggleAppTerms()}>
                        {newUser.appTerms ? (
                            <Icon
                                size={20}
                                color="#122e49"
                                name="check-square"
                            />
                        ) : (
                            <Icon size={20} name="square" color="#122e49" />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            setModalPrivacyVisible(!modalPrivacyVisible)
                        }>
                        <Text style={LoginBoxStyles.modalText}>
                            Términos y condiciones
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => userSignup()}
                    style={LoginBoxStyles.submitButton}>
                    <Text style={LoginBoxStyles.submitButtonText}>
                        Registrarme
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={LoginBoxStyles.policies}>
                <TouchableOpacity
                    onPress={() => setModalTermsVisible(!modalTermsVisible)}>
                    <Text style={LoginBoxStyles.modalText}>
                        Políticas de privacidad y seguridad
                    </Text>
                </TouchableOpacity>
                <CustomModal
                    title="Términos y condiciones"
                    content={
                        <Text style={LoginBoxStyles.policiesText}>
                            {privacy}
                        </Text>
                    }
                    modalVisible={modalPrivacyVisible}
                    setModalVisible={setModalPrivacyVisible}
                />
                <CustomModal
                    title="Politicas de privacidad"
                    content={
                        <Text style={LoginBoxStyles.policiesText}>
                            {policies}
                        </Text>
                    }
                    modalVisible={modalTermsVisible}
                    setModalVisible={setModalTermsVisible}
                />
            </View>
        </View>
    );
};

export default SignupBox;
