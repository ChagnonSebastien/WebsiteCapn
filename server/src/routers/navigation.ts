import * as express from 'express';

const router = express.Router()

// define the home page route
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('NAVIGATION')
})

module.exports = router