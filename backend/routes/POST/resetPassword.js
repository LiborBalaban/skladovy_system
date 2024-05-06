const resetPassword = require('express').Router();
const modelUser = require('../../models/userModel');
const bcrypt = require('bcryptjs');

resetPassword.put('/reset-password', async (req, res) => {
    try {
        const { password, userId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await modelUser.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "User nenalezen" });
        }

        return res.status(200).json({ msg: "Vaše heslo bylo úspěšně změněno" });
    } catch (error) {
        console.error('Chyba při aktualizaci hesla:', error);
        return res.status(500).json({ msg: "Nastala chyba při aktualizaci hesla" });
    }
});

module.exports = resetPassword;