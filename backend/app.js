const { NODE_ENV, PORT } = process.env
const express = require('express')
const app = express()

app.use(require('cors')({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))

require('./db/connection')()

if (NODE_ENV === 'DEV') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// need to implement this
// app.use(require('./api/middleware/set-token'))

// routes go here~
app.use('/api', require('./api/routes/auth'))


// Not Found Handler
app.use((req, res, next) => {
    const error = new Error(`Could not ${req.method} ${req.path}`)
    error.status = 404
    next(error)
  })
  
  // Error Handler
  app.use((err, req, res, next) => {
    if (NODE_ENV === 'development') console.error(err)
    const { message, status } = err
    res.status(status).json({ status, message })
  })
  
  // Open Connection
  const listener = () => console.log(`Listening on Port ${PORT}!`)
  app.listen(PORT, listener)
  