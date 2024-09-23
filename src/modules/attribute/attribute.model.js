const mongoose = require("mongoose");
const { StatusType } = require("../../config/constants.config");

const AttributeSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: true,
        // unique: true,
        min: 3,
        max: 100
    },

    value:[{
        type: String,
        min: 3,
        max: 100
    }]

   
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})


const AttributeModel = mongoose.model("Attribute", AttributeSchema)

module.exports = AttributeModel;