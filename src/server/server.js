
const config = require('config');
const express = require('express');

const app = express();

// Use jade templates
app.set('views', config.dir.server + 'views');
app.set('view engine', 'jade');

// Server static content
app.use('/static', express.static('build/dist'));

app.get('*', (req, res) => {
  const staticpath = config.endpoints.static;

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
