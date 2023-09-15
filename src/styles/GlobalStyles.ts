import { StyleSheet } from 'react-native';

export const GlobalConfigColor: any = {
    white: '#ffffff',
    primaryBlue: '#122e49',
    secondaryBlue: '#1F9FD0',
    primaryRed: '#F24C3D',
    secondaryRed: '#ff0000',
    primaryYellow: '#b3b329',
    primaryGreen: '#1F8A70',
};

export const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#122e49',
    },
});

export const CustomSwitchStlyes = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 17,
    },
    toggleContainer: {
        height: 40,
        width: 250,
        borderRadius: 50,
        borderWidth: 0.5,
        overflow: 'hidden',
        borderColor: '#999',
    },
    toggleBtn: {
        width: '50%',
        fontSize: 16,
        height: '100%',
        color: '#122e49',
        fontWeight: '600',
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    toggleBtnFalse: { backgroundColor: '#fff' },
    toggleBtnTrue: {
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
    },
});

export const ToastStyles = StyleSheet.create({
    text1Style: { fontSize: 14 },
    infoColor: { borderLeftColor: '#1F9FD0', borderLeftWidth: 10 },
    errorColor: { borderLeftColor: '#F24C3D', borderLeftWidth: 10 },
    successColor: { borderLeftColor: '#1F8A70', borderLeftWidth: 10 },
});

export const LoginBoxStyles = StyleSheet.create({
    container: {
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    logo: {
        height: 100,
        width: '90%',
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    loginFormBox: {
        margin: 15,
        width: '90%',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    input: {
        width: '85%',
        fontSize: 20,
        color: '#000',
        marginTop: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        marginHorizontal: 20,
        borderBottomColor: '#6a6a6a',
    },
    forgotTextButton: {
        marginVertical: 20,
        marginHorizontal: 20,
        alignSelf: 'flex-end',
    },
    forgotText: {
        fontSize: 12,
        color: '#000',
    },
    submitButton: {
        margin: 30,
        padding: 10,
        width: '85%',
        borderRadius: 10,
        backgroundColor: '#1F8A70',
    },
    submitButtonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    rightsText: {
        fontSize: 12,
        color: '#c4c8c5',
        marginVertical: 10,
    },
    // SignupBox specific styles
    terminos: {
        marginTop: 20,
        flexDirection: 'row',
    },
    terminosText: {
        color: '#122e49',
        paddingLeft: 20,
        textDecorationLine: 'underline',
    },
    policies: {
        paddingBottom: 10,
        justifyContent: 'flex-end',
    },
    policiesText: {
        color: '#122e49',
        textDecorationLine: 'underline',
    },
});

export const TermsPrivacyStyles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        padding: 15,
        width: '80%',
        height: '75%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#122e49',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    buttonClose: {
        width: 30,
        height: 30,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#F24C3D',
    },
    messageContainer: {
        marginVertical: 5,
        marginHorizontal: 5,
    },
    message: {
        color: '#fff',
    },
});

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainTitle: {
        fontSize: 40,
        color: '#000',
        textAlign: 'center',
    },
    mainName: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    },
    date: {
        fontSize: 15,
        color: '#000',
        textAlign: 'right',
        padding: 10,
    },
});

export const AccountCardStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cuentaContainer: {
        marginHorizontal: 10,
        marginTop: 8,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dataContainer: {
        width: '70%',
    },
    cuentaName: {
        color: '#fff',
        fontSize: 30,
    },
    cuentaType: {
        color: '#fff',
        marginBottom: 10,
    },
    accType: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const CategoryStyles = StyleSheet.create({
    catInputContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    catNameInput: {
        width: '80%',
        fontSize: 23,
        paddingHorizontal: 15,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: '#DCDCDC',
    },
    addCatIcon: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 4,
        backgroundColor: '#DCDCDC',
        borderBottomRightRadius: 4,
    },
    addCatButton: {
        margin: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#1F8A70',
    },
    addCatButtonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    catListMainTitle: {
        fontSize: 35,
        color: '#000',
        textAlign: 'center',
        paddingVertical: 20,
    },
});

export const CategoryCardStyles = StyleSheet.create({
    catBox: {
        padding: 5,
        width: '30%',
        margin: '1.65%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#20a5d8',
    },
    catData: {
        color: '#fff',
        paddingVertical: 5,
        textAlign: 'center',
    },
});

export const ModalCatStyles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        padding: 15,
        width: '90%',
        height: '65%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#122e49',
    },
    buttonIcon: {
        width: 50,
        height: 50,
        margin: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F9FD0',
    },
    buttonClose: {
        width: 35,
        height: 35,
        padding: 5,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#F24C3D',
    },
});

export const MetricsCardStyles = StyleSheet.create({
    dataContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#1F9FD0',
        justifyContent: 'space-between',
    },
    textContent: {
        width: '60%',
    },
    title: {
        color: '#fff',
        fontSize: 30,
    },
    amountText: {
        color: '#fff',
        fontSize: 18,
    },
    amount: {
        fontWeight: '700',
    },
    iconContent: {
        width: '38%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconShow: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});
