import express from 'express';
import bodyParser from 'body-parser';
import xmljs from 'xml-js';
import jsyaml from 'js-yaml';
import Papa from 'papaparse';

import sortRoutes from './sortRoutes.mjs';
import formatRoutes from './formatRoutes.mjs';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.use(sortRoutes);
app.use(formatRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export { app };
