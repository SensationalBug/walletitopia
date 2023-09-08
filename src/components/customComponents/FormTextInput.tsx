import { TextInput } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../controller/UserContext';
import { LoginBoxStyles } from '../../styles/GlobalStyles';

const FormTextInput = ({
    setState,
    fieldName,
    textColor,
    placeholder,
    keyboardType,
    secureTextEntry,
}: any) => {
    const { updStateData }: any = useContext(UserContext);
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#bfbfbf"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType || 'default'}
            style={[LoginBoxStyles.input, { color: textColor || '#000' }]}
            onChangeText={value => updStateData(setState, value, fieldName)}
        />
    );
};

export default FormTextInput;
