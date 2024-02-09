const stateModel = require("../models/stateModel");
const cityModel = require("../models/cityModel");
const countryModel = require("../models/countryModel");

const createCity = async function(req,res){
try{
let {stateId,city,countryId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});

if(!countryExists) return res.status(400).send({status:false,message:"no country exits with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this id"});

let cityExists = await cityModel.findOne({stateId:stateId,city:city});
if(cityExists) return res.status(400).send({status:false,message:"city already exists"});

let data = await cityModel.create(req.body);
if(data)
return res.status(201).send({status:true,message:"city is created successfully"});

}catch(error){
    console.log(error.message);
}
}

const updateCity = async function(req,res){
try{
let {stateId,city,cityId,countryId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country exists with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(200).send({status:false,message:"no state exists with this id"});

let cityExists = await cityModel.findOne({_id:cityId});
if(!cityExists) return res.status(400).send({status:false,message:"no city exists with this cityId"});

let data = await cityModel.findOneAndUpdate(
{stateId:stateId},
{$set:{stateId:stateId,city:city}},
{new:true}
)

return res.status(200).send({status:true,message:"city is updated"})

}catch(error){
    console.log(error.message)
}
}

const getCity = async function(req,res) {
try{
let {stateId,city,countryId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country Exists with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this stateId"});

let cityExists = await cityModel.findOne({stateId:stateId,city:city});
if(!cityExists) return res.status(400).send({status:false,message:"no city exists with this name"});

return res.status(200).send({status:true,message:cityExists});

}catch(error){
    console.log(error.message)
}
}

const deleteCity = async function(req,res) {
try{
let {stateId,city,countryId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country Exists with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this countryId"});

 let cityExists = await cityModel.findOne({stateId:stateId,city:city});
if(!cityExists) return res.status(400).send({status:false,message:"no city exists with this name"});

let data = await cityModel.deleteOne({stateId:stateId,city:city})
return res.status(200).send({status:true,message:"city is deleted"})

}catch(error){
    console.log(error.message);
}
};

const getAllCities = async function(req,res){
try{
let {stateId,countryId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country exists with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this stateId"});

let cityExists = await cityModel.find({stateId:stateId});
if(!cityExists.length == 0) return res.status(400).send({status:false,message:"no city exists with this name"});

return res.status(200).send({status:true,message:cityExists})

}catch(error){
    console.log(error.message)
}
}

module.exports = {createCity,updateCity,getCity,deleteCity,getAllCities}