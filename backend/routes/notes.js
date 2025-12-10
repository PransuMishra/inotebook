const express = require('express');
const router = express.Router();
var fatchuser = require('../middleware/fatchuser');
const Note = require('../models/Note');
const {body, validationResult } = require('express-validator');


// ROUTE 1 : Get all the notes using : Get "/api/notes/getuser".Login reqired
router.get('/fatchallnotes', fatchuser, async(req, res)=>{

    try {
        const notes = await Note.find({user : req.user.id});
    res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


// ROUTE 2 : Add a new note using : Post "/api/auth/addnote".Login reqired
router.post('/addnote', fatchuser, [
    body('title', 'Enter a valid title').isLength({min : 3}),
    body('description', 'Description must be 5 characters').isLength({min : 5}),], async(req, res)=>{


    const {title, description, tag} = req.body;
    try {
    // if there are errors , return bad requset and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const note = new Note({
        title, description, tag, user : req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// ROUTE 3 : Update an existing note using : Post "/api/note/updatenote".Login reqired

router.put('/updatenote/:id', fatchuser, async(req, res)=>{
    const {title, description, tag} = req.body;
// Create a new note object 
    try {
        const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find the note to be updated and updated it .
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true})
    res.json({note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    

})


// ROUTE 4 : Delete an existing note using : Post "/api/note/deletenote".Login reqired

router.delete('/deletenote/:id', fatchuser, async(req, res)=>{

    try {
        // find the note to be Deleted and Deleted it .
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // Allow Deletion only if user own this note
    if(note.user.toString() !== req.user.id){   
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been deleted", note : note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    


})
module.exports = router;