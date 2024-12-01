import Cliente from "../Modelo/Cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS cliente (
                cli_cod INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                cli_nome VARCHAR(25),
                cli_qtdcompras VARCHAR(20),
                cli_cpf VARCHAR(35),
                cli_endereco VARCHAR(35),
                cli_telefone VARCHAR(15),
                cli_email VARCHAR(25)
            )`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Erro ao inicializar o banco de dados: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `INSERT INTO cliente (cli_nome, cli_qtdcompras, cli_cpf, cli_endereco, cli_telefone, cli_email) VALUES (?, ?, ?, ?, ?, ?)`;
            const parametros = [cliente.nome, cliente.qtdcompras, cliente.cpf, cliente.endereco, cliente.telefone, cliente.email];
            const resultado = await conexao.execute(sql, parametros);
            cliente.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE cliente SET cli_nome = ?, cli_qtdcompras = ?, cli_cpf = ?, cli_endereco = ?, cli_telefone = ?, cli_email = ? WHERE cli_cod = ?`;
            const parametros = [cliente.nome, cliente.qtdcompras, cliente.cpf, cliente.endereco, cliente.telefone, cliente.email, cliente.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM cliente WHERE cli_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM cliente WHERE cli_cod = ?`;
            parametros = [termo];
        }
        const [linhas] = await conexao.execute(sql, parametros);
        const listaClientes = linhas.map(linha => new Cliente(
            linha.cli_cod,
            linha.cli_nome,
            linha.cli_qtdcompras,
            linha.cli_cpf,
            linha.cli_endereco,
            linha.cli_telefone,
            linha.cli_email
        ));
        await conexao.release();
        return listaClientes;
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cli_cod = ?`;
            const parametros = [cliente.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}
