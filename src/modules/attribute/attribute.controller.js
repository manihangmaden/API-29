const { uploadImage } = require("../../config/cloudinary.config.js");
const { StatusType } = require("../../config/constants.config.js");
const { deleteFile } = require("../../utilities/helpers.js");
const attributeService = require("./attribute.service.js");
const slugify = require("slugify");

class AttributeController {

  attributeDetail;

  #validateId = async (id) => {
    try {

      if (!id) {
        throw { status: 400, message: "Id is required" }
      }

      this.attributeDetail = await attributeService.getDetailByFilter({
        _id: id
      })

      if (!this.attributeDetail) {
        throw { status: 404, message: "Attribute does not exists" }
      }
    } catch (exception) {
      throw (exception)
    }
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      // data.image = await uploadImage("./public/uploads/attribute/" + req.file.filename);

      //Slug to be created
      //created by replacing special character,spaces of title with - or _
      // data.slug = slugify(data.title, {lower: true}) //lower: true converts capital to small letters.
      //uniqueness check
      //db => {slug: data.slug} =>data fetch
      //data.slug = data.slug + "-" + randomstinggenrator(10).toLowerCase()



      // deleteFile("./public/uploads/attribute/" + req.file.filename);

      data.createdBy = req.authUser._id;

      const attribute = await attributeService.createAttribute(data);

      res.json({
        result: attribute,
        message: "Attribute created successfully",
        meta: null
      })

      // console.log(data, "cloudinary")
      //   res.json({
      //     result: null,
      //     message: "attribute created",
      //     meta: null
      //   })
    } catch (exception) {
      console.log(exception)
      next(exception)
    }
  }

  index = async (req, res, next) => {
    try {
      //const data = await AttributeModel.find() this loads all the data of DB which will take lot of time to load.So pagination is done
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

      const { count, data } = await attributeService.listData({
        skip: skip,
        limit: limit,
        filter: filter
      });

      res.json({
        result: data,
        message: "Attribute list all",
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
        result: this.attributeDetail,
        message: "Attribute Fetched Successfully!!",
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
        data.image = await uploadImage("./public/uploads/attribute/" + req.file.filename);
        deleteFile("./public/uploads/attribute/" + req.file.filename);
      }

      const response = await attributeService.updateAttribute(data, id);
      res.json({
        result: response,
        message: "Attribute updated successfully",
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
       const response = await attributeService.deleteById(id);
       //TODO: Delete image from cloudinary
      
       res.json({
        result: response,
        message: "Attribute deleted successfully",
        meta: null
       })

    } catch (exception) {
      next(exception)
    }
  }
  
  //Example to list attribute in homepage
    listForHome = async (req, res, next) => {
      try {
         const list = await attributeService.listData({
          limit: 5,
          filter: {
            status: StatusType.ACTIVE
          }
        })
        res.json({
          result: list,
          meta: null,
          message: "Attribute List"
        })
      } catch(exception) {
        next(exception)
      }
    }

}

module.exports = new AttributeController()