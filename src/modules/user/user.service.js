require("dotenv").config()
const bcrypt = require("bcryptjs")
const { randomStringGenerator, deleteFile } = require("../../utilities/helpers")
const mailSvc = require("../../services/mail.service")
const UserModel = require("./user.model")

class UserService {

    generateUserActivationToken = (data) => {
        
        data.activationToken = randomStringGenerator(100)
        data.activeFor = new Date(Date.now()+(process.env.TOKEN_ACTIVE_TIME * 60 * 60 * 1000))
        return data;
    }


    transformUserCreate = (req) => {
        let data = req.body;
        //req.body only holds the text-data like name, phone, etc -> it never holds files like img doc etc.
        //if single file was uploaded req.file holds the file
        //if array file was uploaded req.files holds the file
        //for single file
        if (req.file) {
            //console.log(req.file)
            data[req.file.fieldname] = req.file.filename; //req.file is an object data which has different fields where filename is one of the field that holds filename
            //{....filename: <name>} single file object holded by req.file
            //this section keeps filename in image key of data/req.body
            //we are binding text-data and files
        }

        //array
        //  if(req.files){
        //        //[{....filename:<name>}, {....filename:<name>}] array of objects of single files which is hold by req.files
        //        data.images = req.files.map((img) => {img.filename})

        //  }

        //bcrypt hashing
        data.password = bcrypt.hashSync(data.password, 10)

        data = this.generateUserActivationToken(data)

        data.status = "inactive"
        
        // bcrypt.compare(data.confirmPassword, data.password) -> returns boolean
        // delete data.confirmPassword
        // delete data.password
        //console.log(data,"i am from data")
        return data
    } 

    sendActivationEmail = async ({ email, name, token, sub = "Activate your account!!" }) => {
        try {
            //mail service
            await mailSvc.sendEmail({
                to: email,
                sub: sub,
                message: `
                  Dear ${name}, <br/>
                  <p>Your account has been registered successfully</p>
                  <p>Please click on the link below or copy paste the url in the browser to activate your account:</p>
                  <a href="${process.env.FRONTEND_URL + "activate/" + token}">${process.env.FRONTEND_URL + "activate/" + token}</a>                   
                  <br/>
                  <p>-------------------------------------------------------------------</p>
                  <p>Regards</p>
                  <p>System Admin</p>
                  <p>${process.env.SMTP_FROM}</p>
                  <br/>
                  <p>
                     <small><em>Please do not reply to this email.</em></small>
                  </p>
                `
            })
        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }

    registerUser = async (data) => {
        try {
            const user = new UserModel(data)
            return await user.save();

        } catch (exception) {
            //TODO cleanup
            throw exception
            // throw {status: 400, detail: msg, message: "Validation failed"}
        }
    }

    getSingleUserByFilter = async (filter) => {
        try { //console.log(filter,"I am from filter")
            const userDetail = await UserModel.findOne(filter);
            //console.log(userDetail, "I am from userDetail")
            if(userDetail) {
                return userDetail;
            } else {
                throw {status: 404, message: "User does not exists"}
            }
        } catch(exception){
            throw exception
        }
    }

}

const userSvc = new UserService()
module.exports = userSvc 