const jwt = require('jsonwebtoken');
const { verifyRefreshToken, generateAccessToken,refreshTokenExistsInDb } = require('../utils/generateToken');
const userTokenModel = require("../models/userToken");
const userToken = require('../models/userToken');

const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  const accessToken = req.headers.authorization;
  const refreshToken = req.headers["x-refresh-token"]
  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' });
  }
  if(!refreshToken) return res.status(401).send({status:false,message:"refresh Token is missing"})
  let refreshTokenIsValid = await userTokenModel.findOne({refreshToken:refreshToken});
  if(!refreshTokenIsValid) return res.status(401).send({status:false,message:"refreshToken not exists in database LogIn again to continue"});
  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Add user information to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    // If the access token is expired, try to refresh it
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.headers['x-refresh-token'];
      try {
        let refreshTokenValidation = await userTokenModel.findOne({refreshToken:refreshToken});
        if(!refreshTokenValidation) return res.status(401).send({status:false,message:"refreshTokennn not exist in database LogIn again to continue"})
        const decodedRefreshToken = await verifyRefreshToken(refreshToken);
        
        // Generate a new access token
        const newAccessToken = generateAccessToken(decodedRefreshToken.user);

        // Add user information to the request object
        req.user = decodedRefreshToken.user;

        // Attach the new access token to the response headers
        res.setHeader('Authorization', newAccessToken);
        next();
      } catch (refreshErr) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid access token' });
    }
  }
};

module.exports = {authMiddleware};
