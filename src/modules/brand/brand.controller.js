const { uploadImage } = require("../../config/cloudinary.config.js");
const { StatusType } = require("../../config/constants.config.js");
const { deleteFile } = require("../../utilities/helpers.js");
const brandService = require("./brand.service.js");
const slugify = require("slugify");

class BrandController {

  brandDetail;

  #validateId = async (id) => {
    try {

      if (!id) {
        throw { status: 400, message: "Id is required" }
      }

      this.brandDetail = await brandService.getDetailByFilter({
        _id: id
      })

      if (!this.brandDetail) {
        throw { status: 404, message: "Brand does not exists" }
      }
    } catch (exception) {
      throw (exception)
    }
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.image = await uploadImage("./public/uploads/brand/" + req.file.filename);

      //Slug to be created
      //created by replacing special character,spaces of title with - or _
      data.slug = slugify(data.title, {lower: true}) //lower: true converts capital to small letters.
      //uniqueness check
      //db => {slug: data.slug} =>data fetch
      //data.slug = data.slug + "-" + randomstinggenrator(10).toLowerCase()



      deleteFile("./public/uploads/brand/" + req.file.filename);

      data.createdBy = req.authUser._id;

      const brand = await brandService.createBrand(data);

      res.json({
        result: brand,
        message: "Brand created successfully",
        meta: null
      })

      console.log(data, "cloudinary")
      //   res.json({
      //     result: null,
      //     message: "brand created",
      //     meta: null
      //   })
    } catch (exception) {
      console.log(exception)
      next(exception)
    }
  }

  index = async (req, res, next) => {
    try {
      //const data = await BrandModel.find() this loads all the data of DB which will take lot of time to load.So pagination is done
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

      const { count, data } = await brandService.listData({
        skip: skip,
        limit: limit,
        filter: filter
      });

      res.json({
        result: data,
        message: "Brand list all",
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
        result: this.brandDetail,
        message: "Brand Fetched Successfully!!",
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
        data.image = await uploadImage("./public/uploads/brand/" + req.file.filename);
        deleteFile("./public/uploads/brand/" + req.file.filename);
      }

      const response = await brandService.updateBrand(data, id);
      res.json({
        result: response,
        message: "Brand updated successfully",
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
       const response = await brandService.deleteById(id);
       //TODO: Delete image from cloudinary
      
       res.json({
        result: response,
        message: "Brand deleted successfully",
        meta: null
       })

    } catch (exception) {
      next(exception)
    }
  }
  
  //Example to list brand in homepage
    listForHome = async (req, res, next) => {
      try {
         const list = await brandService.listData({
          limit: 5,
          filter: {
            status: StatusType.ACTIVE
          }
        })
        res.json({
          result: list,
          meta: null,
          message: "Brand List"
        })
      } catch(exception) {
        next(exception)
      }
    }

}

module.exports = new BrandController()