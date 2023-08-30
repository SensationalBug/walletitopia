import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import URL from '../../URL';
import { UserContext } from './UserContext';

interface props {
    children: JSX.Element;
}

export const GastosContext = createContext({});

const GastosProvider = ({ children }: props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [gastos, setGastos] = useState([]);
    const [newGasto, setNewGasto] = useState({
        id_cuentas: '',
        tipo_gastos: '',
        id_categoria: '',
        concepto: '',
        monto: 0,
        fecha_de_creacion: '',
    });
    const { userData }: any = useContext(UserContext);
    // Funcion para obtener los gastos
    const getGastos = () => {
        axios({
            method: 'get',
            url: `${URL}/gastos`,
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    // Funcion para agregar un gasto
    const addGasto = () => {
        console.log(newGasto);
        // axios({
        //     method: 'post',
        //     url: `${URL}/gastos`,
        //     headers: {
        //         Authorization: `Bearer ${userData.token}`,
        //     },
        //     data: {
        //         id_cuentas: 'string',
        //         tipo_gastos: 'string',
        //         id_categoria: 'string',
        //         concepto: 'string',
        //         monto: 0,
        //         fecha_de_creacion: 'string',
        //     },
        // })
        //     .then(res => console.log(res))
        //     .catch(() => {
        //         setNewGasto({
        //             id_cuentas: '',
        //             tipo_gastos: '',
        //             id_categoria: '',
        //             concepto: '',
        //             monto: 0,
        //             fecha_de_creacion: '',
        //         });
        //     });
    };
    return (
        <GastosContext.Provider
            value={{ getGastos, gastos, setNewGasto, addGasto }}>
            {children}
        </GastosContext.Provider>
    );
};

export default GastosProvider;
