
const {validate} = require('../models/category_validate');
const validate_mid = require('../middleware/validate')

module.exports = function(app) {
    const category = require("../controllers/category_controller");
  
    var router = require("express").Router();
  

    // Create a new Tutorial
    router.get("/:id", (category.findOne));
    router.get("/", (category.findAll));
    router.post("/",validate_mid(validate), category.create);
    router.put("/:id",validate_mid(validate), (category.update));
    router.delete("/:id", (category.delete));
    router.delete("/", (category.deleteAll));
 
    app.use('/api/category', router);
};
