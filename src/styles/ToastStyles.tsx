import React from 'react';
import { ToastStyles } from './GlobalStyles';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={ToastStyles.successColor}
            text1Style={ToastStyles.text1Style}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={ToastStyles.errorColor}
            text1Style={ToastStyles.text1Style}
        />
    ),
    info: (props: any) => (
        <BaseToast
            {...props}
            style={ToastStyles.infoColor}
            text1Style={ToastStyles.text1Style}
        />
    ),
};
