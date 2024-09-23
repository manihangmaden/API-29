const router = require("express").Router()
const { FileFilterType } = require("../../config/constants.config");
const loginCheck = require("../../middlewares/auth.middleware");
const hasPermission = require("../../middlewares/rbac.middleware");
const { setPath, uploadFile } = require("../../middlewares/uploader.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const brandController = require("./brand.controller");
const { BrandCreateDTO, BrandUpdateDTO } = require("./brand.request.js");

//For listing in home page
router.route("/list-home",brandController.listForHome)

//TODO:Brandwise list product
   //router.get("/:slug/detail", brandController.detailBySlug)

router.route("/")
      .post(loginCheck, hasPermission("admin"), setPath("brand"), uploadFile(FileFilterType.IMAGE).single("image"), bodyValidator(BrandCreateDTO), brandController.create)
      .get(loginCheck, hasPermission("admin"), brandController.index)

router.route("/:id")
      .get(loginCheck, hasPermission("admin"), brandController.show)
      .patch(loginCheck, hasPermission("admin"), setPath("brand"), uploadFile(FileFilterType.IMAGE).single("image"), bodyValidator(BrandUpdateDTO), brandController.update)
      .delete(loginCheck, hasPermission("admin"), brandController.delete)
module.exports = router;