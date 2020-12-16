const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const conexao = require("./database/database");
const perguntas = require("./models/perguntas");

conexao
  .authenticate()
  .then(() => console.log("Conectado com banco de dados"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  perguntas.findAll({ raw: true }).then((perguntas) => {
    res.render("index", { perguntas: perguntas });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;

  perguntas
    .create({
      titulo: titulo,
      descricao: descricao,
    })
    .then(() => {
      res.redirect("/");
    });
});

const port = process.env.PORT || 8080;

app.listen(port),
  () => {
    console.log(`rodando na porta ${port}`);
  };
