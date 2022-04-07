const db = require('../models/db_model')
const User = db.user;

module.exports = (req, res, next) => {
    User.findAll({ where: {email: req.body.email}})
    .then(data => {
        console.log(data);
        if(data.length != 0) return res.status(400).send('user already registered')
    })

    next();
}