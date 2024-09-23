require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSvc = require("../modules/user/user.service");

const loginCheck = async (req, res, next) => {
    try {
        let token = req.headers["authorization"] || null;  //receive JWT token from header. while binding Authorization while receiving authorization
        if(!token) {
            // console.log("why am i here")
            throw {status:401, message: "Unauthorized Access!!"}
        } else {
            //token comes in the array like => ["Bearer", "token"]
            token = token.split(" ").pop() 

            //varification of token
             const data = jwt.verify(token, process.env.JWT_SECRET)
            //  console.log(data)
             if(data.hasOwnProperty("type")){
                throw {status: 403, message: "Access token required"}
             }
            //  console.log(data.sub)
             const user = await userSvc.getSingleUserByFilter({
                _id: data.sub
             })

             req.authUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                address: user.address,
                phone: user.phone,
                image: user.image
             }

             next();

        }

    } catch(exception) {
        console.log(exception)
        next({status: 401, message: exception.message})
    }
}
module.exports = loginCheck;