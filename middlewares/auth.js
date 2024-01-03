/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */

const jwt = require('jsonwebtoken')
const user_model = require('../models/user')

exports.isAuthenticateUser = async (req, res, next) => {
  try {
    if (!req.cookies.Authorization) {
      return res.status(200).json({
        status: false,
        message: 'Please Login To Access This Resource'
      })
    }
    const token = req.cookies.Authorization
    if (!token) {
      return res.status(200).json({
        status: false,
        message: 'Please Login To Access This Resource'
      })
    }
    const decodedData = jwt.verify(token, 'testststststststststs')
    const user_details = await user_model.findOne({
       _id: decodedData.id
    })
    if (!user_details) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorised'
      })
    }
    req.user = user_details
    // req.user.user_category = decodedData.user_type
    next()
  } catch (err) {
    console.log(err)
    let message = 'Something Went Wrong'
    if (err.name === 'JsonWebTokenError') {
      message = 'Please Login To Access This Resource'
    }
    if (err.name === 'TokenExpiredError') {
      message = 'Please Login To Access This Resource'
    }

    return res.status(401).json({
      status: false,
      message
    })
  }
}

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_category)) {
      return res.json({ status: false, message: `Role: ${req.user.user_category} is Not Allowed To Access This Source` })
    }
    next()
  }
}
