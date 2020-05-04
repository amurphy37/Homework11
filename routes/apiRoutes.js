// TODO: importing the store
var Store = require("../db/store")
var newStore = new Store ();
var router = require("express").Router();


// building out routes 


    router.get("/notes", function (req, res) {
        newStore.getNotes().then(noteArr => res.json(noteArr))
    });

    router.post("/notes", function(req, res) {
        // console.log(req.body);
        newStore.addNote(req.body);
        res.json({ ok: true });
    });

    router.delete("/notes/:id", function(req, res) {
        newStore.removeNote(req.params.id)
        res.json({ ok: true });
    });
// and using these routes to call your store methods

module.exports = router;