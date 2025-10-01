import { Router } from "express";
import CursoController from "../Controllers/cursoController.js";

const cursoRouter = Router();
const cursoCtrl = new CursoController();
cursoRouter
.get("/", cursoCtrl.consultar.bind(cursoCtrl))
.get("/:id", cursoCtrl.consultar.bind(cursoCtrl))
.post("/", cursoCtrl.gravar.bind(cursoCtrl))
.put("/:id", cursoCtrl.alterar.bind(cursoCtrl))
.delete("/:id", cursoCtrl.excluir.bind(cursoCtrl));

export default cursoRouter;