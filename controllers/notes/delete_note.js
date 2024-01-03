const note_model = require('../../models/notes');
const mongoose = require('mongoose')
exports.delete_note =async(req,res)=>{
    const note = await note_model.findOne({_id: req.params.note_id})
    if(!note){
        return res.status(200).json({
            success: false,
            message: 'Note Not Exist'
        })
    }
    try{
        note.remove()
        return res.status(200).json({
            success: true,
            message: "Note Deleted Successfully"
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