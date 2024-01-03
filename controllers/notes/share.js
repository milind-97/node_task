const note_model = require('../../models/note_map');
const mongoose = require('mongoose')
exports.share_note = async(req,res)=>{
    if(!req.body.shared_to){
        return res.status(200).json({
            status: false,
            message: 'Reciever Id Is Required'
        })
    }
    try{
        req.body.shared_by = req.user._id
        req.body.note_id = req.params.id
        const Note = await note_model.create(req.body)
        return res.status(200).json({
            status: true,
            message: 'Note Shared Successfully'
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