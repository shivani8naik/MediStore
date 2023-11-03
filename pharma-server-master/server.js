import express from "express";
import dotenv from "dotenv";
import con from "./DBConect.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors())

con.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
	con.query("use myDB", (err, result) => {
		if (err) throw err;
		console.log(result);
	});
});
app.get("/api/all", async (req, res) => {
	con.query("show tables", (err, result) => {
		if (err) console.log(err);
		else {
			console.log(result);
			res.json(result);
		}
	});
});
app.get("/api/medicine", async (req, res) => {
	con.query("select * from medicine", (err, result) => {
		if (err) console.log(err);
		else {
			res.json(result);
		}
	});
});
app.listen(process.env.PORT, () =>
	console.log(`App listening on ${process.env.HOST}:${process.env.PORT}`)
);
