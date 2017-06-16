module.exports = function (app, server, getAllReqValue) {
  server.get('/register', (req, res) => app.render(req, res, '/register', getAllReqValue({ req, res })))
}
