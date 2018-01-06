import { Database } from './../database';
import { Router, Request, Response, NextFunction } from "express";
import { tokenVerify } from '../middleware/tokenVerify';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Database.getInstance()
  .then(database => {
    database.connection.collection('navigation')
      .findOne({"_id": "navigation"})
      .then((result: any) => {
        res.send(result);
      })
      .catch((reason: any) => {
        console.log(`Error while getting navigation from the server: ${reason}`);
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

router.use(tokenVerify);

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  Database.getInstance()
  .then(database => {
    database.connection.collection('navigation')
      .update({"_id": "navigation"}, req.body.data, { upsert: true })
      .then((result: any) => {
        res.send({ "success": true });
      })
      .catch((reason: any) => {
        console.log(`Error while posting new navigation to the server: ${reason}`);
        res.send({ "success": false, "message": reason });
      });
  });
});

module.exports = router;
