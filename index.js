const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const conexao = require("./database/database");
const perguntas = require("./models/perguntas");
const respostas = require("./models/respostas");

conexao
  .authenticate()
  .then(() => console.log("Conectado com banco de dados"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  perguntas
    .findAll({ raw: true, order: [["id", "DESC"]] })
    .then((perguntas) => {
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

app.post("/responder", (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.pergunta;

  respostas
    .create({
      corpo: corpo,
      perguntaId: perguntaId,
    })
    .then(() => {
      res.redirect("/pergunta/" + perguntaId);
    });
});

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;

  perguntas
    .findOne({
      where: { id: id },
    })
    .then((pergunta) => {
      if (pergunta != undefined) {
        respostas
          .findAll({
            where: { perguntaId: pergunta.id },
            order: [["id", "desc"]],
          })
          .then((respostas) => {
            res.render("pergunta", {
              pergunta: pergunta,
              respostas: respostas,
            });
          });
      } else {
        res.redirect("/");
      }
    });
});

const port = process.env.PORT || 8080;

app.listen(port),
  () => {
    console.log(`rodando na porta ${port}`);
  };
