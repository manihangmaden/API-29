require("dotenv").config()
const http = require("http")
const app = require("./src/config/express.config")

const server = http.createServer(app)

//ports ==> 0 _ 2^16-1 ==>100ports well known port
//http, https, ftp, sftp, smtp, telnet
//127.0.0.1, localhost.
const port = process.env.PORT || 9005

server.listen(port, '127.0.0.1', (error) => {
    if(error) {
        console.log("server errror..")
    } else {
        console.log("server is running on port: " + port)
        console.log("press CTRL+C to discontinue server")

    }
})