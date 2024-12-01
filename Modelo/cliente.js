import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados
    #codigo;
    #nome;
    #qtdcompras;
    #cpf;
    #endereco;
    #telefone;
    #email;

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

    get qtdcompras() {
        return this.#qtdcompras;
    }

    set qtdcompras(novaQtdcompras) {
        this.#qtdcompras = novaQtdcompras;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    // Construtor
    constructor(codigo = 0, nome = "", qtdcompras = "", cpf = "", endereco = "", telefone = "", email = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#qtdcompras = qtdcompras;
        this.#cpf = cpf;
        this.#endereco = endereco;
        this.#telefone = telefone;
        this.#email = email;
    }

    // Método toJSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "qtdcompras": this.#qtdcompras,
            "cpf": this.#cpf,
            "endereco": this.#endereco,
            "telefone": this.#telefone,
            "email": this.#email
        };
    }

    // Métodos de persistência
    async incluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.incluir(this);
    }

    async alterar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.alterar(this);
    }

    async consultar(termo) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(termo);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }
}
