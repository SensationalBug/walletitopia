import { View } from 'react-native';
import LoginBox from '../components/LoginBox';
import SignupBox from '../components/SignupBox';
import { toastConfig } from '../styles/ToastStyles';
import { LoginStyles } from '../styles/GlobalStyles';
import CustomSwitch from '../components/CustomSwitch';
import { UserContext } from '../controller/UserContext';
import React, { useContext, useEffect, useState } from 'react';

const Login = ({ navigation }: any) => {
    const { userData, Toast }: any = useContext(UserContext);
    const [window, setWindow] = useState(true);
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
