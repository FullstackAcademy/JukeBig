const express = require('express');
const usersRouter = require('./routes/users');
const playlistsRouter = require('./routes/playlists');
const tracksRouter = require('./routes/tracks');
const PORT = 3900;

const server = express();
server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
}); 
server.use(express.json());

server.use('/users', usersRouter )
server.use('/playlists',playlistsRouter )
server.use('/tracks', tracksRouter )

server.get('/', (req, res) => {
    res.send('Welcome to the JukeBox API!');
});


module.exports = server;

