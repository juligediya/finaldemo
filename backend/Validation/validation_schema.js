const Joi = require('@hapi/joi')

const userAuthSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Name is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be valid'
    }),

  contact: Joi.string()
    .length(10)
    .pattern(/^\d+$/)
    .messages({
      'string.length': 'Contact must be exactly 10 digits',
      'string.pattern.base': 'Contact must be a 10-digit number'
    }),

  role: Joi.string()
    .lowercase() 
    .valid('admin', 'teacher', 'student')
    .required()
    .messages({
      'any.only': 'Role must be admin, teacher, or student',
      'string.empty': 'Role is required'
    }),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
    .required()
    .messages({
      'string.pattern.base': 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
      'string.empty': 'Password is required'
    })
});


const loginAuthSchema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid'
      }),
  
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
        'string.empty': 'Password is required'
      })
  });
  
module.exports = {
    userAuthSchema,
    loginAuthSchema
}