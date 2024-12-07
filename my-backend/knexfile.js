require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'rootroot',
            database: process.env.DB_NAME || 'cats_database'
        },
        pool: {
            min: 0,
            max: 7
        }
    }
};
