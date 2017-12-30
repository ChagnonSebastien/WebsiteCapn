import { Database } from './../database';
import { Router, Request, Response, NextFunction } from "express";

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Database.getInstance()
  .then(database => {
    database.connection.collection('navigation').findOne('').then((result: any) => {
      res.send(result);
    });
  });
})

module.exports = router;
