const next = require('next')
const express = require('express')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use('/asset', express.static('asset'))
    server.use(cookieParser('secret'))
    require('./routes')(app, server, handle) // eslint-disable-line global-require
    const port = process.env.PORT || 5000
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on port ${port}...`) // eslint-disable-line no-console
    })
  })
