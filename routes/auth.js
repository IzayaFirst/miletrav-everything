module.exports = function (app, server, middlewareFunction) {
  server.get('/host', (req, res) => app.render(req, res, '/host', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/register', (req, res) => app.render(req, res, '/register', middlewareFunction.getAllReqValue({ req, res })))
}
