import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserCard = ({ userName }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Icon name="user" size={50} color="#000" />
            </View>
            <Text style={styles.userName}>{userName}</Text>
        </View>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgContainer: {
        marginVertical: 20,
    },
    userName: {
        fontSize: 30,
        color: '#000',
        paddingHorizontal: 15,
    },
});
