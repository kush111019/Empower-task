const jwt = require('jsonwebtoken');
const userTokenModel = require("../models/userToken");
const userToken = require('../models/userToken');


const generateAccessToken =  (user) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
  return accessToken;
};

const generateRefreshToken =  (user) => {
    const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
    if(refreshToken)
    {
    let userId  = user.userId;
    let date = new Date();
    const saveRefreshToken =  userTokenModel.create({userId:userId,refreshToken:refreshToken,createdAt:date})
    }
    return refreshToken;
  };

const verifyRefreshToken =  (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};


module.exports = { generateAccessToken, verifyRefreshToken,generateRefreshToken};
