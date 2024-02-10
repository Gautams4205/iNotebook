const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route:1 :- Get all the notes:- Get "/api/note/fetchallnotes". Require Authentication.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
});
//Route:2 :-Add a new note:- POST "/api/note/addnote". Require Authentication.
router.post(
  "/addnote",
  fetchuser,
  [
    // Checking note's have real credentials.
    body("title").isLength({ min: 4 }),
    body("discription").isLength({ min: 4 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    } else {
      try {
        //Creating new note using credentials value.
        const note = new Notes({
          title: req.body.title,
          discription: req.body.discription,
          tag: req.body.tag,
          user: req.user.id,
        });
        //Saving the note to the DB.
        note.save().then((data) => {
          res.status(200).json(data);
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
      }
    }
  }
);
//Route:3:-Update a new note:- PUT "/api/note/update/:id". Require Authentication.
router.patch("/update/:id", fetchuser, async (req, res) => {
  try {
    const { title, discription, tag } = req.body;
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (discription) {
      newnote.discription = discription;
    }
    if (tag) {
      newnote.tag = tag;
    }
    // Checking the note is available in the DB.
    let note =await Notes.findById(req.params.id);
    if(!note){
      return res.status(400).send("Notes not available by this id.");
    }
    // Checking the user is same that can access the note.
    if(note.user.toString()!==req.user.id){
      return res.status(400).send("User is not allow to change this note.");
    }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true})
    res.json(note)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
});
//Route:4:- Delete a new note:- DELETE "/api/note/delete/:id". Require Authentication.
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    // Checking the note is available in the DB.
    let note =await Notes.findById(req.params.id);
    if(!note){
      return res.status(400).send("Note is not available by this id.");
    }
     // Checking the user is same that can access the note.
    if(note.user.toString()!==req.user.id){
      return res.status(400).send("User is not allow to change this note.");
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.json(note)

  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;