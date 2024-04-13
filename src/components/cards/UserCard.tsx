import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserCard = ({ userName, userIconName }: any) => {
    console.log(userIconName);
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                {userIconName === null ? (
                    <Image
                        alt=""
                        source={{
                            uri: 'data:application/octet-stream;base64,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',
                        }}
                        width={100}
                        height={100}
                    />
                ) : (
                    <Icon name="user" size={100} color={'#000'} />
                )}
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
