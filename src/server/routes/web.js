// const renderToString = require('react-dom/server');

/*=====================================
=            Index: GET '/'           =
=====================================*/

exports.index = (req, res) => {

  const staticpath = req.app.get('staticPath');

  // Return rendered view to the client
  res.render('index', {
    title: 'RunningIndex',
    bundle: staticpath + '/app.bundle.js',
    staticpath: staticpath,
  });
};
