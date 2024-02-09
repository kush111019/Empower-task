const countryModel = require("../models/countryModel");
const stateModel = require("../models/stateModel")
const cityModel = require("../models/cityModel")

const createCountry = async function(req,res){
 try{
 let country = req.body.country;

 let countryExists = await countryModel.findOne({country:country});
 if(countryExists) return res.status(400).send({status:false,message:"country already exits"});

 let data = countryModel.create({country:country});
 if(data)
 return res.status(201).send({status:true,message:"country is created successfully"})

 }catch(error){
 console.log(error.message)
 }
}

const updateCountry = async function(req,res){
try{
let countryId = req.body.countryId;

let country = req.body.country;

let data = await countryModel.findOne({_id:countryId});
if(!data){
 return res.status(400).send({status:false,message:"no country exists with this id"})
}

let record = await countryModel.findOneAndUpdate(
{_id:countryId},
{$set:{country:country}},
{new:true}
)
return res.status(200).send({status:true,message:"country is updated"})

}catch(error){
    console.log(error.message)
}
}

const deleteCountry = async function(req,res) {
try{
let countryId = req.body.countryId;

let country = await countryModel.findOne({_id:countryId});
if(!country) return res.status(400).send({status:true,message:"no country exists with this id"})

let deletedCountry = await countryModel.deleteOne({_id:countryId});

let states = await stateModel.find({countryId:countryId});

let deletedStates = await stateModel.deleteMany({countryId:countryId})

let cities;

for(let i = 0; i < states.length; i++){
  await cityModel.deleteMany({stateId:states[i]._id})
}
return res.status(200).send({status:true,message:"country is deleted"})

}catch(error){
    console.log(error.message)
}
}

const getCountry = async function(req,res) {
try{
let countryId = req.body.countryId;

let data = await countryModel.findOne({_id:countryId});
if(!data) return res.status(400).send({status:false,message:"no country exists with this countryId"})

return res.status(200).send({status:true,message:data})
}catch(error){
 console.log(error.message)
}
}

const getAllCitiesInACountry = async function(req,res) {
try{
let countryId = req.body.countryId;

let states = await stateModel.find({countryId:countryId});

let cities = [];

let citiesInAState;

for(let i  = 0; i < states.length; i++ ){
citiesInAState = await cityModel.find({stateId:states[i]._id});

cities.push(citiesInAState)
}
if(cities.length == 0) return res.status(400).send({status:false,message:"no cities exits"})
return res.status(200).send({status:true,message:cities})

}catch(error){
    console.log(error.message);
}
}


module.exports = {createCountry,updateCountry,deleteCountry,getCountry,getAllCitiesInACountry}