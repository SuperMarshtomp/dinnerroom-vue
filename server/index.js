const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const path = require('path')
//const resolve = file => path.resolve(__dirname, file)
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const router = require('./routes/api/router');

app.use(router);

//Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
