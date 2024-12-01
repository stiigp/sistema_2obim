//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import ClienteCtrl from "../Controle/clienteCtrl.js";

const cliCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaCliente.post("/", cliCtrl.gravar);
rotaCliente.put("/:codigo", cliCtrl.editar);
rotaCliente.patch("/:codigo", cliCtrl.editar);
rotaCliente.delete("/:codigo", cliCtrl.excluir);
rotaCliente.get("/:codigo", cliCtrl.consultar);
rotaCliente.get("/", cliCtrl.consultar);

export default rotaCliente;
