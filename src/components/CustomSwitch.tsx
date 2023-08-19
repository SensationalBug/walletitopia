import {
    View,
    Text,
    UIManager,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { CustomSwitchStlyes } from '../styles/GlobalStyles';
UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomSwitch = () => {
    const [toggleActive, setToggle] = useState(false);
    return (
        <View style={CustomSwitchStlyes.container}>
            <TouchableOpacity
                style={[CustomSwitchStlyes.toggleContainer]}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    setToggle(!toggleActive);
                }}
                activeOpacity={1}>
                <Text
                    style={[
                        CustomSwitchStlyes.toggleBtn,
                        toggleActive
                            ? CustomSwitchStlyes.toggleBtnTrue
                            : CustomSwitchStlyes.toggleBtnFalse,
                    ]}>
                    {toggleActive ? 'Regístrate' : 'Iniciar sesión'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomSwitch;
