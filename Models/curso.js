// Importa a classe 'CursoDAO' definida no arquivo 'cursoDAO.js'.
import CursoDAO from "../DB/cursoDAO.js";

// Define a classe chamada 'Curso' e torna-a disponível para ser importada e usada em outros arquivos do projeto.
export default class Curso {    
    // Criados 9 atributos para a classe 'Curso'.
    #id;
    #nome;
    #cargaHoraria;
    #instrutor;
    #nivel;
    #preco;
    #vagas;
    #dataInicio;
    #dataFim;

    // Inicializa o objeto com suas propriedadas iniciais, preparando-o para uso.
    constructor(id = "", nome = "", cargaHoraria = "", instrutor = "", nivel = "", preco = "", vagas = "", dataInicio = "", dataFim = "") {        
        this.#id = id; // O ID será gerado automaticamente pelo banco de dados 
        this.#nome = nome;
        this.#cargaHoraria = cargaHoraria;
        this.#instrutor = instrutor;
        this.#nivel = nivel;
        this.#preco = preco;
        this.#vagas = vagas;
        this.#dataInicio = dataInicio;
        this.#dataFim = dataFim;
    }
    
    // Acessa (get) e altera (set) os valores dos atributos de forma controlada.
    get id() {
        return this.#id
    }
    set id(id) {
        this.#id = id
    }

    get nome() {
        return this.#nome
    }
    set nome(nome) {
        this.#nome = nome
    }

    get cargaHoraria() {
        return this.#cargaHoraria
    }
    set cargaHoraria(cargaHoraria) {
        this.#cargaHoraria = cargaHoraria
    }

    get instrutor() {
        return this.#instrutor
    }
    set instrutor(instrutor) {
        this.#instrutor = instrutor
    }

    get nivel() {
        return this.#nivel
    }
    set nivel(nivel) {
        this.#nivel = nivel
    }

    get preco() {
        return this.#preco
    }
    set preco(preco) {
        this.#preco = preco
    }

    get vagas() {
        return this.#vagas
    }
    set vagas(vagas) {
        this.#vagas = vagas
    }

    get dataInicio() {
        return this.#dataInicio
    }
    set dataInicio(dataInicio) {
        this.#dataInicio = dataInicio
    }

    get dataFim() {
        return this.#dataFim
    }
    set dataFim(dataFim) {
        this.#dataFim = dataFim
    }
    
    // Formata os dados do curso em uma string legível para exibição.
    toString() { 
        return `
            ID: ${this.#id}\n
            Curso: ${this.#nome}\n
            Carga horária: ${this.#cargaHoraria} horas\n
            Instrutor: ${this.#instrutor}\n
            Nível: ${this.#nivel}\n
            Preço: R$ ${this.#preco}\n
            Vagas: ${this.#vagas} vagas\n
            Período: de ${this.#dataInicio} a ${this.#dataFim}\n
        `;
    }
    
    // Cria uma representação do objeto no formato JSON
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            cargaHoraria: this.#cargaHoraria,
            instrutor: this.#instrutor,
            nivel: this.#nivel,
            preco: this.#preco,
            vagas: this.#vagas,
            dataInicio: this.#dataInicio,
            dataFim: this.#dataFim
        };
    }

    // Persiste o objeto no banco de dados usando a camada DAO
    async gravar() {
        const cursoDAO = new CursoDAO();
        await cursoDAO.gravar(this);
    }

    async alterar() {
        const cursoDAO = new CursoDAO();
        await cursoDAO.alterar(this);
    }

    async excluir() {
        const cursoDAO = new CursoDAO();
        await cursoDAO.excluir(this);
    }

    async consultar() {
        const cursoDAO = new CursoDAO();
        return await cursoDAO.consultar();
    }

    async consultarID(id) {
        const cursoDAO = new CursoDAO();
        return await cursoDAO.consultarID(id);
    }
}