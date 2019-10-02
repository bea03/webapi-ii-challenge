const express = require('express');
const dataBlog = require('../data/db.js');

const router = express.Router();
//add a post
router.post('/', (req, res) => {
    const postData = req.body;

    if(!postData.title || !postData.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post" });
    } else {
        dataBlog.insert(postData)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database"});
        });
    }
});
//add a comment to a post by post id
router.post(`/api/posts/:post_id/comments`, (req, res) => {
    const id = req.params.post_id;
    const comment = req.body;

    if(comment.text === "" || typeof text !== "string") {
        res.status(400).json({ errorMessage: "Please provide text for the comment"});
    } else {

    }
})

module.exports = router;