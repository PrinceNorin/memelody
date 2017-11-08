const sendError = (err, res) => {
  const message = typeof err === 'object' ? err.message : err
  res.status(500).json({
    status: 500,
    message: message
  })
}

module.exports = sendError
