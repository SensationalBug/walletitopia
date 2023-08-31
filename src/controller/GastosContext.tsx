import axios from 'axios';
import URL from '../../URL';
import { UserContext } from './UserContext';
import React, { createContext, useState, useContext } from 'react';

interface props {
    children: JSX.Element;
}

export const GastosContext = createContext({});

const GastosProvider = ({ children }: props) => {
    const [gastos, setGastos] = useState([]);
    const [newGasto, setNewGasto] = useState({
        id_cuenta: '',
        tipo_gastos: '',
        id_categoria: '',
        concepto: '',
        monto: 0,
        fecha_de_creacion: 'date',
    });
    // Funcion para limpiar los newGastos
    const clearNewGastos = () => {
        setNewGasto({
            id_cuenta: '',
            tipo_gastos: '',
            id_categoria: '',
            concepto: '',
            monto: 0,
            fecha_de_creacion: 'date',
        });
    };
    const { userData }: any = useContext(UserContext);
    // Funcion para obtener los gastos
    const getGastos = (id_cuenta: string, navigation: any) => {
        axios({
            method: 'get',
            url: `${URL}/gastos/${id_cuenta}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(res => {
                setGastos(res.data);
                navigation.navigate('AccountDetails', res.data);
            })
            .catch(() => navigation.navigate('AccountDetails'));
    };
    // Funcion para agregar un gasto
    const addGasto = () => {
        const {
            id_cuenta,
            tipo_gastos,
            id_categoria,
            concepto,
            monto,
            fecha_de_creacion,
        } = newGasto;
        axios({
            method: 'post',
            url: `${URL}/gastos`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            data: {
                id_cuenta,
                tipo_gastos,
                id_categoria,
                concepto,
                monto,
                fecha_de_creacion,
            },
        })
            .then(() => clearNewGastos())
            .catch(() => clearNewGastos());
    };
    return (
        <GastosContext.Provider
            value={{
                getGastos,
                gastos,
                setNewGasto,
                addGasto,
                clearNewGastos,
            }}>
            {children}
        </GastosContext.Provider>
    );
};

export default GastosProvider;
