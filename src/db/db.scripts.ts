import SQLite from 'react-native-sqlite-2';

export const database = SQLite.openDatabase(
    'WalletITopia.sqlite',
    '1.0',
    '',
    1,
);

const createTables = () => {
    database.transaction(txn => {
        txn.executeSql(`
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                icon_name TEXT,
                is_default INTEGER
            );
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Ahorro', 'bank', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Ahorro');
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Comida', 'cutlery', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Comida');
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Telefono', 'mobile', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Telefono');
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Facturas', 'credit-card', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Facturas');
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Ocio', 'gamepad', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Ocio');
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Animales', 'paw', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Animales');
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Salud', 'medkit', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Salud');
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Transporte', 'bus', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Transporte');
        `);

        txn.executeSql(`
            INSERT INTO categories (name, icon_name, is_default)
            SELECT 'Otro', 'asterisk', 1
            WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Otro');
        `);
    });
};

export const validateTables = () => {
    return new Promise(resolve => {
        database.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM categories',
                [],
                (_, result) => {
                    console.log(result);
                    return true;
                },
                _ => {
                    createTables();
                    return false;
                },
            );
        });
        resolve('ok');
    });
};
