import path from 'path'
import multer from 'multer'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//photo Storage (USER)
const photoStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname,'../utils/images'))
  },
  filename: function(req, file, cb){
    if(file){
      cb(null, new Date().toISOString().replace(/:/g, '-') +  file.originalname);
    } else {
      cb(null, false)
    }
  }
}) 

//Photo Upload middleware (USER)
export const uploadImage = multer({ 
  storage: photoStorage,
  fileFilter: function(req, file, cb) {
    if(file.mimetype.startsWith("image")){
      cb(null, true)
    } else {
      cb('Please only upload images', false)
    }
  },
limits: { fileSize: 1024 * 1024 * 1} //1 megabyte
});


//IMGS Upload middleware OF PRODUCT
const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.originalname )
  },
})
export const upload = multer({storage: storage})


