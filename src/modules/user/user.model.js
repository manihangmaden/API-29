const mongoose = require("mongoose");
const { UserRoles, StatusType } = require("../../config/constants.config");

const AddressSchema = new mongoose.Schema({
    provincename: {
        type: String,
        enum: ["Koshi", "Madesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudhur-Pashchim"]
    },
    district: String, //kathmandu, ktm are distinct
    municipality: String,
    wardNo: Number,
    houseAddress: String
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [...Object.values(UserRoles)],
        default: UserRoles.CUSTOMER
    },
    status: {
        type: String,
        enum: [...Object.values(StatusType)],
        default: StatusType.INACTIVE
    },
    activationToken: String,
    activeFor: Date,
    phone: String,
    address: {
        permanent: AddressSchema,
        temporary: AddressSchema
    },
    forgetToken: String,
    forgetFor: Date,
    image: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }

}, {
    timestamps: true, //createdAt, updatedAt
    autoIndex: true,
    autoCreate: true
});

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;