const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const http = require('http')

const app = express()
const api = require('./server/routes/api')
const logger = require('./server/utils/logger')
const loadCookie = require('./server/utils/loadCookie')
const port = process.env.PORT || 3000

app.set('port', port)
app.set('secret', 'secret-key')
app.disable('etag')

app.use(logger())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', api)
app.use(loadCookie(app))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})


const server = http.createServer(app)

server.listen(port, () => console.log(`Running on localhost:${port}`))

