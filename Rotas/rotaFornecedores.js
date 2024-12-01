//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import FornecedorCtrl from "../Controle/fornecedorCtrl.js";

const fornCtrl = new FornecedorCtrl();
const rotaFornecedor = Router();

rotaFornecedor.post("/", fornCtrl.gravar);
rotaFornecedor.put("/:codigo", fornCtrl.editar);
rotaFornecedor.patch("/:codigo", fornCtrl.editar);
rotaFornecedor.delete("/:codigo", fornCtrl.excluir);
rotaFornecedor.get("/:codigo", fornCtrl.consultar);
rotaFornecedor.get("/", fornCtrl.consultar);

export default rotaFornecedor;


