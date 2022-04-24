const express = require('express');
const connection = require("./connection");
const itemsRoutes = require('./routes/items');

// initalize express application
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//set the starting path for all the items routes
app.use('/items', itemsRoutes);



// define the port of application
//const PORT = 3001;

// intialize the bodyparser
//app.use(bodyParser.json());



//initial test of app
//app.get('/', (req, res) => res.send('Hello from the Homepage.'));

// will post to termianl to insure if porgram in running, will also provide URL for port
//app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));

module.exports = app;