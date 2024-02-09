const Joi = require('joi');
const { objectId } = require('./customValidation');


const signUpSchema = Joi.object({
firstName: Joi.string().required(),
lastName: Joi.string().required(),
email: Joi.string().required().email(),
password: Joi.string().required(),
interest: Joi.array()
.items(Joi.string().valid('reading', 'writing', 'travelling', 'playing'))
.required(),
//interest: Joi.string().required().valid('reading','writing','travelling','playing'),
gender: Joi.string().required().valid('male','female','other'),
stateId: Joi.string().required().custom(objectId),
cityId: Joi.string().required().custom(objectId),
isDeleted: Joi.boolean(),
countryId: Joi.string().required().custom(objectId),
zip: Joi.string().required(),
//image: Joi.string().regex(/^[\w\-.()\s]+$/).required()
})

const signInSchema = Joi.object({
email: Joi.string().required(),
password: Joi.string().required(),
userId: Joi.string().required().custom(objectId)
})
const deleteUserByIdSchema = Joi.object({
userId: Joi.string().required().custom(objectId),
})

const updateUserByIdSchema = Joi.object({
userId: Joi.string().required().custom(objectId),
firstName: Joi.string(),
lastName: Joi.string(),
email: Joi.string().email(),
password: Joi.string(),
interest: Joi.array()
.items(Joi.string().valid('reading', 'writing', 'travelling', 'playing'))
.required(),
//interest: Joi.string().valid('reading','writing','travelling','playing'),
gender: Joi.string().valid('male','female','other'),
state: Joi.string(),
city: Joi.string(),
isDeleted: Joi.boolean(),
country: Joi.string().valid('india','usa','uk','canada'),
zip: Joi.string(),
countryId: Joi.string().custom(objectId),
stateId: Joi.string().custom(objectId),
cityId: Joi.string().custom(objectId)
//profilePicture: Joi.string()
})

const getUserByIdSchema = Joi.object({
userId: Joi.string().required().custom(objectId),
})

const forgetPasswordSchema = Joi.object({
email: Joi.string().required()
})

const getAllUsersSchema = Joi.object({
userId: Joi.string().required().custom(objectId)
})

const signOutSchema = Joi.object({
userId: Joi.string().required().custom(objectId),
refreshToken: Joi.string().required()
})

const editOtherUserDetailsSchema = Joi.object({
    userId: Joi.string().required().custom(objectId).required(),
    userIdOfUserToBeEdited: Joi.string().required().custom(objectId).required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    interest: Joi.array()
    .items(Joi.string().valid('reading', 'writing', 'travelling', 'playing')),
    //interest: Joi.string().valid('reading','writing','travelling','playing'),
    gender: Joi.string().valid('male','female','other'),
    state: Joi.string(),
    city: Joi.string(),
    isDeleted: Joi.boolean(),
    country: Joi.string().valid('india','usa','uk','canada'),
    zip: Joi.string(),
    countryId: Joi.string().custom(objectId),
    stateId: Joi.string().custom(objectId),
    cityId: Joi.string().custom(objectId)
    //profilePicture: Joi.string()
    })

const editUserPasswordSchema = Joi.object({
userId: Joi.string().required().custom(objectId).required(),
userIdOfTheUserToBeEdited: Joi.string().required().custom(objectId).required(),
password: Joi.string().required()
})

module.exports = {signUpSchema,signInSchema,deleteUserByIdSchema,updateUserByIdSchema,getUserByIdSchema,forgetPasswordSchema,getAllUsersSchema,signOutSchema,editOtherUserDetailsSchema,editUserPasswordSchema}


