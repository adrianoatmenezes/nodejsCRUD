const customExpress = require("./controllers/config/customExpress"); //aqui estamos chamando tudo que está no customExpress
const conexao = require("./bd/conexao");
const Tabelas = require('./bd/tabelas');

conexao.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("conectado com sucesso!");
    Tabelas.init(conexao);
    const app = customExpress();
    app.listen(3000, () => console.log("rodando na porta 3000")); //o 3000 é a porta em que o servidor vai rodar;
  }
});
