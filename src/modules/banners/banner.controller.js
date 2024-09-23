const { uploadImage } = require("../../config/cloudinary.config.js");
const { StatusType } = require("../../config/constants.config.js");
const { deleteFile } = require("../../utilities/helpers.js");
const bannerService = require("./banner.service.js");

class BannerController {

  bannerDetail;

  #validateId = async (id) => {
    try {

      if (!id) {
        throw { status: 400, message: "Id is required" }
      }

      this.bannerDetail = await bannerService.getDetailByFilter({
        _id: id
      })

      if (!this.bannerDetail) {
        throw { status: 404, message: "Banner does not exists" }
      }
    } catch (exception) {
      throw (exception)
    }
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.image = await uploadImage("./public/uploads/banner/" + req.file.filename);

      deleteFile("./public/uploads/banner/" + req.file.filename);

      data.createdBy = req.authUser._id;

      const banner = await bannerService.createBanner(data);

      res.json({
        result: banner,
        message: "Banner created successfully",
        meta: null
      })

      console.log(data, "cloudinary")
      //   res.json({
      //     result: null,
      //     message: "banner created",
      //     meta: null
      //   })
    } catch (exception) {
      console.log(exception)
      next(exception)
    }
  }

  index = async (req, res, next) => {
    try {
      //const data = await BannerModel.find() this loads all the data of DB which will take lot of time to load.So pagination is done
      //pagination
      //if we have 100 data and if we choose to show 10 data per page then, totaldata/limit => 100/10 => 10 pages is required
      //1 page => 1 to 10
      //2nd page => 11 to 20

      //search feature
      //it also contains pagination

      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skip = (page - 1) * limit;

      let filter = {};
      if (req.query.search) {
        filter = {
          title: new RegExp(req.query.search, "i")
        }
      }

      const { count, data } = await bannerService.listData({
        skip: skip,
        limit: limit,
        filter: filter
      });

      res.json({
        result: data,
        message: "Banner list all",
        meta: {
          currentPage: page,
          total: count,
          limit: limit
        }
      })


    } catch (exception) {
      next(exception)
    }
  }

  show = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.#validateId(id);
      res.json({
        result: this.bannerDetail,
        message: "Banner Fetched Successfully!!",
        meta: null
      })


    } catch (exception) {
      next(exception)
    }
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.#validateId(id);

      const data = req.body;
      if (req.file) {
        data.image = await uploadImage("./public/uploads/banner/" + req.file.filename);
        deleteFile("./public/uploads/banner/" + req.file.filename);
      }

      const response = await bannerService.updateBanner(data, id);
      res.json({
        result: response,
        message: "Banner updated successfully",
        meta: null
      })

    } catch (exception) {
      next(exception)
    }
  }

  delete = async (req, res, next) => {
    try {
       const id = req.params.id;
       await this.#validateId(id)
       const response = await bannerService.deleteById(id);
       //TODO: Delete image from cloudinary
      
       res.json({
        result: response,
        message: "Banner deleted successfully",
        meta: null
       })

    } catch (exception) {
      next(exception)
    }
  }
  
  //Example to list banner in homepage
    listForHome = async (req, res, next) => {
      try {
         const list = await bannerService.listData({
          
          limit: 5,
          filter: {
            status: StatusType.ACTIVE,
            startDate: {$lte: new Date()},
            endDate: {$gte:new Date()}
          }
        })
        res.json({
          result: list,
          meta: null,
          message: "Banner List"
        })
      } catch(exception) {
        next(exception)
      }
    }

}

module.exports = new BannerController()