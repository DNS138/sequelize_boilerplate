
const { category } = require("../models/db_model");
const db = require("../models/db_model")
const Project = db.project;
const Category = db.category;
const Op = db.Sequelize.Op;
const _ = require('lodash');


exports.create = async (req, res) => {

    const arrayString = req.files.map(a => a.filename).toString();

    // Create a User
    const project = {
        title: req.body.title,
        Category: req.body.categoryId,
        discription: req.body.discription,
        image: arrayString
    };

    // Save User in the database
    Project.create(project)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            if(err.name == "SequelizeForeignKeyConstraintError") 
                res.status(404).send("Category with given id not found")

            res.status(500).send({
                message:
                    err.name
            });
        });
}
exports.findOne = (req, res) => {
    const id = req.params.id;
    const pathString = 'localhost:8080/uploads/'
  
    Project.findByPk(id,{
        include:
                {
                    model: Category,
                    attributes: ['name']
                }
        })
        .then(data => {
            if(data == null) res.status(404).send("project with given id not found")
            
            if(data.image){
                data.image = data.image.split(',');
                for(let j =0; j < data.image.length; j++){
                    data.image[j] = pathString.concat(`${data.image[j]}`);
                }
            }
            data.Category = data.category.name;
            data = _.pick(data, [ 'id', 'title', 'description','image','Category'])
            
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Project with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    const pathString = 'localhost:8080/uploads/'

    Project.findAll(
        { 
            include:
                {
                    model: Category,
                    attributes: ['name']
                }
        })
        .then(data => {
            for(let i=0; i < data.length; i++){
                if(data[i].image){
                    data[i].image = data[i].image.split(',');
                    for(let j =0; j < data[i].image.length; j++){
                        data[i].image[j] = pathString.concat(`${data[i].image[j]}`);
                    }
                }
                data[i].Category = data[i].category.name;
                data[i] = _.pick(data[i], [ 'id', 'title', 'description','image','Category'])
            }         
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving projects."
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Project.update(req.body, {
        where: { id: id }
    })

    .then(num => {
        if (num == 1) {
            res.send({
                message: "Project was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        if(err.name == "SequelizeForeignKeyConstraintError") 
                res.status(404).send("Category with given id not found")

        res.status(500).send({
            message: "Error updating Project with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Project.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Project was deleted successfully!"
            });
            } else {
                res.send({
                    message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Project with id=" + id
            });
    });
};

exports.deleteAll = (req, res) => {
    Project.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Projects were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while removing all projects."
            });
        });
};