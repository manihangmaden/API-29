const Joi = require("joi");
const { StatusType } = require("../../config/constants.config");

const CategoryCreateDTO = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    //status: Joi.string().regex(/^(active|inactive)$/).required()
    status: Joi.string().valid(...Object.values(StatusType)).required(),
    image: Joi.string().empty(null, "").optional(),
    parentId: Joi.string().hex().length(24),
    brand: Joi.array().items(Joi.string().hex().length(24))
    
});

const CategoryUpdateDTO = Joi.object({
    title: Joi.string().min(3).max(100).required(),
        //status: Joi.string().regex(/^(active|inactive)$/).required()
    status: Joi.string().valid(...Object.values(StatusType)).required(),
    image: Joi.string().empty(null, "").optional(),
    brand: Joi.array().items(Joi.string()),
    parentId: Joi.string()
    
});


module.exports = {
    CategoryCreateDTO,
    CategoryUpdateDTO
}