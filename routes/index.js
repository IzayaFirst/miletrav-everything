module.exports = function (app, server, handle) {
 // require('./blog')(app, server, getAllReqValue)
  require('./auth')(app, server, getAllReqValue)
  server.get('*', (req, res) => handle(req, res))
}

function getAllReqValue(req) {
  return Object.assign({}, req.query, req.params, req.cookies)
}
