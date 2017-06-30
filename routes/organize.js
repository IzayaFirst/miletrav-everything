module.exports = function (app, server, middlewareFunction) {
  server.get('/dashboard', middlewareFunction.requireMember , (req, res, next) => app.render(req, res, '/dashboard', middlewareFunction.getAllReqValue({ req, res })))
}
