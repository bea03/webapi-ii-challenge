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
// //add a comment to a post by post id
// router.post(`/:post_id/comments`, (req, res) => {
//     const post_id = req.params.post_id;
//     const comment = req.body;

//     if(comment.text === "" || typeof text !== "string") {
//         res.status(400).json({ errorMessage: "Please provide text for the comment"});
//     } else {
//         dataBlog.insertComment(comment, post_id)
//     }
// })

router.get('/', (req, res) => {
    dataBlog.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
     
        
        if(!id) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            dataBlog.findById(id)
        .then(id => {
            res.status(200).json(id);
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." }); 
        });
    }
});

module.exports = router;