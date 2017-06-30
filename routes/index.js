module.exports = function (app, server, handle) {
  require('./organize')(app, server, middlewareFunction)
  require('./auth')(app, server, middlewareFunction)
  server.get('*', (req, res) => handle(req, res))
}



const middlewareFunction = {
  getAllReqValue: ({ req }) => {
    return Object.assign({}, req.query, req.params, req.cookies)
  },
  requireMember: (req, res, next) => {
    console.log(req.cookies)
    if (! req.cookies.mttk) {
      res.redirect('/')
    } else {
      next()
    }
  },
}