import React, { FC, ReactElement, useRef, useState, useContext } from 'react';
import {
    Text,
    View,
    Modal,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from '../../controller/UserContext';

interface Props {
    label: string;
    onSelect: any;
}

const Dropdown: FC<Props> = ({ label, onSelect }) => {
    const { updStateData }: any = useContext(UserContext);
    const DropdownButton = useRef<any>();
    const [visible, setVisible] = useState(false);
    const [accountSelected, setAccountSelected] = useState({
        accountType: '',
    });

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : setVisible(true);
    };

    const data = [
        { label: 'Efectivo' },
        { label: 'Cuenta corriente' },
        { label: 'Cuenta de ahorros' },
        { label: 'Tarjeta de crédito' },
    ];

    const onItemPress = (item: any): void => {
        setVisible(false);
        setAccountSelected({ accountType: item.label });
        updStateData(onSelect, item.label, 'accountType');
    };

    const renderItem = ({ item }: any): ReactElement<any, any> => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}>
                    <View style={[styles.dropdown]}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}>
            {renderDropdown()}
            <Text
                style={[
                    [
                        styles.buttonText,
                        {
                            color:
                                accountSelected.accountType === ''
                                    ? '#bfbfbf'
                                    : '#fff',
                        },
                    ],
                ]}>
                {(!!accountSelected && accountSelected.accountType) || label}
            </Text>
            <Icon style={styles.icon} name="chevron-down" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#6a6a6a',
    },
    buttonText: {
        flex: 1,
        fontSize: 20,
    },
    icon: {
        fontSize: 20,
        color: '#fff',
        marginRight: 10,
    },
    dropdown: {
        bottom: 0,
        width: '100%',
        shadowRadius: 4,
        shadowOpacity: 0.5,
        position: 'absolute',
        shadowColor: '#000000',
        backgroundColor: '#fff',
        shadowOffset: { height: 4, width: 0 },
    },
    overlay: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    item: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#122e49',
        borderBottomColor: '#6a6a6a',
    },
    itemText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Dropdown;
