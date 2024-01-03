const note_model = require('../../models/notes');
const mongoose = require('mongoose');

exports.search = async (req, res) => {
    let SearchTerm = req.query.q;
    try {
      const where = {
      }
      let query = where;
      if (SearchTerm) {
        query = {
            $and: [
                { note: { $regex: new RegExp(`.*${SearchTerm}.*`, 'i') } },
            ],
            };
    }
        const notes = await note_model.find(query)
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