const bcrypt = require("bcryptjs")
require("../config/db.config")
const { UserRoles, StatusType } = require("../config/constants.config.js")
const UserModel = require("../modules/user/user.model.js")


const adminUsers = [
    {
        name: "Mani Hang Maden",
        email: "mani.hang1234@gmail.com",
        password: bcrypt.hashSync("Admin123#", 10),
        role: UserRoles.ADMIN,
        status: StatusType.ACTIVE,
    }
]
console.log(adminUsers)

const seedUser = () => {
    try {
        console.log("I am in seedUser")
        adminUsers.map(async (user) => {
            const userExisting = await UserModel.findOne({
                email: user.email
            })
            if (!userExisting) {
                const userObj = new UserModel(user)
                await userObj.save()
            }

        })
      // process.exit(1)
    } catch(exception) {
        console.log(exception)
    }
    
}
seedUser();
