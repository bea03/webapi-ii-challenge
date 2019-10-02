const express = require('express');
const dataBlog = require('../data/db.js');

const router = express.Router();
//#1 When the client makes a `POST` request to `/api/posts`: TESTED & Working in Insomnia
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
//#2 When the client makes a `POST` request to `/api/posts/:id/comments`:  WORKING
router.post(`/:id/comments`, (req, res) => {
    const id = req.params.id;
    console.log('postID', id);
    const commentData = req.body;
    console.log('postComment', commentData);
    
    dataBlog.findById(id)
        .then(postID => {
            if(postID.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                if (!commentData.text) {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." });
                } else {
                    dataBlog.insertComment(commentData)
                        .then(val => {
                            res.status(201).json(val);
                        })
                        .catch(err => {
                            res.status(500).json({ error: "There was an error while saving the comment to the database" });
                        })
                }
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });

    // dataBlog.findById(req.params.id)
    //     .then(id => {
    //         if(id.length === 0){
    //             res.status(404).json({ message: "The post with the specified ID does not exist." });
    //         } else {
    //             if (!req.body.text) {
    //                 res.status(400).json({ errorMessage: "Please provide text for the comment." });
    //             } else {
    //                 const comment = {
    //                     text: req.body.text,
    //                     post_id: req.params.id
    //                 };
                  
    //                 db.insertComment(comment)
    //                 .then(val => {
    //                   res.status(201).json(val);
    //                 })
    //                 .catch(err => {
    //                   res.status(500).json({ message: "A server server error occured when saving the comment to the database."});
    //                 });
    //             }
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json({ message: "There was an error looking up a post with the specified ID" });
    //       });   
});

//#3 When the client makes a `GET` request to `/api/posts`: Tested & working Insomnia
router.get('/', (req, res) => {
    dataBlog.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

//#4 When the client makes a `GET` request to `/api/posts/:id`: Tested & working insomnia
router.get('/:id', (req, res) => {
    const id = req.params.id;     
        
    dataBlog.findById(id)
        .then(post => {
            if(post.length === 0) {
               res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
    //     if(!id) {
    //         res.status(404).json({ message: "The post with the specified ID does not exist." });
    //     } else {
    //         dataBlog.findById(id)
    //     .then(id => {
    //         res.status(200).json(id);
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: "The post information could not be retrieved." }); 
    //     });
    // }
});

//#5 When the client makes a `GET` request to `/api/posts/:id/comments`: Tested & working with insomnia
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    dataBlog.findById(id)
        .then(post => {
            if(post.length === 0) {
               res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                dataBlog.findPostComments(id)
                    .then(comments => {
                        res.status(200).json(comments)
                    })
                    .catch(err => {
                        res.status(500).json({ error: "Couldn't retrieve Comments"});
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Couldn't retrieve Post by ID"});
        });
});

//#6 When the client makes a `DELETE` request to `/api/posts/:id`: tested & working with insomnia
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    dataBlog.findById(id)
        .then(post => {
            if(post.length === 0) {
               res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                dataBlog.remove(id)
                    .then(records => {
                        res.status(200).json(records)
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The post could not be removed" });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Couldn't retrieve Post by ID"});
        });
}); //is this function taking in the url and a callback function?

//#7 When the client makes a `PUT` request to `/api/posts/:id`: tested & working insomnia
router.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log('put', id);
    const postData = req.body;
    console.log('putbody', postData);
    dataBlog.findById(id)
        .then(post => {
            if(post.length === 0) {
               res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                if(!postData.title || !postData.contents){
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post" });
                } else {
                    dataBlog.update(id, postData)
                        .then(count => {
                            res.status(200).json(count);
                        })
                        .catch(err => {
                            res.status(500).json({ error: "The post information could not be modified." });
                        });
                }
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Couldn't retrieve Post by ID"});
        });
});

module.exports = router;