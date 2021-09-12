const mongoose = require("mongoose");

mongoose.model("Customer", {
    Nom: {
        type: String,
        require: false
    },
    Prenom: {
        type: String,
        require: false
    },
    Age: {
        type: String,
        require: false
    },
    

})

