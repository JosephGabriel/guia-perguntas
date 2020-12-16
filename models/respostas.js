const Sequelize = require("sequelize");
const conexao = require("../database/database");

const respostas = conexao.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

respostas.sync({ force: false }).then(() => {
  console.log("Tabela de respostas sincronizada");
});

module.exports = respostas;
