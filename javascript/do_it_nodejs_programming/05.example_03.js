const http = require('http');

const url = {
    host : 'www.google.com'
    // port : 80
    // path : '/'
    // method : 'GET'
    // headers : {}
};

const req = http.get(url, (res) => {
    let result = '';
    res.on('data', (chunk) => {
        result += chunk;
    });

    res.on('end', () => {
        console.log(result);
    });
});

req.on('error', (err) => {
    console.log(err);
});
