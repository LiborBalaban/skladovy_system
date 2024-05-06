const login = require('express').Router();
const modelUser = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

login.post('/login-user', async (req, res) => {
    const { email, password } = req.body;
    const user = await modelUser.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.isActive === false) {
      return res.status(403).json({ message: 'Account not activated' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({role: user.role, id:user._id, storage:user.storage}, process.env.TOKEN, {expiresIn:'24h'});

    res.json({ token});
});

module.exports = login;