const Sequelize = require("sequelize");

const conexao = new Sequelize("guiaperguntas", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = conexao;
