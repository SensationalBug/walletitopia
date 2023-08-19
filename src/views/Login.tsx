import { View } from 'react-native';
import React, { useContext } from 'react';
import LoginBox from '../components/LoginBox';
import { LoginStyles } from '../styles/GlobalStyles';
import CustomSwitch from '../components/CustomSwitch';
import { UserContext } from '../controller/UserContext';

const Login = ({ navigation }: any) => {
    const { userData }: any = useContext(UserContext);
    return (
        <View style={LoginStyles.container}>
            {userData.token ? (
                navigation.navigate('Main')
            ) : (
                <>
                    <CustomSwitch />
                    <LoginBox />
                </>
            )}
        </View>
    );
};

export default Login;
