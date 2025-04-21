let http = require('http');
const { deflate } = require('zlib');

const server = http.createServer((req, res) => {

    const url = req.url;

    res.writeHead(200, { "content-type": "text/plain" });

    if (url == "/hello")
        res.end("hello world");
    else
        res.end("hii ");
});

server.listen(3000, () => {
    console.log('̥server is running.....');
});

const server2 = http.createServer((req, res) => {

    let method = req.method;

    switch (method) {
        case 'GET': {
            res.end("this is get method");
            break;
        }
        case 'PUT': {
            res.end("this is PUT method");
            break;
        }
        case 'POST': {
            res.end("this is POST method");
            break;
        }
        case 'DELETE': {
            res.end("this is DELETE method");
            break;
        }
        case 'PATCH': {
            res.end("this is PATCH method");
            break;
        }
        case 'OPTIONS': {
            res.setHeader('Allow', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            res.end('OPTIONS request received');
            break;
        }
        default: {
            res.statusCode = 405;
            res.end("method is not available");
        }
    }

});

server2.listen(3001, () => {
    console.log('Server running at http://localhost:3000/');
});