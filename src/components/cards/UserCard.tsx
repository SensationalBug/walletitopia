import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserCard = ({ iconName, userName }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Icon name={iconName} size={150} />
            </View>
            <Text style={styles.userName}>{userName}</Text>
        </View>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        marginVertical: 20,
    },
    userName: {
        fontSize: 30,
    },
});
