const Joi = require("joi");
const { StatusType } = require("../../config/constants.config");

const BannerCreateDTO = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    link: Joi.string().uri().empty(null, "").optional().default(null),
    //status: Joi.string().regex(/^(active|inactive)$/).required()
    status: Joi.string().valid(...Object.values(StatusType)).required(),
    image: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
    
});

const BannerUpdateDTO = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    link: Joi.string().uri().empty(null, "").optional().default(null),
    //status: Joi.string().regex(/^(active|inactive)$/).required()
    status: Joi.string().valid(...Object.values(StatusType)).required(),
    image: Joi.string().optional(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
    
});


module.exports = {
    BannerCreateDTO,
    BannerUpdateDTO
}