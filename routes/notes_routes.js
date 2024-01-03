
const {isAuthenticateUser} = require('../middlewares/auth')
module.exports = notes_routes => {
    const router = require('express').Router()
  
    // route to create note
    router.post('',isAuthenticateUser, require('../controllers/notes/add_note').add_note)

    // route to get all notes
    router.get('',isAuthenticateUser, require('../controllers/notes/notes_lists').get_notes)

    router.get('/:id',isAuthenticateUser, require('../controllers/notes/single_note').get_notes)
    // route to edit notes
    router.patch('/:note_id',isAuthenticateUser, require('../controllers/notes/update_note').update_note)

    // share note api
    router.post('/:id/share',isAuthenticateUser, require('../controllers/notes/share').share_note)
    //  route to get notes
     router.delete('/:note_id', require('../controllers/notes/delete_note').delete_note)
  
     notes_routes.use('/api/notes', router)
  }
  