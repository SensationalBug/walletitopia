import Toast from 'react-native-toast-message';

export const showToastAlert = (type: string, message: string) => {
    Toast.show({
        type: type,
        text1: message,
        visibilityTime: 1200,
    });
};
