const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
firstName:{type:String,required:true,trim:true},
lastName:{type:String,required:true,trim:true},
gender:{type:String,enum:['male','female','others'],required:true,trim:true},
email:{type:String,required:true,unique:true,trim:true},
password:{type:String,required:true,trim:true},
cityId:{type:objectId,ref:'city',required:true,required:true},
stateId:{type:objectId,ref:'state',required:true,required:true},
countryId:{type:objectId,ref:'country',required:true,reqired:true},
zip:{type:String,required:true,trim:true},
interest:{type:[String],required:true,enum:['reading','writing','travelling','playing']},
//interest:{type:String,required:true,enum:['reading','writing','travelling','playing']},
//image:{type:String,required:true},
isDeleted:{type:Boolean,required:true,default:false}
},{timestamps:true});
    
    
module.exports = mongoose.model("User",userSchema);