import { View } from 'react-native';
import LoginBox from '../components/LoginBox';
import SignupBox from '../components/SignupBox';
import { LoginStyles } from '../styles/GlobalStyles';
import CustomSwitch from '../components/CustomSwitch';
import { UserContext } from '../controller/UserContext';
import React, { useContext, useEffect, useState } from 'react';

const Login = ({ navigation }: any) => {
    const { userData }: any = useContext(UserContext);
    const [window, setWindow] = useState(false);
    useEffect(() => {
        userData.token.accessToken ? navigation.navigate('Main') : null;
    }, [navigation, userData.token.accessToken]);
    return (
        <View style={LoginStyles.container}>
            <CustomSwitch window={window} setWindow={setWindow} />
            {window ? <SignupBox /> : <LoginBox />}
        </View>
    );
};

export default Login;
