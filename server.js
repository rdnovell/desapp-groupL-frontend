//Install express server
const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
app.use(compression());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/desapp-groupL-frontend'));

app.get('/*', function(req,res) {

    res.sendFile(path.join(__dirname+'/dist/desapp-groupL-frontend/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8081);



