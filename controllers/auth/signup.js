const user_model = require('../../models/user');
const mongoose = require('mongoose')
exports.signup = async(req,res)=>{
    try{
        const user = await user_model.create(req.body)
        return res.status(200).json({
            status: true,
            message:'SignUp Successfully'
        })
    }catch(err){
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

   
}
