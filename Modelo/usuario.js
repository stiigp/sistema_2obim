import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {
    // Atributos privados
    #codigo;
    #nome;
    #perfil;
    #senha;

    // Getters e Setters
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get perfil() {
        return this.#perfil;
    }

    set perfil(novoPerfil) {
        this.#perfil = novoPerfil;
    }

    get senha() {
        return this.#senha;
    }

    set senha(novaSenha) {
        this.#senha = novaSenha;
    }

    // Construtor
    constructor(codigo = 0, nome = "", perfil = "", senha = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#perfil = perfil;
        this.#senha = senha;
    }

    // Método toJSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "perfil": this.#perfil,
            "senha": this.#senha
        };
    }

    // Métodos de persistência
    async incluir() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.incluir(this);
    }

    async alterar() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.alterar(this);
    }

    async consultar(termo) {
        const usuarioDAO = new UsuarioDAO();
        return await usuarioDAO.consultar(termo);
    }

    async excluir() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.excluir(this);
    }
}
