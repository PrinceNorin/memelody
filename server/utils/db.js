const db = require('monk')('localhost:27017/memelody')

// const logger = context => next => (args, method) => {
//   console.log(method, args)
//   return next(args, method).then((res) => {
//     console.log(`${method} result`, res)
//     return res
//   })
// }

const crashReporter = context => next => (args, method) => {
  return next(args, method).catch((err) => {
    console.error('Caught an exception!', err)
    throw err
  })
}

// db.addMiddleware(logger)
db.addMiddleware(crashReporter)

module.exports = db
