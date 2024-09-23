const Joi = require("joi")
const UserCreateDTO = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z ]+$/i).min(2).max(50).required(),
    email: Joi.string().email().required().messages({
        "string.empty": "Email must be of a valid format"
    }),
    address: Joi.string().optional().empty(),
    phone: Joi.string().min(9).max(15).optional(),
    password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,25}$/).min(8).max(28).required().messages({
        "string.empty": "Must contain a Password",
        "string.pattern.base": "Password must contain small letter, one capital letter, number and special characters."
    }),
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().messages({
        "any.only": "Password and confirmPassword should match"
    }),
    image: Joi.string().optional(),
    role: Joi.string().regex(/^(seller|customer|admin)$/).required().messages({
        "string.pattern.base": "Role can be either Customer,Seller or admin"
    })

})

module.exports = {
    UserCreateDTO
}