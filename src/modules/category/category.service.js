const CategoryModel = require("./category.model.js")

class CategoryService {
    createCategory = async (data) => {
        try {
             const category = new CategoryModel(data);
             return await category.save()
        } catch(exception) {
            throw exception
        }
    }

    listData = async ({skip=0, limit=10, filter={}}) => {
        try {
            const count = await CategoryModel.countDocuments(filter);
           const data = await CategoryModel.find(filter)
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
            const categoryDetail = await CategoryModel.findOne(filter)
                                                  .populate("createdBy", ["_id", "name", "email", "role"])

            return categoryDetail;
            
        } catch(exception) {    
            throw exception
        }
    }

    updateCategory= async (data, id) => {
        try {
           const response = await CategoryModel.findByIdAndUpdate(id, {$set: data}, {new: true})
           return response;
        } catch(exception) {
            throw exception
        }
    }
    
    deleteById = async (id) => {
        try {
           const response = await CategoryModel.findByIdAndDelete(id);
           if(!response) {
            throw {status: 404, message: "Category not found"}
           }
           return response
        } catch(exception) {

        }
    }
}

module.exports = new CategoryService()