import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "./public/temp");
    },
    filename: function (req,file,cb){
        const fn = Date.now + (Math.floor(Math.random() * 100))
        cb(null, fn)
    }
})

const upload = multer({storage,})
export { upload }