import { Router, Request, Response, NextFunction } from "express";
import * as request from 'request';

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    request('https://www.amilia.com/PublicApi/capn/fr/Programs', (error: any, response: request.RequestResponse, body: any) => {
        res.send(body);
    });
})

module.exports = router;