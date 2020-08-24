const { createConnection } = require('mysql');
const config = require('../config.json');

const connection = createConnection({
	connectionLimit: 20,
	host: config.mysqlHOST,
	port: '3306',
	user: config.mysqlUSER,
	password: config.mysqlPASS,
	database: config.mysqlDB,
});

module.exports = connection;