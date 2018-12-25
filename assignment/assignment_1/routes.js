const fs = require('fs');

const handler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html lang="en">');
        res.write('<head><title>Greeting</title></head>');
        res.write('<body><h1>Greeting</h1></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button>submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html lang="en">');
        res.write('<head><title>User Page</title></head>');
        res.write('<body><ul><li>User 1</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        let username = [];
        req.on('data', chunk => {
            console.log(chunk);
            username.push(chunk);
        });

        return req.on('end', () => {
            const parseUsername = Buffer.concat(username).toString();
            const name = parseUsername.split('=')[1];
            fs.writeFile('./assignment/assignment_1/message.txt', name, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-type', 'text/html');
    res.write('<html lang="en">');
    res.write('<head><title>First Page</title></head>');
    res.write('<body><h1>Practice</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = {
    handler
};
