
const db = require("../models/db_model")
const Category = db.category;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {

    // Create a Category
    const category = {
        name: req.body.name,
    };
  
    // Save Category in the database
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err || "Some error occurred while creating the Category."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Category.findByPk(id)
      .then(data => {
        if(data == null) res.status(404).send("category with given id not found")
        res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Category with id=" + id
        });
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Category.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err || "Some error occurred while retrieving categories."
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id }
    })

    .then(num => {
        if (num == 1) {
            res.send({
                message: "Category was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Category with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Category was deleted successfully!"
            });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
    });
};

exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while removing all categories."
            });
        });
};
