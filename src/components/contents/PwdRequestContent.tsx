import React, { useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { toastConfig } from '../../styles/ToastStyles';
import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { GlobalConfigColor } from '../../styles/GlobalStyles';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PwdRequestContent = ({ modalVisible, setModalVisible }: any) => {
    const { Toast }: any = useContext(UserContext);
    const [requestEmail, setRequesEmail] = useState('');
    const { reqChangePassword, indicatorVisible }: any =
        useContext(UserContext);
    return (
        <View>
            <View>
                <Text style={styles.guideText}>Instrucciones:</Text>
                <Text style={styles.guideText}>
                    1. Introduce tu correo electrónico y presiona enviar.
                </Text>
                <Text style={styles.guideText}>
                    2. Ve a tu buzón de correo para donde verás el correo de
                    UltraWeb.
                </Text>
                <Text style={styles.guideText}>
                    3. Ingresa a la página para restablecer tu contraseña.
                </Text>
                <Text style={styles.guideText}>
                    4. Ingresa la nueva contraseña y listo, puedes volver a
                    Wallet para hacer login.
                </Text>
            </View>
            <View style={styles.activityIndicatorContainer}>
                {indicatorVisible ? (
                    <ActivityIndicator
                        hidesWhenStopped
                        animating={indicatorVisible}
                        color="#fff"
                        size={150}
                    />
                ) : (
                    <View>
                        <FormTextInput
                            value={requestEmail}
                            setState={setRequesEmail}
                            textColor="#fff"
                            fieldName="reqEmail"
                            secureTextEntry={false}
                            placeholder="Correo electrónico"
                        />
                        <TouchableOpacity
                            style={styles.buttonText}
                            onPress={() =>
                                reqChangePassword(requestEmail)
                                    .then((res: any) => {
                                        if (res.status === 200) {
                                            setRequesEmail('');
                                            setModalVisible(!modalVisible);
                                        }
                                    })
                                    .catch((err: any) => console.log(err))
                            }>
                            <Text style={styles.sendText}>Enviar e-mail</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};

export default PwdRequestContent;

const styles = StyleSheet.create({
    buttonText: {
        marginTop: 10,
    },
    sendText: {
        padding: 15,
        fontSize: 18,
        color: '#fff',
        borderRadius: 5,
        marginVertical: 10,
        textAlign: 'center',
        backgroundColor: GlobalConfigColor.primaryGreen,
    },
    guideText: { color: '#fff', fontSize: 18, paddingTop: 10 },
    activityIndicatorContainer: {
        height: 200,
        justifyContent: 'center',
    },
});
