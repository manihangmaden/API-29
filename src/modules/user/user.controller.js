require("dotenv").config();
const UserModel = require("./user.model.js");
const userSvc = require("./user.service.js");


class UserController {
    userCreate = async (req, res, next) => {
        try {
            const data = userSvc.transformUserCreate(req)
            console.log(data,"i am from usercontroller")
            const user = await userSvc.registerUser(data) //database store
            await userSvc.sendActivationEmail({name: user.name, email: user.email, token: user.activationToken})

            res.json({
                result: user,
                message: "User created",
                meta: null
            })
        } catch (exception) {
            console.log("I am here",exception)
            next(exception)
        }
    }

    userLists = (req, res, next) => {
        res.json({
            result: "null",
            message: "list all users",
            meta: null
        })
    }

    userDetailById = (req, res, next) => {
        res.json({
            result: "null",
            message: `User detail of ${req.params.id}`,
            meta: null
        })
    }

    userUpdateById = (req, res, next) => {
        res.json({
            result: "null",
            message: `user update of ${req.params.id}`,
            meta: null
        })
    }

    userDeleteById = (req, res, next) => {
        // const params = req.params
        res.json({
            result: "null",
            message: `user delete for ${req.params.id}`,
            meta: null
        })
    }
}

const userCtrl = new UserController()
module.exports = userCtrl;