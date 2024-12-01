import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const { nome, qtdcompras, cpf, endereco, telefone, email } = requisicao.body;

            if (nome && qtdcompras && cpf && endereco && telefone && email) {
                const cliente = new Cliente(0, nome, qtdcompras, cpf, endereco, telefone, email);
                cliente.incluir()
                    .then(() => resposta.status(200).json({
                        status: true,
                        mensagem: "Cliente cadastrado com sucesso!",
                        codigo: cliente.codigo
                    }))
                    .catch(erro => resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao incluir cliente: " + erro.message
                    }));
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Dados inválidos. Consulte a documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo;
            const { nome, qtdcompras, cpf, endereco, telefone, email } = requisicao.body;

            if (codigo > 0 && nome && qtdcompras && cpf && endereco && telefone && email) {
                const cliente = new Cliente(codigo, nome, qtdcompras, cpf, endereco, telefone, email);
                cliente.alterar()
                    .then(() => resposta.status(200).json({
                        status: true,
                        mensagem: "Cliente atualizado com sucesso!"
                    }))
                    .catch(erro => resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao atualizar cliente: " + erro.message
                    }));
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Dados inválidos. Consulte a documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'DELETE') {
            const codigo = requisicao.params.codigo;

            if (codigo > 0) {
                const cliente = new Cliente(codigo);
                cliente.excluir()
                    .then(() => resposta.status(200).json({
                        status: true,
                        mensagem: "Cliente excluído com sucesso!"
                    }))
                    .catch(erro => resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir cliente: " + erro.message
                    }));
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Código inválido."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            const codigo = requisicao.params.codigo || "";

            const cliente = new Cliente();
            cliente.consultar(codigo)
                .then(listaClientes => resposta.status(200).json(listaClientes))
                .catch(erro => resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar clientes: " + erro.message
                }));
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}
