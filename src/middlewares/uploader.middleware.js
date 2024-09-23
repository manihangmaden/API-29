const multer = require("multer")
const fs = require("fs")
const { randomStringGenerator } = require("../utilities/helpers")
const {FileFilterType} = require("../config/constants.config")


const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
         //dir where you want to upload your file
         const path = "./public/uploads/" + req.uploadPath
         if(!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive: true})
         }
         cb(null, path);
    },

    filename: (req, file, cb) => {
        //filename.ext
        //"cat.png".split(".") ==> returns array ==> ["cat", "png"]
        const ext = file.originalname.split(".").pop()
        const filename = randomStringGenerator(40) + "." + ext;
        cb(null, filename);
    }
})


// const uploader = multer({
//     storage: myStorage,
//     limits: {
//         filesize: 3000000  //in terms of bytes
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = file.originalname.split(".").pop()
//         const allowed = ["jpg", "png", "jpeg", "svg", "bmp", "webp", "gif"]

//         if(allowed.includes(ext.toLowerCase())) {
//             cb(null, true)
//         }  else {
//             cb({code: 400, message: "File format is not supported"}, false)
//         }
//     }
// })

const uploadFile = (fileType = FileFilterType.IMAGE) => {
    
    
    let allowed = ["jpg", "png", "jpeg", "svg", "bmp", "webp", "gif"]
    
    if(fileType === FileFilterType.DOCUMENT){
        allowed = ["doc", "docx", "pdf", "csv", "xlsx", "txt"]
    } else if(fileType === FileFilterType.VIDEO) {
        allowed = [ "mp4", "mov", "wav", "mkv"]
    }

    return multer({
        storage: myStorage,
        limits: {
            fileSize: 400000  //in terms of bytes
        },
        fileFilter: (req, file, cb) => {
            const ext = file.originalname.split(".").pop()
            
    
            if(allowed.includes(ext.toLowerCase())) {
                cb(null, true)
            }  else {
                cb({code: 400, message: "File format is not supported"}, false)
            }
        }
    })
}


const setPath = (path) => {
    return (req, res, next) => {
        req.uploadPath = path;
        next()
    }
}


module.exports = {
    uploadFile,
    setPath
}