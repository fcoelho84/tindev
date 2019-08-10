const express = require('express');

const routes = express.Router();

const devController = require('./controllers/devController');
const likeController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');

// routes.get('/', (req, res) => {
//     return res.send('Hello World')
// });

routes.get('/devs', devController.index);

routes.post('/devs', devController.store);

routes.post('/devs/:devId/likes', likeController.store);

routes.post('/devs/:devId/dislikes', dislikeController.store);



module.exports = routes;