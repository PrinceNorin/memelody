const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

const logger = () => {
  if (process.env.NODE_ENV === 'production') {
    const logFile = fs.createWriteStream(path.join(
      __dirname, '../../log/production.log'
    ))

    return morgan('short', { stream: logFile })
  } else {
    return morgan('dev')
  }
}

module.exports = logger
