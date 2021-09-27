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
    res.send("Hello World!!!!")
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

app.listen(5555, () => {
    console.log("Up and running -- This is our Customers service");
});
