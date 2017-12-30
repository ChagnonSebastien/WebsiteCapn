import { Database } from './../database';
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Database.getInstance()
  .then(database => {
    database.connection.collection('navigation').findOne('').then((result: any) => {
      res.send(result);
    });
  });
});

router.get('/page/:path', (req: Request, res: Response, next: NextFunction) => {
  Database.getInstance()
  .then(database => {
    database.connection.collection('pages').findOne({ _id: req.params.path }).then((result: any) => {
      res.send(result.content);
    });
  });
});

module.exports = router;
