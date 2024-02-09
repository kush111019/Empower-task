const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const userToken = require("../models/userToken");
const jwt = require("jsonwebtoken");
const {generateAccessToken, generateRefreshToken} = require("../utils/generateToken")
const countryModel = require("../models/countryModel");
const stateModel = require("../models/stateModel");
const cityModel = require("../models/cityModel");


const signUp = async function(req,res){
try{
const user = req.body;

const {firstName,lastName,email,password,countryId,cityId,stateId,zip,isDeleted,gender,interest} = user;

// let image = req.file.image;
// user.image = image;

const userData = await userModel.findOne({email:email});

if(userData) return res.status(400).send({status:false,message:"email already exists"});

let countryExists = await countryModel.findOne({_id:countryId});

if(!countryExists) return res.status(400).send({status:false,message:"no country exists with this countryId"});

let stateExists = await stateModel.findOne({_id:stateId});

if(!stateExists)
return res.status(400).send({status:false,message:"no state exists with this stateId"});

let cityExists = await cityModel.findOne({_id:cityId});

if(!cityExists) return res.status(400).send({status:false,message:"no city exists with this cityId"});

const salt = await bcrypt.genSalt(Number(process.env.SALT));

const hashedPassword = await bcrypt.hash(password, salt);

user.password = hashedPassword;

const data = await userModel.create(user);

if(data){
return res.status(201).send({status:true,message:"user is created successfully"});
}
}catch(error){
console.log(error.message);
}
}

const signIn = async function(req,res){
try{
const user = req.body;

const {email,password} = user;

const data = await userModel.findOne({email:email,isDeleted:false});

if(!data) return res.status(400).send({status:false,message:"wrong email or contact number is wrong or user is deleted"});

const verifiedPassword = await bcrypt.compare(
password,
data.password
);

if (!verifiedPassword)
return res
.status(401)
.json({ error: true, message: "Invalid email or password" });

const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);

res.header("x-refresh-token", refreshToken);
res.header("authorization",accessToken)

res.status(200).json({
error: false,
accessToken:accessToken,
refreshToken:refreshToken,
message: "Logged in successfully",
});

}catch(error){
console.log(error.message);
}
}


const getUserById = async function(req,res){
try{
const userId = req.body.userId;

const data = await userModel.findOne({_id:userId});

if(!data) return res.status(400).send({status:false,message:"no user exists with this userId"});

return res.status(200).send({status:true,message:data});

}catch(error){
console.log(error.message)
}
}

const updateUserById = async function(req,res){
try{
const {userId,countryId,stateId,cityId} = req.body;
if(countryId){
let countryExists = await countryModel.findOne({_id:countryId})
if(!countryExists) return res.status(400).send({status:false,message:"no countryExists with this countryId"})
}

if(stateId){
let stateExists = await stateModel.findOne
({_id:stateId});
if(!stateExists) return res.status(400).send({status:false,message:"no state exists with this stateId"})
}

if(countryId){
let cityExists = await cityModel.findOne({_id:cityId});
if(!cityExists) return res.status(400).send({status:false,message:"no city exists with this cityId"});
}

const body = req.body;

const user = await userModel.findById({_id:userId});

if(!user) return res.status(400).send({status:false,message:"no user exists with this userId"});

let newUser = Object.assign(user,body);

let data = await userModel.create(newUser)
if(data)

return res.status(200).send({status:true,message:"user is updated"});

}catch(error){
    console.log(error.message);
}
}

const deleteUserById = async function(req,res){
try{
const userId = req.body.userId;

const user = await userModel.findById({_id:userId,isDeleted:false});

if(!user) return res.status(400).send({status:false,message:"no user exists with this userId"});

const userIsAlreadyDeleted = user.isDeleted;

if(userIsAlreadyDeleted) return res.status(400).send({status:false,message:"user is already deleted"});

const data = await userModel.findOneAndUpdate(
{_id:userId},
{isDeleted:true},
{new:true}
)

return res.status(200).send({status:true,message:"user is deleted"});
}catch(error){
    console.log(error.message)
}
}


const forgetPassword = async function(req,res) {
try{
let email = req.body.email;

let emailExists = await userModel.findOne({email:email});

if(!emailExists) return res.status(400).send({status:false,message:"email not exist in database"});

let urlLink = "some url link";

return res.status(200).send({message:true,data:"reset password link is send on your email"});

}catch(error){
 console.log(error.message)
}
}

const getAllUsers = async function(req,res){
 try{
 let userId = req.body.userId;

 let userExists = await userModel.findOne({_id:userId,isDeleted:false});

 if(!userExists) return res.status(400).send({status:false,message:"no user exists with this id"});

 let data = await userModel.find({isDeleted:false});
 return res.status(200).send({status:true,message:data})

 }catch(error){
    console.log(error.message)
 }
}

 const signOut = async function(req,res){
 try{
 let refreshToken = req.body.refreshToken;

 let refreshTokenDocument = await userToken.findOne({refreshToken:refreshToken});

 if(!refreshTokenDocument) return res.status(400).send({status:false,message:"no user exists with this refreshToken"});

 let data = await userToken.deleteMany({refreshToken:refreshToken})

 if(data) return res.status(200).send({status:true,message:"user is logout successfully"})
 
 }catch(error) {
 console.log(error.message)
}
}


const editOtherUserDetails  = async function(req,res){
try{
let  userIdOfTheUserToBeEdited = req.body.userIdOfUserToBeEdited;

let userId = req.body.userId

let {firstName,lastName,countryId,cityId,stateId,zip,isDeleted,gender,interest} = req.body;

let userExists = await userModel.findOne({_id:userId,isDeleted:false});

if(!userExists) return res.status(400).send({status:false,message:"signUp first"});

let userToBeUpdated = await userModel.findOne({_id:userIdOfTheUserToBeEdited,isDeleted:false});

if(!userToBeUpdated) return res.status(400).send({status:false,message:"user not exits to be edited"});

let body = {firstName,lastName,countryId,cityId,stateId,zip,isDeleted,gender,interest};

let obj = new Object();
for(let i in body){
 if(body[i] != undefined || null){
    obj[i] = body[i]
 }
}

let newUser = Object.assign(userToBeUpdated,obj);

let data = await userModel.create(newUser)

if(data){
return res.status(200).send({status:true,message:"user information is updated"})
}
}catch(error){
    console.log(error.message);
}
}


const editOtherUserPassword = async function(req,res){
try{
let userIdOfTheUserToBeEdited = req.body.userIdOfTheUserToBeEdited;

let userId = req.body.userId;

let password = req.body.password;

let userExists = await userModel.findOne({_id:userId,isDeleted:false});

if(!userExists) return res.status(400).send({status:false,message:"signUp first"});

let userToBeUpdated = await userModel.findOne({_id:userIdOfTheUserToBeEdited,isDeleted:false});

if(!userToBeUpdated) return res.status(400).send({status:false,message:"user not exits to be edited"});

const salt = await bcrypt.genSalt(Number(process.env.SALT));

const hashedPassword = await bcrypt.hash(password, salt);

password = hashedPassword;

let passwordUpdate = await userModel.findOneAndUpdate(
{_id:userIdOfTheUserToBeEdited},
{password:password},
{new:true}
)
 if(passwordUpdate) return res.status(200).send({status:true,message:"password is updated"}); 
}catch(error){
    console.log(error.message);
} 
}
module.exports = {signUp,signIn,getUserById,updateUserById,deleteUserById,forgetPassword,getAllUsers,signOut,editOtherUserDetails,editOtherUserPassword};