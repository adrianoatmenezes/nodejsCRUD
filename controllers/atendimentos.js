const atendimentos = require("../models/atendimentos");

module.exports = (app) => {
  //aqui estamos importando o app
  app.get("/atendimentos", (req, res) => {
    console.log("Atendimento selecionado com sucesso");
    atendimentos.listagem(res);
  });

  app.get("/atendimentos/:id", (req, res) => {
    console.log("Atendimento selecionado por ID com sucesso");
    const id = parseInt(req.params.id);

    atendimentos.buscaPorId(id, res);
  });

  app.post("/atendimentos", (req, res) => {
    console.log("Atendimento enviado");
    const atendimento = req.body;

    atendimentos.adiciona(atendimento, res);
  });

  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`o ID: ${id} foi deletado com sucesso`);
    atendimentos.deletarAtendimento(id, res);
  });

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    atendimentos.alterarDados(id, valores, res);
  });
};
