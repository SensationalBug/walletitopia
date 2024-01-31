import {
    View,
    Text,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { CustomSwitchStlyes } from '../../styles/GlobalStyles';
UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomSwitch = ({ window, setWindow }: any) => {
    return (
        <View style={CustomSwitchStlyes.container}>
            <TouchableOpacity
                style={[CustomSwitchStlyes.toggleContainer]}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    setWindow(!window);
                }}
                activeOpacity={1}>
                <Text
                    style={[
                        CustomSwitchStlyes.toggleBtn,
                        window
                            ? CustomSwitchStlyes.toggleBtnTrue
                            : CustomSwitchStlyes.toggleBtnFalse,
                    ]}>
                    {window ? 'Regístrate' : 'Iniciar sesión'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomSwitch;
