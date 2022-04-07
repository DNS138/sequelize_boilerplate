const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const db = require('./models/db_model')



require("./routes/user_route")(app);
require("./routes/category-route")(app);
require("./routes/project-route")(app);



var corsOptions = {
    origin: "http://localhost:8081"
};
  
app.use(cors(corsOptions));
// db.sequelize.sync()


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
