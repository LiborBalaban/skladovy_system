const prisma = require('../databaze/prisma');

exports.getAllRoles = async(req, res) => {
     try {
            const roles = await prisma.role.findMany();
             
            if (!roles) {
                return res.status(404).json({ message: "Role nebyly nalezeny." });
            }
            
            return res.json({
                message: "Úspěšně se nám podařilo získat role",
                documents: roles
            });
        } catch (error) {
            console.error("Chyba při získávání rolí:", error);
            return res.status(500).json({
                message: "Bohužel nedošlo k získání rolí",
                documents: []
            });
        }
};