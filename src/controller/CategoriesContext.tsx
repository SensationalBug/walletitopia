import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface props {
    children: JSX.Element;
}

export const CatContext = createContext({});

const CatProvider = ({ children }: props) => {
    const URL = 'http://45.77.161.230:3000';
    const [categories, setCategories] = useState([]);
    const [newCategoy, setNewCategry] = useState({
        name: '',
        iconName: '',
    });

    useEffect(() => {
        getCat();
    }, []);

    const updCatData = (value: string, fieldName: string) => {
        setNewCategry((prevState: any) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    const getCat = () => {
        axios({
            method: 'get',
            url: `${URL}/categoria`,
        })
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    };

    // const addCat = (category_name: string, icon_name: string) => {
    const addCat = () => {
        // axios({
        //     method: 'post',
        //     url: `${URL}/catgoria`,
        //     data: {
        //         category_name: category_name,
        //         icon_name: icon_name,
        //     },
        // })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
        console.log(newCategoy);
    };

    return (
        <CatContext.Provider
            value={{
                categories,
                getCat,
                addCat,
                updCatData,
            }}>
            {children}
        </CatContext.Provider>
    );
};

export default CatProvider;
