module.exports = function (app, server, middlewareFunction) {
  server.get('/create-experience/:experience/edit', middlewareFunction.requireMemberCompany , (req, res, next) => app.render(req, res, '/experience/edit', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/create-experience/:experience', middlewareFunction.requireMemberCompany , (req, res, next) => app.render(req, res, '/experience/create', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/dashboard', middlewareFunction.requireMemberCompany , (req, res, next) => app.render(req, res, '/dashboard', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/dashboard/booking', middlewareFunction.requireMemberCompany , (req, res, next) => app.render(req, res, '/company/booking', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/company/profile', middlewareFunction.requireMemberCompany , (req, res, next) => app.render(req, res, '/company/profile', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/booking/detail/me', middlewareFunction.requireMemberNotCompany , (req, res, next) => app.render(req, res, '/experience/bookingdetail', middlewareFunction.getAllReqValue({ req, res })))
  server.get('/booking/:id' , (req, res, next) => app.render(req, res, '/booking', middlewareFunction.getAllReqValue({ req, res })))

}
