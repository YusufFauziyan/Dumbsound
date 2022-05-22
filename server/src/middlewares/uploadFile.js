// import package here
const multer = require("multer")

exports.uploadFile = (imageSong, fileSong) => {
  // multer disk storage
  const fileName = ""
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads") //location save image
    },
    filename: (req, file, cb) => {
      cb (null, Date.now() + "-" + file.originalname.replace(/\s/g,""))
    }
  })

  //check filter by type
  const fileFilter = (req, file, cb) => {
    // image
    if (file.fieldname === imageSong) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp3)$/)) {
          req.fileValidationError = {
              message: "Only image files are allowed!"
          };
          return cb(new Error("Only image files are allowed!"), false);
      }
  }
    // song
    if (file.fieldname === fileSong) {
      if (!file.originalname.match(/\.(mp3)$/)) {
          req.fileValidationError = {
              message: "Only video files are allowed!"
          };
          return cb(new Error("Only video files are allowed!"), false);
      }
  }
    cb (null, true)
  }

  // check type size
  const sizeInMB = 50 //result max size
  const maxSize = sizeInMB * 1000 * 1000; //convert size
  
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
    }).fields([
      {
          name: imageSong,
          maxCount: 1
      },
      {
          name: fileSong,
          maxCount: 1
      }
  ])

  // middleware handler
  return (req, res, next) => {
    upload (req, res, (err) => {
      // if validation failed
      if (req.fileValidationError){
        return res.status(400).send(req.fileValidationError)
      }
      // if (!req.file && !err){
      //   return res.status(400).send({
      //     message: "Please select files to upload"
      //   })
      // }
      if (err){
        if(err.code === "LIMIT_FILE_SIZE"){
          return res.status(400).send({
            message: "Max File size 50MB"
          })
        }
        return res.status(400).send(err)
      }
      
      return next() //can access using req.file if no err
    })  
  }
}