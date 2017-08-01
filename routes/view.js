module.exports = function (app, server, middlewareFunction) {
    server.get('/experience/:experience', (req, res, next) => app.render(req, res, '/experience/view', middlewareFunction.getAllReqValue({ req, res })))
    server.get('/experience/category/:category', (req, res, next) => app.render(req, res, '/experience/filter', middlewareFunction.getAllReqValue({ req, res })))
}