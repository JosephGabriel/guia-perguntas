const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const conexao = require("./database/database");

conexao
  .authenticate()
  .then(() => console.log("Conectado com banco de dados"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
});

const port = process.env.PORT || 8080;

app.listen(port),
  () => {
    console.log(`rodando na porta ${port}`);
  };
