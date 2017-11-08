const jwt = require('jsonwebtoken')

const getTokenFromHeader = (req) => {
  const content = req.headers['authorization']
  if (content) {
    const parts = content.split(' ')
    return parts.length > 1 ? parts[1] : null
  }
}

const authMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  const token = req.cookies['TOKEN'] || getTokenFromHeader(req)

  jwt.verify(token, req.app.get('secret'), (err, user) => {
    if (err) {
      res.status(403).json({
        status: 403,
        message: err,
        code: (err instanceof jwt.TokenExpiredError) ? 200 : 403
      })
    } else {
      req.user = user
      next()
    }
  })
}

const middlewares = () => {
  return [authMiddleware]
}

module.exports = middlewares
