const { deleteFile } = require("../utilities/helpers")


const bodyValidator = (schema) => { 
    return async (req, res, next) => {
        try{
            const data = req.body
            // console.log(data, "From bodyvalidator")
            // console.log(req, "From bodyvalidator req")
        
            if(req.file) {
            //    console.log(req.file,"from bodyvalidator") // {field: "profile"} field contains keyname of the file
              console.log(req.file, "test run")
               data[req.file.fieldname] = req.file.filename

            } else if (req.files) {
            //TODO: Manipulate
              }
            // console.log(data, "schema data")
             await schema.validateAsync(data, {abortEarly: false})
            next()

            } catch(exception) {
                //   console.log(exception,"look im here")
                // const code = 400
                   let detail = {}

                   if(req.file) {
                    // console.log(req.file)
                    deleteFile("./" + req.file.path)
                   }
 
                   exception.details.map((error) => {
                   //console.log(error)
                   detail[error["path"][0]] = error.message //error is one of the object of array of object called details which consists of key called field that is an array where 0 index holds information in which field error occured.
                    })                                      //error["path"] -> selects path key of error object
                next({status: 400, detail: detail})
                }
        //data validate
    }
}


module.exports = {
    bodyValidator
}