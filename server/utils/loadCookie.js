const jwt = require('jsonwebtoken')

const getCookie = (secret) => {
  const token = jwt.sign({
    time: Date.now()
  }, secret, {
    expiresIn: '3h',
    issuer: 'memelody.com'
  })

  return `TOKEN=${token}; HttpOnly;`
}

const loadCookie = (app) => {
  return (req, res, next) => {
    let exts = req.url.split('.')
    let ext = exts[exts.length-1]
    if ((exts.length > 1 && ext === 'html') || exts.length === 1) {
      res.setHeader('Set-Cookie', getCookie(app.get('secret')))
    }

    next()
  }
}

module.exports = loadCookie
