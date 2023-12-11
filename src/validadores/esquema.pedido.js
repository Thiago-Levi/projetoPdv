const Joi = require("joi");

const cadastrar = Joi.object({
  cliente_id: Joi.number().strict().integer().positive().required().messages({
    "any.required": "O campo cliente_id é obrigatório",
    "number.base": "O campo cliente_id deve ser um número",
    "number.positive": "O campo cliente_id deve ser um número positivo",
    "number.base": "O campo cliente_id deve ser numérico",
  }),

  observacao: Joi.string().required().messages({
    "any.required": "A observação é obrigatória",
    "string.empty": "A observação é obrigatório",
    "string.base": "A observação deve ser uma string",
  }),

  pedido_produtos: Joi.array()
    .items({
      produto_id: Joi.number()
        .strict()
        .integer()
        .positive()
        .required()
        .messages({
          "any.required": "O campo produto_id é obrigatório",
          "number.base": "O campo produto_id deve ser um número",
          "number.positive": "O campo produto_id deve ser um número positivo",
          "number.base": "O campo produto_id deve ser numérico",
        }),
      quantidade_produto: Joi.number()
        .strict()
        .integer()
        .positive()
        .required()
        .messages({
          "any.required": "O campo quantidade_produto é obrigatório",
          "number.base": "O campo quantidade_produto deve ser um número",
          "number.positive":
            "O campo quantidade_produto deve ser um número positivo",
          "number.base": "O campo quantidade_produto deve ser numérico",
        }),
    })
    .messages({
      "array.base": "O campo pedido_produtos deve ser um array",
      "object.base": "O campo pedido_produtos deve ser um array de objetos",
    }),
});

module.exports = { cadastrar };
