const note_model = require('../../models/notes');
const mongoose = require('mongoose');

exports.get_notes = async (req, res) => {
    try {
      const where = {
        added_by: req.user._id
      }
        const notes = await note_model.find(where)

        if(notes.length <= 0){
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