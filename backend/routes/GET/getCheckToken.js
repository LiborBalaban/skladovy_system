const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const userModel = require('../../models/userModel')

const getCheckToken = async (req, res, next) => {

  try {
    const token = req.cookies.token;
    const decodedToken = await jwt.verify(token, 'secret');
    const user = await decodedToken;
    const userId = user.id;
    const findedUser = await userModel.findById(userId);
    if(!findedUser){
      return res.status(404).json({ msg: "User nebyl nalezen." });
    }

    else{
      req.user = user;
      next();
    }
} catch (err) {
    return res.status(401).json({ message: "Invalid token, please login" });
}
};

module.exports = getCheckToken;