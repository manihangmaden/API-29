const BannerModel = require("./banner.model.js")

class BannerService {
    createBanner = async (data) => {
        try {
             const banner = new BannerModel(data);
             return await banner.save()
        } catch(exception) {
            throw exception
        }
    }

    listData = async ({skip=0, limit=10, filter={}}) => {
        try {
            const count = await BannerModel.countDocuments(filter);
           const data = await BannerModel.find(filter)
                                         .populate("createdBy", ["_id", "name", "email", "role"])
                                         .sort({_id: "desc"})
                                         .limit(limit)
                                         .skip(skip)

            return {count, data}

        } catch(exception){
            throw exception
        }
    }

    getDetailByFilter = async (filter) => {
        try{
            const bannerDetail = await BannerModel.findOne(filter)
                                                  .populate("createdBy", ["_id", "name", "email", "role"])

            return bannerDetail;
            
        } catch(exception) {    
            throw exception
        }
    }

    updateBanner= async (data, id) => {
        try {
           const response = await BannerModel.findByIdAndUpdate(id, {$set: data}, {new: true})
           return response;
        } catch(exception) {
            throw exception
        }
    }
    
    deleteById = async (id) => {
        try {
           const response = await BannerModel.findByIdAndDelete(id);
           if(!response) {
            throw {status: 404, message: "Banner not found"}
           }
           return response
        } catch(exception) {

        }
    }
}

module.exports = new BannerService()