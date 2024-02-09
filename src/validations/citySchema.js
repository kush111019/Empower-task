const Joi = require('joi');
const { objectId } = require('./customValidation');

const createCity = Joi.object({
stateId: Joi.string().required().custom(objectId),
city: Joi.string().required(),
countryId: Joi.string().required().custom(objectId)
})
    
const updateCity = Joi.object({
stateId: Joi.string().required().custom(objectId),
city: Joi.string().required(),
cityId: Joi.string().required().custom(objectId),
countryId: Joi.string().required().custom(objectId)
})
    
const deleteCity = Joi.object({
stateId: Joi.string().required().custom(objectId),
city: Joi.string().required(),
countryId: Joi.string().required().custom(objectId)
})
    
const getCity = Joi.object({
stateId: Joi.string().required().custom(objectId),
city: Joi.string().required(),
countryId: Joi.string().required().custom(objectId),
})

getAllCitiesInCountry = Joi.object({
countryId: Joi.string().required().custom(objectId),
stateId: Joi.string().required().custom(objectId)
})
    
module.exports = {createCity,updateCity,deleteCity,getCity,getAllCitiesInCountry};