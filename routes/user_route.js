
const { validate } = require('../models/user');
const validate_mid = require('../middleware/validate');
const validateEmail = require('../middleware/validateEmail');


module.exports = function(app) {
    const user = require("../controllers/user_controller");
  
    var router = require("express").Router();
  

    // Create a new Tutorial
    router.get("/admin", (user.findAllAdmin));
    router.get("/:id", (user.findOne));
    router.get("/", (user.findAll));
    router.post("/",[validateEmail,validate_mid(validate)], user.create);
    router.put("/:id",validate_mid(validate), (user.update));
    router.delete("/:id", (user.delete));
    router.delete("/", (user.deleteAll));
 
    app.use('/api/users', router);
};