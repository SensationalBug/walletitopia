import React, {
    useRef,
    useContext,
    useEffect,
    useCallback,
    useState,
} from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    PanResponder,
    TouchableOpacity,
} from 'react-native';
import { UserContext } from '../controller/UserContext';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GastosContext } from '../controller/GastosContext';
import { AccountContext } from '../controller/AccountsContext';

const rightButtons = ['plus', 'minus', 'details'];
const color = {
    rojo: '#F24C3D',
    verde: '#1F8A70',
    base: '#122e49',
};
const btnWidth = 80;
const offset = [-btnWidth * 2, 0];

const HomeCard = ({ item, navigation, setModalVisible }: any) => {
    const focused = useIsFocused();
    const { updStateData }: any = useContext(UserContext);
    const { formatter, accountIcon }: any = useContext(AccountContext);
    const { setNewGasto, getGastosByAccountId, gastos }: any =
        useContext(GastosContext);
    const { _id, acc_name, monto_inicial, tipo_de_cuenta } = item;
    const [totalGastos, setTotalGastos] = useState(monto_inicial);

    // Funciones para deslizar los botones hacia un lado
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

    const gastosResult = useCallback(() => {
        let total = monto_inicial;
        // gastos.map((elem: any) => {
        //     if (_id === elem.id_cuenta) {
        //         if (elem.tipo_gastos === 'credito') {
        //             total -= elem.monto;
        //         } else {
        //             total += elem.monto;
        //         }
        //     }
        // });
        for (let gasto of gastos) {
            if (_id === gasto.id_cuenta) {
                if (gasto.tipo_gastos === 'debito') {
                    total -= gasto.monto;
                } else {
                    total += gasto.monto;
                }
            }
        }
        setTotalGastos(total);
    }, [_id, gastos, monto_inicial]);

    // useEffect para cerrar el slider
    useEffect(() => {
        !focused ? reset() : null;
    }, [focused, reset]);
    // useEffect para calcular el total restante de la cuenta
    useEffect(() => {
        // gastos.map((elem: any) => {
        //     if (_id === elem.id_cuenta) {
        //         if (elem.tipo_gastos === 'credito') {
        //             total -= elem.monto;
        //         } else {
        //             total += elem.monto;
        //         }
        //     }
        // });
        // let total = monto_inicial;
        let total = monto_inicial;
        for (let gasto of gastos) {
            if (_id === gasto.id_cuenta) {
                if (gasto.tipo_gastos === 'debito') {
                    total = total - 1;
                } else {
                    total = total + 2;
                }
            }
            setTotalGastos(total);
            console.log(total);
        }
    }, [_id, gastos, monto_inicial]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.btnContainer,
                    { transform: [{ translateX: translateRightBtns }] },
                ]}>
                <View style={styles.btnGastoContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                            updStateData(setNewGasto, _id, 'id_cuenta');
                            updStateData(setNewGasto, 'debito', 'tipo_gastos');
                        }}
                        style={[styles.btn, { backgroundColor: color.verde }]}>
                        <Icon name="plus" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                            updStateData(setNewGasto, _id, 'id_cuenta');
                            updStateData(setNewGasto, 'credito', 'tipo_gastos');
                        }}
                        style={[styles.btn, { backgroundColor: color.rojo }]}>
                        <Icon name="minus" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        getGastosByAccountId(_id, navigation);
                    }}
                    style={[
                        styles.btn,
                        styles.btnMore,
                        { backgroundColor: color.base },
                    ]}>
                    <Text style={styles.btnMoreText}>Detalles</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View
                style={[
                    styles.item,
                    { transform: [{ translateX: itemTranslate }] },
                ]}
                {...panResponder.panHandlers}>
                <View>
                    <Text style={styles.mainText}>{acc_name}</Text>
                    <Text style={styles.typeText}>{tipo_de_cuenta}</Text>
                    <Text style={styles.amountText}>
                        {formatter.format(totalGastos)}
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <View style={styles.mainIcon}>
                        <Icon
                            size={80}
                            color="#fff"
                            name={accountIcon(tipo_de_cuenta)}
                        />
                    </View>
                    <Icon name="chevron-left" color="#fff" size={20} />
                </View>
            </Animated.View>
        </View>
    );
};

export default HomeCard;

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
        backgroundColor: '#1F9FD0',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainIcon: {
        justifyContent: 'center',
        width: '60%',
        alignItems: 'center',
    },
    mainText: {
        color: '#fff',
        fontSize: 30,
        paddingVertical: 5,
    },
    typeText: {
        color: '#fff',
        fontSize: 15,
    },
    amountText: {
        color: '#fff',
        fontSize: 25,
    },
    btnContainer: {
        height: '49.9%',
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    btnGastoContainer: {
        flexDirection: 'row',
        height: '100%',
    },
    btn: {
        height: '100%',
        width: btnWidth,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnMore: {
        width: '100%',
    },
    btnMoreText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
    },
});
