
const config = require('config');
const express = require('express');
const cors = require('cors');

const app = express();

// Use jade templates
app.set('views', config.dir.server + 'views');
app.set('view engine', 'jade');

// Set CORS to allow requests from webpack-dev-server
app.use(cors({
  origin: config.endpoints.webpack,
  credentials: true,
}));

// Server static content
app.use('/static', express.static('build/dist'));


// Switch bundle paths when using webpack-dev-server
// to allow proxying of the requests back to the server
let staticpath;

if (process.env.NODE_ENV === 'development') {
  staticpath = config.endpoints.static_dev;
} else {
  staticpath = config.endpoints.static;
}

app.get('*', (req, res) => {

  // Return rendered view to the client
  res.render('index', {
    title: 'RunningIndex',
    // content: iso.render(),
    bundle: staticpath + '/app.bundle.js',
    staticpath: staticpath,
  });
});

app.listen(config.ports.web, 'localhost', () => {
  console.log('Web Server running @ localhost:' + config.ports.web);
});
