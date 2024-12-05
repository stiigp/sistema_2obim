import Usuario from "../Modelo/usuario.js";

export default class UsrCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const {nome, perfil, senha } = requisicao.body;

            if (nome && perfil && senha) {
                const usuario = new Usuario(0, nome, perfil, senha);
                usuario.incluir()
                    .then(() => resposta.status(200).json({
                        status: true,
                        mensagem: "Usuário cadastrado com sucesso!",
                        codigo: usuario.codigo
                    }))
                    .catch(erro => resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao incluir usuário: " + erro.message
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
            const { nome, perfil, senha } = requisicao.body;

            if (codigo > 0 && nome && perfil && senha) {
                const usuario = new Usuario(codigo, nome, perfil, senha);
                usuario.alterar()
                    .then(() => resposta.status(200).json({
                        status: true,
                        mensagem: "Usuário atualizado com sucesso!"
                    }))
                    .catch(erro => resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao atualizar usuário: " + erro.message
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
                const usuario = new Usuario(codigo);
                usuario.excluir()
                    .then(() => resposta.status(200).json({
                        status: true,
                        mensagem: "Usuário excluído com sucesso!"
                    }))
                    .catch(erro => resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir usuário: " + erro.message
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

            const usuario = new Usuario();
            usuario.consultar(codigo)
                .then(listaUsuarios => resposta.status(200).json(listaUsuarios))
                .catch(erro => resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar usuários: " + erro.message
                }));
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    login(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "POST") {
            const nome = requisicao.body.nome
            const senha = requisicao.body.senha


            if (nome && senha) {
                const user = new Usuario(nome);
                user.consultar(nome).then((resp) => {
                    if (resp && resp[0]?.senha === senha) {
                        resposta.status(200).json({
                            status: true,
                            perfil: resposta.perfil,
                            mensagem: "Autenticado com sucesso!"
                        })
                    } else {
                        resposta.status(400).json({
                            status:false,
                            mensagem: "Não foi possível autenticar!"
                        })
                    }
                }).catch(erro => resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao autenticar usuário: " + erro.message
                }));


            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}
