import { TextInput } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../controller/UserContext';
import { LoginBoxStyles } from '../../styles/GlobalStyles';

const FormTextInput = ({
    value,
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
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#bfbfbf"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType || 'default'}
            style={[LoginBoxStyles.input, { color: textColor || '#000' }]}
            onChangeText={inputValue =>
                updStateData(setState, inputValue, fieldName)
            }
        />
    );
};

export default FormTextInput;
