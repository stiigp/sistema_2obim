import Fornecedor from "../Modelo/Fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor (
                for_cod INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                for_nome VARCHAR(25),
                for_contato VARCHAR(20),
                for_endereco VARCHAR(35)
            )`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Erro ao inicializar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `INSERT INTO fornecedor (for_nome, for_contato, for_endereco) VALUES (?, ?, ?)`;
            const parametros = [fornecedor.nome, fornecedor.contato, fornecedor.endereco];
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `UPDATE fornecedor SET for_nome = ?, for_contato = ?, for_endereco = ? WHERE for_cod = ?`;
            const parametros = [fornecedor.nome, fornecedor.contato, fornecedor.endereco, fornecedor.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM fornecedor WHERE for_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM fornecedor WHERE for_cod = ?`;
            parametros = [termo];
        }
        const [linhas] = await conexao.execute(sql, parametros);
        const listaFornecedores = linhas.map(linha => new Fornecedor(
            linha.for_cod,
            linha.for_nome,
            linha.for_contato,
            linha.for_endereco
        ));
        await conexao.release();
        return listaFornecedores;
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE for_cod = ?`;
            const parametros = [fornecedor.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}
