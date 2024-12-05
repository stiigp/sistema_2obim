//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import UsrCtrl from "../Controle/usuarioCtrl.js";

const usuarioCtrl = new UsrCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/login", usuarioCtrl.login);
rotaUsuario.put("/:codigo", usuarioCtrl.editar);
rotaUsuario.patch("/:codigo", usuarioCtrl.editar);
rotaUsuario.delete("/:codigo", usuarioCtrl.excluir);
rotaUsuario.get("/:codigo", usuarioCtrl.consultar);
rotaUsuario.get("/", usuarioCtrl.consultar);
rotaUsuario.post("/", usuarioCtrl.gravar);

export default rotaUsuario;


