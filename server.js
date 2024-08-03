const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const https = require('https');
const httpsLocalhost = require('https-localhost')();

const app = express();
const port = 3000;

app.use('/', expressStaticGzip(path.join(__dirname, 'public'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: (res, path) => {
        if (path.endsWith('.br')) {
            res.setHeader('Content-Encoding', 'br');
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.gz')) {
            res.setHeader('Content-Encoding', 'gzip');
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

httpsLocalhost.getCerts().then(certs => {
    https.createServer(certs, app).listen(port, () => {
        console.log(`HTTPS Server is running at https://localhost:${port}`);
    });
});
