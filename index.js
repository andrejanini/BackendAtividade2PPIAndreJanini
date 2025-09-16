import express from "express";
import cursoRouter from "./Routes/rotaCurso.js";

const hostname = "0.0.0.0";
const porta = 4000;

const app = express();

// Configurar o servidor para receber dados no formato json
app.use(express.json()); // Camada que sabe tratar os dados no formato json

app.use("/curso", cursoRouter); // Camada que sabe atender as requisições no endpoint /curso

app.listen(porta, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${porta}`);
});