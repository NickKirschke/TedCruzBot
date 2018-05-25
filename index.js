const express = require('express')

const app = express()

app.get('/', (req, res) {
  res.send("This is the bot server");
  console.log(req);
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
