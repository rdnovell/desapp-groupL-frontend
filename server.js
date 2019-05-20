const compression = require('compression');
const express = require('express');

const app = express();
app.use(compression());

// Serve only the static files form the dist directory
app.use(express.static('./dist'));

app.get('/*', function(req,res) {
    res.sendFile('index.html', { root: __dirname });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8081);
