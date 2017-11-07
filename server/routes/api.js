const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const jwt = require('jsonwebtoken')

const connection = (callback) => {
  return MongoClient.connect('mongodb://localhost:27017/memelody', (err, db) => {
    if (err) return console.log(err)

    callback(db)
  })
}

let response = {
  status: 200,
  data: [],
  message: null
}

const sendError = (err, res) => {
  response.status = 501
  response.message = typeof err === 'object' ? err.message : err
  res.status(500).json(response)
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
    response.status = 403
    response.message = 'invalid token!'
    res.status(403).json(response)
  }
})

router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users
        res.json(response)
      })
      .catch((err) => {
        sendError(err, res)
      })
  })
})

module.exports = router
