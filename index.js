//imports
const express = require('express');
const postsRouter = require('./routers/postsRouter.js');

//create a server
const server = express();

//teach express how to read json from body this is middleware
server.use(express.json());

//telling the server to use the router for /api/posts
server.use('/api/posts', postsRouter);

//request handlers
server.get('/', (req, res) => {
    res.send(`
      <h2>Building RESTful APIs with Express</h>
      <p>Welcome to the Lambda Building RESTful APIs with Express</p>
    `);
  });

  server.listen(8000, () => {
    console.log('\n*** Server Running on http://localhost:8000 ***\n');
  });