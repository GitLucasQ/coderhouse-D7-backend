export const configMySQL = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'coder'
    }
};

export const configSQLite = {
    client: 'sqlite3',
    connection: {
        filename: `${__dirname}/db/mydb.sqlite`
    },
    useNullAsDefault: true
};