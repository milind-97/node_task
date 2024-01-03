const note_model = require('../../models/notes');
const mongoose = require('mongoose')
exports.add_note = async(req,res)=>{
    try{
        req.body.added_by = req.user._id
        const Note = await note_model.create(req.body)
        return res.status(200).json({
            status: true,
            message: 'Note Added Successfully'
        })
    }catch(err){
      if (err instanceof mongoose.Error.ValidationError) {
        // Mongoose validation error
        const validationErrors = {};
        for (const field in err.errors) {
            // Pick the first validation error and send it
            validationErrors[field] = err.errors[field].message;
            break;
        }
        return res.status(200).json({ status: false , message: validationErrors[Object.keys(validationErrors)[0]] });
    } else {
        // Other error, handle as needed
        console.error(err);
        res.status(200).json({ status: false , message: 'Internal Server Error' });
    }
        
    }
}