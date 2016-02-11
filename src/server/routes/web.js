const config = require('config');
const path = require('path');
const fs = require('fs');
const errType = require('../utils/constants');


exports.index = (req, res, next) => {

  const staticpath = req.app.get('staticPath');
  const bundleDistPath = path.join(__dirname, '../../..', config.dir.dist);

  // Read hashed bundle names
  fs.readFile(bundleDistPath + 'bundles.json', (fsErr, data) => {

    if (fsErr) {
      const err = {
        type: errType.STATIC_RESOURCE_ERROR,
        message: 'Sorry, the server was unable locate static resources. Please try again later.',
      };
      next(err);
    } else {

      const bundleNames = JSON.parse(data);

      // Return rendered view to the client
      res.render('index', {
        title: 'RunningIndex',
        bundle: staticpath + '/' + bundleNames.app.js,
        styles: staticpath + '/' + bundleNames.styles.js,
        staticpath: staticpath,
      });
    }
  });
};
