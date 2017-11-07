const _ = require('lodash')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const db = require('../utils/db')

const sendError = (err, res) => {
  const message = typeof err === 'object' ? err.message : err
  res.status(500).json({
    status: 500,
    message: message
  })
}

const getTokenFromHeader = (content) => {
  if (content) {
    const parts = content.split(' ')
    return parts.length > 1 ? parts[1] : null
  }
}

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

router.use((req, res, next) => {
  const token = req.cookies['TOKEN'] || getTokenFromHeader(req.headers['authorization'])

  if (token && jwt.verify(token, req.app.get('secret'))) {
    req.user = jwt.decode(token)
    next()
  } else {
    res.status(403).json({
      status: 403,
      message: 'invalid token!'
    })
  }
})

router.get('/users', (req, res) => {
  db.get('users').find().then((users) => {
    res.json({ status: 200, data: users })
  }).catch((err) => {
    sendError(err, res)
  })
})

module.exports = router
