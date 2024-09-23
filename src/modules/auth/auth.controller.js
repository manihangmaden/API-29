require("dotenv").config();
const { StatusType } = require("../../config/constants.config");
const userSvc = require("../user/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

class AuthController {
    activateUser = async (req, res, next) => {
        try {
            const {token} = req.params;
            console.log(token,"Iam from auth token")
            if (token.length !== 100) {
                throw { status: 422, message: "Invalid Token" }
            }
            let user = await userSvc.getSingleUserByFilter({
                activationToken: token
            })
            //TODO: Update
            console.log(user, "i am from auth user")
            const today = new Date();
            const activeFor = user.activeFor
            if(activeFor < today){
                throw {status: 422, message: "Token Expired."}
            }

            //activate user
            user.activationToken = null;
            user.activeFor = null;
            user.status = StatusType.ACTIVE;

            await user.save();

            res.json({
                result: null,
                message: "Your account has been activated successfully!! Please login to proceed.",
                meta: null
            })


        } catch (exception) {
            next(exception)
        }
    }

    resendActivationToken = async (req, res, next) => {
        try{
              const {token} = req.params;
              let user = await userSvc.getSingleUserByFilter({
                activationToken: token
              })
              
              user = userSvc.generateUserActivationToken(user);
              await user.save() //either insert or update
              await userSvc.sendActivationEmail({
                email: user.email,
                name: user.name,
                token: user.activationToken,
                sub: "Re-send, Activate Your Account!!"
              })

              res.json({
                result: null,
                message: "A new activation link has been sent to your registered email. Please follow the process to activate your account.",
                meta: null
              })

        } catch(exception){
            next(exception)
        }
    }

    login = async (req, res, next) => {
        try {
             const {email, password} = req.body;
             
             const user = await userSvc.getSingleUserByFilter({
                email: email
             })

            if(bcrypt.compareSync(password, user.password)) {
                  //password match 
                  //TODO: JWT Token, 0auth, auth0
                  if(user.status === StatusType.ACTIVE){
                        
                         const token = jwt.sign({
                            sub: user._id
                         }, process.env.JWT_SECRET
                        //  , {
                        //     expiresIn: "1 day",
                        //     algorithm: "HS256"
                        //  }
                        );

                        const refreshToken = jwt.sign({
                            sub: user._id,
                            type: "refresh"
                        }, process.env.JWT_SECRET, {
                            expiresIn: "1 day"
                        })

                        res.json({
                            result: {
                                userDetail: {
                                    _id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role
                                },
                                token: {
                                    token,
                                    refreshToken
                                }
                            },
                            message: "Login successful.",
                            meta: null
                        })


                  } else {
                    throw {status: 422, message: "Your account has not been activated yet!"}
                  }
                  console.log("password match")
            } else {
                throw {status: 422, message: "Credentials does not match"}
            }

        } catch(exception) {
            next(exception)
        }
    }

    getLoggedInUser = (req, res, next) => {
        try {
               res.json({
                result: req.authUser,
                message: "Your profile",
                meta: null
               })
        } catch(exception){
            next(exception)
        }
    }

    refreshToken = async (req, res, next) => {
        try{
             let token = req.headers["authorization"] || null;
             if(!token) {
                throw {status: 401, message: "Token required"}
             }
             token = token.split(" ").pop()
             const {sub, type} = jwt.verify(token, process.env.JWT_SECRET);
             if(!type || type !== "refresh") {
                throw {status: 401, message: "Refresh token required"}
             }

             await userSvc.getSingleUserByFilter({
                _id: sub
             })

             const accessToken = jwt.sign({
                sub: sub
             }, process.env.JWT_SECRET
            //  , {
            //     expiresIn: "1 day",
            //     algorithm: "HS256"
            //  }
            );

            const refreshToken = jwt.sign({
                sub: sub,
                type: "refresh"
            }, process.env.JWT_SECRET, {
                expiresIn: "1 day"
            })

            res.json({
                result: {
                    token: accessToken,
                    refreshToken: refreshToken
                },
                message: "Token refreshed",
                meta: null
            })


        } catch(exception){
            next(exception)
        }
    }

}

module.exports = new AuthController