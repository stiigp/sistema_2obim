import Usuario from "../Modelo/usuario.js";
import conectar from "./Conexao.js";

export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS usuario (
                usu_cod INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                usu_nome VARCHAR(25) NOT NULL,
                usu_perfil VARCHAR(15) NOT NULL,
                usu_senha VARCHAR(35) NOT NULL
            )`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Erro ao inicializar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario (usu_nome, usu_perfil, usu_senha) VALUES (?, ?, ?)`;
            const parametros = [usuario.nome, usuario.perfil, usuario.senha];
            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET usu_nome = ?, usu_perfil = ?, usu_senha = ? WHERE usu_cod = ?`;
            const parametros = [usuario.nome, usuario.perfil, usuario.senha, usuario.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM usuario WHERE usu_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM usuario WHERE usu_cod = ?`;
            parametros = [termo];
        }
        const [linhas] = await conexao.execute(sql, parametros);
        const listaUsuarios = linhas.map(linha => new Usuario(
            linha.usu_cod,
            linha.usu_nome,
            linha.usu_perfil,
            linha.usu_senha
        ));
        await conexao.release();
        return listaUsuarios;
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE usu_cod = ?`;
            const parametros = [usuario.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}
