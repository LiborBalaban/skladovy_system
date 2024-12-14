const prisma = require('../databaze/prisma');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.AuthUser = async (req, res, next) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Token is missing, please login' });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.id;

        const findedUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!findedUser) {
            return res.status(404).json({ messsage: 'User not found' });
        }

        req.user = findedUser;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token, please login' });
    }
};


exports.AuthAdmin = async (req, res, next) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Token is missing, please login' });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.id;

        const findedUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!findedUser) {
            return res.status(404).json({ messsage: 'User not found' });
        }

        if(findedUser.roleId === 3){
            req.user = findedUser;
            next();
        }else{
            return res.status(401).json({ message: 'Nejste admin a nemáte přidělen přístup' });  
        }

    } catch (err) {
        return res.status(401).json({ message: 'Invalid token, please login' });
    }
};