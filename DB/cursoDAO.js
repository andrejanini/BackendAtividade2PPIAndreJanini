import Curso from "../Models/curso.js";
import conectar from "./conexao.js";

export default class CursoDAO {
    
    async gravar(curso) {
        if (curso instanceof Curso) {
            const conexao = await conectar();
            const sql = "INSERT INTO curso(cur_nome, cur_cargaHoraria, cur_instrutor, cur_nivel, cur_preco, cur_vagas, cur_dataInicio, cur_dataFim) VALUES (?,?,?,?,?,?,?,?)";
            const parametros = [                
                curso.nome,
                curso.cargaHoraria,
                curso.instrutor,
                curso.nivel,
                curso.preco,
                curso.vagas,
                curso.dataInicio,
                curso.dataFim
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(curso) {
        if (curso instanceof Curso) {
            const conexao = await conectar();
            const sql = "UPDATE curso SET cur_nome = ?, cur_cargaHoraria = ?, cur_instrutor = ?, cur_nivel = ?, cur_preco = ?, cur_vagas = ?, cur_dataInicio = ?, cur_dataFim = ? WHERE cur_id = ?";
            const parametros = [                
                curso.nome,
                curso.cargaHoraria,
                curso.instrutor,
                curso.nivel,
                curso.preco,
                curso.vagas,
                curso.dataInicio,
                curso.dataFim,
                curso.id,
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(curso) {
        if (curso instanceof Curso) {
            const conexao = await conectar();
            const sql = "DELETE FROM curso WHERE cur_id = ?";
            const parametros = [curso.id];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * from curso ORDER BY cur_nome";
        const [registros] = await conexao.query(sql);
        await conexao.release();

        let listaCursos = [];
        for (const registro of registros) {            
            const curso = new Curso(registro.cur_id,
                                    registro.cur_nome,
                                    registro.cur_cargaHoraria,
                                    registro.cur_instrutor,
                                    registro.cur_nivel,
                                    registro.cur_preco,
                                    registro.cur_vagas,
                                    registro.cur_dataInicio,
                                    registro.cur_dataFim);

            listaCursos.push(curso);
        }

        return listaCursos;
    }

    async consultarID(id) {
        id = id || ' ';
        const conexao = await conectar();
        const sql = "SELECT * from curso WHERE cur_id = ? ORDER BY cur_nome";
        const [registros] = await conexao.query(sql,[id]);
        await conexao.release();

        let listaCursos = [];
        for (const registro of registros) {            
            const curso = new Curso(registro.cur_id,
                                    registro.cur_nome,
                                    registro.cur_cargaHoraria,
                                    registro.cur_instrutor,
                                    registro.cur_nivel,
                                    registro.cur_preco,
                                    registro.cur_vagas,
                                    registro.cur_dataInicio,
                                    registro.cur_dataFim);

            listaCursos.push(curso);
        }

        return listaCursos;
    }    
};