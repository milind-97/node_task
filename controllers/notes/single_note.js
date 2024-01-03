const note_model = require('../../models/notes');
const mongoose = require('mongoose');

exports.get_notes = async (req, res) => {
    try {
            
        const notes = await note_model.findOne({
            _id: req.params.id,
            added_by: req.user._id
        })

        if(!notes){
            return res.status(200).json({
                status: false,
                message: 'Records Not Found'
            })
           
        }
        return res.status(200).json({
            status: true,
            notes: notes
        })
          


    } catch (err) {
        console.log(err)
        return res.status(200).json({
            status: false,
            message: 'Something Went Wrong Try After Some Time'
        })

    }
}