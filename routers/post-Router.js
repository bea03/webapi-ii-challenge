const express = require('express');
const dataBlog = require('../data/db.js');

const router = express.Router();

router.post('/api/post', (req, res) => {
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

module.exports = router;