const router = require("express").Router()
const { FileFilterType } = require("../../config/constants.config");
const loginCheck = require("../../middlewares/auth.middleware");
const hasPermission = require("../../middlewares/rbac.middleware");
const { setPath, uploadFile } = require("../../middlewares/uploader.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const categoryController = require("./category.controller");
const { CategoryCreateDTO, CategoryUpdateDTO } = require("./category.request.js");

//For listing in home page
router.route("/list-home",categoryController.listForHome)

//TODO:Categorywise list product
   //router.get("/:slug/detail", categoryController.detailBySlug)

router.route("/")
      .post(loginCheck, hasPermission("admin"), setPath("category"), uploadFile(FileFilterType.IMAGE).single("image"), bodyValidator(CategoryCreateDTO), categoryController.create)
      .get(loginCheck, hasPermission("admin"), categoryController.index)

router.route("/:id")
      .get(loginCheck, hasPermission("admin"), categoryController.show)
      .patch(loginCheck, hasPermission("admin"), setPath("category"), uploadFile(FileFilterType.IMAGE).single("image"), bodyValidator(CategoryUpdateDTO), categoryController.update)
      .delete(loginCheck, hasPermission("admin"), categoryController.delete)
module.exports = router;