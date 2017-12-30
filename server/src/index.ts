import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as cors from 'cors';
import { Database } from './database';

const port = 5000;

Database.getInstance().then(database => {
    if (database.connection) {
        startServer(process.argv.slice(2)[0] == 'https');
    } else {
        console.log('Error while starting the server. Exiting now.');
    }
})

function startServer(isHttps: boolean): https.Server | http.Server {
    const app = express();
    config(app);
    routes(app);

    let server: https.Server | http.Server;
    if (isHttps) {
        const options = {
            key: fs.readFileSync('/etc/letsencrypt/live/poutineqc.ca/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/poutineqc.ca/cert.pem')
        };
    
        server = https.createServer(options, app).listen(port);
    } else {
        server = http.createServer(app).listen(port);
    }

    console.log(`Server started on port: ${port}`);
    return server;
}

function config(app: express.Express): void {
    app.use(cors());
}

function routes(app: express.Express): void {
    const navigation = require('./routers/navigation');
    app.use('/navigation', navigation);
    const amiliaProxy = require('./routers/amilia-proxy');
    app.use('/amilia-proxy', amiliaProxy);
}