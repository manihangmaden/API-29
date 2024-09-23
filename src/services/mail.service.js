require("dotenv").config()
const nodemailer = require("nodemailer")


class MailService {
    #transport

    constructor() {
        try {
            const config = {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                // service: "gmail",
                // secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            }
            
            if(process.env.SMTP_PROVIDER === "gmail"){
                config["service"] = "gmail"
            }

            this.#transport = nodemailer.createTransport(config)
            console.log("SMTP server connected successfully..")

        } catch (exception) {
            console.log(exception)
            console.log("Error connecting mail server...")
            //throw{}
            //process.exit(1) --> ends the current process of server
        }
    }

    sendEmail = async ({to, sub, message, attachements = null}) => {
        try {
            //   const to =""
            //   const sub = ""
            //   const message = ""
            //   const attachements = ""
            const msgOpts = {
                to: to,
                from: process.env.SMTP_FROM,
                subject: sub,
                html: message
            }
            if(attachements){
                msgOpts["attachements"] = attachements;
            }
            const response = await this.#transport.sendMail(msgOpts)
        } catch(exception) {
            console.log(exception)
            console.log("Error sending mail..")
            throw {status: 500, message: "error sending email", detail: exception}
        }
    }
    
}


const mailSvc = new MailService()

module.exports = mailSvc;