const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors') 

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./app/controllers/authControllers')(app);
require('./app/controllers/projectController')(app);

require('./app/controllers/index')(app);

app.listen(8080);