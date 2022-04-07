
const { validate } = require('../models/project');
const validate_mid = require('../middleware/validate')

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

var upload = multer({ storage });

module.exports = function(app) {
    const project = require("../controllers/project_controller");
  
    var router = require("express").Router();
    

    // Create a new Tutorial
    router.get("/:id", (project.findOne));
    router.get("/", (project.findAll));
    router.post("/",[ upload.array('image', 5), validate_mid(validate)], project.create);
    router.put("/:id",[ upload.array('image', 5),validate_mid(validate) ], (project.update));
    router.delete("/:id", (project.delete));
    router.delete("/", (project.deleteAll));
 
    app.use('/api/projects', router);
};