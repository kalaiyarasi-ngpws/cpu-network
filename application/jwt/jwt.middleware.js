import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
const dotenv = config()
const checkToken = (req, res, next) => {
    let error_res={}
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.send('Oops!. Something went wrong.');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.send('AUTH_TOKEN_NOT_SUPPLIED')
    }
}
export {
    checkToken,
}