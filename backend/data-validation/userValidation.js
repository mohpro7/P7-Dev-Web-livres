const Joi = require('joi');


const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Veuillez entrer un email valide.',
    'any.required': 'L\'email est obligatoire.'
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.min': 'Le mot de passe doit comporter au moins 8 caractères don une majuscule, une minuscule, un chiffre et un caractère spécial.',
      'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.',
      'any.required': 'Le mot de passe est obligatoire.'
    })
});

module.exports = { userSchema };
