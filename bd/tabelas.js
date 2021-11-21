class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarTabela();
    }

    criarTabela() {

        const comandoSql = `
        
        CREATE TABLE if not exists Atendimentos(

            id int not null auto_increment primary key,
            cliente varchar(50) not null, 
            pet varchar(20),
            servico varchar(20) not null,
            status varchar(20) not null,
            observacoes text,
            data datetime NOT Null,
            dataCriacao datetime not null

        )`

        this.conexao.query(comandoSql, err => {
            if(err) {
                console.log(err.sqlMessage);
            }
        });
    }
}

module.exports = new Tabelas;