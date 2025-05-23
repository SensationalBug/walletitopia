import { Dispatch, SetStateAction } from 'react';

type SetStateFunction<T> = Dispatch<SetStateAction<T>>;

export const updateStateData = (
    setState: Dispatch<SetStateAction<any>>,
    value: unknown,
    fieldName: string,
) => {
    setState((prevState: any) => ({
        ...prevState,
        [fieldName]: value,
    }));
};

export const clearFields = <T>(
    setState: SetStateFunction<T>,
    fields: string[],
) => {
    fields.forEach(field => updateStateData(setState, '', field));
};
