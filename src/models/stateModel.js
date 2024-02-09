const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const stateSchema = new mongoose.Schema({
countryId:{type:objectId,ref:'country'},
state:{type:String,required:true}
})


module.exports = mongoose.model("state",stateSchema)