module.exports = auth_routes => {
    const router = require('express').Router()
  
    // route to create user
    router.post('/signup', require('../controllers/auth/signup').signup)

    router.post('/login', require('../controllers/auth/login').loginUser)

  
     auth_routes.use('/api/auth', router)
  }
  