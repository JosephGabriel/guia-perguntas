const Sequelize = require("sequelize");
const conexao = require("../database/database");

const perguntas = conexao.define("perguntas", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

perguntas.sync({ force: false }).then(() => {
  console.log("Tabela de perguntas sincronizada");
});

module.exports = perguntas;
