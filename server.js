var static = require('node-static');

// serve the /public folder
var file = new(static.Server)('./public');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  });
}).listen(80);
