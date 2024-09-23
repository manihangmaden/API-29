const express = require('express')
const cors = require('cors')

//import db connection
require("./db.config")

const app = express();

app.use(cors())

const router = require("./router.config");
const { MulterError } = require('multer');

//parsers
app.use(express.json())     //json content type(default payload size is 100kb)
app.use(express.urlencoded({
    extended: true
}))   //urlencoded content/payload type



//router mounting point
app.use(router)

// request always comes through url,route,API Endpoint. these three are same.
//CRUD oprerations
//app.get("URL,optional",(req,res) => {}))
//app.put("URL,optional",(req,res) => {}))
//app.patch("URL,optional",(req,res) => {}))
//app.post("URL,optional",(req,res) => {}))
//app.delete("URL,optional",(req,res) => {}))


//HTTPRequest object is req
//HTTPResponse object is res

//use method syntax -> app.use("URL also known as mounting/end point", callback)

// app.use((req, res) => {
//     //req is always incoming data
//     //res is output to client
//     res.end("Hello world! can we use anything good?"); //res.end sends XML
//     res.send("hello")   //res.send sends plain text.
//     res.json({result: "hi", message: "hello"})  //res.json sends json file.
// })

// product/123?key=value
// app.get("product/:id", (req, res) => {
//     const params = req.params   //{id: "123"}
//     const query = req.query    //{key=value}
// })


// app.get("/about-us", (req, res) => {
//     req.json({
//         result: "",
//         message: "about us fetched",
//         meta: null
//     })
// })

// app.get("/",(req, res) => {
//     const data1 = req.body;
//     const data = []

//     req.json({
//         result: data,
//         message: "Hello world",
//         meta: null
//     })
// })



// 404 error route
app.use((req, res, next) => {
    next({ status: 404, message: "resource not found" })
})


//error handeling middleware. always write in this line
app.use((error, req, res, next) => {
    console.log(error)
    let statusCode = error.status || 500; //either error.status code or 500 error code
    let message = error.message || "server error"
    let detail = error.detail || null;


    //MONGODB Unique Error handling
    if (error.code === 11000) {
        const uniqueFailedKeys = Object.keys(error.keyPattern)  //["email","password"...] keyPattern contains array of error key
        detail = {}
        message = "Validation Failed"
        uniqueFailedKeys.map((field) => {
            detail[field] = field + " should be unique"
        })

        statusCode = 400
    }


    //handle Multer error
    if (error instanceof MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            statusCode = 400
            detail = {
                [error.field]: "File size too large"
            }
            //for toast message just write 422 in status and delete detail section
        }
    }

    res.status(statusCode).json({
        result: detail,
        message: message,
        meta: null
    })
})
module.exports = app;