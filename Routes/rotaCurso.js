import { Router } from "express";
import CursoController from "../Controllers/cursoController.js";

const cursoRouter = Router();
const cursoCtrl = new CursoController();
cursoRouter.get("/", cursoCtrl.consultar)
.get("/:id", cursoCtrl.consultar)
.post("/", cursoCtrl.gravar)
.put("/:id", cursoCtrl.alterar)
.delete("/:id", cursoCtrl.excluir);

export default cursoRouter;