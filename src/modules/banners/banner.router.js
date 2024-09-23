const router = require("express").Router()
const { FileFilterType } = require("../../config/constants.config");
const loginCheck = require("../../middlewares/auth.middleware");
const hasPermission = require("../../middlewares/rbac.middleware");
const { setPath, uploadFile } = require("../../middlewares/uploader.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const bannerController = require("./banner.controller.js");
const { BannerCreateDTO, BannerUpdateDTO } = require("./banner.request.js");

//For listing in home page
router.route("/list-home")
      .get(bannerController.listForHome)

router.route("/")
      .post(loginCheck, hasPermission("admin"), setPath("banner"), uploadFile(FileFilterType.IMAGE).single("image"), bodyValidator(BannerCreateDTO), bannerController.create)
      .get(loginCheck, hasPermission("admin"), bannerController.index)

router.route("/:id")
      .get(loginCheck, hasPermission("admin"), bannerController.show)
      .patch(loginCheck, hasPermission("admin"), setPath("banner"), uploadFile(FileFilterType.IMAGE).single("image"), bodyValidator(BannerUpdateDTO), bannerController.update)
      .delete(loginCheck, hasPermission("admin"), bannerController.delete)
module.exports = router;