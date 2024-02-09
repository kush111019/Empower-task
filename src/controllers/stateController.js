const stateModel = require("../models/stateModel");
const countryModel = require("../models/countryModel");
const cityModel = require("../models/cityModel");

const createState = async function(req,res){
try{
let {countryId,state} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country exists with this id"});

let stateExists = await stateModel.findOne({state:state});
if(stateExists) return res.status(400).send({status:false,message:"state already exists"});

let data = await stateModel.create(req.body);
if(data)
return res.status(201).send({status:true,message:"state is created successfully"});

}catch(error){
    console.log(error.message);
}
}

const updateState = async function(req,res){
try{
let {countryId,state,stateId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(200).send({status:false,message:"no country exists with this id"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this stateId"})

let data = await stateModel.findOneAndUpdate(
{countryId:countryId},
{$set:{countryId:countryId,state:state}},
{new:true}
)

return res.status(200).send({status:true,message:"state is updated"})
}catch(error){
    console.log(error.message)
}
}

const getState = async function(req,res) {
try{
let {countryId,stateId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country exists with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this stateId"});

return res.status(200).send({status:true,message:stateExists});

}catch(error){
    console.log(error.message)
}
}

const deleteState = async function(req,res) {
try{
let {countryId,stateId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country exists with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this stateId"});

let data = await stateModel.deleteOne({countryId:countryId});
let cities = await cityModel.find({stateId:stateExists._id});

let citiesDeleted;
for(let i = 0; i < cities.length;i++)
{
 citiesDeleted = await cityModel.deleteOne({cityId:cities[i]._id})
}

return res.status(200).send({status:true,message:"state is deleted"})
}catch(error){
    console.log(error.message);
}
};

const getAllStates = async function(req,res){
try{
let {countryId} = req.body;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country exists with this countryId"});

let stateExists = await stateModel.find({countryId:countryId});
if(stateExists.length == 0) return res.status(400).send({status:false,message:"no state exists with this countryId"})

return res.status(200).send({status:true,message:stateExists})
}catch(error){
    console.log(error.message)
}
}

const getAllCitiesInAState = async function(req,res) {
try{
let stateId = req.body.stateId;

let countryId = req.body.countryId;

let countryExists = await countryModel.findOne({_id:countryId});
if(!countryExists) return res.status(400).send({status:false,message:"no country exists with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this stateId"});

let cities = await cityModel.find({stateId:stateId});
if(cities.length == 0) return res.status(400).send({status:false,message:"no cities exists with this stateId"});

return res.status(200).send({status:true,message:cities})

}catch(error){
    console.log(error.message);
}
}

module.exports = {createState,updateState,getState,deleteState,getAllStates,getAllCitiesInAState}