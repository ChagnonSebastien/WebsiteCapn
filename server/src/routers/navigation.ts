import { Database } from './../database';
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Database.getInstance()
  .then(database => {
    database.connection.collection('navigation')
      .findOne('')
      .then((result: any) => {
        res.send(result);
      })
      .catch((reason: any) => {
        console.log(reason);
        res.send();
      });
  });
});

router.get('/page/:path', (req: Request, res: Response, next: NextFunction) => {
  Database.getInstance()
  .then(database => {
    database.connection.collection('pages')
      .findOne({ _id: req.params.path })
      .then((result: any) => {
        res.send(result.content);
      })
      .catch((reason: any) => {
        res.send();
      });
  });
});

module.exports = router;
