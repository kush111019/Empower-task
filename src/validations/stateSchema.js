const Joi = require('joi');
const { objectId } = require('./customValidation');

const createState = Joi.object({
countryId: Joi.string().required().custom(objectId),
state: Joi.string().required()
})
    
const updateState = Joi.object({
countryId: Joi.string().required().custom(objectId),
state: Joi.string().required(),
stateId: Joi.string().required().custom(objectId)
})
    
const deleteState = Joi.object({
countryId: Joi.string().required().custom(objectId),
stateId: Joi.string().required().custom(objectId)
})
    
const getState = Joi.object({
countryId: Joi.string().required().custom(objectId),
stateId: Joi.string().required().custom(objectId)
})

const getAllStates = Joi.object({
countryId: Joi.string().required().custom(objectId)
})

getAllCitiesInAState = Joi.object({
stateId: Joi.string().required().custom(objectId),
countryId: Joi.string().required().custom(objectId)
})
    
module.exports = {createState,updateState,deleteState,getState,getAllStates,getAllCitiesInAState};