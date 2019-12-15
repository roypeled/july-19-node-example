const http = require('http');
const fs = require('fs');
const Url = require('url-parse');

const serverCallback = (request, response) => {
    if(request.url === "/favicon.ico") return;

    const url = new Url(request.url, true);

    fs.writeFileSync('name.txt', JSON.stringify(url.query));

    response.writeHead(200, {'Content-Type': 'text/html'});
    let file = fs.readFileSync('site.html', { encoding: 'UTF-8' });

    file = file.replace(/%name%/g, url.query.name);


    response.write(file);
    response.end();
};

const server = http.createServer(serverCallback);

server.listen(8080);

console.log('Listening on: http://localhost:8080');