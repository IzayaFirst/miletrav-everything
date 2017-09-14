module.exports = function (app, server, middlewareFunction) {
    server.get('/experience/:experience', (req, res, next) => app.render(req, res, '/experience/view', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/experience/category/:category', (req, res, next) => app.render(req, res, '/experience/filter', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/user/profile', middlewareFunction.requireMember , (req, res, next) => app.render(req, res, '/user/profile', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/host/detail/:uuid', (req, res, next) => app.render(req, res, '/user/view', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/wishlist', middlewareFunction.requireMemberNotCompany , (req, res, next) => app.render(req, res, '/wishlist', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/invoice/:transaction', middlewareFunction.requireMemberNotCompany , (req, res, next) => app.render(req, res, '/invoice', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/message', middlewareFunction.requireMember , (req, res, next) => app.render(req, res, '/message', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/notification', middlewareFunction.requireMemberNotCompany , (req, res, next) => app.render(req, res, '/notification', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/overview', middlewareFunction.requireMemberCompany , (req, res, next) => app.render(req, res, '/overview', middlewareFunction.getAllReqValue({ req, res })))

}