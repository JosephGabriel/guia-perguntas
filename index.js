const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

const port = process.env.PORT || 8080;

app.listen(port),
  () => {
    console.log(`rodando na porta ${port}`);
  };
