export {}
const express = require('express');
const app = express();

const path = require('./routers/navigation');

app.use('/navigation', path);

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});