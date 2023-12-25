require("dotenv").config();
const express = require("express");
//const cors = require("cors");
const app = express();
const routes = require("./rotas/rotas");
const port = process.env.PORT || 3000;
//app.use(cors());

app.use(express.json());
app.use(routes);
app.listen(port, console.log(`Servidor rodando na porta ${port}`));
