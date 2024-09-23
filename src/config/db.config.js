require("dotenv").config();
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_NAME,
    autoCreate: true,
    autoIndex: true
}).then(() => {
    console.log("DB Server connected successfully")
})
.catch((error) => {
    console.log(error)
    process.exit(1)
})