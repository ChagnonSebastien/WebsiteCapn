import { Database } from './../database';
import { Router, Request, Response, NextFunction } from "express";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    Database.getInstance()
    .then((database: Database) => {
        database.connection.collection('users')
        .findOne({"_id":req.body.user})
        .then((user: any) => {
            compare(req.body.password, user.password)
            .then((match: boolean) => {
                if (match) {
                    const token = sign({
                        admin: true
                    }, 'secret', { expiresIn: '6h' });
                    res.send({
                        'success': true,
                        'message': 'Authentication successful!',
                        'token': token
                    });
                } else {
                    res.send({"success": false, "message": "Password does not match"});
                }
            });
        })
        .catch((reason: any) => {
            res.send({"success": false, "message": reason});
        });
    })
    .catch((reason: any) => {
        res.send({"success": false, "message": reason});
    });
});

module.exports = router;