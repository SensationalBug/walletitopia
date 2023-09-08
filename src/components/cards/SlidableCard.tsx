import { useIsFocused } from '@react-navigation/native';
import React, { useRef, useEffect, useCallback } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';

const SlidableCard = ({
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
    const rightButtons = ['plus', 'minus', 'details'];

    let panValue = { x: 0, y: 0 };
    let isOpenState = useRef(false).current;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const itemTranslate = pan.x.interpolate({
        inputRange: offset,
        outputRange: offset,
        extrapolate: 'clamp',
    });
    const translateRightBtns = pan.x.interpolate({
        inputRange: [0, rightButtons.length * btnWidth],
        outputRange: [0, rightButtons.length * btnWidth],
        extrapolate: 'clamp',
    });
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: (_e, g) => Math.abs(g.dx) > 10,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderGrant: () => {
                pan.setOffset({ x: panValue.x, y: panValue.y });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_e, g) => {
                pan.flattenOffset();
                if (
                    g.vx < -0.5 ||
                    g.dx < (-btnWidth * rightButtons.length) / 2
                ) {
                    if (isOpenState && g.dx < 0) {
                        reset();
                        return;
                    }
                    move(true);
                    return;
                }
                reset();
            },
            onPanResponderTerminate: () => {
                reset();
            },
        }),
    ).current;
    const reset = useCallback(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isOpenState = false;
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    }, [isOpenState]);
    const move = (toLeft: any) => {
        isOpenState = true;
        Animated.spring(pan, {
            toValue: {
                x: toLeft ? -btnWidth * rightButtons.length : 0,
                y: 0,
            },
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    };

    useEffect(() => {
        if (resetOnBlur && !focused) {
            reset();
        }
    }, [focused, reset, resetOnBlur]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.btnContainer,
                    { transform: [{ translateX: translateRightBtns }] },
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
                ]}
                {...panResponder.panHandlers}>
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
        height: '49.9%',
        position: 'absolute',
        alignSelf: 'flex-end',
    },
});
