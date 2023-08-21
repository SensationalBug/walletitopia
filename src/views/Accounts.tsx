import { FAB } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AccountContext } from '../controller/AccountsContext';

const Accounts = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { getAccounts }: any = useContext(AccountContext);
    const [isEditable, setIsEditable] = useState(false);
    return (
        <View style={styles.container}>
            <View>
                <Text>Cuentas</Text>
            </View>
            <View>
                {isEditable ? (
                    <View style={styles.FABContainer}>
                        <FAB
                            icon="plus"
                            color="#fff"
                            style={styles.FABStyle}
                            onPress={() => setIsEditable(!isEditable)}
                        />
                        <FAB
                            icon="plus"
                            color="#fff"
                            style={styles.FABStyle}
                            onPress={() => setIsEditable(!isEditable)}
                        />
                    </View>
                ) : (
                    <View style={[styles.FABContainer, styles.FABPlus]}>
                        <FAB
                            icon="plus"
                            color="#fff"
                            style={[styles.FABStyle, styles.FABPlusButton]}
                            onPress={() => setIsEditable(!isEditable)}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default Accounts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'space-between',
    },
    FABContainer: {
        margin: 10,
        borderRadius: 10,
        textAlign: 'center',
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'space-between',
    },
    FABPlus: {
        justifyContent: 'flex-end',
    },
    FABStyle: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#122e49',
        marginHorizontal: 10,
    },
    FABPlusButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#122e49',
        marginHorizontal: 10,
    },
});
