const router = require("express").Router()
const authRouter = require("../modules/auth/auth.router")
const userRouter = require("../modules/user/user.router")
const bannerRouter = require("../modules/banners/banner.router")
const brandRouter = require("../modules/brand/brand.router")
const categoryRouter = require("../modules/category/category.router")
const attributeRouter = require("../modules/attribute/attribute.router")

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/banner", bannerRouter)
router.use("/brand", brandRouter)
router.use("/category", categoryRouter)
router.use("/attribute", attributeRouter)


module.exports = router;