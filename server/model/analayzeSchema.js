const mongoose = require("mongoose")
const analyzeSchema = mongoose.Schema({

    text: {
        type: String
    },
    score:{
        type:Number
    },
    positive:{
        type:[String]
    }
    ,
    negative:{
        type:[String]
    }

}
)
module.exports = mongoose.model("analizeData", analyzeSchema);