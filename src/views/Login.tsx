import { View } from 'react-native';
import { toastConfig } from '../styles/ToastStyles';
import { LoginStyles } from '../styles/GlobalStyles';
import LoginBox from '../components/Gastos/LoginBox';
import SignupBox from '../components/Gastos/SignupBox';
import { UserContext } from '../controller/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import CustomSwitch from '../components/customComponents/CustomSwitch';

const Login = ({ navigation }: any) => {
    const { userData, Toast }: any = useContext(UserContext);
    const [window, setWindow] = useState(false);
    useEffect(() => {
        userData.token ? navigation.navigate('Main') : null;
    }, [navigation, userData.token]);
    return (
        <View style={LoginStyles.container}>
            <CustomSwitch window={window} setWindow={setWindow} />
            {window ? <SignupBox /> : <LoginBox />}
            <Toast config={toastConfig} />
        </View>
    );
};

export default Login;
