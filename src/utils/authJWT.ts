import {ApiResponse} from './response';
import jwt from 'jsonwebtoken';
import config from '../config';
import {User} from '../models';

export const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send(new ApiResponse(403, 'error', { err: 'No Token Provided!' }));
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwtKey, async (err, decoded) => {
        req.user = await User.findById(decoded._id);
        if (err) {
            return res.status(401).send(new ApiResponse(401, 'error', { err: 'Unauthorized!' }));
        }
        next();
    });
}