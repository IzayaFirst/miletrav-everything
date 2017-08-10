module.exports = function (app, server, middlewareFunction) {
  server.get('/guidebook/me', middlewareFunction.requireMemberNotCompany , (req, res, next) => app.render(req, res, '/guidebook/dashboard', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/guidebook/create/:uuid', middlewareFunction.requireMemberNotCompany , (req, res, next) => app.render(req, res, '/guidebook/create', middlewareFunction.getAllReqValue({ req, res })))

}
