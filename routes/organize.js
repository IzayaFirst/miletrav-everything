module.exports = function (app, server, middlewareFunction) {
  server.get('/create-experience/:experience/edit', middlewareFunction.requireMemberCompany , (req, res, next) => app.render(req, res, '/experience/edit', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/create-experience/:experience', middlewareFunction.requireMemberCompany , (req, res, next) => app.render(req, res, '/experience/create', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/dashboard', middlewareFunction.requireMember , (req, res, next) => app.render(req, res, '/dashboard', middlewareFunction.getAllReqValue({ req, res })))
}
