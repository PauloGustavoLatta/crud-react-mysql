const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

/** Configurando e conectando ao banco de dados. */
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "crudgames",
});

app.use(cors());
app.use(express.json());

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM games";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let mysql = "INSERT INTO games ( name, cost, category) VALUES (?, ?, ?)";
  db.query(mysql, [name, cost, category], (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log('rodando servidor.')
});
