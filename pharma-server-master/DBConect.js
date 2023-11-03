import mysql from "mysql";

const con = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "trupti11",
	dbName: "myDB",
});
export default con