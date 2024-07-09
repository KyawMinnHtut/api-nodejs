import { createServer } from 'node:http';
import { loadAll } from './data/load.js';
import {handleRequest} from './route/routes.js'

const PORT = 3000;

const server = createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(PORT, () => {
    loadAll()
    console.log(`Server listening on ${PORT} . . .`);
})