import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from "jsonwebtoken";

export const tokenVerify = (req: Request, res: Response, next: NextFunction) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        verify(token, 'secret', (err : JsonWebTokenError | NotBeforeError | TokenExpiredError, decoded: object | string) => {      
            if (err) {
                res.send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });    
            } else { 
                next();
            }
        });
    } else {
        res.send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
}