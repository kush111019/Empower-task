const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;


const citySchema = new mongoose.Schema({
stateId:{type:objectId,ref:'state',required:true},
city:{type:String,required:true}
})
    
    
module.exports = mongoose.model("city",citySchema)