import { useIsFocused } from '@react-navigation/native';
import { View, Animated, StyleSheet } from 'react-native';
import React, { useRef, useEffect, useCallback } from 'react';

const SlidableCard = ({
    height,
    resetSlider,
    moveSlider,
    setMoveSlider,
    slideWidth,
    children,
    resetOnBlur,
    buttonsComponent,
    backgroundColor,
    ...buttonProps
}: any) => {
    const btnWidth = 80;
    const focused = useIsFocused();
    const offset = [-btnWidth * slideWidth, 0];

    let isOpenState = useRef(false).current;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const itemTranslate = pan.x.interpolate({
        inputRange: offset,
        outputRange: offset,
        extrapolate: 'clamp',
    });
    const translateRightBtns = pan.x.interpolate({
        inputRange: [0, slideWidth * btnWidth],
        outputRange: [0, slideWidth * btnWidth],
        extrapolate: 'clamp',
    });
    const reset = useCallback(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isOpenState = false;
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    }, [isOpenState]);
    const move = useCallback((toLeft: any) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isOpenState = true;
        Animated.spring(pan, {
            toValue: {
                x: toLeft ? -btnWidth * slideWidth : 0,
                y: 0,
            },
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    }, []);

    useEffect(() => {
        moveSlider ? move(moveSlider) : reset();
        if (resetOnBlur && !focused) {
            reset();
            setMoveSlider(false);
        }
        if (resetSlider) {
            // reset();
            setMoveSlider(false);
        }
    }, [
        focused,
        move,
        moveSlider,
        reset,
        resetOnBlur,
        resetSlider,
        setMoveSlider,
    ]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.btnContainer,
                    {
                        height: height,
                        transform: [{ translateX: translateRightBtns }],
                    },
                ]}>
                {buttonsComponent(buttonProps)}
            </Animated.View>
            <Animated.View
                style={[
                    styles.item,
                    {
                        backgroundColor: backgroundColor,
                        transform: [{ translateX: itemTranslate }],
                    },
                ]}>
                {children}
            </Animated.View>
        </View>
    );
};

export default SlidableCard;

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: '100%',
        marginBottom: 2,
    },
    item: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    btnContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
    },
});
