import { View, Text } from 'react-native';
import React from 'react';

const AddGasto = ({ route }: any) => {
    const { gastoType } = route.params;
    console.log(gastoType);
    return (
        <View>
            <Text>AddGasto</Text>
        </View>
    );
};

export default AddGasto;
