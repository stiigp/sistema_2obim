import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    // Atributos privados
    #codigo;
    #nome;
    #contato;
    #endereco;

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

    get contato() {
        return this.#contato;
    }

    set contato(novoContato) {
        this.#contato = novoContato;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    // Construtor
    constructor(codigo = 0, nome = "", contato = "", endereco = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#contato = contato;
        this.#endereco = endereco;
    }

    // Método toJSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "contato": this.#contato,
            "endereco": this.#endereco
        };
    }

    // Métodos de persistência
    async incluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.incluir(this);
    }

    async alterar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.alterar(this);
    }

    async consultar(termo) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(termo);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }
}
