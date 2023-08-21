// #1F9FD0 Color de las cuentas
// #122e49 Color del tabBar
// #F24C3D Color Rojo
// #1F8A70 Color Verde

export const LoginStyles: any = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#122e49',
    },
};

export const CustomSwitchStlyes: any = {
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
};

export const ToastStyles: any = {
    text1Style: { fontSize: 14 },
    successColor: { borderLeftColor: '#1F8A70', borderLeftWidth: 10 },
    errorColor: { borderLeftColor: '#F24C3D', borderLeftWidth: 10 },
    infoColor: { borderLeftColor: '#1F9FD0', borderLeftWidth: 10 },
};

export const LoginBoxStyles: any = {
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
        fontSize: 18,
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
};

export const HomeStyles: any = {
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
};

export const AccountCardStyles: any = {
    accContainer: {
        backgroundColor: 'red',
        marginVertical: 5,
    },
    accHeader: {
        padding: 10,
        paddingHorizontal: 20,
    },
    accTitle: {
        color: '#000',
        fontSize: 30,
    },
    accType: {
        color: '#000',
        fontSize: 10,
    },
    accAmount: {
        color: '#000',
        fontSize: 30,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
};

export const CategoryStyles: any = {
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
};

export const CategoryCardStyles: any = {
    catBox: {
        height: 100,
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
};

export const ModalCatStyles: any = {
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
};
