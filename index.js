const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.send('Hey this is Ted Cruz');
});

app.post('/',function(req, res){
  console.log(JSON.parse(req.chunks[0]));
});

const PORT = process.env.PORT || 5000

app.listen(PORT, function() {
  console.log('Example app listening on port ' + PORT)
});
