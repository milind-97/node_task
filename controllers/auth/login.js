const user_model = require('../../models/user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

exports.loginUser = async(req,res)=>{
    const {email, password } = req.body
    if(!email || !password){
        return res.status(200).json({
                        status: false,
                        message:'Please Enter Email And Password'
                    })
    }
    try{
        const user = await user_model.findOne({email}).select("password")
        if(!user){
            return res.status(200).json({
                status: false,
                message:'Email Address Not Registered'
            })
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return res.status(200).json({
                status: false,
                message:'Incorrect Password'
            })
        }
        const token = jwt.sign(
            { id: user.id },
            'testststststststststs',
            {
              expiresIn: '1200s'
            }
          )
        return res.status(200).cookie('Authorization', token, {
            httpOnly: true
          })
          .header('Authorization', token).json({
            status: true,
            user: {
                ...user.toJSON(),
                token: token
            }
        })
    }catch(err){
        console.log(err)

        if (err instanceof mongoose.Error.ValidationError) {
            // Mongoose validation error
                        const validationErrors = {};
                        for (const field in err.errors) {
                            // Collect all validation errors
                            validationErrors[field] = err.errors[field].message;
                        }
                        return res.status(200).json({ status: false, message: validationErrors })
                     } else if (err.code === 11000) {
                        // Duplicate key error (E11000)
                        const duplicatedField = Object.keys(err.keyPattern)[0];
                        return res.status(200).json({
                            status: false,
                            message: `The ${duplicatedField} ${err.keyValue[duplicatedField]} is already registered. Please use a different ${duplicatedField}.`
                        });
                    } else {
                        // Other error, handle as needed
                        console.error(err);
                        res.status(200).json({ status: false , message: 'Internal Server Error' });
                    }

    }

  
    // sendToken(user,200,res)
}