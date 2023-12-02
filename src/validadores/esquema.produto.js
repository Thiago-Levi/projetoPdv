const Joi = require("joi");

const cadastrar = Joi.object({
  descricao: Joi.string().required().messages({
    "any.required": "A propriedade descrição é obrigatória",
    "string.empty": "A descrição é obrigatório",
    "string.base": "A descrição não pode ser um número",
  }),

  quantidade_estoque: Joi.number().required().strict().positive().messages({
    "any.required": "O campo quantidade_estoque é obrigatório",
    "number.base": "O campo quantidade_estoque deve ser um número",
    "number.positive": "O campo quantidade_estoque deve ser um número positivo",
    "number.base": "O campo quantidade_estoque deve ser numérico",
  }),

  valor: Joi.number().required().strict().positive().messages({
    "any.required": "O campo valor é obrigatório",
    "number.base": "O campo valor deve ser um número",
    "number.positive": "O campo valor deve ser um número positivo",
    "number.base": "O campo valor deve ser numérico",
  }),

  categoria_id: Joi.number().required().strict().positive().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.base": "O campo categoria_id deve ser um número",
    "number.positive": "O campo categoria_id deve ser um número positivo",
    "number.base": "O campo categoria_id deve ser numérico",
  }),
});

const editar = Joi.object({
  descricao: Joi.string().messages({
    "string.empty": "A descrição não pode ser vazia.",
    "string.base": "A descrição não pode ser um número.",
  }),

  quantidade_estoque: Joi.number().strict().positive().messages({
    "number.base": "O campo quantidade_estoque deve ser um número",
    "number.positive": "O campo quantidade_estoque deve ser um número positivo",
  }),

  valor: Joi.number().strict().positive().messages({
    "number.base": "O campo valor deve ser um número",
    "number.positive": "O campo valor deve ser um número positivo",
  }),

  categoria_id: Joi.number().strict().positive().messages({
    "number.base": "O campo categoria_id deve ser um número",
    "number.positive": "O campo categoria_id deve ser um número positivo",
  }),

  id: Joi.number().positive().messages({
    "number.base": "É necessário informar um número válido após 'produto/'",
    "number.positive": "É necessário informar um número válido após 'produto/'",
    "number.base": "É necessário informar um número válido após 'produto/'",
  }),
});

module.exports = { cadastrar, editar };
