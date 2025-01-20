const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{ 
        const playlists = await prisma.playlist.findMany({
            include: { owner: true, tracks: true},
        });
        res.json(playlists);
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req,res,next) => {
    try{
        const { name, description, ownerId, trackIds} = req.body;
        const playlist = await prisma.playlist.create({
            data: {
                name, 
                description,
                owner: { connect: {id: ownerId}  },
                tracks: { connect: trackIds.map((id) => ({id}))},
            },
        });
        res.status(201).json(playlist);
    }catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try{
      const playlist = await prisma.playlist.findUnique({
        where: { id: parseInt(req.params.id)},
        include: {tracks: true, owner: true},
      });
      if (!playlist) return res.status(404).json({error: 'Playlist not found?'})
        res.json(playlist);
    } catch (error) {
        next(error)
    }
});

module.exports = router;