const conexao = require("../bd/conexao");
const moment = require("moment");

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD");

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 3;

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },

      {
        nome: "cliente",
        valido: clienteEhValido,
        mensagem: "Cliente deve conter 5 ou mais caracteres!",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);

    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = {
        ...atendimento,
        dataCriacao,
        data,
      };
      const comandoSql = `insert into Atendimentos set ?`;
      conexao.query(comandoSql, atendimentoDatado, (err, resultado) => {
        if (err) {
          res.status(400).json(err.sqlMessage);
        } else {
          res.status(201).json(atendimento);
        }
      });
    }
  }

  listagem(res) {
    const comandoSql = `select * from Atendimentos`;
    conexao.query(comandoSql, (err, resultado) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(resultado);
      }
    });
  }

  buscaPorId(id, res) {
    const comandoSql = `select * from Atendimentos where id = ${id}`;

    conexao.query(comandoSql, (err, resultado) => {
      const atendimento = resultado[0];

      if (!atendimento) {
        res.status(401).json(`o ID: ${id} não existe`);
      } else {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(atendimento);
        }
      }
    });
  }

  alterarDados(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY HH:MM:SS").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const comandoSql = `UPDATE Atendimentos SET ? WHERE id = ?`;

    conexao.query(comandoSql, [valores, id], (err, resultado) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json([...valores, id]);
      }
    });
  }

  deletarAtendimento(id, res) {
    const comandoSql = `delete from Atendimentos where id = ${id}`;

    conexao.query(comandoSql, (err, resultado) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(202).json({ id });
      }
    });
  }
}

module.exports = new Atendimento();
