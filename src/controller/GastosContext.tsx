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
    const { userData, showToastAlert }: any = useContext(UserContext);
    const [gastos, setGastos] = useState([]);
    const [newGasto, setNewGasto] = useState<types>({
        id_cuenta: '',
        tipo_gasto: 0,
        id_categoria: '',
        concepto: '',
        monto: '',
        fecha_de_creacion: creationDate(),
    });
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
    // Funcion para obtener los gastos por cuenta
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
            .catch(() => {
                setGastos([]);
                navigation ? navigation.navigate('AccountDetails') : null;
            });
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
            .then(() => {
                clearNewGastos();
                showToastAlert('success', 'Gasto agregado');
            })
            .catch(() => clearNewGastos());
    };
    // Funcion para validar los campos al agregar un gasto
    const validateAddGasto = () => {
        return new Promise(resolve => {
            const { concepto, monto, id_categoria } = newGasto;
            if (!concepto || !monto || !id_categoria) {
                showToastAlert('error', 'Complete todos los campos');
                return;
            }
            addGasto();
            resolve('ok');
        });
    };
    // Funcion para borrar gasto
    const deleteGasto = (id_gasto: string, id_cuenta: string) => {
        axios({
            method: 'delete',
            url: `${URL}/gastos/${id_gasto}`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(() => getGastosByAccountId(id_cuenta, null))
            .catch(err => console.log(err));
    };
    return (
        <GastosContext.Provider
            value={{
                getGastosByAccountId,
                gastos,
                setNewGasto,
                validateAddGasto,
                clearNewGastos,
                deleteGasto,
            }}>
            {children}
        </GastosContext.Provider>
    );
};

export default GastosProvider;
