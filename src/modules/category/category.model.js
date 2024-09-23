const mongoose = require("mongoose");
const { StatusType } = require("../../config/constants.config");

const CategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 100
    },

    image: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    parentId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },

    brand: [{
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        default: null
    }],

    status: {
        type: String,
        enum: [StatusType.ACTIVE, StatusType.INACTIVE],
        default: StatusType.INACTIVE
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})


const CategoryModel = mongoose.model("Category", CategorySchema)

module.exports = CategoryModel;