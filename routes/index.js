module.exports = function (app, server, handle) {
  require('./organize')(app, server, middlewareFunction)
  require('./auth')(app, server, middlewareFunction)
  require('./view')(app, server, middlewareFunction)
  require('./guidebook')(app, server, middlewareFunction)
  server.get('*', (req, res) => handle(req, res))
}



const middlewareFunction = {
  getAllReqValue: ({ req }) => {
    return Object.assign({}, req.query, req.params, req.cookies)
  },
  requireMember: (req, res, next) => {
    if (! req.cookies.mttk) {
      res.redirect('/')
    } else {
      next()
    }
  },
  requireMemberCompany: (req, res, next) => {
    if (! req.cookies.mttk) {
      res.redirect('/')
    } else {
      const token = JSON.parse(req.cookies.mttk)
      if (token.data.is_company) {
        next()
      } else {
        res.redirect('/')
      }
    }
  },
   requireMemberNotCompany: (req, res, next) => {
    if (! req.cookies.mttk) {
      res.redirect('/')
    } else {
      const token = JSON.parse(req.cookies.mttk)
      if (token.data.is_company) {
        res.redirect('/') 
      } else {
        next()
      }
    }
  },
}