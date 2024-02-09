const Joi = require('joi');
const { objectId } = require('./customValidation');

const createCountry = Joi.object({
country: Joi.string().required(),
})

const updateCountry = Joi.object({
countryId: Joi.string().required().custom(objectId),
country: Joi.string().required(),
})

const deleteCountry = Joi.object({
countryId: Joi.string().required().custom(objectId),
})

const getCountry = Joi.object({
countryId: Joi.string().required().custom(objectId),
})

const getAllCitiesInCountry = Joi.object({
countryId: Joi.string().required().custom(objectId)
})

module.exports = {createCountry,updateCountry,deleteCountry,getCountry,getAllCitiesInCountry}