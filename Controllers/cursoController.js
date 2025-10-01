import Curso from "../Models/curso.js";

export default class CursoController {
    // Métodos para traduzir requisições HTTP em ações internas da aplicação e retornar respostas HTTP
    
    // HTTP POST
    gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;

            if (dados.nome && dados.cargaHoraria && dados.instrutor && dados.nivel && dados.preco && dados.vagas && dados.dataInicio && dados.dataFim) {
                const curso = new Curso("", dados.nome, dados.cargaHoraria, dados.instrutor, dados.nivel, dados.preco, dados.vagas, dados.dataInicio, dados.dataFim);
                curso.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Curso gravado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao gravar o curso: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do curso (Nome, cargaHoraria, Instrutor, Nível, Preço, Vagas, Data de Início e Data de fim)."
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });        
        }
    }
    // HTTP PUT
    alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {            
            const dados = requisicao.body;
            
            // http://localhost:4000/curso/1
            const id = requisicao.params.id; // ID do curso deve ser informado na URL
            
            if (id && dados.nome && dados.cargaHoraria && dados.instrutor && dados.nivel && dados.preco && dados.vagas && dados.dataInicio && dados.dataFim) {
                const curso = new Curso(id, dados.nome, dados.cargaHoraria, dados.instrutor, dados.nivel, dados.preco, dados.vagas, dados.dataInicio, dados.dataFim);
                curso.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Curso atualizado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao atualizar o curso: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do curso (Nome, cargaHoraria, Instrutor, Nível, Preço, Vagas, Data de Início e Data de fim). O curso a ser alterado deve ser informado na URL."
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }

    // HTTP DELETE
    excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE') {
            const id = requisicao.params.id;
           
            if (id) {
                const curso = new Curso();
                curso.consultarID(id)
                .then((listaCursos) => {
                    const curso = listaCursos[0];

                    if (curso) {
                        curso.excluir()
                        .then(() => {
                            resposta.status(200).json({
                                status: true,
                                mensagem: "Curso excluído com sucesso!"
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                status: false,
                                mensagem: "Erro ao excluir o curso: " + erro.message
                            });
                        })
                    }
                    else {
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Curso não encontrado."
                        });
                    }
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o curso para exclusão: " + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o ID do curso."
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }

    // HTTP GET
    consultar(requisicao, resposta) {
        if (requisicao.method === 'GET') {
            // A consulta pode ou não especificar um ID.
            // Quando um ID não for especificado, então a consulta retornará todos os cursos.
            const id = requisicao.params.id;
            const curso = new Curso();

            if (id) {
                curso.consultarID(id)
                .then((listaCursos) => {

                    if (listaCursos.length > 0) {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Consulta realizada com sucesso!",
                            cursos: listaCursos
                        });
                    }
                    else {
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Curso não encontrado."
                        });
                    }
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o curso: " + erro.message
                    });
                })
            }
            else {
                curso.consultar()
                .then((listaCursos) => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Consulta realizada com sucesso!",
                        cursos: listaCursos
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar os cursos: " + erro.message
                    });
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }
}