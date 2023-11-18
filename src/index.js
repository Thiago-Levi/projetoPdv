require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./rotas/rotas");
const port = process.env.SERVER_PORT;
app.use(express.json());
app.use(routes);
app.listen(port, console.log(`Servidor rodando na porta ${port}`));
