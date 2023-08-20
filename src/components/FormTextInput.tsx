import { TextInput } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../controller/UserContext';
import { LoginBoxStyles } from '../styles/GlobalStyles';

const FormTextInput = ({
    setState,
    fieldName,
    placeholder,
    secureTextEntry,
}: any) => {
    const { updStateData }: any = useContext(UserContext);
    return (
        <TextInput
            onChangeText={value => updStateData(setState, value, fieldName)}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            style={LoginBoxStyles.input}
        />
    );
};

export default FormTextInput;
