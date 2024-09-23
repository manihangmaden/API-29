const Joi = require("joi");
const { StatusType } = require("../../config/constants.config");

const AttributeCreateDTO = Joi.object({
    name: Joi.string().min(3).max(100).optional().empty(null, ""),
    value: Joi.array().items(Joi.string())

    //status: Joi.string().regex(/^(active|inactive)$/).required()
    // status: Joi.string().valid(...Object.values(StatusType)).required(),
    // image: Joi.string().empty(null, "").optional(),
    // parentId: Joi.string().hex().length(24),
    
    
});

const AttributeUpdateDTO = Joi.object({
    name: Joi.string().min(3).max(100).optional().empty(null, ""),
    value: Joi.array().items(Joi.string())
        //status: Joi.string().regex(/^(active|inactive)$/).required()
    // status: Joi.string().valid(...Object.values(StatusType)).required(),
    // image: Joi.string().empty(null, "").optional(),
    // brand: Joi.array().items(Joi.string()),
    // parentId: Joi.string()

    
});


module.exports = {
    AttributeCreateDTO,
    AttributeUpdateDTO
}