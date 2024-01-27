const jwt = require('jsonwebtoken')
const dotenv =  require('dotenv')

dotenv.config()

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token=authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_CODE);
        req.userData = {username:decodedToken.name ,userId: decodedToken.user_id};
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized Access or token expired' });
    }
};
module.exports = authMiddleware;
