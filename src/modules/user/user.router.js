const router = require("express").Router();
const userCtrl = require("./user.controller")
const loginCheck = require("../../middlewares/auth.middleware")
const hasPermission = require("../../middlewares/rbac.middleware")
const { setPath, uploadFile } = require("../../middlewares/uploader.middleware");
const { FileFilterType } = require("../../config/constants.config");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const { UserCreateDTO } = require("./user.request");

//TODO: Cleanup and optimization
//multer


//router.use(loginCheck)   //uses middleware loginCheck by all function below this

router.route("/")   //this is route method of router.which helps to bind same route/end point. here post and get has same end point ("/"). this is called grouping of the routes.
    .post(loginCheck, hasPermission("admin"), setPath("user"), uploadFile().single("image"),bodyValidator(UserCreateDTO), userCtrl.userCreate)
    .get(userCtrl.userLists)
         //data receive
    //data validate
         //fail=> respond
         //if success
             //data manipulate
                 //password => admin123 => encrypt
             //connect to database
             //db select
               //db store
                    //fail
                    //faile respond
                    //success
                    //email(optional)

router.route("/:id")
    .get(userCtrl.userDetailById)
    .put(userCtrl.userUpdateById)
    .delete(userCtrl.userDeleteById)


module.exports = router;