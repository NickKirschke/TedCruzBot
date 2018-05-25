http = require('http');
server = http.createServer( function(req, res) {

    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        res.end();
    }
    else if (req.method == 'GET'){
        console.log("GET");
        res.end();
    }

});

port = Number(process.env.PORT || 5000);
server.listen(port);
console.log('Listening at http://' + host + ':' + port);
