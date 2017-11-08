const express = require('express')
const router = express.Router()

const middlewares = require('./middlewares')

router.use(...middlewares())
router.get('/users', (req, res) => {
  res.json({a: 'Hello'})
})

module.exports = router
