const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const routes = require('./routes');

const PORT = 3000;

function buildRouteData(req) {
    const location = url.parse(req.url, true);
    const route = location.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const headers = req.headers;

    return { route, method, headers };
}

function buildRoute(data, callback) {
    if (routes[data.route]) {
        if (routes[data.route][data.method]) {
            routes[data.route][data.method](data, callback);
        } else {
            callback({ error: 'Method Not Allowed'}, 405);
        }
    } else {
        callback({ error: 'Not Found'}, 404);
    }
}

const buildResponse = res => (payload, statusCode) => {
    const status = statusCode ? statusCode : 200;
    const payloadText = payload ? JSON.stringify(payload) : '{}';

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(status);
    res.end(payloadText);
}

const server = http.createServer((req, res) => {
    const decoder = new StringDecoder('utf-8');
    const routeData = buildRouteData(req);
    let buffer = '';

    req.on('data', data => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
        routeData.payload = buffer;
        buildRoute(routeData, buildResponse(res));
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
