module.exports = function (app, server, getAllReqValue) {
  server.get('/host', (req, res) => app.render(req, res, '/host', getAllReqValue({ req, res })))
  server.get('/register', (req, res) => app.render(req, res, '/register', getAllReqValue({ req, res })))
}
