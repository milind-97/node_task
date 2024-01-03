
const {isAuthenticateUser} = require('../middlewares/auth')
module.exports = notes_routes => {
    const router = require('express').Router()
  
     router.get('',isAuthenticateUser, require('../controllers/search/search').search)
     notes_routes.use('/api/search', router)
  }
  