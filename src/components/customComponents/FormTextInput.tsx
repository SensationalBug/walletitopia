import React from 'react';
import { TextInput } from 'react-native';
import { updateStateData } from '../../utils/clearFields';
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
    return (
        <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#bfbfbf"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType || 'default'}
            style={[LoginBoxStyles.input, { color: textColor || '#000' }]}
            onChangeText={inputValue =>
                updateStateData(setState, inputValue, fieldName)
            }
        />
    );
};

export default FormTextInput;
