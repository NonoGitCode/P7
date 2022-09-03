const jwt = require('jsonwebtoken');
// require('dotenv').config();
// let secretToken = process.env.token

//Extraction des informations d'authentification, vérification, puis transmition.
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[0];
        const decodedToken = jwt.verify(token,`RANDOM_SECRET_TOKEN`);
        const userId = decodedToken.userId;
        const level = decodedToken.level
        const pseudo = decodedToken.pseudo
        req.auth = {
            userId,
            level,
            pseudo
        };
        next();
    }catch(error){
        res.status(401).json({ error });
    }

};