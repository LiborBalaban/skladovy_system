const activateUser = require('express').Router();
const modelUser = require('../../models/userModel');
activateUser.post('/activate-user', async (req, res) => {
const { userId, code } = req.body;

    const user = await modelUser.findOne({ _id:userId, code:code });
    if (!user) {
        return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.isActive = true;
    await user.save();
    res.status(200).json({ message: 'Account activated successfully' });
});



module.exports = activateUser;