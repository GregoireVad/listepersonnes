//Load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

//Load mongoose
const mongoose = require("mongoose");

require("./CustomerModel");
const Customer = mongoose.model("Customer");
const dotenv = require("dotenv");
dotenv.config();
require('dotenv').config({ path: '.env' });
//Connect
const url = process.env.CONNECTDATABASE

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true}).then(() => {
    console.log("Successfully connected to custumersservice database");
})
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send("Bonjour Fabien et Benoît")
});

app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        console.log('customers', customers)
        res.json(customers);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.get("/lastcustomers", (req, res) => {
    Customer.find().limit(2).then((customers) => {
        res.json(customers);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.post("/customer", (req, res) => {
    let newCustomer = {
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Age: req.body.Age,
    }

    let customer = new Customer(newCustomer);

    customer.save().then(() => {
        console.log("New customer created!");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send("A new customer created with success!")
});

app.delete("/customer/:id", (req, res) => {
    Customer.findOneAndRemove(req.params.id).then(() => {
        res.send("delete")
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

app.listen(5555, () => {
    console.log("Up and running -- This is our Customers service");
});
