const Joi = require("joi");

const cadastrar = Joi.object({
  nome: Joi.string().required().messages({
    "any.required": "A propriedade nome é obrigatória",
    "string.empty": "O nome é obrigatório",
    "string.base": "O nome não pode ser número",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "A propriedade email é obrigatória",
    "string.empty": "O email é obrigatório",
    "string.base": "O email não pode ser número",
    "string.email": "Email inválido",
  }),
  cpf: Joi.string().required().min(11).max(11).messages({
    "any.required": "O campo CPF é obrigatório",
    "string.empty": "O campo CPF é obrigatório",
    "string.min": "O campo CPF precisa ter 11 digitos",
    "string.max": "O campo CPF precisa ter 11 digitos",
  }),
  cep: Joi.string().max(8).min(8).messages({
    "string.min": "O campo CPF precisa ter 08 digitos",
    "string.max": "O campo CPF precisa ter 08 digitos",
    "string.base": "O CEP não pode ser valor núméro",
  }),
  rua: Joi.string().max(100).messages({
    "string.max": "Numero maximo de caracteres atingidos para o campo Rua",
    "string.base": "Rua deve ser uma string",
  }),
  numero: Joi.number().integer().positive().messages({
    "number.base": "Numero precisa ser inteiro",
    "number.positive": "Numero precisa ser positivo",
  }),
  bairro: Joi.string().max(100).messages({
    "string.max": "Numero maximo de caracteres atingidos para o campo Bairro",
    "string.base": "O bairro não pode ser um número",
  }),
  cidade: Joi.string().max(100).messages({
    "string.max": "Numero maximo de caracteres atingidos para o campo Cidade",
    "string.base": "A cidade não pode ser um número",
  }),
  estado: Joi.string().max(2).messages({
    "string.max": "Coloque Somente a Sigla do Estado",
    "string.base": "Estado deve ser uma string",
  }),

  usuario_id: Joi.number().strict().integer().positive().messages({
    "number.base": "usuario_id precisa ser inteiro",
    "number.positive": "usuario_id precisa ser positivo",
  }),
});

module.exports = { cadastrar };
