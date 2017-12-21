import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import { Database } from './database';

const port = 5000;

Database.getInstance().then(database => {
    if (database.connection) {
        startServer();
    } else {
        console.log('Error while starting the server. Exiting now.');
    }
})

function startServer(): http.Server {
    const app = express();

    config(app);
    routes(app);

    return app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

function config(app: express.Express): void {
    app.use(cors());
}

function routes(app: express.Express): void {
    const navigation = require('./routers/navigation');
    app.use('/navigation', navigation);
}