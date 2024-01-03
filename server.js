const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}))

const connectdb = require('./db_connection')

connectdb()

  require('./routes/notes_routes')(app)
  require('./routes/auth')(app)
  require('./routes/search')(app)
// set port, listen for requests
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
module.exports = app;