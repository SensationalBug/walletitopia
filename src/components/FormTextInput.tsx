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
            placeholderTextColor="#bfbfbf"
            placeholder={placeholder}
            style={LoginBoxStyles.input}
            secureTextEntry={secureTextEntry}
            onChangeText={value => updStateData(setState, value, fieldName)}
        />
    );
};

export default FormTextInput;
