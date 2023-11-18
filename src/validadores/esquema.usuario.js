const Joi = require("joi");

const esquemaUsuario = Joi.object({
  nome: Joi.string().required().messages({
    "any.required": "A propriedade nome é obrigatória",
    "string.empty": "O nome é obrigatório",
    "string.base": "O nome não pode ser um número",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "A propriedade email é obrigatória",
    "string.empty": "O email é obrigatório",
    "string.email": "Email inválido",
  }),
  senha: Joi.string()
    .pattern(new RegExp(/^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{6,}$/))
    .required()
    .messages({
      "any.required": "A propriedade senha é obrigatória",
      "string.empty": "A senha é obrigatória",
      "string.min": `A senha deve ter no mínimo 6 caracteres`,
      "string.pattern.base":
        "A senha dever no mínimo 6 caracteres incluindo letras, números e ao menos um caractere especial",
    }),
});

module.exports = esquemaUsuario;
