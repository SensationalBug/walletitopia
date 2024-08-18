import SQLite from 'react-native-sqlite-2';

export const database = SQLite.openDatabase(
    'WalletITopia.sqlite',
    '1.0',
    '',
    1,
);

export const createTables = () => {
    database.transaction(txn =>
        txn.executeSql(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            icon_name TEXT
        );`),
    );
    database.transaction(txn =>
        txn.executeSql(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            icon_name TEXT
        );`),
    );
    database.transaction(txn =>
        txn.executeSql(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            transaction_type TEXT CHECK(transaction_type IN ('expense', 'income')) NOT NULL,
            amount NUMERIC NOT NULL,
            transaction_date DATE NOT NULL,
            category_id INTEGER,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (category_id) REFERENCES categories(id)
        );`),
    );
    database.transaction(txn =>
        txn.executeSql(`
        CREATE TABLE IF NOT EXISTS product_icons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            icon_name TEXT,
            icon_id INTEGER,
            FOREIGN KEY (icon_id) REFERENCES products(id)
        );`),
    );
    database.transaction(txn =>
        txn.executeSql(`
        CREATE TABLE IF NOT EXISTS transaction_icons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            transaction_id INTEGER,
            icon_name TEXT,
            FOREIGN KEY (transaction_id) REFERENCES transactions(id)
        );`),
    );
    database.transaction(txn =>
        txn.executeSql(
            `
        CREATE TABLE IF NOT EXISTS category_icons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id INTEGER,
            icon_name TEXT,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        );`,
        ),
    );
    database.transaction(txn => {
        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Ahorro', 'bank'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Ahorro');`,
        );

        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Comida', 'cutlery'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Comida');`,
        );

        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Telefono', 'mobile'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Telefono');`,
        );

        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Facturas', 'credit-card'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Facturas');`,
        );

        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Ocio', 'gamepad'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Ocio');`,
        );

        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Animales', 'paw'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Animales');`,
        );

        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Salud', 'medkit'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Salud');`,
        );

        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Transporte', 'bus'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Transporte');`,
        );

        txn.executeSql(
            `INSERT INTO categories (name, icon_name)
             SELECT 'Otro', 'asterisk'
             WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Otro');`,
        );

        txn.executeSql(
            `INSERT INTO products (name, icon_name)
             SELECT 'Efectivo', 'dollar'
             WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Efectivo');`,
        );

        txn.executeSql(
            `INSERT INTO products (name, icon_name)
             SELECT 'Cuenta corriente', 'bank'
             WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Cuenta corriente');`,
        );

        txn.executeSql(
            `INSERT INTO products (name, icon_name)
             SELECT 'Cuenta de ahorros', 'money'
             WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Cuenta de ahorros');`,
        );

        txn.executeSql(
            `INSERT INTO products (name, icon_name)
             SELECT 'Tarjeta de crédito', 'credit-card'
             WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Tarjeta de crédito');`,
        );
    });
};

export const validateTables = () => {
    return new Promise(resolve => {
        database.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM categories',
                [],
                _ => {
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
