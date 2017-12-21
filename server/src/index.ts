import * as express from 'express';

const app = express();

const navigation = require('./routers/navigation');

app.use('/navigation', navigation);

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});