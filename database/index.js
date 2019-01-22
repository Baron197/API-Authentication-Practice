const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'db4free.net',
    user: 'baron199',
    password: 'Incorrect197',
    database: 'popokpediabaron',
    port: 3306
});

module.exports = conn;