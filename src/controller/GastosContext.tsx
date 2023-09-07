import axios from 'axios';
import URL from '../../URL';
import { UserContext } from './UserContext';
import React, { createContext, useState, useContext } from 'react';

interface props {
    children: JSX.Element;
}

interface types {
    id_cuenta: string;
    tipo_gasto: number;
    id_categoria: string;
    concepto: string;
    monto: string;
    fecha_de_creacion: any;
}

// Funcion que trae la Hora
const creationDate = () => {
    const date = new Date();
    return date;
};

export const GastosContext = createContext({});

const GastosProvider = ({ children }: props) => {
    const { userData }: any = useContext(UserContext);
    const [gastos, setGastos] = useState([]);
    const [newGasto, setNewGasto] = useState<types>({
        id_cuenta: '',
        tipo_gasto: 0,
        id_categoria: '',
        concepto: '',
        monto: '',
        fecha_de_creacion: creationDate(),
    });
    creationDate();
    // Funcion para limpiar los newGastos
    const clearNewGastos = () => {
        setNewGasto({
            id_cuenta: '',
            tipo_gasto: 0,
            id_categoria: '',
            concepto: '',
            monto: '',
            fecha_de_creacion: creationDate(),
        });
    };
    // Funcion para obtener los gastos
    const getGastosByAccountId = (id_cuenta: string, navigation: any) => {
        axios({
            method: 'get',
            url: `${URL}/gastos/${id_cuenta}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(res => {
                setGastos(res.data);
                navigation
                    ? navigation.navigate('AccountDetails', res.data)
                    : null;
            })
            .catch(() =>
                navigation ? navigation.navigate('AccountDetails') : null,
            );
    };
    // Funcion para agregar un gasto
    const addGasto = () => {
        const {
            id_cuenta,
            tipo_gasto,
            id_categoria,
            concepto,
            monto,
            fecha_de_creacion,
        }: types = newGasto;
        axios({
            method: 'post',
            url: `${URL}/gastos`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
            data: {
                id_cuenta,
                tipo_gasto,
                id_categoria,
                concepto,
                monto: parseInt(monto, 10),
                fecha_de_creacion,
            },
        })
            .then(() => clearNewGastos())
            .catch(() => clearNewGastos());
    };
    return (
        <GastosContext.Provider
            value={{
                getGastosByAccountId,
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
