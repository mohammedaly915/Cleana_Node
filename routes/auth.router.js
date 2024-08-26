const router = require("express").Router();
const authController=require("../controllers/auth.controller")
const locationController=require("../controllers/location.controller")
const multer=require('multer')


const diskStorage= multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'uploads')    
    },
    filename:function(req,file,cb){
            const ext=file.mimetype.split('/')[1]
            const fileName =`user-${Date.now()}.${ext}`
            cb(null,fileName)
    }    
})
const fileFilter=(req,file,cb)=>{
    const imageType=file.mimetype.split('/')[0]
    if (imageType==='image'){
        return cb(null,true)
    }else{
        return cb(app.create('file must be an image',400),false)
    } 
}
const upload =multer({
    storage:diskStorage,
    fileFilter
})
const optionalUpload = (req, res, next) => {
    upload.single('userPic')(req, res, (err) => {
        if (err) { 
            console.log(err);
            return next(err);
        }
        // Proceed to next middleware or route handler
        next();
    });
};

//REGISTER
router.route("/register").post(optionalUpload,authController.register);
router.route("/login").post(authController.login);

router.route("/intiate").get(locationController.initializeCountriesAndCities);
router.route("/intiateCity").get(locationController.initializeCitiesForEgypt);
router.route("/countries").get(locationController.getCountries);
router.route("/:countryId/city").get(locationController.getCitiesByCountry);

//LOGIN 
router.route("/login").post(authController.login);

module.exports = router;
