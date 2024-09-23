const AttributeModel = require("./attribute.model.js")

class AttributeService {
    createAttribute = async (data) => {
        try {
             const attribute = new AttributeModel(data);
             return await attribute.save()
        } catch(exception) {
            throw exception
        }
    }

    listData = async ({skip=0, limit=10, filter={}}) => {
        try {
            const count = await AttributeModel.countDocuments(filter);
           const data = await AttributeModel.find(filter)
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
            const attributeDetail = await AttributeModel.findOne(filter)
                                                  .populate("createdBy", ["_id", "name", "email", "role"])

            return attributeDetail;
            
        } catch(exception) {    
            throw exception
        }
    }

    updateAttribute= async (data, id) => {
        try {
           const response = await AttributeModel.findByIdAndUpdate(id, {$set: data}, {new: true})
           return response;
        } catch(exception) {
            throw exception
        }
    }
    
    deleteById = async (id) => {
        try {
           const response = await AttributeModel.findByIdAndDelete(id);
           if(!response) {
            throw {status: 404, message: "Attribute not found"}
           }
           return response
        } catch(exception) {

        }
    }
}

module.exports = new AttributeService()