const http = require('http');
const fs = require('fs');
const Url = require('url-parse');

const messagesHistory = require('./history') || [];

function messagesToHTML(messagesArray) {
    return messagesArray
        .map(message => `
            <p><strong>${message.name}</strong>: ${message.message}</p>
        `)
        .join('')
}

const serverCallback = (request, response) => {
    if(request.url === "/favicon.ico") return;

    const url = new Url(request.url, true);

    messagesHistory.push(url.query);

    fs.writeFileSync('history.json', JSON.stringify(messagesHistory));

    let file = fs.readFileSync('site.html', { encoding: 'UTF-8' });

    file = file.replace(/%name%/g, url.query.name);
    file = file.replace(/%chat%/g, messagesToHTML(messagesHistory));

    response.write(file);
    response.end();
};

const server = http.createServer(serverCallback);

server.listen(8080);

console.log('Listening on: http://localhost:8080');