const router = require("express").Router()
const { FileFilterType } = require("../../config/constants.config");
const loginCheck = require("../../middlewares/auth.middleware");
const hasPermission = require("../../middlewares/rbac.middleware");
const { setPath, uploadFile } = require("../../middlewares/uploader.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const attributeController = require("./attribute.controller.js");
const { AttributeCreateDTO, AttributeUpdateDTO } = require("./attribute.request.js");

//For listing in home page
router.route("/list-home",attributeController.listForHome)

//TODO:Attributewise list product
   //router.get("/:slug/detail", attributeController.detailBySlug)

router.route("/")
      .post(loginCheck, hasPermission("admin"), setPath("attribute"), uploadFile(FileFilterType.IMAGE).single("image"), bodyValidator(AttributeCreateDTO), attributeController.create)
      .get(loginCheck, hasPermission("admin"), attributeController.index)

router.route("/:id")
      .get(loginCheck, hasPermission("admin"), attributeController.show)
      .patch(loginCheck, hasPermission("admin"), setPath("attribute"), uploadFile(FileFilterType.IMAGE).single("image"), bodyValidator(AttributeUpdateDTO), attributeController.update)
      .delete(loginCheck, hasPermission("admin"), attributeController.delete)
module.exports = router;