const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middlewares/fetchUser");
const { body, validationResult } = require("express-validator");

// Route-1 for fetching all notes with fetchuser middleware GET '/api/notes/fetchallnotes'. LOGIN REQUIRED

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// Route -2 for adding notes with particular user POST '/api/notes/addnotes'  . LOGIN REQUIRED
router.post(
  "/addnotes",fetchuser,[
    body("title", "Title cannot be blank.").isLength({ min: 3 }),
    body("description", "Description is minimum of 3 characters.").isLength({ min: 3}),
  ],async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes = new Notes({ title, description, tag, user: req.user.id });
    const savednotes = await notes.save();
    res.json(savednotes);
  }
);


// Route -3 for updating notes of user PUT '/api/notes/updatenote/:id' LOGIN REQUIRED
router.put(
  "/updatenote/:id",fetchuser,async (req, res) => {
  const { title, description, tag } = req.body;
  const newnote={};
  if(title){newnote.title = title};
  if(description){newnote.description =description};
  if(tag){newnote.tag =tag};


  //Find the note to be updated

    // checking the verified updates on notes
    const notes = await Notes.findById(req.params.id)
    if(!notes){return res.status(404).send("Not Found")}
    if(notes.user.toString()!== req.user.id)
    {
      return res.status(401).send("Unauthorized Acess!");
    }
    const note = await Notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true})
    res.json(note);
  });



  // ROUTE- 4 Delete the existing notes : DEL: 'auth/notes/deletenote' LOGIN REQUIRED


router.delete(
  "/deletenote/:id",fetchuser,async (req, res) => {
  //Find the note to be deleted

    // checking the verified users on notes
    const notes = await Notes.findById(req.params.id)
    if(!notes){return res.status(404).send("Not Found")}
    if(notes.user.toString()!== req.user.id)
    {
      return res.status(401).send("Unauthorized Acess!");
    }
    const note = await Notes.findByIdAndDelete(req.params.id)
    res.json({Success: "note has been deleted!"});
  });




module.exports = router;
